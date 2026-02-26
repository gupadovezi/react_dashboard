import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../services/ai';
import { AnalysisResult } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { History as HistoryIcon, ArrowRight, Calendar } from 'lucide-react';

export function History() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analysis History</h1>
        <p className="mt-2 text-slate-500">Review your past analyses and insights.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HistoryIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Recent Analyses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <HistoryIcon className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No history yet</h3>
              <p className="text-slate-500 mb-6">You haven't performed any analyses yet.</p>
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/analysis/${item.id}`, { state: { result: item } })}
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium text-slate-900 truncate mb-1">
                      {item.query}
                    </p>
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.createdAt).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      Score: <span className="font-semibold text-indigo-600 ml-1">{item.score}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
