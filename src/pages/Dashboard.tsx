import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { analyzeData } from '../services/ai';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const { user, incrementAnalyses } = useAuth();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (user?.plan === 'free' && user.analysesCount >= 5) {
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeData(query);
      incrementAnalyses();
      navigate(`/analysis/${result.id}`, { state: { result } });
    } catch (error) {
      console.error(error);
      alert('Failed to analyze data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}</h1>
        <p className="mt-2 text-slate-500">What would you like to analyze today?</p>
      </div>

      <Card className="border-indigo-100 shadow-md">
        <CardContent className="p-8">
          <form onSubmit={handleAnalyze} className="relative">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-indigo-100 p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <textarea
                  rows={4}
                  className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                  placeholder="Paste your text, data, or ask a question for AI analysis..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center pl-14">
              <div className="text-sm text-slate-500">
                {user?.plan === 'free' ? (
                  <span>{5 - (user?.analysesCount || 0)} free analyses remaining</span>
                ) : (
                  <span className="text-indigo-600 font-medium">Pro Plan Active</span>
                )}
              </div>
              <Button type="submit" disabled={!query.trim() || loading} className="pl-6 pr-4">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Data
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">You have performed {user?.analysesCount} analyses so far.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold capitalize text-slate-900">{user?.plan}</span>
              {user?.plan === 'free' && (
                <Button variant="outline" size="sm" onClick={() => navigate('/pricing')}>
                  Upgrade
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Try pasting customer feedback to get sentiment scores and actionable insights.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
