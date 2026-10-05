'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/hooks/useStore';
import { analyzeProblem } from '@/lib/ai/problemAnalyzer';
import { generateProjectRecommendation } from '@/lib/ai/projectGenerator';
import { CAMPUS_CATEGORIES } from '@/config/campaign';
import { CampusCategory } from '@/types';
import { AIThinkingIndicator } from '../common/AIThinkingIndicator';
import { Sparkles, ArrowRight, Lightbulb, AlertTriangle, Building, Users } from 'lucide-react';
import { trackEvent } from '@/lib/analytics/eventTracker';

const SAMPLE_PROMPTS: { text: string; category: CampusCategory }[] = [
  { text: 'Students wait 30 minutes in cafeteria queues during lunch break, causing them to miss afternoon labs.', category: 'Food' },
  { text: 'College shuttle buses arrive completely packed at outer campus stops, leaving 40+ hostellers stranded daily.', category: 'Transport' },
  { text: 'Final-year students submit generic resumes to Tier-1 campus placement drives and get rejected by ATS without knowing what skills they lacked.', category: 'Placement' },
  { text: 'Hostel maintenance requests written in paper registers take 14 days for minor electrical and plumbing fixes.', category: 'Campus Life' },
  { text: 'Students miscalculate the mandatory 75% attendance rule and receive sudden exam debarment notices.', category: 'Productivity' },
  { text: 'Students pick final-year electives blindly based on hearsay rather than syllabus difficulty and career match.', category: 'Education' },
];

export function ProblemInput() {
  const router = useRouter();
  const { submitProblem, setAIAnalysis, setProjectRecommendation } = useAppStore();

  const [statement, setStatement] = useState('');
  const [category, setCategory] = useState<CampusCategory>('Food');
  const [campusName, setCampusName] = useState('');
  const [affectedUsers, setAffectedUsers] = useState('Final-Year Engineering Students');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectSample = (sample: { text: string; category: CampusCategory }) => {
    setStatement(sample.text);
    setCategory(sample.category);
    setErrorMessage('');
    trackEvent('problem_started', { metadata: { source: 'sample_prompt', category: sample.category } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (statement.trim().length < 10) {
      setErrorMessage('Please provide at least 10 characters describing the problem.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    try {
      // 1. Submit problem to global store
      const savedProblem = submitProblem({
        problemStatement: statement.trim(),
        category,
        campusName: campusName.trim() || 'Engineering Campus',
        affectedUsers,
        severity,
      });

      // 2. Perform AI Analysis
      const analysis = await analyzeProblem({
        problemStatement: savedProblem.problemStatement,
        category: savedProblem.category,
        affectedUsers: savedProblem.affectedUsers,
        severity: savedProblem.severity,
      });
      setAIAnalysis(analysis);

      // 3. Generate Project Recommendation
      const project = await generateProjectRecommendation({
        problemId: savedProblem.id,
        problemStatement: savedProblem.problemStatement,
        category: savedProblem.category,
        affectedUsers: savedProblem.affectedUsers,
        severity: savedProblem.severity,
      });
      setProjectRecommendation(project);

      // AIThinkingIndicator will auto-complete and invoke router.push('/project')
    } catch (err) {
      console.error('Problem generation error:', err);
      setIsProcessing(false);
      setErrorMessage('An error occurred during AI analysis. Please try again.');
    }
  };

  if (isProcessing) {
    return (
      <div className="py-12">
        <AIThinkingIndicator onComplete={() => router.push('/project')} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Value First Banner */}
      <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Value-First Campus Engine:</strong> Submit any genuine engineering college friction point. Our AI product designer immediately generates an architecture blueprint, 60-minute implementation scope, and buildability score — completely free, before registration.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        {/* Main Textarea */}
        <div>
          <label htmlFor="problemStatement" className="block text-base sm:text-lg font-bold text-white mb-2">
            What problem at your college would you solve with AI?
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Be specific about what causes delays, confusion, waste, or friction for students or staff.
          </p>
          <textarea
            id="problemStatement"
            rows={4}
            value={statement}
            onChange={(e) => {
              setStatement(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder="e.g. Students wait over 30 minutes in cafeteria queues during lunch break because the kitchen has no visibility into class schedules..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          />
          <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
            <span>Minimum 10 characters</span>
            <span className="font-mono">{statement.length}/1000</span>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Or start with a proven campus friction prompt:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="text-left p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40 hover:border-blue-500/40 hover:bg-slate-900 text-xs text-slate-300 transition group cursor-pointer"
              >
                <span className="inline-block text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-1">
                  [{sample.category}]
                </span>
                <p className="line-clamp-2 text-slate-400 group-hover:text-slate-200">
                  &ldquo;{sample.text}&rdquo;
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Structured Context Fields (Collapsible / Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Campus Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as CampusCategory)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            >
              {CAMPUS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="campusName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              College / Campus (Optional)
            </label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                id="campusName"
                type="text"
                value={campusName}
                onChange={(e) => setCampusName(e.target.value)}
                placeholder="e.g. PSG Tech, VIT, CEG Anna Univ"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="affectedUsers" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Affected Stakeholders
            </label>
            <div className="relative">
              <Users className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                id="affectedUsers"
                type="text"
                value={affectedUsers}
                onChange={(e) => setAffectedUsers(e.target.value)}
                placeholder="e.g. Final-Year Hostellers, Bus Commuters"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="severity" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Severity / Friction Level
            </label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as 'Low' | 'Medium' | 'High' | 'Critical')}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="Critical">Critical (Halts student productivity daily)</option>
              <option value="High">High (Causes substantial weekly delay)</option>
              <option value="Medium">Medium (Moderate recurring inconvenience)</option>
              <option value="Low">Low (Minor optimization opportunity)</option>
            </select>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/20 text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            {errorMessage}
          </div>
        )}

        {/* Primary CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>TURN MY PROBLEM INTO AN AI PROJECT</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Instant AI analysis · 60-minute build plan · No registration required to view output
          </p>
        </div>
      </form>
    </div>
  );
}
