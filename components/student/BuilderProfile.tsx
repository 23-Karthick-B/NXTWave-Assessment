'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/hooks/useStore';
import { StatusBadge } from '../common/DesignSystem';
import Link from 'next/link';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Users,
  Compass,
  Building,
  GraduationCap,
  Code2,
  Award,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics/eventTracker';

export function BuilderProfile() {
  const { currentStudent, currentProject, currentProblem, recordShare } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState('');

  const student = currentStudent || {
    name: 'Karthick S.',
    college: 'PSG College of Technology',
    branch: 'Computer Science & Engineering (CSE)',
    skills: ['Python', 'AI / ML Fundamentals', 'React / Next.js'],
    workshopRoleId: 'AI Core & Algorithm Engineer',
  };

  const project = currentProject || {
    id: 'demo-proj-1',
    title: 'AI Cafeteria Demand & Queue Predictor',
    tagline: 'Predict lunch rush congestion and meal demand to eliminate 30-minute campus lines',
    buildabilityScore: { totalScore: 87, badgeLevel: 'Highly Feasible' },
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Data Prep' },
      { stepNumber: 2, title: 'Model Training' },
      { stepNumber: 3, title: 'FastAPI Microservice' },
      { stepNumber: 4, title: 'Queue Visualizer' },
    ],
  };

  const problemText =
    currentProblem?.problemStatement ||
    'Students wait 30 minutes in cafeteria queues during lunch break, causing them to miss afternoon labs.';

  const shareText = `🚀 I just turned my campus problem into an AI project with AI Project Forge!\n\n📌 Problem: "${problemText.slice(0, 80)}..."\n💡 Project: ${project.title}\n⚡ Buildability: ${project.buildabilityScore.totalScore}/100\n🛠 60-Minute Scope: Data Prep → Model Training → Dashboard\n\nTurn YOUR college problem into an AI project here:\n${typeof window !== 'undefined' ? window.location.origin : 'https://ai-project-forge.app'}/problem`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      recordShare(project.id, 'clipboard_copy');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSimulateShare = (channel: 'WhatsApp' | 'LinkedIn') => {
    recordShare(project.id, channel.toLowerCase());
    setShareSuccess(`Shared to ${channel}! Link configured to /problem for organic viral loop.`);
    setTimeout(() => setShareSuccess(''), 3500);

    if (channel === 'WhatsApp') {
      const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    } else if (channel === 'LinkedIn') {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        `${typeof window !== 'undefined' ? window.location.origin : ''}/problem`
      )}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/80 to-slate-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/20">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{student.name}</h1>
                <StatusBadge text="Verified AI Builder" variant="success" size="sm" />
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  {student.college}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  {student.branch}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/team"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 transition flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              Find Project Team
            </Link>
          </div>
        </div>

        {/* Role & Recommendation */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
              Suggested 60-Minute Workshop Role
            </span>
            <div className="mt-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                {student.workshopRoleId || 'AI Core & Algorithm Developer'}
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Based on your declared competencies, you are well-positioned to drive model integration and API structuring.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
              Your Competency Stack
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {student.skills.map((sk: string) => (
                <span
                  key={sk}
                  className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shareable Project Card Section (Step 17 Acquisition Loop) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Primary Organic Growth Loop
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
              Shareable Campus Project Card
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Share your project with college batchmates. Link navigates directly to <code className="text-blue-300">/problem</code> so they turn their own friction into AI projects.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Prompt Link!' : 'Copy Share Card'}
            </button>
            <button
              onClick={() => handleSimulateShare('WhatsApp')}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <button
              onClick={() => handleSimulateShare('LinkedIn')}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              LinkedIn
            </button>
          </div>
        </div>

        {shareSuccess && (
          <div className="mt-4 p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {shareSuccess}
          </div>
        )}

        {/* Visual Card Preview */}
        <div className="mt-6 max-w-xl mx-auto rounded-2xl border-2 border-blue-500/40 bg-gradient-to-b from-slate-900 to-[#090a0f] p-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              AI PROJECT FORGE
            </span>
            <span className="font-mono text-[10px] text-blue-400 uppercase tracking-wider">
              Campus AI Challenge
            </span>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-slate-400 italic">
              &ldquo;I turned my campus problem into an AI project:&rdquo;
            </div>

            <div className="text-lg font-black text-white tracking-tight leading-snug">
              {project.title}
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-slate-800 bg-slate-950">
              <span className="text-xs text-slate-400">Buildability Score</span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">
                {project.buildabilityScore.totalScore}/100
              </span>
            </div>

            <div className="text-xs text-slate-300">
              <span className="font-semibold text-slate-200">60-Min Scope: </span>
              {project.sixtyMinuteScope
                ? project.sixtyMinuteScope.map((s: { title: string }) => s.title).join(' → ')
                : 'Data Prep → Model Training → Dashboard'}
            </div>
          </div>

          {/* Card Footer Call to Action */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500">
              Builder: {student.name} ({student.college})
            </span>
            <span className="font-bold text-blue-400 flex items-center gap-1">
              Turn YOUR problem into an AI project <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Next Step Exploration Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/campus"
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Explore Campus Problem Heatmap
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              See recurring problems submitted across 20+ engineering colleges.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-blue-400 transition-all shrink-0" />
        </Link>

        <Link
          href="/challenge"
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              View Collective AI Campus Challenges
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              See aggregated challenges synthesized from college problem clusters.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-blue-400 transition-all shrink-0" />
        </Link>
      </div>
    </div>
  );
}
