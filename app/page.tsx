import Link from 'next/link';
import {
  ArrowRight,
  ArrowDownRight,
  Check,
  Clock,
  Cpu,
  Users,
} from 'lucide-react';
import { CAMPAIGN_CONFIG } from '@/config/campaign';

const campaignChannels = [
  {
    channel: 'Campus clubs + placement cells',
    mechanic: '20 partner groups × 15 registrations',
    target: 300,
    detail: 'Give each club a ready-to-forward invite and a sample project built from a campus issue.',
  },
  {
    channel: 'Class reps + student referrals',
    mechanic: '40 class reps × 5 incremental registrations',
    target: 200,
    detail: 'Each rep shares a trackable link with their batch; count unique registrations only.',
  },
];

const sevenDayPlan = [
  ['01', 'Recruit', 'Confirm 20 clubs and 40 class reps.', '30'],
  ['02', 'Equip', 'Send partner kit, QR invite and sample blueprint.', '90'],
  ['03', 'Launch', 'Clubs post to official groups; reps share to batches.', '160'],
  ['04', 'Show proof', 'Publish the strongest student-generated project.', '240'],
  ['05', 'Activate', 'Run a short live build preview in partner groups.', '330'],
  ['06', 'Follow up', 'Ask partners to resend to non-registrants.', '420'],
  ['07', 'Close', 'Final reminder with workshop outcome and start time.', '500'],
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80">
        {/* Subtle grid background & glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            NXTWAVE GROWTH CHALLENGE · 7 DAYS · ₹2,000
          </div>

          {/* Primary Hero Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
            MAKE A REAL CAMPUS PROBLEM <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-lime-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              THE REASON STUDENTS SHOW UP.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Final-year engineers don&apos;t need another generic AI webinar. Give them a useful project blueprint first, then invite them to build it live in 60 minutes.
          </p>

          {/* Core Growth Principle Callout */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <span>
              <strong>Value before signup:</strong> Get a campus-specific project idea, feasibility score and 60-minute build plan for free.
            </span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/problem"
              className="w-full sm:w-auto py-4 px-8 rounded-xl font-extrabold text-sm sm:text-base tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>GENERATE MY PROJECT PLAN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#campaign"
              className="w-full sm:w-auto py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-slate-300 bg-slate-900/90 border border-slate-700 hover:bg-slate-800 hover:text-white transition flex items-center justify-center gap-2"
            >
              See the 500-seat plan <ArrowDownRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Campaign Constraint Stats */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Target</span>
              <span className="text-sm font-bold text-white">{CAMPAIGN_CONFIG.targetRegistrations} unique signups</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total budget</span>
              <span className="text-sm font-bold text-emerald-400">₹{CAMPAIGN_CONFIG.budgetInr}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Workshop</span>
              <span className="text-sm font-bold text-blue-400">Build in 60 minutes</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Runway</span>
              <span className="text-sm font-bold text-cyan-400">{CAMPAIGN_CONFIG.durationDays} days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Representation of: Problem → AI → Project (Step 9 requirement) */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            The Value-First Engine In Action
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            From Campus Friction to Scoped AI Prototype
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Watch how a single student grievance transforms into a portfolio-ready engineering project.
          </p>
        </div>

        {/* 3 Step Interactive Card Chain */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Card 1: Problem */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold text-blue-400">STEP 1</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Input</span>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Real Campus Problem</h3>
              <div className="mt-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 italic leading-relaxed">
                &ldquo;Students wait 30 minutes in cafeteria queues during lunch break because the kitchen has no visibility into class schedules...&rdquo;
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              Reported by hostellers & day scholars daily.
            </div>
          </div>

          {/* Card 2: AI Transformation */}
          <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col justify-between space-y-4 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
              AI Forge Synthesis
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-blue-300 mb-2">
                <span className="font-bold text-blue-400">STEP 2</span>
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">AI Analysis & Scoring</h3>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-400">Identified Project:</span>
                  <span className="font-bold text-blue-300">AI Cafeteria Rush Predictor</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-400">Buildability Score:</span>
                  <span className="font-mono font-bold text-emerald-400">87/100 (Highly Feasible)</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-blue-300/80">
              Evaluated across 6 feasibility dimensions.
            </div>
          </div>

          {/* Card 3: 60-Minute Scope */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold text-emerald-400">STEP 3</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">60-Minute Build Plan</h3>
              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center">1</span>
                  <span>Prepare Footfall CSV Dataset (12m)</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center">2</span>
                  <span>Train Regression Model (18m)</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center">3</span>
                  <span>Deploy Queue Dashboard (18m)</span>
                </div>
              </div>
            </div>
            <Link
              href="/problem"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Test with your own problem <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="audience-title">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Who this is for</span>
            <h2 id="audience-title" className="mt-2 max-w-sm text-2xl font-bold text-white sm:text-3xl">
              Portfolio pressure. Not another webinar.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-l-2 border-amber-300 pl-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Users className="h-4 w-4 text-amber-300" /> Final-year engineering students</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Especially students who need credible project proof for placements but aren&apos;t sure how to scope or start an AI build.</p>
            </div>
            <div className="border-l-2 border-cyan-300 pl-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Check className="h-4 w-4 text-cyan-300" /> A reason to register now</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">They get a project plan based on a problem they recognize, a realistic first build, and something worth sharing with peers.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="campaign" className="border-y border-slate-800 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">The acquisition plan</span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Two channels. 500 unique registrations.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">Campus partners lend trust; student sharing adds reach. Signup totals are deduplicated by email and partner code.</p>
          </div>

          <div className="mt-8 grid gap-x-10 lg:grid-cols-2">
            {campaignChannels.map((item, index) => (
              <article key={item.channel} className="grid grid-cols-[1fr_auto] gap-4 border-t border-slate-700 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Channel 0{index + 1}</p>
                  <h3 className="mt-2 text-base font-bold text-white">{item.channel}</h3>
                  <p className="mt-2 text-sm font-semibold text-emerald-300">{item.mechanic}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
                <div className="self-start text-right">
                  <span className="text-3xl font-bold text-white">{item.target}</span>
                  <span className="ml-1 text-xs text-slate-500">signups</span>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300"><strong className="mr-2 text-xl text-emerald-300">500</strong> unique registrations target</p>
            <p className="text-xs text-slate-500">₹1,200 partner QR kits · ₹800 rep data support · ₹0 paid ads</p>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Seven-day execution</span>
              <h3 className="mt-2 text-xl font-bold text-white">One action and one cumulative target per day.</h3>
            </div>
            <p className="text-[11px] text-slate-500">Illustrative targets, not live results</p>
          </div>

          <ol className="mt-5 grid gap-px overflow-hidden rounded-lg border border-slate-800 bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
            {sevenDayPlan.map(([day, action, detail, target]) => (
              <li key={day} className="flex min-h-32 flex-col justify-between bg-slate-950/80 p-4 last:lg:col-span-4">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-[10px] font-semibold uppercase text-slate-500">Day {day}</p><h4 className="mt-1 text-sm font-semibold text-white">{action}</h4></div>
                  <span className="font-mono text-sm text-emerald-300">{target}</span>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-400">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Try the working asset</p>
          <h2 className="mt-2 text-xl font-bold text-white">Start with a problem. Leave with a build plan.</h2>
          <p className="mt-1 text-sm text-slate-400">Generate your blueprint before deciding whether to register.</p>
        </div>
        <Link href="/problem" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
          Generate my project plan <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
