import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { getHistory } from '../services/ai';
import { AnalysisResult } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Lock, Download, Share2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'motion/react';

export function Analysis() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
    } else {
      const history = getHistory();
      const found = history.find((item) => item.id === id);
      if (found) {
        setResult(found);
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, location.state, navigate]);

  if (!result) return null;

  const isPro = user?.plan === 'pro';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Analysis Result</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed">{result.summary}</p>
            <div className="mt-6">
              <h4 className="font-semibold text-slate-900 mb-3">Key Insights</h4>
              <ul className="space-y-2">
                {result.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-600">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
          <CardHeader>
            <CardTitle className="text-indigo-50">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-indigo-400/30">
              <span className="text-6xl font-extrabold tracking-tighter">{result.score}</span>
            </div>
            <p className="mt-6 text-indigo-100 text-center font-medium">
              Based on AI sentiment and quality analysis
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Data Visualization</CardTitle>
          {!isPro && (
            <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold">
              <Lock className="h-3 w-3 mr-1" />
              Pro Feature
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isPro ? (
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="relative h-80 w-full mt-4 bg-slate-50 rounded-xl flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 blur-sm pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.chartData}>
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={4} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="relative z-10 text-center max-w-sm px-4">
                <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
                  <Lock className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Charts Locked</h3>
                <p className="text-slate-500 mb-6 text-sm">
                  Upgrade to Pro to unlock interactive visualizations, trend analysis, and export capabilities.
                </p>
                <Button onClick={() => navigate('/pricing')}>Upgrade to Pro</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-slate-500 uppercase tracking-wider">Original Query</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-4 rounded-xl text-slate-700 font-mono text-sm whitespace-pre-wrap">
            {result.query}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
