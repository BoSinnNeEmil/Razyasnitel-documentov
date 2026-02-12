# Инструкция по настройке проекта

## Требования

- Node.js 18+ 
- Docker и Docker Compose (для локальной БД)
- Git

## Шаги установки

### 1. Клонирование репозитория

```bash
git clone <your-repo-url>
cd document-explainer
```

### 2. Установка зависимостей

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 3. Запуск инфраструктуры

Запустите PostgreSQL, Redis и MinIO через Docker:

```bash
docker-compose up -d
```

Проверьте, что контейнеры запущены:

```bash
docker-compose ps
```

### 4. Настройка переменных окружения

Скопируйте файл с примером:

```bash
copy .env.example .env
```

Отредактируйте `.env` и добавьте:
- OpenAI API ключ
- Другие необходимые ключи

### 5. Настройка базы данных

```bash
cd backend
npm run db:push
```

### 6. Запуск проекта

Из корневой директории:

```bash
npm run dev
```

Это запустит:
- Frontend на http://localhost:3000
- Backend на http://localhost:4000

## Полезные команды

### База данных
- `npm run db:studio` - открыть Prisma Studio
- `npm run db:migrate` - создать миграцию
- `npm run db:push` - применить схему к БД

### Разработка
- `npm run dev` - запуск в dev режиме
- `npm run build` - сборка проекта
- `npm run lint` - проверка кода

### Docker
- `docker-compose up -d` - запустить контейнеры
- `docker-compose down` - остановить контейнеры
- `docker-compose logs -f` - просмотр логов

## Доступ к сервисам

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Prisma Studio: http://localhost:5555 (после `npm run db:studio`)
- MinIO Console: http://localhost:9001 (minioadmin/minioadmin)
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Следующие шаги

1. Добавьте OpenAI API ключ в `.env`
2. Начните разработку с создания компонентов загрузки файлов
3. Реализуйте API endpoints для обработки документов

## Troubleshooting

**Проблема:** Порты уже заняты  
**Решение:** Измените порты в `docker-compose.yml` или остановите конфликтующие сервисы

**Проблема:** Ошибка подключения к БД  
**Решение:** Проверьте, что Docker контейнеры запущены: `docker-compose ps`

**Проблема:** Ошибки TypeScript  
**Решение:** Убедитесь, что установлены все зависимости: `npm run install:all`
