export type User = {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  analysesCount: number;
};

export type AnalysisResult = {
  id: string;
  query: string;
  score: number;
  summary: string;
  insights: string[];
  chartData: { name: string; value: number }[];
  createdAt: string;
};
