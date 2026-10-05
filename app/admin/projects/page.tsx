'use client';

import React from 'react';
import { useAppStore } from '@/hooks/useStore';
import { PageContainer, StatusBadge } from '@/components/common/DesignSystem';
import { ArrowLeft, Code2, Cpu, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminProjectsPage() {
  const { projects, isDemoMode } = useAppStore();

  return (
    <PageContainer>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb / Nav */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link
            href="/admin"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Growth Command Center
          </Link>
          {isDemoMode && (
            <span className="text-[10px] uppercase font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
              Simulation Dataset Active
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            Generated AI Project Recommendations ({projects.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalized blueprints synthesized for student submissions with 60-minute implementation scopes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 30).map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <StatusBadge text={proj.difficulty} variant="info" size="sm" />
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    Score: {proj.buildabilityScore?.totalScore || 85}/100
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.tagline}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Scope Steps:</span>
                  <span className="font-medium text-slate-200">
                    {proj.sixtyMinuteScope?.length || 4} milestones
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {proj.technologyStack?.frontend.slice(0, 2).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                  {proj.technologyStack?.aiModelOrLibrary.slice(0, 1).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-purple-950/60 text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
