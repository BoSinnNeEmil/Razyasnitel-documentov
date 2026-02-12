export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-4 text-primary">
          Разъяснитель документов
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Понимайте любой документ за 2 минуты вместо 2 часов
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-dashed border-gray-300">
          <p className="text-gray-500">
            Загрузите документ для анализа
          </p>
          <p className="text-sm text-gray-400 mt-2">
            (функционал в разработке)
          </p>
        </div>
      </div>
    </main>
  )
}
