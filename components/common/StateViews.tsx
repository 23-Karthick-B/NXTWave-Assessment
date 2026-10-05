import React from 'react';
import { AlertCircle, FolderSearch, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function EmptyState({
  title = 'No items found',
  description = 'There is currently no data recorded for this section.',
  actionLabel,
  actionHref,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
      <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 mb-4">
        <FolderSearch className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      <p className="mt-1 text-xs text-slate-400 max-w-sm">{description}</p>
      {(actionLabel && actionHref) && (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      )}
      {(actionLabel && onAction) && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function LoadingState({ message = 'Loading intelligence module...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
      <p className="text-xs text-slate-400 font-medium tracking-wide">{message}</p>
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred while processing this request.',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-500/20 bg-rose-950/10">
      <AlertCircle className="w-8 h-8 text-rose-400 mb-2" />
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <p className="mt-1 text-xs text-slate-400 max-w-md">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
