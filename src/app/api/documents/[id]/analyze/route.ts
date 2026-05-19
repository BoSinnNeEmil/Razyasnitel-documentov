import { createAnalysis, getDocument, getFileDownload, updateDocument } from '@/lib/appwrite'
import { authOptions } from '@/lib/auth'
import { parseDocument, truncateText } from '@/lib/document-parser'
import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'

const AI_API_KEY = process.env.OPENAI_API_KEY
const AI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://router.huggingface.co/v1'
const AI_MODEL = process.env.OPENAI_MODEL || 'openai/gpt-oss-120b:groq'

type AnalysisResult = {
  summary: string
  key_points: string[]
  risks: Array<{ title?: string; description?: string } | string>
  obligations: Array<{ title?: string } | string>
  checklist: Array<{ title?: string } | string>
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const isGuest = params.id.startsWith('guest-')
    const { style = 'friendly' } = await request.json()

    if (isGuest) {
      return NextResponse.json(
        { error: 'Для анализа документов необходимо зарегистрироваться', requiresAuth: true },
        { status: 401 }
      )
    }

    let document: unknown = null
    try {
      document = await getDocument(params.id)
    } catch {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const doc = document as { user_id: string; file_path: string; file_type: string }
    if (!doc || doc.user_id !== session?.user?.id) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    let fileData: Response | null = null
    try {
      fileData = await getFileDownload(doc.file_path)
    } catch (downloadError) {
      console.error('Download error:', downloadError)
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
    }

    const arrayBuffer = await fileData.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const text = await parseDocument(buffer, doc.file_type)

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Failed to extract text from document' }, { status: 500 })
    }

    const truncatedText = truncateText(text, 10000)

    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`,
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
          { role: 'user', content: truncatedText },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('AI API error:', error)
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 })
    }

    const aiResponse = await response.json()
    const content = aiResponse.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    let analysis: AnalysisResult
    try {
      analysis = JSON.parse(content)
    } catch {
      analysis = {
        summary: content,
        key_points: ['Анализ выполнен'],
        risks: [],
        obligations: [],
        checklist: [],
      }
    }

    let analysisData: unknown = null
    try {
      analysisData = await createAnalysis({
        document_id: params.id,
        summary: analysis.summary,
        key_points: analysis.key_points,
        risks: analysis.risks,
        obligations: analysis.obligations,
        checklist: analysis.checklist,
        style,
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 })
    }

    try {
      await updateDocument(params.id, { status: 'completed' })
    } catch {}

    return NextResponse.json({ analysis: analysisData })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
