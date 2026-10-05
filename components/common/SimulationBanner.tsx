'use client';

import React from 'react';
import { useAppStore } from '@/hooks/useStore';
import { Sparkles, RefreshCcw, Info, DatabaseZap } from 'lucide-react';
import Link from 'next/link';

export function SimulationBanner() {
  const { isDemoMode, loadDemoDataset, resetToInteractive } = useAppStore();

  if (!isDemoMode) {
    return (
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">Live Interactive Mode</span>
            <span className="hidden sm:inline text-slate-500">— Real student submissions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 hidden md:inline">Evaluating the full campaign?</span>
            <button
              onClick={() => loadDemoDataset()}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
            >
              <DatabaseZap className="w-3 h-3" />
              Load Demo Campaign (500 Students)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-blue-500/15 to-purple-500/15 border-b border-amber-500/30 text-xs py-2 px-4 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-300 font-semibold tracking-wide">
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 border border-amber-500/30 text-amber-300">
            SIMULATION MODE ACTIVE
          </span>
          <span className="text-slate-200">
            Loaded 500 synthetic students, 20 campuses, and 7-day funnel simulation.
          </span>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-center">
          <Link
            href="/demo"
            className="text-blue-400 hover:text-blue-300 underline font-medium"
          >
            Adjust Simulator Scenarios →
          </Link>
          <button
            onClick={() => resetToInteractive()}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
          >
            <RefreshCcw className="w-3 h-3" />
            Switch to Interactive
          </button>
        </div>
      </div>
    </div>
  );
}
