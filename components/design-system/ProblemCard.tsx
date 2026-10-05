import * as React from "react";
import { Sparkles, Users, AlertCircle, ArrowRight, Building } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ProblemCardProps {
  id?: string;
  problem: string;
  category: string;
  campusName?: string;
  affectedUsers?: string;
  severity?: "low" | "medium" | "high" | "critical";
  submissionCount?: number;
  onSelect?: () => void;
  className?: string;
}

export function ProblemCard({
  problem,
  category,
  campusName,
  affectedUsers,
  severity = "medium",
  submissionCount,
  onSelect,
  className,
}: ProblemCardProps) {
  const severityMap = {
    low: { variant: "secondary" as const, label: "Low Severity" },
    medium: { variant: "warning" as const, label: "Medium Severity" },
    high: { variant: "destructive" as const, label: "High Severity" },
    critical: { variant: "destructive" as const, label: "Critical Campus Need" },
  };

  return (
    <Card className={cn("p-5 border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all flex flex-col justify-between group", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant="default" className="text-[11px] font-mono capitalize">
            {category}
          </Badge>
          <div className="flex items-center gap-2">
            {submissionCount && (
              <span className="text-[11px] text-zinc-400 font-mono">
                {submissionCount} submissions
              </span>
            )}
            <Badge variant={severityMap[severity].variant} className="text-[10px] font-mono">
              {severityMap[severity].label}
            </Badge>
          </div>
        </div>

        <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors leading-relaxed">
          &ldquo;{problem}&rdquo;
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          {campusName && (
            <span className="inline-flex items-center gap-1 text-[11px]">
              <Building className="h-3 w-3 text-zinc-500" />
              <span className="truncate max-w-[140px]">{campusName}</span>
            </span>
          )}
          {affectedUsers && (
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hidden sm:inline-flex">
              <Users className="h-3 w-3 text-zinc-500" />
              <span>{affectedUsers}</span>
            </span>
          )}
        </div>

        {onSelect && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onSelect}
            className="text-xs h-7 px-2 text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Forge Project</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
    </Card>
  );
}
