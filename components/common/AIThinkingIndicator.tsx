'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface Stage {
  key: string;
  title: string;
  subtitle: string;
}

const STAGES: Stage[] = [
  { key: 'problem', title: 'ANALYZING PROBLEM', subtitle: 'Extracting core constraints & academic timeline friction' },
  { key: 'users', title: 'IDENTIFYING USERS', subtitle: 'Profiling engineering student & faculty touchpoints' },
  { key: 'pain', title: 'UNDERSTANDING PAIN POINT', subtitle: 'Isolating root causes & friction frequency' },
  { key: 'opportunity', title: 'FINDING AI OPPORTUNITY', subtitle: 'Matching heuristic, regression, or NLP models' },
  { key: 'project', title: 'DESIGNING PROJECT', subtitle: 'Structuring data pipeline, backend, and interface specs' },
  { key: 'feasibility', title: 'CHECKING 60-MINUTE FEASIBILITY', subtitle: 'Validating zero-to-one build scope and dependencies' },
];

export function AIThinkingIndicator({ onComplete }: { onComplete?: () => void }) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-blue-500/20 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              AI Project Forge Engine
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300">
                Live Synthesis
              </span>
            </h3>
            <p className="text-xs text-slate-400">Transforming campus problem into an engineering project</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400">
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          <span>Stage {currentStageIndex + 1}/{STAGES.length}</span>
        </div>
      </div>

      {/* Dynamic Stage List */}
      <div className="mt-6 space-y-3">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = idx > currentStageIndex;

          return (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isUpcoming ? 0.35 : 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3.5 p-3 rounded-lg border transition-all ${
                isCurrent
                  ? 'border-blue-500/40 bg-blue-950/20 shadow-sm'
                  : isDone
                  ? 'border-emerald-500/20 bg-emerald-950/10'
                  : 'border-slate-800/40 bg-slate-950/20'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isCurrent
                        ? 'text-blue-300'
                        : isDone
                        ? 'text-emerald-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {stage.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-blue-400 animate-pulse font-mono font-medium">
                      processing...
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{stage.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
