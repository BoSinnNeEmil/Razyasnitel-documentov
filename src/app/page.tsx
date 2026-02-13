import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Shield, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Понимайте любой документ за 2 минуты
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          AI-powered платформа для анализа и упрощения сложных документов. 
          Договоры, медицинские заключения, технические документы — всё становится понятным.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg">Попробовать бесплатно</Button>
          </Link>
          <Link href="/auth/signin">
            <Button size="lg" variant="outline">Войти</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Простой язык</h3>
            <p className="text-muted-foreground">
              Переводим сложные термины на понятный язык
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Быстрый анализ</h3>
            <p className="text-muted-foreground">
              Результаты за 30 секунд вместо часов чтения
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Выявление рисков</h3>
            <p className="text-muted-foreground">
              Находим скрытые риски и обязательства
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Командная работа</h3>
            <p className="text-muted-foreground">
              Совместный анализ документов с коллегами
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Тарифы</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="border rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">0₽</p>
            <ul className="space-y-2 mb-6">
              <li>✓ 3 документа/месяц</li>
              <li>✓ До 10 страниц</li>
              <li>✓ Базовый анализ</li>
            </ul>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">Начать</Button>
            </Link>
          </div>

          <div className="border-2 border-primary rounded-lg p-6 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
              Популярный
            </div>
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <p className="text-3xl font-bold mb-4">299₽<span className="text-sm">/мес</span></p>
            <ul className="space-y-2 mb-6">
              <li>✓ 20 документов/месяц</li>
              <li>✓ До 50 страниц</li>
              <li>✓ Все стили объяснения</li>
              <li>✓ Экспорт PDF/DOCX</li>
            </ul>
            <Link href="/auth/signup">
              <Button className="w-full">Выбрать</Button>
            </Link>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">799₽<span className="text-sm">/мес</span></p>
            <ul className="space-y-2 mb-6">
              <li>✓ Безлимитные документы</li>
              <li>✓ Без ограничений</li>
              <li>✓ Сравнение версий</li>
              <li>✓ API доступ</li>
            </ul>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">Выбрать</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
