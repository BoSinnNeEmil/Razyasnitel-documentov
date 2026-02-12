'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-primary">
              Разъяснитель документов
            </h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Дашборд
                </Link>
                <Link
                  href="/documents"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Документы
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Войти
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}