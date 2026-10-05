import { AnalyticsEvent, EventType } from '@/types';
import { loadFromStorage, saveToStorage } from '../storage';

const EVENTS_STORAGE_KEY = 'analytics_events';
const SESSION_STORAGE_KEY = 'analytics_session_id';

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'ssr-session';
  let sessionId = loadFromStorage<string | null>(SESSION_STORAGE_KEY, null);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    saveToStorage(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

export function trackEvent(
  eventName: EventType,
  details: {
    studentId?: string;
    projectId?: string;
    campusId?: string;
    metadata?: Record<string, unknown>;
  } = {}
): AnalyticsEvent {
  const event: AnalyticsEvent = {
    id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    eventName,
    timestamp: new Date().toISOString(),
    sessionId: getOrCreateSessionId(),
    studentId: details.studentId,
    projectId: details.projectId,
    campusId: details.campusId,
    metadata: details.metadata || {},
  };

  try {
    const existingEvents = loadFromStorage<AnalyticsEvent[]>(EVENTS_STORAGE_KEY, []);
    existingEvents.push(event);
    // Keep last 1,000 events to ensure local performance
    if (existingEvents.length > 1000) {
      existingEvents.splice(0, existingEvents.length - 1000);
    }
    saveToStorage(EVENTS_STORAGE_KEY, existingEvents);
  } catch (err) {
    console.warn('Failed to track event locally:', err);
  }

  return event;
}

export function getAllEvents(): AnalyticsEvent[] {
  return loadFromStorage<AnalyticsEvent[]>(EVENTS_STORAGE_KEY, []);
}

export function clearEvents(): void {
  saveToStorage(EVENTS_STORAGE_KEY, []);
}
