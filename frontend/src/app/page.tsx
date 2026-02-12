import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Разъяснитель документов
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Понимайте любой документ за 2 минуты вместо 2 часов
          </p>
          <p className="text-sm text-gray-500">
            Загрузите PDF, DOCX или TXT файл для анализа
          </p>
        </div>

        <FileUpload />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </main>
  );
}
