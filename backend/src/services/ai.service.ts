import OpenAI from 'openai';

class AIService {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = new OpenAI({
      baseURL: process.env.AI_BASE_URL || 'https://router.huggingface.co/v1',
      apiKey: process.env.HF_TOKEN,
    });
    this.model = process.env.AI_MODEL || 'openai/gpt-oss-120b:groq';
  }

  async analyzeDocument(text: string): Promise<any> {
    try {
      const prompt = this.buildAnalysisPrompt(text);
      
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'Ты эксперт по анализу документов. Твоя задача - объяснить сложные документы простым языком, выделить риски, обязательства и дать практические рекомендации.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const response = completion.choices[0].message.content;
      return this.parseAnalysisResponse(response);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('Ошибка при анализе документа');
    }
  }

  private buildAnalysisPrompt(text: string): string {
    return `
Проанализируй следующий документ и предоставь структурированный анализ:

ДОКУМЕНТ:
${text.substring(0, 8000)} ${text.length > 8000 ? '...' : ''}

Предоставь анализ в следующем формате JSON:

{
  "summary": "Краткое резюме документа (3-5 предложений)",
  "keyPoints": ["Ключевой пункт 1", "Ключевой пункт 2", ...],
  "risks": [
    {
      "title": "Название риска",
      "description": "Описание риска",
      "severity": "low|medium|high"
    }
  ],
  "obligations": [
    {
      "title": "Название обязательства",
      "description": "Описание обязательства",
      "deadline": "Срок (если есть)"
    }
  ],
  "checklist": [
    {
      "title": "Действие",
      "priority": "urgent|important|optional"
    }
  ]
}

Отвечай ТОЛЬКО валидным JSON, без дополнительного текста.
`;
  }

  private parseAnalysisResponse(response: string | null): any {
    if (!response) {
      throw new Error('Пустой ответ от AI');
    }

    try {
      // Попытка извлечь JSON из ответа
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Если JSON не найден, возвращаем базовую структуру
      return {
        summary: response,
        keyPoints: [],
        risks: [],
        obligations: [],
        checklist: []
      };
    } catch (error) {
      console.error('Parse Error:', error);
      return {
        summary: response,
        keyPoints: [],
        risks: [],
        obligations: [],
        checklist: []
      };
    }
  }

  async answerQuestion(documentText: string, question: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'Ты помощник, который отвечает на вопросы по документам. Отвечай кратко и по существу.'
          },
          {
            role: 'user',
            content: `ДОКУМЕНТ:\n${documentText.substring(0, 6000)}\n\nВОПРОС: ${question}`
          }
        ],
        temperature: 0.5,
        max_tokens: 500,
      });

      return completion.choices[0].message.content || 'Не удалось получить ответ';
    } catch (error) {
      console.error('AI Question Error:', error);
      throw new Error('Ошибка при ответе на вопрос');
    }
  }
}

export default new AIService();
