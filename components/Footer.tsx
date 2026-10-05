import Link from "next/link";
import { Terminal, Shield, Sparkles, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/90 py-12 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Terminal className="h-4 w-4 text-blue-400" />
              <span>AI PROJECT FORGE</span>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed text-xs">
              A value-first growth experiment transforming real college problems into structured, 60-minute buildable AI projects. 
              Built for the 60-Minute AI Campus Challenge with an acquisition budget of ₹2,000 targeting 500 final-year engineers.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>Zero-database client runtime with privacy-first synthetic masking</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 text-xs tracking-wider uppercase">Product Engine</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/problem" className="hover:text-blue-400 transition-colors">Problem to Project</Link></li>
              <li><Link href="/campus" className="hover:text-blue-400 transition-colors">Campus Problem Map</Link></li>
              <li><Link href="/challenge" className="hover:text-blue-400 transition-colors">AI Campus Challenges</Link></li>
              <li><Link href="/team" className="hover:text-blue-400 transition-colors">AI Team Matcher</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 text-xs tracking-wider uppercase">Growth & Assessment</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin Growth Center</Link></li>
              <li><Link href="/admin/experiments" className="hover:text-blue-400 transition-colors">A/B Testing Hub</Link></li>
              <li><Link href="/demo" className="hover:text-blue-400 transition-colors">7-Day Simulator</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">AI vs Human Decisions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} AI Project Forge. Built for evaluation & growth challenge.</p>
          <p className="flex items-center gap-1.5">
            <span>Core Hypothesis:</span>
            <span className="text-zinc-300 font-medium">Deliver immediate value before registration.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
