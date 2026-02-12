import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import memoryStorage from './memory-storage.service';

interface AuthResult {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

class AuthService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  }

  async register(email: string, password: string, name?: string): Promise<AuthResult> {
    // Проверяем, существует ли пользователь
    const existingUser = await memoryStorage.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Валидация пароля
    if (password.length < 8) {
      throw new Error('Пароль должен содержать минимум 8 символов');
    }

    // Хешируем пароль
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Создаем пользователя
    const user = await memoryStorage.createUser(email, passwordHash, name);

    // Создаем бесплатную подписку
    await memoryStorage.createSubscription({
      user_id: user.id,
      plan: 'free',
      status: 'active',
      start_date: new Date().toISOString(),
    });

    // Генерируем JWT токен
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async login(email: string, password: string): Promise<AuthResult> {
    // Находим пользователя
    const user = await memoryStorage.getUserByEmail(email);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль');
    }

    // Генерируем JWT токен
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async verifyToken(token: string): Promise<{ userId: string; email: string }> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      return {
        userId: decoded.userId,
        email: decoded.email,
      };
    } catch (error) {
      throw new Error('Недействительный токен');
    }
  }

  async getUserProfile(userId: string) {
    const user = await memoryStorage.getUserById(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const subscription = await memoryStorage.getUserSubscription(userId);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
      subscription: subscription ? {
        plan: subscription.plan,
        status: subscription.status,
        startDate: subscription.start_date,
        endDate: subscription.end_date,
      } : null,
    };
  }

  private generateToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }

  // Middleware для проверки аутентификации
  authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Токен доступа отсутствует' });
    }

    this.verifyToken(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch(() => {
        res.status(403).json({ error: 'Недействительный токен' });
      });
  }
}

export { AuthService };
export default new AuthService();