import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import documentRoutes from './routes/document.routes';
import authRoutes from './routes/auth.routes';
import memoryStorage from './services/memory-storage.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Создаем папку для загрузок если её нет
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', async (req, res) => {
  const dbHealth = await memoryStorage.healthCheck();
  const stats = memoryStorage.getStats();
  
  res.json({ 
    status: 'ok', 
    message: 'Document Explainer API is running',
    storage: 'memory',
    database: dbHealth ? 'connected' : 'disconnected',
    stats,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Document Explainer API',
    version: '0.1.0',
    storage: 'memory (development)',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        verify: 'POST /api/auth/verify'
      },
      documents: {
        upload: 'POST /api/documents/upload',
        question: 'POST /api/documents/:id/question'
      }
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`💾 Storage: Memory (development mode)`);
  console.log(`🤖 AI: ${process.env.HF_TOKEN ? 'HuggingFace configured' : 'Not configured'}`);
});
