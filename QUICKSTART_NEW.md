# Быстрый старт (Новый стек)

## Что изменилось

Проект переведен на новый технологический стек:
- ✅ Next.js 14 с App Router
- ✅ Supabase вместо Express + Prisma
- ✅ NextAuth.js для аутентификации
- ✅ shadcn/ui компоненты
- ✅ Готов к деплою на Vercel

## Шаг 1: Установка зависимостей

```bash
npm install
```

## Шаг 2: Настройка Supabase

1. Создайте проект на https://supabase.com
2. Перейдите в SQL Editor
3. Выполните скрипт `supabase/schema.sql`
4. Выполните скрипт `supabase/functions.sql`
5. Создайте Storage bucket `documents`:
   - Перейдите в Storage
   - Нажмите "New bucket"
   - Имя: `documents`
   - Public: false

6. Настройте Storage policies (выполните в SQL Editor):

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read own files
CREATE POLICY "Users can read own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete own files
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Шаг 3: Google OAuth (опционально)

1. Перейдите в Google Cloud Console
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (для разработки)
     - `https://your-project.supabase.co/auth/v1/callback` (для Supabase)
5. Сохраните Client ID и Client Secret

## Шаг 4: Переменные окружения

Создайте файл `.env.local`:

```env
# Supabase (из Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

# Google OAuth (опционально)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

Для генерации NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Шаг 5: Запуск

```bash
npm run dev
```

Откройте http://localhost:3000

## Шаг 6: Тестирование

1. Зарегистрируйтесь через email или Google
2. Загрузите тестовый документ
3. Дождитесь завершения загрузки
4. Нажмите "Начать анализ"
5. Просмотрите результаты

## Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Root Directory: `frontend`
3. Добавьте все переменные окружения
4. Обновите NEXTAUTH_URL на ваш домен
5. Обновите Google OAuth redirect URI
6. Deploy!

## Troubleshooting

### "Invalid API key"
- Проверьте NEXT_PUBLIC_SUPABASE_ANON_KEY
- Убедитесь, что .env.local в корне проекта

### "Row Level Security policy violation"
- Проверьте, что все SQL скрипты выполнены
- Убедитесь, что пользователь залогинен

### "Failed to upload file"
- Проверьте, что bucket 'documents' создан
- Убедитесь, что Storage policies настроены

### "NextAuth error"
- Проверьте NEXTAUTH_SECRET
- Убедитесь, что NEXTAUTH_URL правильный

## Полезные ссылки

- [Supabase Dashboard](https://app.supabase.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Google Cloud Console](https://console.cloud.google.com)
- [OpenAI API Keys](https://platform.openai.com/api-keys)

## Следующие шаги

- [ ] Настройте email templates в Supabase
- [ ] Добавьте custom domain в Vercel
- [ ] Настройте мониторинг и аналитику
- [ ] Добавьте платежную систему
- [ ] Настройте CI/CD
