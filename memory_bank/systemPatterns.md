# System Patterns

## Архитектура
- **Фреймворк:** Next.js 14 (App Router)
- **База данных:** Supabase (PostgreSQL)
- **Аутентификация:** NextAuth.js
- **AI:** OpenAI GPT-4 через Hugging Face Router
- **Хостинг:** Vercel

## Ключевые паттерны

### Frontend
- Компонентный подход (React)
- UI библиотека: shadcn/ui
- Стилизация: Tailwind CSS
- State management: React hooks + Context

### Backend
- API Routes (Next.js)
- RESTful архитектура
- Row Level Security (Supabase)

### Интеграции
- OpenAI API для AI анализа
- pdf-parse для PDF документов
- mammoth для DOCX документов
- jsPDF для экспорта в PDF

## Связи подсистем
```
User → Next.js Frontend → API Routes → Supabase (DB + Storage)
                                    ↓
                              OpenAI API (Analysis)
```

## Модули
- `src/app/` - Страницы и API routes
- `src/components/` - React компоненты
- `src/lib/` - Утилиты и конфигурация
- `src/hooks/` - Custom hooks
- `supabase/` - SQL схемы и функции
