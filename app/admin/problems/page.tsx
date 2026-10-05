'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/hooks/useStore';
import { PageContainer, StatusBadge } from '@/components/common/DesignSystem';
import { CAMPUS_CATEGORIES } from '@/config/campaign';
import { Filter, Layers, ArrowLeft, Building, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminProblemsPage() {
  const { problems, isDemoMode } = useAppStore();
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered =
    selectedCat === 'all'
      ? problems
      : problems.filter((p) => p.category === selectedCat);

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Campus Problem Submissions Repository
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Logged problems submitted by engineering students across participating campuses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="all">All Categories ({problems.length})</option>
              {CAMPUS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problems Table / List */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Problem Statement</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Campus</th>
                  <th className="py-3.5 px-4">Severity</th>
                  <th className="py-3.5 px-4">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.slice(0, 50).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-medium text-slate-200 max-w-md">
                      {p.problemStatement}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge text={p.category} variant="info" size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-500" />
                        {p.campusName || 'General Campus'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`font-semibold ${
                          p.severity === 'Critical'
                            ? 'text-rose-400'
                            : p.severity === 'High'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {p.severity || 'Medium'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                      {new Date(p.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 50 && (
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-slate-500">
              Showing 50 of {filtered.length} total records.
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
