# Руководство по миграции

Проект был полностью переделан на новый технологический стек.

## Что изменилось

### Старый стек
- Backend: Express + Prisma + PostgreSQL
- Auth: JWT (собственная реализация)
- Frontend: Next.js + React Query + Zustand
- Deployment: Docker + VPS

### Новый стек
- Backend: Supabase (PostgreSQL + Auth + Storage)
- Auth: NextAuth.js
- Frontend: Next.js 14 + React Query + shadcn/ui
- Deployment: Vercel

## Преимущества нового стека

✅ Нет необходимости в отдельном backend сервере
✅ Встроенная аутентификация и авторизация
✅ Автоматическое масштабирование
✅ Бесплатный SSL и CDN
✅ Простой деплой одной командой
✅ Row Level Security из коробки
✅ Готовые UI компоненты (shadcn/ui)
✅ Меньше кода для поддержки

## Структура проекта

### Удалено
- `backend/` - весь Express сервер
- `shared/` - общие типы (теперь в frontend)
- `docker-compose.yml` - больше не нужен
- Prisma конфигурация

### Добавлено
- `supabase/` - SQL схемы и функции
- `frontend/src/lib/` - утилиты для Supabase и NextAuth
- `frontend/src/app/api/` - Next.js API routes
- `frontend/src/components/ui/` - shadcn/ui компоненты
- `DEPLOYMENT.md` - инструкции по деплою
- `QUICKSTART_NEW.md` - быстрый старт

## Миграция данных

Если у вас есть существующие данные в старой БД:

1. Экспортируйте данные из PostgreSQL:
```bash
pg_dump -h localhost -U postgres -d document_explainer > backup.sql
```

2. Адаптируйте схему под Supabase (см. `supabase/schema.sql`)

3. Импортируйте в Supabase через SQL Editor

## API изменения

### Старый способ (Express)
```typescript
// backend/src/routes/documents.ts
router.post('/upload', upload.single('file'), async (req, res) => {
  // ...
});
```

### Новый способ (Next.js API Routes)
```typescript
// frontend/src/app/api/documents/upload/route.ts
export async function POST(request: NextRequest) {
  // ...
}
```

### Старый способ (Prisma)
```typescript
const document = await prisma.document.create({
  data: { ... }
});
```

### Новый способ (Supabase)
```typescript
const { data: document } = await supabase
  .from('documents')
  .insert({ ... })
  .select()
  .single();
```

## Аутентификация

### Старый способ (JWT)
```typescript
const token = jwt.sign({ userId }, SECRET);
res.cookie('token', token);
```

### Новый способ (NextAuth)
```typescript
import { getServerSession } from 'next-auth';
const session = await getServerSession(authOptions);
```

## Хранение файлов

### Старый способ (локальная файловая система)
```typescript
const filePath = path.join(__dirname, 'uploads', filename);
fs.writeFileSync(filePath, buffer);
```

### Новый способ (Supabase Storage)
```typescript
const { data } = await supabase.storage
  .from('documents')
  .upload(fileName, file);
```

## Шаги миграции

1. **Создайте Supabase проект**
   ```bash
   # Перейдите на supabase.com и создайте проект
   ```

2. **Выполните SQL миграции**
   ```sql
   -- В Supabase SQL Editor выполните:
   -- 1. supabase/schema.sql
   -- 2. supabase/functions.sql
   ```

3. **Настройте Storage**
   - Создайте bucket 'documents'
   - Настройте policies (см. QUICKSTART_NEW.md)

4. **Установите зависимости**
   ```bash
   cd frontend
   npm install
   ```

5. **Настройте переменные окружения**
   ```bash
   cp frontend/.env.local.example frontend/.env.local
   # Заполните значения
   ```

6. **Запустите проект**
   ```bash
   npm run dev
   ```

7. **Протестируйте функционал**
   - Регистрация/вход
   - Загрузка документа
   - Анализ документа
   - Просмотр истории

8. **Деплой на Vercel**
   - Подключите репозиторий
   - Настройте переменные окружения
   - Deploy!

## Что делать со старым кодом

### Опция 1: Удалить (рекомендуется)
```bash
rm -rf backend/
rm -rf shared/
rm docker-compose.yml
```

### Опция 2: Сохранить в отдельной ветке
```bash
git checkout -b old-stack
git add backend/ shared/ docker-compose.yml
git commit -m "Archive old stack"
git checkout main
git rm -rf backend/ shared/ docker-compose.yml
git commit -m "Remove old stack"
```

## Проверочный список

- [ ] Supabase проект создан
- [ ] SQL схемы выполнены
- [ ] Storage bucket создан
- [ ] Storage policies настроены
- [ ] Google OAuth настроен (опционально)
- [ ] Переменные окружения заполнены
- [ ] Проект запускается локально
- [ ] Регистрация работает
- [ ] Загрузка документов работает
- [ ] Анализ работает
- [ ] Проект задеплоен на Vercel

## Поддержка

Если возникли проблемы:
1. Проверьте QUICKSTART_NEW.md
2. Проверьте DEPLOYMENT.md
3. Проверьте docs/SUPABASE_MIGRATION.md
4. Проверьте логи в Supabase Dashboard
5. Проверьте логи в Vercel Dashboard

## Полезные команды

```bash
# Локальная разработка
npm run dev

# Сборка
npm run build

# Проверка типов
npx tsc --noEmit

# Линтинг
npm run lint

# Деплой на Vercel
vercel --prod
```

## Следующие шаги

После успешной миграции:
1. Настройте мониторинг (Sentry, LogRocket)
2. Добавьте аналитику (Google Analytics, Mixpanel)
3. Настройте email уведомления
4. Добавьте платежную систему
5. Оптимизируйте производительность
6. Настройте CI/CD
7. Добавьте тесты

## Стоимость

### Supabase
- Free tier: 500 MB database, 1 GB storage
- Pro: $25/месяц - 8 GB database, 100 GB storage

### Vercel
- Hobby: бесплатно для личных проектов
- Pro: $20/месяц для коммерческих

### OpenAI
- Pay-as-you-go: ~$0.01-0.03 за документ

**Итого:** ~$45-50/месяц для старта
