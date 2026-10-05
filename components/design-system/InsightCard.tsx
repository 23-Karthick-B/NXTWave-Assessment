import * as React from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface GrowthInsightProps {
  observation: string;
  evidence: string;
  recommendation: string;
  rationale: string;
  confidence: "High" | "Medium" | "Low";
  source?: string;
  category?: string;
  className?: string;
}

export function InsightCard({
  observation,
  evidence,
  recommendation,
  rationale,
  confidence,
  source = "Application Telemetry",
  category,
  className,
}: GrowthInsightProps) {
  const confidenceVariant = {
    High: "success",
    Medium: "warning",
    Low: "secondary",
  }[confidence] as "success" | "warning" | "secondary";

  return (
    <Card className={cn("p-6 border-zinc-800 bg-zinc-900/60 transition-all hover:border-zinc-700 space-y-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Growth Intelligence</span>
            {category && <span className="text-xs text-zinc-500 ml-2">· {category}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={confidenceVariant} className="text-[10px] font-mono">
            {confidence} Confidence
          </Badge>
          <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">{source}</span>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-semibold text-white tracking-tight leading-snug">
          {observation}
        </h4>
        <div className="text-xs text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-850 font-mono leading-relaxed">
          <span className="text-zinc-500 uppercase tracking-wider font-semibold mr-1.5">Evidence:</span>
          {evidence}
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800/80 space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <div className="mt-0.5 text-emerald-400 shrink-0">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px] font-mono mr-1.5">
              Recommendation:
            </span>
            <span className="text-zinc-200">{recommendation}</span>
          </div>
        </div>

        <div className="text-xs text-zinc-400 pl-5 leading-relaxed">
          <span className="text-zinc-500 font-semibold mr-1">Rationale:</span>
          {rationale}
        </div>
      </div>
    </Card>
  );
}
