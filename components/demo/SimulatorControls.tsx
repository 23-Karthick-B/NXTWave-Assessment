'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/hooks/useStore';
import { SIMULATION_SCENARIOS } from '@/lib/simulation/scenarios';
import { runCampaignSimulation } from '@/lib/simulation/campaignSimulator';
import { SimulationScenario } from '@/types';
import { MetricCard, StatusBadge } from '../common/DesignSystem';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Target,
  RefreshCw,
  DatabaseZap,
  Info,
  CheckCircle2,
} from 'lucide-react';

const SCALE_PRESETS = [50, 100, 250, 500, 1000];

export function SimulatorControls() {
  const {
    selectedScenarioId,
    selectedTargetScale,
    setSimulationParameters,
    loadDemoDataset,
    isDemoMode,
  } = useAppStore();

  const [activeScenario, setActiveScenario] = useState<SimulationScenario['id']>(
    selectedScenarioId || 'base'
  );
  const [activeScale, setActiveScale] = useState<number>(selectedTargetScale || 500);

  // Compute simulation on the fly
  const simulationResult = runCampaignSimulation(activeScenario, activeScale);

  const handleApply = (scenarioId: SimulationScenario['id'], scale: number) => {
    setActiveScenario(scenarioId);
    setActiveScale(scale);
    setSimulationParameters(scenarioId, scale);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Transparency Header */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/15 p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              SIMULATED CAMPAIGN SCENARIOS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            7-Day Growth Simulation Workbench
          </h1>
          <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
            Every figure displayed on this page is a mathematical simulation model for campaign evaluation. Never presented as real historical results.
          </p>
        </div>

        <button
          onClick={() => loadDemoDataset()}
          className="shrink-0 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition shadow-md shadow-blue-600/30 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <DatabaseZap className="w-4 h-4" />
          Load Full Evaluator Dataset
        </button>
      </div>

      {/* Simulator Parameter Adjustments */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          Campaign Scenarios & Student Scale Selection
        </h3>

        {/* Target Scale Presets */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Target Student Scale (Goal: 500 Registrations):
          </label>
          <div className="flex flex-wrap gap-2">
            {SCALE_PRESETS.map((scale) => {
              const isSelected = activeScale === scale;
              return (
                <button
                  key={scale}
                  onClick={() => handleApply(activeScenario, scale)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {scale} Students
                </button>
              );
            })}
          </div>
        </div>

        {/* Scenario Selection Grid */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Campaign Dynamics & Conversion Scenarios:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.values(SIMULATION_SCENARIOS).map((sc) => {
              const isSelected = activeScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleApply(sc.id, activeScale)}
                  className={`text-left p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-950/30 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4
                        className={`text-xs font-bold ${
                          isSelected ? 'text-blue-300' : 'text-slate-200'
                        }`}
                      >
                        {sc.name}
                      </h4>
                      {isSelected && <span className="text-blue-400 text-xs">● Active</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                      {sc.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Val-to-Reg: {Math.round(sc.registrationRate * 100)}%</span>
                    <span>Share Rate: {Math.round(sc.shareRate * 100)}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulation Result KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Projected Registrations"
          value={simulationResult.totalRegistrations}
          subvalue={`Target: ${activeScale}`}
          trend={simulationResult.isTargetMet ? 'Goal Achieved' : 'Below Target'}
          trendPositive={simulationResult.isTargetMet}
          icon={Target}
          variant={simulationResult.isTargetMet ? 'success' : 'amber'}
        />
        <MetricCard
          label="Simulated Visitors"
          value={simulationResult.totalVisitors}
          subvalue="7-Day Campus Influx"
          icon={TrendingUp}
        />
        <MetricCard
          label="Projected Problems"
          value={simulationResult.totalProblemsSubmitted}
          subvalue="Synthesized Projects"
          icon={Sparkles}
        />
        <MetricCard
          label="Cost Per Registration"
          value={`₹${simulationResult.costPerRegistrationInr}`}
          subvalue="Budget: ₹2,000 fixed"
          icon={CheckCircle2}
          variant="primary"
        />
      </div>

      {/* 7-Day Simulation Line Chart with Target Line (Step 27) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">7-Day Trajectory vs. 500 Target Line</h3>
            <p className="text-xs text-slate-400">
              Cumulative workshop sign-ups modeled across campaign timeline against linear target pace.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
            Target Pace: ~71 / Day
          </span>
        </div>

        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={simulationResult.dailyMetrics}
              margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="cumulativeRegistrations"
                name="Cumulative Registrations"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, fill: '#10b981' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="targetLine"
                name="Target Benchmark Line"
                stroke="#3b82f6"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                name="Daily Visitors"
                stroke="#6366f1"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
