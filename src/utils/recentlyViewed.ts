const STORAGE_KEY = "recentlyViewedEvents";
const MAX_ITEMS = 8;

export const addRecentlyViewed = (eventId: number) => {
  const existing = getRecentlyViewedIds().filter((id) => id !== eventId);
  const updated = [eventId, ...existing].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getRecentlyViewedIds = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
