'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectRecommendation } from '@/types';
import { BuildabilityGauge } from '../common/BuildabilityGauge';
import { StatusBadge } from '../common/DesignSystem';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Code2,
  Cpu,
  Database,
  CheckCircle2,
  FileCode,
  ShieldAlert,
  Compass,
  Share2,
  Users,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics/eventTracker';

export function ProjectView({ project }: { project: ProjectRecommendation }) {
  const {
    title,
    tagline,
    description,
    problemSummary,
    targetUser,
    aiCapability,
    architectureDescription,
    technologyStack,
    difficulty,
    sixtyMinuteScope,
    futureExtensions,
    requiredSkills,
    buildabilityScore,
    risks = [],
  } = project;

  const handleRegisterClick = () => {
    trackEvent('registration_started', {
      projectId: project.id,
      metadata: { projectTitle: title, score: buildabilityScore.totalScore },
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/80 to-slate-950 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <StatusBadge text={difficulty} variant="info" />
          <StatusBadge text="60-Minute Scoped Build" variant="success" />
          {project.isSimulated && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Simulation Data
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-blue-300 font-medium max-w-3xl mb-4">
          {tagline}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {description}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/register"
            onClick={handleRegisterClick}
            className="py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>BUILD THIS IN THE 60-MINUTE WORKSHOP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/problem"
            className="py-3 px-5 rounded-xl font-semibold text-sm bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            Create Another Project
          </Link>
          <Link
            href="/team"
            className="py-3 px-5 rounded-xl font-semibold text-sm bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 transition flex items-center justify-center gap-2 sm:ml-auto"
          >
            <Users className="w-4 h-4 text-blue-400" />
            Check Team Skill Match
          </Link>
        </div>
      </div>

      {/* Buildability Score Section */}
      <BuildabilityGauge score={buildabilityScore} />

      {/* 2-Column Core Architecture & 60-Minute Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 60-Minute Scope Plan */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">60-Minute Implementation Scope</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Total: 60 Mins
              </span>
            </div>

            <div className="space-y-4">
              {sixtyMinuteScope.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100">{step.title}</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {step.estimatedMinutes} mins
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-7 mb-2">
                    {step.description}
                  </p>
                  <div className="pl-7 flex items-center gap-1.5 text-[11px] text-blue-400 font-mono">
                    <FileCode className="w-3.5 h-3.5 text-blue-400" />
                    <span>Output: {step.outputArtifact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Extensions */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              Future Roadmap & Capstone Extensions
            </h3>
            <ul className="space-y-2.5">
              {futureExtensions.map((ext, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{ext}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Architecture & Tech Stack */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target & Problem summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Problem & Target Audience
            </h3>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Campus Pain Point</span>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{problemSummary}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Target Beneficiary</span>
              <p className="text-xs text-slate-300 mt-0.5">{targetUser}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Core AI Capability</span>
              <p className="text-xs text-blue-300 font-medium mt-0.5">{aiCapability}</p>
            </div>
          </div>

          {/* Architecture & Flow */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Suggested Architecture
            </h3>
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 font-mono text-xs text-blue-300 leading-relaxed mb-3">
              {architectureDescription}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Designed specifically for rapid local execution without heavyweight cloud or database provisioning.
            </p>
          </div>

          {/* Technology Stack Badges */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              Technology Stack
            </h3>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Frontend:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {technologyStack.frontend.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Backend API:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {technologyStack.backend.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI / ML Library:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {technologyStack.aiModelOrLibrary.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-purple-950/40 text-purple-300 border border-purple-800/40">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Data & Inputs:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {technologyStack.data.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Key Skills Practiced
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {requiredSkills.map((sk) => (
                <span key={sk} className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Potential Risks */}
          {risks && risks.length > 0 && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Anticipated Edge Cases & Mitigation
              </h4>
              <ul className="space-y-1.5">
                {risks.map((r: string, i: number) => (
                  <li key={i} className="text-xs text-slate-400 list-disc list-inside">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Value CTA */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to turn this blueprint into code in 60 minutes?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            Register for the live virtual campus challenge. You&apos;ll be paired with peers, provided working code templates, and guided step-by-step to deployment.
          </p>
        </div>
        <Link
          href="/register"
          onClick={handleRegisterClick}
          className="mt-4 sm:mt-0 inline-flex shrink-0 items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
        >
          <span>CLAIM WORKSHOP SEAT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
