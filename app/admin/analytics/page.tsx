'use client';

import React, { useEffect, useState } from 'react';
import { PageContainer, StatusBadge } from '@/components/common/DesignSystem';
import { getAllEvents, clearEvents } from '@/lib/analytics/eventTracker';
import { AnalyticsEvent } from '@/types';
import { ArrowLeft, Activity, Trash2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminAnalyticsPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  const loadEvents = () => {
    setEvents(getAllEvents().reverse());
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleClear = () => {
    clearEvents();
    loadEvents();
  };

  return (
    <PageContainer>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb / Nav */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link
            href="/admin"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Growth Command Center
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={loadEvents}
              className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 transition flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
            <button
              onClick={handleClear}
              className="px-2.5 py-1 rounded text-xs bg-rose-950/40 text-rose-300 border border-rose-800/40 hover:bg-rose-900/40 transition flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> Clear Local Events
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Central Analytics Event Stream ({events.length} Logged)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time local event telemetry capturing student progression across all 8 funnel stages.
          </p>
        </div>

        {/* Events Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Event Name</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Session ID</th>
                  <th className="py-3.5 px-4">Payload / Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {events.length > 0 ? (
                  events.slice(0, 50).map((ev) => (
                    <tr key={ev.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4">
                        <span className="font-sans font-bold text-blue-300 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900/50">
                          {ev.eventName}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {new Date(ev.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap truncate max-w-[120px]">
                        {ev.sessionId}
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-md truncate">
                        {JSON.stringify(ev.metadata || {})}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500 italic">
                      No events tracked in this active session yet. Browse the app or load demo mode.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
