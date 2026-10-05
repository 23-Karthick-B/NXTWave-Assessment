import * as React from "react";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  target?: string;
  icon?: LucideIcon;
  description?: string;
  highlight?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  target,
  icon: Icon,
  description,
  highlight = false,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "p-5 transition-all duration-200 border-zinc-800 bg-zinc-900/50 hover:border-zinc-700/80",
        highlight && "border-blue-500/40 bg-blue-950/15 shadow-blue-500/5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400 tracking-wide uppercase font-mono">
          {label}
        </span>
        {Icon && (
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg border text-zinc-400",
              highlight
                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                : "border-zinc-800 bg-zinc-950/60"
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          {value}
        </span>
        {target && (
          <span className="text-xs text-zinc-500 font-mono">
            / {target}
          </span>
        )}
      </div>

      {(change || description) && (
        <div className="mt-2.5 flex items-center justify-between text-xs">
          {change && (
            <div
              className={cn(
                "inline-flex items-center gap-1 font-medium",
                trend === "up" && "text-emerald-400",
                trend === "down" && "text-rose-400",
                (!trend || trend === "neutral") && "text-zinc-400"
              )}
            >
              {trend === "up" && <TrendingUp className="h-3 w-3" />}
              {trend === "down" && <TrendingDown className="h-3 w-3" />}
              {trend === "neutral" && <Minus className="h-3 w-3" />}
              <span>{change}</span>
            </div>
          )}
          {description && (
            <span className="text-zinc-500 truncate">{description}</span>
          )}
        </div>
      )}
    </Card>
  );
}
