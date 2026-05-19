import { getAnalysis, getDocument } from '@/lib/appwrite'
import { authOptions } from '@/lib/auth'
import { jsPDF } from 'jspdf'
import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let document: unknown = null
    try {
      document = await getDocument(params.id)
    } catch {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const doc = document as { user_id: string; title: string; original_filename: string }
    if (!doc || doc.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    let analysis: unknown = null
    try {
      analysis = await getAnalysis(params.id)
    } catch {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
    }

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
    }

    const pdf = new jsPDF()
    let yPosition = 20

    pdf.setFontSize(20)
    pdf.text(doc.title, 20, yPosition)
    yPosition += 15

    pdf.setFontSize(10)
    pdf.text(`Файл: ${doc.original_filename}`, 20, yPosition)
    yPosition += 7
    const analysisData = analysis as {
      summary?: string
      key_points?: unknown[]
      risks?: unknown[]
      obligations?: unknown[]
      checklist?: unknown[]
    }
    pdf.text(`Дата анализа: ${new Date().toLocaleDateString('ru-RU')}`, 20, yPosition)
    yPosition += 15

    // Summary
    pdf.setFontSize(16)
    pdf.text('Краткое резюме', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(11)
    const summaryLines = doc.splitTextToSize(analysis.summary || 'Нет резюме', 170)
    pdf.text(summaryLines, 20, yPosition)
    yPosition += summaryLines.length * 7 + 10

    // Key points
    if (
      analysis.key_points &&
      Array.isArray(analysis.key_points) &&
      analysis.key_points.length > 0
    ) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      pdf.setFontSize(16)
      pdf.text('Ключевые пункты', 20, yPosition)
      yPosition += 10

      pdf.setFontSize(11)
      analysis.key_points.forEach((point: string, index: number) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        const pointLines = doc.splitTextToSize(`${index + 1}. ${point}`, 165)
        pdf.text(pointLines, 25, yPosition)
        yPosition += pointLines.length * 7 + 3
      })
      yPosition += 7
    }

    // Risks
    if (analysis.risks && Array.isArray(analysis.risks) && analysis.risks.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      pdf.setFontSize(16)
      doc.setTextColor(239, 68, 68) // Red
      pdf.text('Риски', 20, yPosition)
      doc.setTextColor(0, 0, 0) // Reset to black
      yPosition += 10

      pdf.setFontSize(11)
      analysis.risks.forEach((risk: any, index: number) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        const riskText = typeof risk === 'string' ? risk : risk.title || JSON.stringify(risk)
        const riskLines = doc.splitTextToSize(`${index + 1}. ${riskText}`, 165)
        pdf.text(riskLines, 25, yPosition)
        yPosition += riskLines.length * 7 + 3
      })
      yPosition += 7
    }

    // Obligations
    if (
      analysis.obligations &&
      Array.isArray(analysis.obligations) &&
      analysis.obligations.length > 0
    ) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      pdf.setFontSize(16)
      pdf.text('Обязательства', 20, yPosition)
      yPosition += 10

      pdf.setFontSize(11)
      analysis.obligations.forEach((obligation: any, index: number) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        const obligationText =
          typeof obligation === 'string'
            ? obligation
            : obligation.title || JSON.stringify(obligation)
        const obligationLines = doc.splitTextToSize(`${index + 1}. ${obligationText}`, 165)
        pdf.text(obligationLines, 25, yPosition)
        yPosition += obligationLines.length * 7 + 3
      })
      yPosition += 7
    }

    // Checklist
    if (analysis.checklist && Array.isArray(analysis.checklist) && analysis.checklist.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      pdf.setFontSize(16)
      pdf.text('Чек-лист действий', 20, yPosition)
      yPosition += 10

      pdf.setFontSize(11)
      analysis.checklist.forEach((item: any, index: number) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        const itemText = typeof item === 'string' ? item : item.title || JSON.stringify(item)
        const itemLines = doc.splitTextToSize(`☐ ${itemText}`, 165)
        pdf.text(itemLines, 25, yPosition)
        yPosition += itemLines.length * 7 + 3
      })
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${document.title}-analysis.pdf"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
