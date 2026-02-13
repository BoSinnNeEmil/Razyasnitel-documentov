'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Выберите файл');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при загрузке');
      }

      setResult(data.document);
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке файла');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
        <div className="flex flex-col items-center">
          <Upload className="w-16 h-16 text-gray-400 mb-4" />
          
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            id="file-upload"
          />
          
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            Выбрать файл
          </label>

          {file && (
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Выбран файл:</p>
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} МБ
              </p>
            </div>
          )}

          {file && !loading && !result && (
            <button
              onClick={handleUpload}
              className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Анализировать документ
            </button>
          )}

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-gray-600">Анализируем документ...</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Результаты анализа</h2>
          
          {result.analysis.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Краткое резюме</h3>
              <p className="text-gray-700">{result.analysis.summary}</p>
            </div>
          )}

          {result.analysis.keyPoints && result.analysis.keyPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ключевые пункты</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.analysis.keyPoints.map((point: string, idx: number) => (
                  <li key={idx} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {result.analysis.risks && result.analysis.risks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Риски</h3>
              <div className="space-y-3">
                {result.analysis.risks.map((risk: any, idx: number) => (
                  <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                    risk.severity === 'high' ? 'bg-red-50 border-red-500' :
                    risk.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <h4 className="font-medium">{risk.title}</h4>
                    <p className="text-sm text-gray-600">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.analysis.obligations && result.analysis.obligations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ваши обязательства</h3>
              <div className="space-y-3">
                {result.analysis.obligations.map((obl: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">{obl.title}</h4>
                    <p className="text-sm text-gray-600">{obl.description}</p>
                    {obl.deadline && (
                      <p className="text-xs text-gray-500 mt-1">Срок: {obl.deadline}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.analysis.checklist && result.analysis.checklist.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Чек-лист действий</h3>
              <div className="space-y-2">
                {result.analysis.checklist.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="mr-3" />
                    <span className="flex-1">{item.title}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      item.priority === 'important' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.priority === 'urgent' ? 'Срочно' :
                       item.priority === 'important' ? 'Важно' : 'Опционально'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
