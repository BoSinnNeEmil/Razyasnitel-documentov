# Разъяснитель документов

AI-powered веб-приложение для анализа и упрощения сложных документов.

## Структура проекта

```
├── frontend/          # Next.js приложение
├── backend/           # Express API сервер
├── docs/              # Документация проекта
└── shared/            # Общие типы и утилиты
```

## Быстрый старт

### Требования
- Node.js 18+
- PostgreSQL 14+
- Redis (опционально для кэширования)

### Установка

1. Клонируйте репозиторий
```bash
git clone <repository-url>
cd document-explainer
```

2. Установите зависимости
```bash
npm install
```

3. Настройте переменные окружения
```bash
cp .env.example .env
# Отредактируйте .env файл
```

4. Запустите базу данных
```bash
npm run db:setup
```

5. Запустите проект
```bash
npm run dev
```

## Разработка

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка проекта
- `npm run test` - запуск тестов
- `npm run lint` - проверка кода

## Документация

- [Техническое задание](./TZ_Document_Explainer.md)
- [План разработки](./DEVELOPMENT_PLAN.md)
- [PRD](./PRD.md)

## Технологии

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL
- **AI:** OpenAI GPT-4
- **Storage:** AWS S3 / MinIO

## Лицензия

Proprietary
