import * as React from "react";
import { AlertCircle, FileSearch, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center border-dashed border-zinc-800 bg-zinc-950/40",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 mb-4">
        {icon || <FileSearch className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
        <Button size="sm" onClick={action.onClick} variant="secondary">
          {action.label}
        </Button>
      )}
    </Card>
  );
}

export interface LoadingStateProps {
  message?: string;
  subtext?: string;
  className?: string;
}

export function LoadingState({
  message = "Loading...",
  subtext,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">{message}</h4>
      {subtext && <p className="text-xs text-zinc-400 max-w-xs">{subtext}</p>}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  retry,
  className,
}: ErrorStateProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center border-rose-900/40 bg-rose-950/10",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-3">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h4 className="text-sm font-semibold text-rose-200 mb-1">{title}</h4>
      <p className="text-xs text-rose-300/80 max-w-sm mb-4 leading-relaxed">
        {message}
      </p>
      {retry && (
        <Button size="sm" variant="secondary" onClick={retry} className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Try Again</span>
        </Button>
      )}
    </Card>
  );
}
