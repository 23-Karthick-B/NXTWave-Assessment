'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/hooks/useStore';
import { SKILL_OPTIONS } from '@/config/campaign';
import { StatusBadge } from '../common/DesignSystem';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Code2,
} from 'lucide-react';
import Link from 'next/link';

export function TeamMatcher() {
  const { currentProject, currentStudent, getTeamProfile, updateStudentSkills, recordTeamInterest } = useAppStore();

  const [activeSkills, setActiveSkills] = useState<string[]>(
    currentStudent?.skills || ['Python', 'React / Next.js']
  );
  const [interestRecorded, setInterestRecorded] = useState(false);

  const toggleSkill = (skill: string) => {
    const updated = activeSkills.includes(skill)
      ? activeSkills.filter((s) => s !== skill)
      : [...activeSkills, skill];
    setActiveSkills(updated);
    if (currentStudent) {
      updateStudentSkills(updated);
    }
  };

  const projectTitle = currentProject?.title || 'AI Campus Bus Demand Predictor';
  const requiredSkills = currentProject?.requiredSkills || [
    'Python',
    'AI / ML Fundamentals',
    'React / Next.js',
    'Data Analysis & Pandas',
  ];

  const matched = requiredSkills.filter((req) =>
    activeSkills.some(
      (sk) =>
        sk.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(sk.toLowerCase())
    )
  );

  const missing = requiredSkills.filter((req) => !matched.includes(req));

  const readinessScore = Math.min(
    100,
    Math.max(45, Math.round((matched.length / (requiredSkills.length || 1)) * 100 + 25))
  );

  const handleSignalInterest = (role: string) => {
    recordTeamInterest(role);
    setInterestRecorded(true);
    setTimeout(() => setInterestRecorded(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <Users className="w-3.5 h-3.5" />
          AI Team Formation Engine
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Inter-Disciplinary Campus Team Matcher
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Match your individual technical strengths against the project architecture requirements and identify your peer collaborators.
        </p>
      </div>

      {/* Project Context Callout */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Target Project Architecture
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">{projectTitle}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">
              Readiness Score
            </span>
            <span className="text-lg font-mono font-bold text-emerald-400">
              {readinessScore}/100
            </span>
          </div>
          <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Skill Selection */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Your Technical Competencies
              </h3>
              <span className="text-xs text-slate-400">Click to toggle</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => {
                const isSelected = activeSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected && <span className="font-bold text-blue-400">✓</span>}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              Adjusting your competencies dynamically updates your team role and reveals missing peer capabilities.
            </p>
          </div>
        </div>

        {/* Right: Match Breakdown & Recommended Roles */}
        <div className="lg:col-span-6 space-y-6">
          {/* Matched vs Missing */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
              Architecture Compatibility Breakdown
            </h3>

            <div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Skills You Cover ({matched.length}/{requiredSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matched.length > 0 ? (
                  matched.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No direct matches selected yet.</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-3.5 h-3.5" />
                Skills Your Team Should Recruit:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missing.length > 0 ? (
                  missing.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      Need: {m}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400">All required architecture skills covered!</span>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Roles */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
              Recommended Workshop Roles For You
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-950/20 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    Primary: AI Core & Algorithm Developer
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Lead the training, heuristic modeling, or prompt engineering pipeline during the 60-min build.
                  </p>
                </div>
                <button
                  onClick={() => handleSignalInterest('AI Core Developer')}
                  className="px-2.5 py-1 rounded text-[11px] font-semibold bg-blue-600 text-white hover:bg-blue-500 transition cursor-pointer shrink-0"
                >
                  Select Role
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Secondary: UI/UX & API Integrator
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Build the responsive Next.js frontend or connect the API micro-endpoints.
                  </p>
                </div>
                <button
                  onClick={() => handleSignalInterest('UI/UX Integrator')}
                  className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition cursor-pointer shrink-0"
                >
                  Select Role
                </button>
              </div>
            </div>

            {interestRecorded && (
              <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Role preference saved! You will be matched with complementary peer builders.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
