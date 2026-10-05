"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Terminal, BarChart3, Compass, Users, Layers, ShieldAlert, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/problem", label: "Submit Problem", icon: Sparkles },
    { href: "/campus", label: "Campus Map", icon: Compass },
    { href: "/challenge", label: "Challenges", icon: Layers },
    { href: "/team", label: "Team Matcher", icon: Users },
    { href: "/admin", label: "Growth Admin", icon: BarChart3 },
    { href: "/demo", label: "Simulator", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-400 group-hover:border-blue-500/60 group-hover:bg-blue-600/20 transition-all">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors text-base">
                  AI PROJECT FORGE
                </span>
                <Badge variant="purple" className="text-[10px] py-0 px-1.5 hidden sm:inline-flex font-mono">
                  60-MIN CHALLENGE
                </Badge>
              </div>
              <p className="text-[10px] text-zinc-400 tracking-wider uppercase font-medium">Value-First Campus Engine</p>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-400" : "text-zinc-500"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/about" className="text-xs text-zinc-400 hover:text-zinc-200 hidden lg:inline-block">
            Decisions
          </Link>
          <Link href="/problem">
            <Button size="sm" variant="glow" className="text-xs font-semibold gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Forge Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
