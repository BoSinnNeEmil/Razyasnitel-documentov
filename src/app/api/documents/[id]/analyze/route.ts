import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { parseDocument, truncateText } from '@/lib/document-parser';

const AI_API_KEY = process.env.OPENAI_API_KEY;
const AI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://router.huggingface.co/v1';
const AI_MODEL = process.env.OPENAI_MODEL || 'openai/gpt-oss-120b:groq';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { style = 'friendly' } = await request.json();

    // Get document
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single();

    if (docError || !document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Download file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(document.file_path);

    if (downloadError) {
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
    }

    // Parse document
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await parseDocument(buffer, document.file_type);

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Failed to extract text from document' }, { status: 500 });
    }

    // Truncate text for AI processing
    const truncatedText = truncateText(text, 10000);

    // Analyze with AI
    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: `Ты - эксперт по анализу документов. Проанализируй документ и предоставь:
1. Краткое резюме (3-5 абзацев)
2. Ключевые пункты (список)
3. Риски (список с объяснениями)
4. Обязательства (список)
5. Чек-лист действий

Стиль: ${style === 'formal' ? 'формальный' : style === 'expert' ? 'экспертный' : 'дружелюбный'}

Ответь в формате JSON с полями: summary, key_points (массив строк), risks (массив объектов с title и description), obligations (массив строк), checklist (массив строк).`,
          },
          {
            role: 'user',
            content: truncatedText,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', error);
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    // Try to parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch (e) {
      // If not JSON, create structured response
      analysis = {
        summary: content,
        key_points: ['Анализ выполнен'],
        risks: [],
        obligations: [],
        checklist: [],
      };
    }

    // Save analysis
    const { data: analysisData, error: analysisError } = await supabase
      .from('analyses')
      .insert({
        document_id: params.id,
        summary: analysis.summary,
        key_points: analysis.key_points,
        risks: analysis.risks,
        obligations: analysis.obligations,
        checklist: analysis.checklist,
        style,
      })
      .select()
      .single();

    if (analysisError) {
      console.error('Database error:', analysisError);
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 });
    }

    // Update document status
    await supabase
      .from('documents')
      .update({ status: 'completed' })
      .eq('id', params.id);

    return NextResponse.json({ analysis: analysisData });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
