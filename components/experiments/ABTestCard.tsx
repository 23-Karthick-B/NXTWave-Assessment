'use client';

import React from 'react';
import { useAppStore } from '@/hooks/useStore';
import { evaluateExperimentStatus } from '@/lib/growth/abTesting';
import { StatusBadge } from '../common/DesignSystem';
import { Sparkles, TrendingUp, CheckCircle2, AlertTriangle, ArrowRight, FlaskConical } from 'lucide-react';

export function ABTestCard() {
  const { experiment, recordExperimentExposure } = useAppStore();
  const evaluation = evaluateExperimentStatus(experiment);
  const { A, B } = experiment.variants;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Statistically Significant':
        return 'success';
      case 'Early Signal':
        return 'info';
      default:
        return 'warning';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <FlaskConical className="w-3.5 h-3.5" />
          Growth Experimentation Engine
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          A/B Hypothesis Testing
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Comparing traditional gated registration CTA against the un-gated Value-First Campus Problem CTA.
        </p>
      </div>

      {/* Main Experiment Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Active Test: {experiment.id}
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">{experiment.title}</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              <strong>Hypothesis:</strong> {experiment.hypothesis}
            </p>
          </div>
          <div className="shrink-0">
            <StatusBadge
              text={evaluation.significanceStatus}
              variant={getStatusVariant(evaluation.significanceStatus)}
            />
          </div>
        </div>

        {/* 2 Variant Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variant A */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Variant A (Control)
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">
                {A.impressions} Impressions
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">&ldquo;{A.headline}&rdquo;</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{A.description}</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/80">
              <span className="text-[10px] uppercase font-semibold text-slate-500">Primary CTA:</span>
              <div className="mt-1 inline-block px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                {A.ctaText}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">Registrations:</span>
                <span className="text-base font-mono font-bold text-slate-200">
                  {A.registrations}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 text-[10px] block">Conversion Rate:</span>
                <span className="text-base font-mono font-bold text-rose-400">
                  {A.conversionRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Variant B */}
          <div className="rounded-xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-950/20 to-slate-950/80 p-6 space-y-4 relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-sm">
              Current Winner (+{evaluation.liftPercentage}% Lift)
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                Variant B (Value-First Challenger)
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">
                {B.impressions} Impressions
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">&ldquo;{B.headline}&rdquo;</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{B.description}</p>
            </div>

            <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-900/30">
              <span className="text-[10px] uppercase font-semibold text-blue-300">Primary CTA:</span>
              <div className="mt-1 inline-block px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
                {B.ctaText}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">Registrations:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {B.registrations}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 text-[10px] block">Conversion Rate:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {B.conversionRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistical Summary Box */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Statistical Assessment:</span>
            <span className="font-mono text-slate-400">Total Sample: {experiment.sampleSize} visitors</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {evaluation.summaryText}
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 italic">
            Note: {experiment.confidenceNote}
          </div>
        </div>
      </div>
    </div>
  );
}
