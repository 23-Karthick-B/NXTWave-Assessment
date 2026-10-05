import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide" | "full";
}

export function PageContainer({
  children,
  className,
  size = "default",
  ...props
}: PageContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
    full: "max-w-full px-4 sm:px-6 lg:px-8",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-8 sm:py-12", className)} {...props}>
      {children}
    </section>
  );
}

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "destructive" | "purple";
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4",
        align === "center" && "text-center md:flex-col md:items-center",
        className
      )}
    >
      <div className={cn("space-y-1.5", align === "center" && "max-w-2xl mx-auto")}>
        {badge && (
          <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 uppercase font-mono">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
