# Tech Context

## Стек технологий

### Frontend
- **Фреймворк:** Next.js 14
- **Язык:** TypeScript
- **UI:** shadcn/ui + Tailwind CSS
- **State:** React hooks

### Backend
- **Runtime:** Node.js
- **Database:** Supabase (PostgreSQL)
- **Auth:** NextAuth.js
- **Storage:** Supabase Storage

### AI
- **Провайдер:** Hugging Face Router
- **Модель:** openai/gpt-oss-120b:groq

## Окружение

### Переменные окружения (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXTAUTH_URL
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
OPENAI_API_KEY
```

### Ограничения
- Максимальный размер файла: 10 МБ (Free), 50 МБ (Pro)
- Максимальная длина документа: 500 страниц
- Длинные документы (>10000 символов) обрезаются для AI

## CI/CD
- **Хостинг:** Vercel
- **Деплой:** Автоматический при push в main

## Пакетный менеджер
- bun (согласно AGENTS.md)

## Линтинг
- Biome (для TypeScript/JavaScript файлов)
