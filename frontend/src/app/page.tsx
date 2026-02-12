import FileUpload from '@/components/FileUpload';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-primary">
              Разъяснитель документов
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Понимайте любой документ за 2 минуты вместо 2 часов
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Загрузите PDF, DOCX или TXT файл для анализа
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/register"
                className="bg-primary text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
              >
                Начать бесплатно
              </Link>
              <Link
                href="/auth/login"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium"
              >
                Войти
              </Link>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Попробуйте прямо сейчас
            </h2>
            <FileUpload />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-semibold mb-2">Простой язык</h3>
              <p className="text-sm text-gray-600">
                Переводим сложные документы на понятный язык
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-semibold mb-2">Выделяем риски</h3>
              <p className="text-sm text-gray-600">
                Находим важные моменты и потенциальные проблемы
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">Чек-лист действий</h3>
              <p className="text-sm text-gray-600">
                Даем конкретные рекомендации что делать дальше
              </p>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8">Тарифы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">0₽</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>3 документа в месяц</li>
                  <li>До 10 страниц</li>
                  <li>Базовый анализ</li>
                </ul>
              </div>
              <div className="bg-primary text-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Basic</h3>
                <p className="text-3xl font-bold mb-4">299₽</p>
                <ul className="text-sm space-y-2">
                  <li>20 документов в месяц</li>
                  <li>До 50 страниц</li>
                  <li>Все стили объяснения</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">799₽</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Безлимитные документы</li>
                  <li>Сравнение версий</li>
                  <li>API доступ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
