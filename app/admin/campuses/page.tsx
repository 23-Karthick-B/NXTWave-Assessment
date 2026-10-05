'use client';

import React from 'react';
import { useAppStore } from '@/hooks/useStore';
import { PageContainer, StatusBadge } from '@/components/common/DesignSystem';
import { ArrowLeft, Building, Users, Layers, Award } from 'lucide-react';
import Link from 'next/link';

export default function AdminCampusesPage() {
  const { campuses, isDemoMode } = useAppStore();

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
            <Building className="w-5 h-5 text-indigo-400" />
            Participating Engineering Campuses ({campuses.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Breakdown of student submissions, workshop registrations, and average feasibility scores per institution.
          </p>
        </div>

        {/* Campuses Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Campus Name</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Problems Logged</th>
                  <th className="py-3.5 px-4">Registrations</th>
                  <th className="py-3.5 px-4">Top Category</th>
                  <th className="py-3.5 px-4">Avg Buildability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {campuses.map((camp, idx) => (
                  <tr key={camp.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                        <span>{camp.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({camp.shortCode})
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {camp.city}, {camp.state}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400 whitespace-nowrap">
                      {camp.problemCount}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                      {camp.registrationCount}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge text={camp.topCategory} variant="info" size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {camp.averageBuildability}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
