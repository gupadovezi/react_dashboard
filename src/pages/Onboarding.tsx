import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, BarChart3, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-slate-900">InsightAI</span>
        </div>
        <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Turn raw data into <span className="text-indigo-600">actionable insights</span>.
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            InsightAI uses advanced AI to analyze your queries, calculate success scores, and generate beautiful interactive charts in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/login')}>
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
        >
          <div className="bg-slate-50 rounded-2xl p-8 text-left">
            <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Analysis</h3>
            <p className="text-slate-500">Just type your question or paste your data. Our AI processes it instantly to give you a comprehensive breakdown.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 text-left">
            <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Visual Reports</h3>
            <p className="text-slate-500">Understand complex information at a glance with automatically generated charts and graphs.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 text-left">
            <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Scoring</h3>
            <p className="text-slate-500">Get a clear 0-100 score on sentiment, probability, or quality to help you make faster decisions.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
