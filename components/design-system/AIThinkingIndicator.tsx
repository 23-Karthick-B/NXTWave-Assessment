"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Loader2, Cpu, Brain, Layers, Target, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";

export interface AIThinkingIndicatorProps {
  currentStage: number; // 0 to stages.length - 1
  stages?: string[];
  isComplete?: boolean;
}

const defaultStages = [
  "ANALYZING CAMPUS PROBLEM",
  "IDENTIFYING TARGET USERS & STAKEHOLDERS",
  "UNDERSTANDING ROOT PAIN POINT",
  "MAPPING AI & ML OPPORTUNITY",
  "SYNTHESIZING SYSTEM ARCHITECTURE",
  "CALCULATING 60-MINUTE BUILDABILITY SCORE",
];

const stageIcons = [Brain, Target, Layers, Sparkles, Cpu, Clock];

export function AIThinkingIndicator({
  currentStage = 0,
  stages = defaultStages,
  isComplete = false,
}: AIThinkingIndicatorProps) {
  return (
    <Card className="p-6 border-zinc-800 bg-zinc-950/90 shadow-2xl relative overflow-hidden">
      {/* Subtle top scanline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 animate-pulse" />

      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            {isComplete ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight">
              {isComplete ? "AI Analysis Synthesized" : "AI Campus Reasoner Active"}
            </h4>
            <p className="text-xs text-zinc-400">
              Transforming unstructured problem statement into buildable project architecture
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-zinc-500">
          Stage {Math.min(currentStage + 1, stages.length)} of {stages.length}
        </span>
      </div>

      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const Icon = stageIcons[idx % stageIcons.length];
          const isDone = isComplete || idx < currentStage;
          const isCurrent = !isComplete && idx === currentStage;
          const isPending = !isComplete && idx > currentStage;

          return (
            <div
              key={stage}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                isCurrent
                  ? "border-blue-500/50 bg-blue-950/30 text-blue-200 font-medium"
                  : isDone
                  ? "border-zinc-800/80 bg-zinc-900/40 text-zinc-300"
                  : "border-transparent text-zinc-600 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                    isDone
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : isCurrent
                      ? "border-blue-500/40 bg-blue-500/20 text-blue-400"
                      : "border-zinc-800 bg-zinc-900 text-zinc-600"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono tracking-wide">{stage}</span>
              </div>

              <div>
                {isDone ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Done</span>
                  </span>
                ) : isCurrent ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-blue-400">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Evaluating</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-600">Pending</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
