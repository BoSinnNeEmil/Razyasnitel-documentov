import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import documentService from '../services/document.service';
import aiService from '../services/ai.service';

const router = Router();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/documents/upload - загрузка и анализ документа
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }

    // Валидация файла
    const validation = documentService.validateFile(req.file);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Извлечение текста
    const text = await documentService.extractText(
      req.file.path,
      req.file.mimetype
    );

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Не удалось извлечь текст из документа' });
    }

    // Анализ документа через AI
    const analysis = await aiService.analyzeDocument(text);

    // Здесь можно сохранить в БД
    // const document = await prisma.document.create({ ... });

    res.json({
      success: true,
      document: {
        id: uuidv4(),
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        extractedText: text.substring(0, 1000) + '...', // Первые 1000 символов
        analysis
      }
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: error.message || 'Ошибка при обработке документа' });
  }
});

// POST /api/documents/:id/question - задать вопрос по документу
router.post('/:id/question', async (req, res) => {
  try {
    const { question, documentText } = req.body;

    if (!question || !documentText) {
      return res.status(400).json({ error: 'Вопрос и текст документа обязательны' });
    }

    const answer = await aiService.answerQuestion(documentText, question);

    res.json({
      success: true,
      answer
    });
  } catch (error: any) {
    console.error('Question Error:', error);
    res.status(500).json({ error: error.message || 'Ошибка при ответе на вопрос' });
  }
});

export default router;
