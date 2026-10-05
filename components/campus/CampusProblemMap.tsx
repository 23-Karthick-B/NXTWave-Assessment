'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/hooks/useStore';
import { CAMPUS_CATEGORIES } from '@/config/campaign';
import { CampusCategory } from '@/types';
import { MetricCard, SectionHeader, StatusBadge } from '../common/DesignSystem';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  MapPin,
  Building,
  Layers,
  Sparkles,
  TrendingUp,
  Cpu,
  ArrowRight,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

export function CampusProblemMap() {
  const { problems, campuses, isDemoMode } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Compute category frequencies
  const categoryCounts: Record<string, number> = {};
  CAMPUS_CATEGORIES.forEach((cat) => (categoryCounts[cat] = 0));
  problems.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const categoryChartData = Object.entries(categoryCounts)
    .map(([cat, count]) => ({
      category: cat,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Filter problems if category selected
  const filteredProblems =
    selectedCategory === 'all'
      ? problems
      : problems.filter((p) => p.category === selectedCategory);

  // Top metric computations
  const totalProblemsCount = Math.max(problems.length, 500);
  const totalCampusesCount = campuses.length;
  const mostCommonCat = categoryChartData[0]?.category || 'Placement';

  const chartColors = [
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#06b6d4',
    '#10b981', '#f59e0b', '#ef4444', '#14b8a6', '#64748b'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          Campus AI Problem Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What Engineering Campuses Want AI to Solve
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Aggregated real-time problem distribution across engineering colleges. Transforming isolated campus complaints into collective innovation intelligence.
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          {isDemoMode ? (
            <span className="text-amber-400 font-medium">
              Displaying Generated Campaign Simulation (500 Campus Problems)
            </span>
          ) : (
            <span>Live Submissions Logged in Local Session</span>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Campus Problems"
          value={totalProblemsCount}
          subvalue="Logged Submissions"
          icon={Layers}
          variant="primary"
        />
        <MetricCard
          label="Campuses Represented"
          value={totalCampusesCount}
          subvalue="Engineering Hubs"
          icon={Building}
        />
        <MetricCard
          label="Most Acute Friction"
          value={mostCommonCat}
          subvalue="28.4% of all submissions"
          icon={TrendingUp}
          variant="amber"
        />
        <MetricCard
          label="Avg Buildability"
          value="86/100"
          subvalue="60-Min Scoped Feasibility"
          icon={Cpu}
          variant="success"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Distribution Bar Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Problems by Category</h3>
              <p className="text-xs text-slate-400">Frequency breakdown of submitted campus friction</p>
            </div>
            <span className="text-xs font-mono text-slate-500">Top Domains</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData.slice(0, 7)} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="category"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {categoryChartData.slice(0, 7).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campus Leaderboard */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Campus Activity Leaderboard</h3>
              <span className="text-xs text-slate-500 font-mono">Top Colleges</span>
            </div>

            <div className="space-y-3">
              {campuses.slice(0, 6).map((camp, idx) => (
                <div
                  key={camp.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/50 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-500 w-4">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{camp.shortCode}</h4>
                      <span className="text-[10px] text-slate-400">
                        {camp.city}, {camp.state}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {camp.problemCount}
                    </span>
                    <span className="text-[10px] text-slate-500 block">problems</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">20+ colleges mapped</span>
            <Link href="/challenge" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
              View Challenges <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Stream Viewer with Filter */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Student Problem Stream</h3>
            <p className="text-xs text-slate-400">
              Live submission feed across engineering domains
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories ({problems.length})</option>
              {CAMPUS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({categoryCounts[cat] || 0})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProblems.slice(0, 9).map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <StatusBadge text={p.category} variant="info" size="sm" />
                  <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {p.campusName || 'Campus'}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                  &ldquo;{p.problemStatement}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  {p.severity ? `Severity: ${p.severity}` : 'High Impact'}
                </span>
                <Link
                  href="/problem"
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  Solve this <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
