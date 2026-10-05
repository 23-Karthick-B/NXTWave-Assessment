import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: "draft" | "submitted" | "analyzing" | "generated" | "registered" | "shared" | "high" | "medium" | "low" | "active" | "completed";
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const map: Record<string, { variant: "default" | "secondary" | "success" | "warning" | "destructive" | "purple"; text: string }> = {
    draft: { variant: "secondary", text: "Draft" },
    submitted: { variant: "default", text: "Problem Submitted" },
    analyzing: { variant: "purple", text: "AI Analyzing" },
    generated: { variant: "success", text: "Project Generated" },
    registered: { variant: "success", text: "Registered" },
    shared: { variant: "purple", text: "Shared" },
    high: { variant: "success", text: "High Feasibility" },
    medium: { variant: "warning", text: "Moderate Scope" },
    low: { variant: "destructive", text: "Complex Scope" },
    active: { variant: "default", text: "Active" },
    completed: { variant: "success", text: "Completed" },
  };

  const item = map[status] || { variant: "secondary", text: status };

  return (
    <Badge variant={item.variant} className={cn("capitalize font-mono text-[11px]", className)}>
      {label || item.text}
    </Badge>
  );
}
