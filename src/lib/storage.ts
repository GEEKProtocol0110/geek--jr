export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return fallback;
    }
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Intentionally ignore storage errors to keep gameplay uninterrupted.
  }
}
