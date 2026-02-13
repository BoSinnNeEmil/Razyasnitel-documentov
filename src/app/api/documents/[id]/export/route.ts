import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { jsPDF } from 'jspdf';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    // Get analysis
    const { data: analysis, error: analysisError } = await supabase
      .from('analyses')
      .select('*')
      .eq('document_id', params.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (analysisError || !analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    // Create PDF
    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text(document.title, 20, yPosition);
    yPosition += 15;

    // Document info
    doc.setFontSize(10);
    doc.text(`Файл: ${document.original_filename}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Дата анализа: ${new Date(analysis.created_at).toLocaleDateString('ru-RU')}`, 20, yPosition);
    yPosition += 15;

    // Summary
    doc.setFontSize(16);
    doc.text('Краткое резюме', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(analysis.summary || 'Нет резюме', 170);
    doc.text(summaryLines, 20, yPosition);
    yPosition += summaryLines.length * 7 + 10;

    // Key points
    if (analysis.key_points && Array.isArray(analysis.key_points) && analysis.key_points.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.text('Ключевые пункты', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      analysis.key_points.forEach((point: string, index: number) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        const pointLines = doc.splitTextToSize(`${index + 1}. ${point}`, 165);
        doc.text(pointLines, 25, yPosition);
        yPosition += pointLines.length * 7 + 3;
      });
      yPosition += 7;
    }

    // Risks
    if (analysis.risks && Array.isArray(analysis.risks) && analysis.risks.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(239, 68, 68); // Red
      doc.text('Риски', 20, yPosition);
      doc.setTextColor(0, 0, 0); // Reset to black
      yPosition += 10;
      
      doc.setFontSize(11);
      analysis.risks.forEach((risk: any, index: number) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        const riskText = typeof risk === 'string' ? risk : risk.title || JSON.stringify(risk);
        const riskLines = doc.splitTextToSize(`${index + 1}. ${riskText}`, 165);
        doc.text(riskLines, 25, yPosition);
        yPosition += riskLines.length * 7 + 3;
      });
      yPosition += 7;
    }

    // Obligations
    if (analysis.obligations && Array.isArray(analysis.obligations) && analysis.obligations.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.text('Обязательства', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      analysis.obligations.forEach((obligation: any, index: number) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        const obligationText = typeof obligation === 'string' ? obligation : obligation.title || JSON.stringify(obligation);
        const obligationLines = doc.splitTextToSize(`${index + 1}. ${obligationText}`, 165);
        doc.text(obligationLines, 25, yPosition);
        yPosition += obligationLines.length * 7 + 3;
      });
      yPosition += 7;
    }

    // Checklist
    if (analysis.checklist && Array.isArray(analysis.checklist) && analysis.checklist.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.text('Чек-лист действий', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      analysis.checklist.forEach((item: any, index: number) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        const itemText = typeof item === 'string' ? item : item.title || JSON.stringify(item);
        const itemLines = doc.splitTextToSize(`☐ ${itemText}`, 165);
        doc.text(itemLines, 25, yPosition);
        yPosition += itemLines.length * 7 + 3;
      });
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${document.title}-analysis.pdf"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
