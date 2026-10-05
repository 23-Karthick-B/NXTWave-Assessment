const STORAGE_KEY_PREFIX = 'ai-project-forge:v1:';

// In-memory fallback if localStorage is disabled or throws (e.g. Incognito or SSR)
const memoryStore: Record<string, string> = {};

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  const fullKey = `${STORAGE_KEY_PREFIX}${key}`;
  try {
    const serialized = JSON.stringify(data);
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(fullKey, serialized);
    } else {
      memoryStore[fullKey] = serialized;
    }
  } catch (error) {
    console.warn(`Failed to save key "${key}" to storage, using in-memory fallback.`, error);
    try {
      memoryStore[fullKey] = JSON.stringify(data);
    } catch {
      // ignore
    }
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  const fullKey = `${STORAGE_KEY_PREFIX}${key}`;
  try {
    let serialized: string | null = null;
    if (isLocalStorageAvailable()) {
      serialized = window.localStorage.getItem(fullKey);
    }
    if (!serialized && memoryStore[fullKey]) {
      serialized = memoryStore[fullKey];
    }
    if (!serialized) return fallback;
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.warn(`Failed to parse stored key "${key}", returning fallback.`, error);
    return fallback;
  }
}

export function removeFromStorage(key: string): void {
  const fullKey = `${STORAGE_KEY_PREFIX}${key}`;
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(fullKey);
    }
    delete memoryStore[fullKey];
  } catch (error) {
    console.warn(`Failed to remove key "${key}".`, error);
  }
}

export function clearAllProjectStorage(): void {
  try {
    if (isLocalStorageAvailable()) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(STORAGE_KEY_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    }
    Object.keys(memoryStore).forEach((k) => {
      if (k.startsWith(STORAGE_KEY_PREFIX)) delete memoryStore[k];
    });
  } catch (e) {
    console.warn('Failed to clear storage.', e);
  }
}
