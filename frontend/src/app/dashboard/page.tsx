'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Разъяснитель документов
              </h1>
              <p className="text-sm text-gray-600">
                Добро пожаловать, {user?.name || user?.email}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Анализ документов
          </h2>
          <p className="text-lg text-gray-600">
            Загрузите документ для получения понятного анализа
          </p>
        </div>

        <FileUpload />

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <div className="text-gray-600">Документов проанализировано</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">∞</div>
            <div className="text-gray-600">Время сэкономлено</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">Free</div>
            <div className="text-gray-600">Текущий тариф</div>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Последние документы
          </h3>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 text-center text-gray-500">
              <p>Пока нет загруженных документов</p>
              <p className="text-sm mt-2">
                Загрузите первый документ для анализа
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}