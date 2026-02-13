# Деплой на Vercel

## Подготовка

1. Убедитесь, что проект настроен и работает локально
2. Создайте аккаунт на [Vercel](https://vercel.com)
3. Установите Vercel CLI (опционально):
```bash
npm i -g vercel
```

## Шаг 1: Подключение репозитория

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Импортируйте ваш Git репозиторий
3. Выберите проект

## Шаг 2: Настройка проекта

### Root Directory
Оставьте корень проекта (по умолчанию)

### Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

## Шаг 3: Переменные окружения

Добавьте следующие переменные в настройках проекта:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

OPENAI_API_KEY=your-openai-api-key
```

## Шаг 4: Обновление Google OAuth

1. Перейдите в Google Cloud Console
2. Добавьте новый Authorized redirect URI:
   - `https://your-domain.vercel.app/api/auth/callback/google`

## Шаг 5: Деплой

Нажмите "Deploy" и дождитесь завершения сборки.

## Автоматический деплой

После первого деплоя, каждый push в main ветку будет автоматически деплоиться на Vercel.

## Custom Domain

1. Перейдите в Settings → Domains
2. Добавьте ваш домен
3. Настройте DNS записи согласно инструкциям Vercel
4. Обновите NEXTAUTH_URL и Google OAuth redirect URI

## Мониторинг

- Логи доступны в разделе Deployments → Logs
- Аналитика доступна в разделе Analytics
- Ошибки отслеживаются в разделе Errors

## Оптимизация

### Кэширование
Vercel автоматически кэширует статические ресурсы и API routes.

### Edge Functions
Для улучшения производительности можно использовать Edge Functions:

```typescript
// app/api/some-route/route.ts
export const runtime = 'edge';
```

### Image Optimization
Next.js автоматически оптимизирует изображения через Vercel Image Optimization.

## Troubleshooting

### Ошибка "Module not found"
- Проверьте, что все зависимости указаны в package.json
- Убедитесь, что Root Directory установлен правильно

### Ошибка "Environment variable not found"
- Проверьте, что все переменные окружения добавлены в настройках Vercel
- Пересоберите проект после добавления переменных

### Ошибка NextAuth
- Убедитесь, что NEXTAUTH_URL указывает на правильный домен
- Проверьте, что NEXTAUTH_SECRET установлен

## Полезные команды

```bash
# Локальный деплой для тестирования
vercel dev

# Деплой в production
vercel --prod

# Просмотр логов
vercel logs
```

## Стоимость

- Hobby план: бесплатно для личных проектов
- Pro план: $20/месяц для коммерческих проектов
- Подробнее: [vercel.com/pricing](https://vercel.com/pricing)
