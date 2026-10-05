'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/hooks/useStore';
import { ENGINEERING_BRANCHES, SKILL_OPTIONS, WORKSHOP_DETAILS } from '@/config/campaign';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Calendar, Clock, Trophy } from 'lucide-react';
import Link from 'next/link';

export function RegistrationForm() {
  const router = useRouter();
  const { currentProject, registerStudent } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState(ENGINEERING_BRANCHES[0] as string);
  const [isFinalYear, setIsFinalYear] = useState(true);
  const [skills, setSkills] = useState<string[]>(['Python', 'React / Next.js']);
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState('');

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.length < 2) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid college email address.');
      return;
    }
    if (!college.trim() || college.length < 3) {
      setError('Please specify your engineering college or university.');
      return;
    }
    if (!isFinalYear) {
      setError('This challenge is reserved for final-year / pre-final engineering students.');
      return;
    }
    if (!consent) {
      setError('Please agree to receive workshop confirmation and calendar invites.');
      return;
    }

    try {
      const student = registerStudent({
        name: name.trim(),
        email: email.trim(),
        college: college.trim(),
        branch,
        isFinalYear,
        skills,
      });

      router.push('/student');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Failed to record registration. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Workshop context header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Value Delivered — Workshop Registration
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Build Your First AI Project in 60 Minutes
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Turn your personalized project blueprint into a working, deployed prototype with live mentor guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-5"
          >
            <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800">
              Final-Year Engineering Registration
            </h2>

            {/* Name */}
            <div>
              <label htmlFor="regName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name
              </label>
              <input
                id="regName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Karthick S."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="regEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                College / Personal Email
              </label>
              <input
                id="regEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. karthick@example.test"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Your email remains private and will be masked as <code className="text-slate-400">kar***@domain</code> in community leaderboards.
              </p>
            </div>

            {/* College */}
            <div>
              <label htmlFor="regCollege" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                College / University Name
              </label>
              <input
                id="regCollege"
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. PSG College of Technology, Coimbatore"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Branch */}
            <div>
              <label htmlFor="regBranch" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Engineering Discipline / Branch
              </label>
              <select
                id="regBranch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                {ENGINEERING_BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Final Year Confirmation */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-950/60">
              <input
                id="finalYearCheck"
                type="checkbox"
                checked={isFinalYear}
                onChange={(e) => setIsFinalYear(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <label htmlFor="finalYearCheck" className="text-xs text-slate-300 leading-normal">
                <span className="font-semibold text-white">I confirm I am a final-year or pre-final year student</span> preparing for capstones, major projects, or placement interviews.
              </label>
            </div>

            {/* Skills selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Your Technical Skills (Select all that apply for peer matching):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {skill} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="consentCheck"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <label htmlFor="consentCheck" className="text-[11px] text-slate-400 leading-tight">
                I agree to receive workshop connection details, GitHub starter templates, and team-matching alerts.
              </label>
            </div>

            {error && (
              <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/20 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>COMPLETE FREE REGISTRATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Workshop Details Side Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              What You&apos;ll Achieve in 60 Minutes
            </h3>

            <div className="space-y-3">
              {WORKSHOP_DETAILS.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Workshop Format:</span>
                <span className="font-semibold text-slate-200">Live Virtual Hands-On</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Duration:</span>
                <span className="font-semibold text-slate-200">60 Minutes Guaranteed</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Access Fee:</span>
                <span className="font-semibold text-emerald-400">100% Free (Sponsored)</span>
              </div>
            </div>
          </div>

          {currentProject && (
            <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-5">
              <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider">
                Assigned Project Blueprint
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{currentProject.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{currentProject.tagline}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-blue-500/20">
                <span>Buildability Score:</span>
                <span className="font-mono font-bold text-blue-400">
                  {currentProject.buildabilityScore.totalScore}/100
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
