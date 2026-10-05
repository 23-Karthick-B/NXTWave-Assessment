import React from 'react';
import Link from 'next/link';
import { CAMPAIGN_CONFIG } from '@/config/campaign';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/70 py-6 text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span className="font-bold">AI PROJECT FORGE</span>
          </div>
          <p className="mt-2">A campus problem, turned into a buildable AI project.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/problem" className="hover:text-emerald-300">Try the generator</Link>
          <Link href="/#campaign" className="hover:text-emerald-300">Campaign plan</Link>
          <span className="text-slate-500">{CAMPAIGN_CONFIG.targetRegistrations} students · ₹{CAMPAIGN_CONFIG.budgetInr} · {CAMPAIGN_CONFIG.durationDays} days</span>
        </nav>
      </div>
    </footer>
  );
}
