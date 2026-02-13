# Структура проекта

Проект представляет собой единое Next.js приложение с Supabase в качестве backend.

## Корневая структура

```
document-explainer/
├── src/                      # Исходный код приложения
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes (серверные эндпоинты)
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   └── documents/    # API для работы с документами
│   │   ├── auth/             # Страницы аутентификации
│   │   │   ├── signin/       # Вход
│   │   │   └── signup/       # Регистрация
│   │   ├── dashboard/        # Главная страница после входа
│   │   ├── documents/        # Страницы просмотра документов
│   │   │   └── [id]/         # Динамический роут для документа
│   │   ├── globals.css       # Глобальные стили
│   │   ├── layout.tsx        # Корневой layout
│   │   └── page.tsx          # Главная страница (лендинг)
│   ├── components/           # React компоненты
│   │   ├── ui/               # shadcn/ui компоненты
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── toast.tsx
│   │   ├── providers.tsx     # React Query и NextAuth провайдеры
│   │   └── upload-zone.tsx   # Компонент загрузки файлов
│   ├── lib/                  # Утилиты и конфигурация
│   │   ├── auth.ts           # NextAuth конфигурация
│   │   ├── supabase.ts       # Supabase клиент и типы
│   │   └── utils.ts          # Вспомогательные функции
│   ├── hooks/                # Custom React hooks
│   │   └── use-toast.ts      # Hook для toast уведомлений
│   └── types/                # TypeScript типы
│       └── next-auth.d.ts    # Расширение типов NextAuth
├── public/                   # Статические файлы
├── supabase/                 # Supabase конфигурация
│   ├── schema.sql            # Схема базы данных
│   └── functions.sql         # SQL функции и триггеры
├── docs/                     # Документация
│   ├── SUPABASE_MIGRATION.md
│   └── SETUP.md
├── .env.local.example        # Пример переменных окружения
├── .gitignore
├── next.config.js            # Next.js конфигурация
├── package.json              # Зависимости проекта
├── postcss.config.js         # PostCSS конфигурация
├── tailwind.config.js        # Tailwind CSS конфигурация
├── tsconfig.json             # TypeScript конфигурация
├── vercel.json               # Vercel конфигурация
├── DEPLOYMENT.md             # Инструкции по деплою
├── QUICKSTART_NEW.md         # Быстрый старт
└── README.md                 # Основная документация
```

## Ключевые файлы

### Конфигурация

- `next.config.js` - настройки Next.js
- `tailwind.config.js` - настройки Tailwind CSS (включая shadcn/ui)
- `tsconfig.json` - настройки TypeScript
- `vercel.json` - настройки деплоя на Vercel

### Supabase

- `supabase/schema.sql` - полная схема БД с таблицами, индексами, RLS политиками
- `supabase/functions.sql` - SQL функции и триггеры

### Аутентификация

- `src/lib/auth.ts` - конфигурация NextAuth (Google OAuth + Email)
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API route
- `src/middleware.ts` - защита приватных роутов

### API Routes

- `src/app/api/documents/upload/route.ts` - загрузка документов
- `src/app/api/documents/[id]/analyze/route.ts` - анализ документов с OpenAI

## Почему такая структура?

### Нет разделения на frontend/backend
- Supabase заменяет традиционный backend
- Next.js API routes для серверной логики
- Всё в одном репозитории и проекте

### Преимущества

1. **Простота** - один проект, одна команда для запуска
2. **Типобезопасность** - общие типы между клиентом и сервером
3. **Быстрый деплой** - одна команда `vercel deploy`
4. **Автоматическое масштабирование** - Vercel + Supabase
5. **Меньше кода** - нет дублирования логики

### Как это работает

```
Пользователь
    ↓
Next.js (Vercel)
    ↓
├─→ Static Pages (SSG)
├─→ Server Components (SSR)
├─→ API Routes (Serverless Functions)
│   ↓
│   ├─→ Supabase (Database + Auth + Storage)
│   └─→ OpenAI API (AI анализ)
└─→ Client Components (React)
```

## Workflow разработки

1. **Локальная разработка**
   ```bash
   npm run dev
   ```

2. **Изменение схемы БД**
   - Редактируйте `supabase/schema.sql`
   - Выполните в Supabase SQL Editor

3. **Добавление новой страницы**
   - Создайте файл в `src/app/`
   - Next.js автоматически создаст роут

4. **Добавление API endpoint**
   - Создайте `route.ts` в `src/app/api/`
   - Экспортируйте GET, POST и т.д.

5. **Добавление UI компонента**
   ```bash
   npx shadcn-ui@latest add [component]
   ```

6. **Деплой**
   ```bash
   git push origin main
   # Vercel автоматически задеплоит
   ```

## Переменные окружения

Все переменные в одном файле `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI
OPENAI_API_KEY=
```

## Зависимости

### Основные
- `next` - фреймворк
- `react` - UI библиотека
- `@supabase/supabase-js` - Supabase клиент
- `next-auth` - аутентификация
- `openai` - OpenAI API

### UI
- `tailwindcss` - стили
- `@radix-ui/*` - headless UI компоненты
- `lucide-react` - иконки

### Утилиты
- `@tanstack/react-query` - управление состоянием сервера
- `react-dropzone` - загрузка файлов
- `zod` - валидация

## Следующие шаги

1. Добавить тесты (Jest + React Testing Library)
2. Настроить CI/CD (GitHub Actions)
3. Добавить мониторинг (Sentry)
4. Оптимизировать производительность
5. Добавить больше функций из PRD
