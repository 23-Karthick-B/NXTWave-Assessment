'use client';

import React from 'react';
import { useAppStore } from '@/hooks/useStore';
import { CampusChallengeCard } from '@/components/challenge/CampusChallengeCard';
import { PageContainer, SectionHeader } from '@/components/common/DesignSystem';
import { Trophy, Sparkles, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ChallengePage() {
  const { challenges, isDemoMode } = useAppStore();

  return (
    <PageContainer>
      <div className="w-full max-w-5xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Collective Problem Synthesis
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Campus Challenges
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Synthesized directly from recurring campus friction across 20+ engineering colleges. These challenges represent multi-campus collective capstone opportunities.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Progression: Individual Problem → Campus Intelligence → Campus AI Challenge</span>
          </div>
        </div>

        {/* Challenge Cards List */}
        <div className="space-y-6">
          {challenges.map((ch) => (
            <CampusChallengeCard key={ch.id} challenge={ch} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center space-y-3">
          <h3 className="text-base font-bold text-white">Have a unique problem not listed here?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Submit your individual college friction point to trigger AI analysis and add it to your campus problem cluster.
          </p>
          <div>
            <Link
              href="/problem"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition shadow-md"
            >
              <span>Submit Your Problem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
