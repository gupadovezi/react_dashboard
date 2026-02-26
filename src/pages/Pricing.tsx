import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Check, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function Pricing() {
  const { user, upgradeToPro } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    upgradeToPro();
    alert('Successfully upgraded to Pro Plan! (Mock)');
    navigate('/dashboard');
  };

  return (
    <div className="space-y-12 py-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-xl text-slate-500">
          Unlock the full potential of InsightAI with our Pro plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Card className={`h-full flex flex-col ${user?.plan === 'free' ? 'border-indigo-500 ring-2 ring-indigo-500/20' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Free</CardTitle>
              <p className="text-slate-500 mt-2">Perfect for trying out InsightAI.</p>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold">
                $0
                <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mr-3" />
                  <span className="text-slate-600">5 analyses per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mr-3" />
                  <span className="text-slate-600">Basic sentiment scoring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mr-3" />
                  <span className="text-slate-600">Summary & Insights</span>
                </li>
              </ul>
              <Button
                variant={user?.plan === 'free' ? 'outline' : 'secondary'}
                className="w-full mt-auto"
                disabled={user?.plan === 'free'}
              >
                {user?.plan === 'free' ? 'Current Plan' : 'Downgrade'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Card className={`h-full flex flex-col relative overflow-hidden border-indigo-200 shadow-xl ${user?.plan === 'pro' ? 'border-indigo-500 ring-2 ring-indigo-500/20' : ''}`}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500 rounded-full opacity-10 blur-2xl"></div>
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-indigo-900">Pro</CardTitle>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Most Popular
                </span>
              </div>
              <p className="text-slate-500 mt-2">For professionals who need deep insights.</p>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold text-slate-900">
                $29
                <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mr-3" />
                  <span className="text-slate-900 font-medium">Unlimited analyses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mr-3" />
                  <span className="text-slate-900 font-medium">Interactive Charts & Graphs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mr-3" />
                  <span className="text-slate-600">Advanced sentiment scoring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mr-3" />
                  <span className="text-slate-600">Export to PDF/CSV</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mr-3" />
                  <span className="text-slate-600">Priority support</span>
                </li>
              </ul>
              <Button
                variant="primary"
                className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700"
                onClick={handleUpgrade}
                disabled={user?.plan === 'pro'}
              >
                {user?.plan === 'pro' ? (
                  'Current Plan'
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
