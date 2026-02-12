import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';

class DocumentService {
  async extractText(filePath: string, fileType: string): Promise<string> {
    try {
      switch (fileType) {
        case 'application/pdf':
          return await this.extractFromPDF(filePath);
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          return await this.extractFromDOCX(filePath);
        case 'text/plain':
          return await this.extractFromTXT(filePath);
        default:
          throw new Error('Неподдерживаемый формат файла');
      }
    } catch (error) {
      console.error('Text Extraction Error:', error);
      throw new Error('Ошибка при извлечении текста из документа');
    }
  }

  private async extractFromPDF(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  private async extractFromDOCX(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  private async extractFromTXT(filePath: string): Promise<string> {
    return await fs.readFile(filePath, 'utf-8');
  }

  validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'Файл слишком большой (максимум 10 МБ)' };
    }

    if (!allowedTypes.includes(file.mimetype)) {
      return { valid: false, error: 'Неподдерживаемый формат файла' };
    }

    return { valid: true };
  }
}

export default new DocumentService();
