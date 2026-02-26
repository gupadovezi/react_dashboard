import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeData = async (query: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following query or data and provide a structured response.
    Query: "${query}"
    
    Provide a score (0-100) representing the overall sentiment, success probability, or quality.
    Provide a short summary.
    Provide 3-5 key actionable insights.
    Provide data for a chart with 4-6 data points (name and value 0-100) relevant to the analysis.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: 'Score from 0 to 100' },
          summary: { type: Type.STRING, description: 'A brief summary of the analysis' },
          insights: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Key actionable insights',
          },
          chartData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: 'Label for the data point' },
                value: { type: Type.NUMBER, description: 'Value from 0 to 100' },
              },
              required: ['name', 'value'],
            },
            description: 'Data points for visualization',
          },
        },
        required: ['score', 'summary', 'insights', 'chartData'],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error('No response from AI');

  const parsed = JSON.parse(text);

  const result: AnalysisResult = {
    id: Math.random().toString(36).substring(2, 9),
    query,
    score: parsed.score,
    summary: parsed.summary,
    insights: parsed.insights,
    chartData: parsed.chartData,
    createdAt: new Date().toISOString(),
  };

  const history = JSON.parse(localStorage.getItem('analysis_history') || '[]');
  history.unshift(result);
  localStorage.setItem('analysis_history', JSON.stringify(history));

  return result;
};

export const getHistory = (): AnalysisResult[] => {
  return JSON.parse(localStorage.getItem('analysis_history') || '[]');
};
