# Инструкция по настройке проекта

## Что нужно сделать ДО запуска

### 1. Hugging Face токен (для AI)

1. Зайди на https://huggingface.co/settings/tokens
2. Нажми "New token"
3. Дай имя (например "document-explainer")
4. Выбери тип "Read"
5. Создай токен
6. Скопируй токен (начинается с `hf_`)
7. Открой файл `.env.local` в корне проекта
8. Замени `your-huggingface-token` на свой токен:
   ```
   OPENAI_API_KEY=hf_твой_токен_здесь
   ```

### 2. Supabase проект

1. Зайди на https://supabase.com
2. Создай новый проект (кнопка "New project")
3. Дождись полной инициализации (зеленый статус)
4. Перейди в Settings → API
5. Скопируй:
   - Project URL
   - anon public key
6. Открой `.env.local` и замени:
   ```
   NEXT_PUBLIC_SUPABASE_URL=твой_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=твой_ключ
   ```

### 3. Supabase база данных

1. В Supabase Dashboard открой SQL Editor
2. Открой файл `supabase/schema.sql` из проекта
3. Скопируй весь код и выполни в SQL Editor
4. Открой файл `supabase/functions.sql`
5. Скопируй весь код и выполни в SQL Editor

### 4. Supabase Storage

1. В Supabase Dashboard открой Storage
2. Создай новый bucket с именем `documents`
3. Сделай его приватным (не public)

### 5. NextAuth Secret

1. Открой PowerShell
2. Выполни команду:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. Скопируй результат
4. Открой `.env.local` и замени:
   ```
   NEXTAUTH_SECRET=твой_сгенерированный_секрет
   ```

### 6. Google OAuth (ОПЦИОНАЛЬНО)

Если хочешь вход через Google:

1. Зайди на https://console.cloud.google.com
2. Создай проект
3. Включи Google+ API
4. Создай OAuth 2.0 credentials
5. Добавь redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Скопируй Client ID и Client Secret
7. Добавь в `.env.local`:
   ```
   GOOGLE_CLIENT_ID=твой_client_id
   GOOGLE_CLIENT_SECRET=твой_client_secret
   ```

## Запуск проекта

После того как заполнил `.env.local`:

```powershell
# Установи зависимости (если еще не делал)
npm install

# Запусти dev сервер
npm run dev
```

Открой http://localhost:3000

## Проверка что всё работает

1. Открылась главная страница ✅
2. Можешь зарегистрироваться ✅
3. Можешь загрузить документ ✅
4. Анализ документа работает ✅

## Если что-то не работает

### Ошибка "Supabase client error"
- Проверь правильность URL и ключа в `.env.local`
- Проверь что выполнил оба SQL скрипта

### Ошибка "AI analysis failed"
- Проверь что добавил HF токен в `.env.local`
- Проверь что токен начинается с `hf_`
- Проверь что токен не отозван на huggingface.co

### Ошибка "NextAuth configuration error"
- Проверь что сгенерировал NEXTAUTH_SECRET
- Перезапусти dev сервер

### Ошибка при загрузке файла
- Проверь что создал bucket `documents` в Supabase Storage
- Проверь что bucket приватный

## Что дальше

После успешного запуска можешь:
- Протестировать загрузку разных документов (PDF, DOCX, TXT)
- Попробовать разные стили анализа
- Посмотреть историю документов в дашборде
- Экспортировать результаты в PDF

## Полезные ссылки

- Supabase Dashboard: https://app.supabase.com
- Hugging Face Tokens: https://huggingface.co/settings/tokens
- Google Cloud Console: https://console.cloud.google.com

## Стоимость

- Hugging Face: бесплатно
- Supabase Free tier: 500 MB БД, 1 GB storage (достаточно для старта)
- Vercel Hobby: бесплатно

**Итого: 0₽ для разработки и тестирования**
