'use client';

import React from 'react';
import { BuildabilityScore } from '@/types';
import { StatusBadge } from './DesignSystem';
import { ShieldCheck, Info } from 'lucide-react';

export function BuildabilityGauge({ score }: { score: BuildabilityScore }) {
  const { totalScore, dimensions, explanation, badgeLevel } = score;

  // Determine color hue
  const getScoreColor = (val: number) => {
    if (val >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 75) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (val >= 65) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getBadgeVariant = (level: BuildabilityScore['badgeLevel']) => {
    switch (level) {
      case 'Highly Feasible':
        return 'success';
      case 'Good Feasibility':
        return 'info';
      case 'Moderate Feasibility':
        return 'warning';
      default:
        return 'danger';
    }
  };

  const dimensionList = Object.values(dimensions);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Buildability Evaluation
            </span>
            <span className="text-xs text-slate-500">(Deterministic Weighted Engine)</span>
          </div>
          <h3 className="mt-1 text-xl font-bold text-white flex items-center gap-2">
            Buildability Score
            <StatusBadge text={badgeLevel} variant={getBadgeVariant(badgeLevel)} />
          </h3>
        </div>

        {/* Big Score Callout */}
        <div
          className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${getScoreColor(
            totalScore
          )}`}
        >
          <div className="text-right">
            <div className="text-3xl font-black tracking-tight">{totalScore}</div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">out of 100</div>
          </div>
          <div className="h-8 w-px bg-slate-700/50" />
          <div className="text-xs font-medium text-slate-300 max-w-[120px]">
            {totalScore >= 80 ? 'Optimal for 60-min build' : 'Prototype feasible with scoping'}
          </div>
        </div>
      </div>

      {/* Explanation Rationale */}
      <div className="py-4 text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p>{explanation}</p>
      </div>

      {/* Individual Dimensions */}
      <div className="mt-4 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Dimensional Feasibility Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dimensionList.map((dim) => (
            <div
              key={dim.name}
              className="p-3.5 rounded-lg border border-slate-800/80 bg-slate-950/50 hover:border-slate-700 transition-colors"
            >
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-200">
                  {dim.name}{' '}
                  <span className="text-slate-500 font-normal">({Math.round(dim.weight * 100)}%)</span>
                </span>
                <span className="font-mono font-bold text-blue-400">{dim.score}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{dim.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Disclaimer */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          AI-assisted prototype feasibility estimate
        </span>
        <span>Standardized across 500+ campus project rubrics</span>
      </div>
    </div>
  );
}
