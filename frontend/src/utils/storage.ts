const isBrowser = typeof window !== 'undefined';

export const getJson = <T>(key: string, fallback: T): T => {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const setJson = <T>(key: string, value: T) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

