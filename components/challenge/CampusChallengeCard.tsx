'use client';

import React from 'react';
import { Challenge } from '@/types';
import { StatusBadge } from '../common/DesignSystem';
import {
  Trophy,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Building,
  Cpu,
  FileCode,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

export function CampusChallengeCard({ challenge }: { challenge: Challenge }) {
  const {
    title,
    category,
    problemDescription,
    whyItMatters,
    whyAI,
    aggregatedCampusCount,
    sampleProblems,
    sixtyMinuteScope,
    requiredSkills,
    expectedOutput,
    futureExtensions,
    difficulty,
    isSimulated,
  } = challenge;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-6 hover:border-slate-700 transition">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <StatusBadge text={category} variant="info" />
            <StatusBadge text={difficulty} variant="default" size="sm" />
            {isSimulated && (
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Generated from simulated campaign data
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>Synthesized across {aggregatedCampusCount} engineering campuses</span>
          </div>
        </div>

        <Link
          href="/register"
          className="shrink-0 py-2.5 px-4 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm shadow-blue-600/20 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Accept Challenge in Workshop</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Collective Problem & Why AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Collective Campus Problem
          </span>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{problemDescription}</p>
          <p className="text-[11px] text-slate-400 mt-2 italic border-t border-slate-800/60 pt-2">
            <strong>Why it matters:</strong> {whyItMatters}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/20">
          <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Why AI Solves This
          </span>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{whyAI}</p>
          <div className="mt-3 pt-2 border-t border-blue-500/20 flex items-center gap-1.5 text-xs text-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Output: {expectedOutput}</span>
          </div>
        </div>
      </div>

      {/* 60-Minute Scoped Workflow */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          60-Minute Rapid Build Track
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sixtyMinuteScope.map((step) => (
            <div
              key={step.stepNumber}
              className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/50"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-blue-400">Step {step.stepNumber}</span>
                <span className="font-mono text-slate-500 text-[10px]">
                  {step.estimatedMinutes}m
                </span>
              </div>
              <h5 className="text-xs font-semibold text-white">{step.title}</h5>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Skills & Sample Submissions */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 mr-1">Required Skills:</span>
          {requiredSkills.map((sk) => (
            <span
              key={sk}
              className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700"
            >
              {sk}
            </span>
          ))}
        </div>

        <Link
          href="/team"
          className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
        >
          Check Team Match for this Challenge <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
