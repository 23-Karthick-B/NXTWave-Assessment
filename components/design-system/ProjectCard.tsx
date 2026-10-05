import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Code2, Cpu } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BuildabilityGauge } from "@/components/design-system/BuildabilityGauge";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  problem: string;
  category?: string;
  buildabilityScore: number;
  technologyStack: string[];
  sixtyMinuteScope: string[];
  onAction?: () => void;
  actionLabel?: string;
  href?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  problem,
  category,
  buildabilityScore,
  technologyStack,
  sixtyMinuteScope,
  onAction,
  actionLabel = "View Blueprint",
  href,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("p-6 border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5", className)}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {category && (
              <Badge variant="purple" className="text-[10px] font-mono uppercase tracking-wider mb-1">
                {category}
              </Badge>
            )}
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
          </div>

          <BuildabilityGauge score={buildabilityScore} size="sm" showLabel={false} />
        </div>

        {/* Original Problem */}
        <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-850 text-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold block mb-0.5">
            Campus Problem:
          </span>
          <p className="text-zinc-300 italic">&ldquo;{problem}&rdquo;</p>
        </div>

        {/* 60-Minute Scope */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono">
            <Clock className="h-3 w-3" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">60-Minute Prototype Scope:</span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc marker:text-blue-500">
            {sixtyMinuteScope.slice(0, 3).map((item, idx) => (
              <li key={idx} className="line-clamp-1">{item}</li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologyStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
            >
              <Code2 className="h-2.5 w-2.5 text-zinc-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500">Buildability: {buildabilityScore}/100</span>
        {href ? (
          <Link href={href}>
            <Button size="sm" variant="glow" className="text-xs h-8">
              <span>{actionLabel}</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        ) : onAction ? (
          <Button size="sm" variant="glow" onClick={onAction} className="text-xs h-8">
            <span>{actionLabel}</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
