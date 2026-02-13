import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseDocument(file: Buffer, fileType: string): Promise<string> {
  try {
    if (fileType === 'application/pdf') {
      return await parsePDF(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      return await parseDOCX(file);
    } else if (fileType === 'text/plain') {
      return file.toString('utf-8');
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Document parsing error:', error);
    throw new Error('Failed to parse document');
  }
}

async function parsePDF(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}

async function parseDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export function getPageCount(text: string): number {
  // Примерная оценка: ~500 слов на страницу
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 500);
}

export function truncateText(text: string, maxLength: number = 10000): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}
