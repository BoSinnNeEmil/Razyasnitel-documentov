# Настройка Supabase

## Шаги настройки

### 1. Создание проекта в Supabase

1. Перейдите на https://supabase.com
2. Нажмите "Start your project"
3. Войдите через GitHub или создайте аккаунт
4. Нажмите "New project"
5. Выберите организацию
6. Заполните:
   - **Name**: document-explainer
   - **Database Password**: создайте надежный пароль
   - **Region**: выберите ближайший регион
7. Нажмите "Create new project"

### 2. Получение ключей доступа

После создания проекта:

1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (например: `https://abcdefgh.supabase.co`)
   - **anon public** ключ
   - **service_role** ключ (секретный)

### 3. Настройка базы данных

1. Перейдите в **SQL Editor**
2. Создайте новый запрос
3. Скопируйте содержимое файла `backend/sql/init.sql`
4. Выполните запрос (нажмите "Run")

### 4. Настройка переменных окружения

Обновите файл `.env`:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[ваш-пароль]@db.[project-ref].supabase.co:5432/postgres"
SUPABASE_URL="https://[project-ref].supabase.co"
SUPABASE_ANON_KEY="ваш-anon-ключ"
SUPABASE_SERVICE_ROLE_KEY="ваш-service-role-ключ"
```

Замените:
- `[ваш-пароль]` - пароль базы данных
- `[project-ref]` - идентификатор проекта (из URL)
- `ваш-anon-ключ` - anon public ключ
- `ваш-service-role-ключ` - service role ключ

### 5. Настройка Storage (для файлов)

1. Перейдите в **Storage**
2. Создайте новый bucket с именем `documents`
3. Настройте политики доступа (уже включены в SQL скрипт)

### 6. Проверка подключения

Запустите сервер и проверьте endpoint:
```bash
curl http://localhost:4000/health
```

Должен вернуть:
```json
{
  "status": "ok",
  "database": "connected"
}
```

## Структура таблиц

### users
- `id` (UUID, PK)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR)
- `name` (VARCHAR, nullable)
- `created_at`, `updated_at` (TIMESTAMP)

### documents
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `file_name` (VARCHAR)
- `file_size` (INTEGER)
- `file_type` (VARCHAR)
- `file_url` (TEXT)
- `status` (ENUM: processing, completed, failed)
- `extracted_text` (TEXT, nullable)
- `analysis` (JSONB, nullable)
- `created_at`, `updated_at` (TIMESTAMP)

### subscriptions
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id, UNIQUE)
- `plan` (ENUM: free, basic, pro, business)
- `status` (ENUM: active, cancelled, expired)
- `start_date`, `end_date` (TIMESTAMP)
- `created_at`, `updated_at` (TIMESTAMP)

## Безопасность

- Включен Row Level Security (RLS)
- Пользователи видят только свои данные
- Service Role ключ используется только на сервере
- Anon ключ для публичных операций (регистрация)

## Troubleshooting

**Ошибка подключения:**
- Проверьте правильность URL и ключей
- Убедитесь, что проект активен в Supabase

**Ошибки SQL:**
- Проверьте, что все таблицы созданы
- Убедитесь, что RLS политики применены

**Ошибки аутентификации:**
- Проверьте JWT_SECRET в .env
- Убедитесь, что используете правильный ключ