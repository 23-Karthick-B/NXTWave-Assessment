import * as React from "react";
import { cn } from "@/lib/utils";
import { Award, Zap, AlertTriangle } from "lucide-react";

export interface BuildabilityGaugeProps {
  score: number; // 0 - 100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function BuildabilityGauge({
  score,
  size = "md",
  showLabel = true,
  className,
}: BuildabilityGaugeProps) {
  const normalized = Math.min(Math.max(score, 0), 100);

  // Color mapping based on score
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#10b981", text: "text-emerald-400", badge: "High 60-Min Feasibility", bg: "bg-emerald-500/10", border: "border-emerald-500/30" };
    if (s >= 65) return { stroke: "#3b82f6", text: "text-blue-400", badge: "Buildable with Guidance", bg: "bg-blue-500/10", border: "border-blue-500/30" };
    if (s >= 50) return { stroke: "#f59e0b", text: "text-amber-400", badge: "Requires Scope Reduction", bg: "bg-amber-500/10", border: "border-amber-500/30" };
    return { stroke: "#f43f5e", text: "text-rose-400", badge: "High Complexity", bg: "bg-rose-500/10", border: "border-rose-500/30" };
  };

  const color = getColor(normalized);

  const dimensions = {
    sm: { size: 64, stroke: 6, textClass: "text-base font-bold", labelClass: "text-[10px]" },
    md: { size: 96, stroke: 8, textClass: "text-2xl font-bold", labelClass: "text-xs" },
    lg: { size: 128, stroke: 10, textClass: "text-3xl font-extrabold", labelClass: "text-sm" },
  }[size];

  const radius = (dimensions.size - dimensions.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalized / 100) * circumference;

  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dimensions.size}
          height={dimensions.size}
          className="-rotate-90 transform"
        >
          {/* Background circle */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke="#27272a"
            strokeWidth={dimensions.stroke}
            fill="transparent"
          />
          {/* Value circle */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth={dimensions.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className={cn("font-mono tracking-tight", dimensions.textClass, color.text)}>
            {normalized}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">/100</span>
        </div>
      </div>

      {showLabel && (
        <div className={cn("px-2.5 py-0.5 rounded-full border text-[11px] font-medium font-mono", color.bg, color.border, color.text)}>
          {color.badge}
        </div>
      )}
    </div>
  );
}
