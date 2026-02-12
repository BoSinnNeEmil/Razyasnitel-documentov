import { Router } from 'express';
import { z } from 'zod';
import authService from '../services/auth.service';

const router = Router();

// Схемы валидации
const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

// POST /api/auth/register - регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    const result = await authService.register(email, password, name);

    res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      data: result,
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Ошибка валидации',
        details: error.errors,
      });
    }

    res.status(400).json({
      error: error.message || 'Ошибка при регистрации',
    });
  }
});

// POST /api/auth/login - авторизация
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: 'Успешная авторизация',
      data: result,
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Ошибка валидации',
        details: error.errors,
      });
    }

    res.status(401).json({
      error: error.message || 'Ошибка при авторизации',
    });
  }
});

// GET /api/auth/profile - получение профиля пользователя
router.get('/profile', authService.authenticateToken.bind(authService), async (req: any, res) => {
  try {
    const profile = await authService.getUserProfile(req.user.userId);

    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    console.error('Profile Error:', error);
    res.status(404).json({
      error: error.message || 'Пользователь не найден',
    });
  }
});

// POST /api/auth/verify - проверка токена
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Токен обязателен' });
    }

    const decoded = await authService.verifyToken(token);

    res.json({
      success: true,
      data: decoded,
    });
  } catch (error: any) {
    res.status(401).json({
      error: error.message || 'Недействительный токен',
    });
  }
});

export default router;