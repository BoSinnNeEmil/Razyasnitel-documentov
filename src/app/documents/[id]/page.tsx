'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Download, MessageSquare, AlertTriangle, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function DocumentPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);
  const [question, setQuestion] = useState('');
  const [style, setStyle] = useState<'formal' | 'friendly' | 'expert'>('friendly');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const { data: document, refetch: refetchDocument } = useQuery({
    queryKey: ['document', params.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session,
  });

  const { data: analysis, refetch: refetchAnalysis } = useQuery({
    queryKey: ['analysis', params.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('document_id', params.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!session && document?.status === 'completed',
  });

  const analyzeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/documents/${params.id}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      return response.json();
    },
    onSuccess: () => {
      refetchDocument();
      refetchAnalysis();
    },
  });

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await analyzeMutation.mutateAsync();
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Ошибка анализа документа');
    } finally {
      setAnalyzing(false);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!session || !document) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к документам
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{document.title}</h1>
            <p className="text-muted-foreground">{document.original_filename}</p>
          </div>

          {document.status === 'processing' && !analysis && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Документ готов к анализу</h3>
                    <p className="text-sm text-muted-foreground">
                      Выберите стиль объяснения и начните анализ
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value as any)}
                      className="border rounded-md px-3 py-2"
                    >
                      <option value="friendly">Дружелюбный</option>
                      <option value="formal">Формальный</option>
                      <option value="expert">Экспертный</option>
                    </select>
                    <Button onClick={handleAnalyze} disabled={analyzing}>
                      {analyzing ? 'Анализ...' : 'Начать анализ'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {analysis && (
            <Tabs defaultValue="summary" className="space-y-6">
              <TabsList>
                <TabsTrigger value="summary">Резюме</TabsTrigger>
                <TabsTrigger value="risks">Риски</TabsTrigger>
                <TabsTrigger value="obligations">Обязательства</TabsTrigger>
                <TabsTrigger value="checklist">Чек-лист</TabsTrigger>
                <TabsTrigger value="chat">Вопросы</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Краткое резюме</CardTitle>
                    <CardDescription>Основная суть документа простым языком</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{analysis.summary}</p>
                      {analysis.key_points && (
                        <div className="mt-6">
                          <h3 className="font-semibold mb-3">Ключевые пункты:</h3>
                          <ul className="space-y-2">
                            {Array.isArray(analysis.key_points) ? (
                              analysis.key_points.map((point: string, i: number) => (
                                <li key={i}>{point}</li>
                              ))
                            ) : (
                              <li>{JSON.stringify(analysis.key_points)}</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risks">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Риски и предупреждения
                    </CardTitle>
                    <CardDescription>Важные моменты, требующие внимания</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.risks && Array.isArray(analysis.risks) ? (
                        analysis.risks.map((risk: any, i: number) => (
                          <div key={i} className="border-l-4 border-destructive pl-4 py-2">
                            <p className="font-medium">{risk.title || risk}</p>
                            {risk.description && (
                              <p className="text-sm text-muted-foreground mt-1">{risk.description}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>Риски не обнаружены</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="obligations">
                <Card>
                  <CardHeader>
                    <CardTitle>Ваши обязательства</CardTitle>
                    <CardDescription>Что вы должны делать согласно документу</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.obligations && Array.isArray(analysis.obligations) ? (
                        analysis.obligations.map((obligation: any, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                            <p>{obligation.title || obligation}</p>
                          </div>
                        ))
                      ) : (
                        <p>Обязательства не найдены</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="checklist">
                <Card>
                  <CardHeader>
                    <CardTitle>Чек-лист действий</CardTitle>
                    <CardDescription>Что делать дальше</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.checklist && Array.isArray(analysis.checklist) ? (
                        analysis.checklist.map((item: any, i: number) => (
                          <label key={i} className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1" />
                            <span>{item.title || item}</span>
                          </label>
                        ))
                      ) : (
                        <p>Чек-лист не создан</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Задайте вопрос по документу
                    </CardTitle>
                    <CardDescription>Получите ответы на конкретные вопросы</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Например: Какой срок действия договора?"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Button>Спросить</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Функция чата будет доступна в следующей версии
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <div className="mt-6 flex gap-4">
            <Button 
              variant="outline"
              onClick={() => window.open(`/api/documents/${params.id}/export`, '_blank')}
              disabled={!analysis}
            >
              <Download className="w-4 h-4 mr-2" />
              Экспорт PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
