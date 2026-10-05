import React from 'react';

export function PageContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-8 sm:py-12 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  action,
  centered = false,
}: {
  badge?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${
        centered ? 'text-center md:text-center items-center' : ''
      }`}
    >
      <div className={centered ? 'max-w-2xl mx-auto' : 'max-w-3xl'}>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h2>
        {description && (
          <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  subvalue,
  trend,
  trendPositive,
  icon: Icon,
  variant = 'default',
}: {
  label: string;
  value: string | number;
  subvalue?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: any;
  variant?: 'default' | 'primary' | 'success' | 'amber';
}) {
  const borderColors = {
    default: 'border-slate-800 bg-slate-900/60',
    primary: 'border-blue-500/30 bg-blue-950/20',
    success: 'border-emerald-500/30 bg-emerald-950/20',
    amber: 'border-amber-500/30 bg-amber-950/20',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-5 backdrop-blur-sm transition-all hover:border-slate-700 ${borderColors[variant]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 text-blue-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {value}
        </span>
        {subvalue && <span className="text-xs text-slate-400">{subvalue}</span>}
      </div>
      {trend && (
        <div className="mt-2 flex items-center text-xs">
          <span
            className={`font-medium ${
              trendPositive === false ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({
  text,
  variant = 'default',
  size = 'md',
}: {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}) {
  const styles = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border tracking-wide ${styles[variant]} ${sizes[size]}`}
    >
      {text}
    </span>
  );
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'blue',
}: {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'purple';
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const barColors = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-mono text-slate-300">{percentage}%</span>}
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
