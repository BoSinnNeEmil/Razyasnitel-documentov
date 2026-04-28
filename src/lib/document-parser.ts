import mammoth from 'mammoth'
import { PDFParse } from 'pdf-parse'

export async function parseDocument(file: Buffer, fileType: string): Promise<string> {
  try {
    if (fileType === 'application/pdf') {
      return await parsePDF(file)
    }
    if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      return await parseDOCX(file)
    }
    if (fileType === 'text/plain') {
      return file.toString('utf-8')
    }
    throw new Error('Unsupported file type')
  } catch (error) {
    console.error('Document parsing error:', error)
    throw new Error('Failed to parse document')
  }
}

async function parsePDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer })
  try {
    const data = await parser.getText()
    return data.text
  } finally {
    await parser.destroy()
  }
}

async function parseDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

export function getPageCount(text: string): number {
  // Примерная оценка: ~500 слов на страницу
  const words = text.split(/\s+/).length
  return Math.ceil(words / 500)
}

export function truncateText(text: string, maxLength = 10000): string {
  if (text.length <= maxLength) {
    return text
  }
  return `${text.substring(0, maxLength)}...`
}
