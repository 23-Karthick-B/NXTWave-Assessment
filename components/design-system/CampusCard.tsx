import * as React from "react";
import { Building, MapPin, Sparkles, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface CampusCardProps {
  id?: string;
  name: string;
  city?: string;
  state?: string;
  problemCount: number;
  projectCount: number;
  studentCount: number;
  topCategory?: string;
  avgBuildability?: number;
  className?: string;
}

export function CampusCard({
  name,
  city,
  state,
  problemCount,
  projectCount,
  studentCount,
  topCategory,
  avgBuildability,
  className,
}: CampusCardProps) {
  return (
    <Card className={cn("p-5 border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-all space-y-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <MapPin className="h-3 w-3 text-blue-400" />
            <span>{[city, state].filter(Boolean).join(", ") || "India"}</span>
          </div>
          <h4 className="text-base font-bold text-white tracking-tight leading-snug">{name}</h4>
        </div>
        {topCategory && (
          <Badge variant="default" className="text-[10px] font-mono capitalize">
            {topCategory}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-zinc-950/60 border border-zinc-850 text-center font-mono">
        <div>
          <span className="block text-[10px] text-zinc-500 uppercase">Problems</span>
          <span className="text-sm font-bold text-white">{problemCount}</span>
        </div>
        <div>
          <span className="block text-[10px] text-zinc-500 uppercase">Projects</span>
          <span className="text-sm font-bold text-blue-400">{projectCount}</span>
        </div>
        <div>
          <span className="block text-[10px] text-zinc-500 uppercase">Students</span>
          <span className="text-sm font-bold text-emerald-400">{studentCount}</span>
        </div>
      </div>

      {avgBuildability && (
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
          <span className="text-[11px] text-zinc-500">Average Buildability:</span>
          <span className="text-emerald-400 font-semibold">{avgBuildability}/100</span>
        </div>
      )}
    </Card>
  );
}
