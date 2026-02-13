# Миграция на Supabase

Это руководство поможет вам мигрировать проект на новый стек с Supabase.

## Шаг 1: Создание проекта Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Сохраните следующие данные:
   - Project URL
   - Anon (public) key
   - Service role key

## Шаг 2: Настройка базы данных

1. Откройте SQL Editor в Supabase Dashboard
2. Выполните скрипт `supabase/schema.sql`
3. Выполните скрипт `supabase/functions.sql`

## Шаг 3: Настройка Storage

1. Перейдите в раздел Storage в Supabase Dashboard
2. Создайте новый bucket с именем `documents`
3. Настройте политики доступа:

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

## Шаг 4: Настройка Authentication

1. Перейдите в раздел Authentication в Supabase Dashboard
2. Включите Email provider
3. Настройте Google OAuth:
   - Перейдите в Google Cloud Console
   - Создайте OAuth 2.0 credentials
   - Добавьте redirect URI: `https://your-project.supabase.co/auth/v1/callback`
   - Скопируйте Client ID и Client Secret
   - Добавьте их в Supabase Dashboard

## Шаг 5: Переменные окружения

Создайте файл `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

OPENAI_API_KEY=your-openai-api-key
```

Для генерации NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Шаг 6: Установка зависимостей

```bash
cd frontend
npm install
```

## Шаг 7: Запуск проекта

```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:3000

## Шаг 8: Удаление старого бэкенда

После успешной миграции можно удалить:
- Папку `backend/`
- Файлы `docker-compose.yml`
- Обновить `package.json` в корне проекта

## Проверка миграции

1. Зарегистрируйте нового пользователя
2. Загрузите тестовый документ
3. Проверьте анализ документа
4. Убедитесь, что все данные сохраняются в Supabase

## Troubleshooting

### Ошибка "Invalid API key"
- Проверьте правильность NEXT_PUBLIC_SUPABASE_ANON_KEY
- Убедитесь, что файл .env.local находится в папке frontend/

### Ошибка "Row Level Security"
- Убедитесь, что все политики RLS созданы
- Проверьте, что пользователь аутентифицирован

### Ошибка загрузки файлов
- Проверьте, что bucket 'documents' создан
- Убедитесь, что политики Storage настроены правильно

## Дополнительные ресурсы

- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js Documentation](https://nextjs.org/docs)
