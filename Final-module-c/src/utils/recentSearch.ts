export type RecentSearch = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
};

const KEY = "recent_searches";

export const getRecentSearches = (): RecentSearch[] => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const addRecentSearch = (user: RecentSearch) => {
  const current = getRecentSearches();
  const filtered = current.filter((u) => u._id !== user._id);
  const updated = [user, ...filtered].slice(0, 10);
  localStorage.setItem(KEY, JSON.stringify(updated));
};

export function deleteRecentSearch(userId: string) {
  const current = getRecentSearches();
  const updated = current.filter((u) => u._id !== userId);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export const clearRecentSearches = () => {
  localStorage.removeItem(KEY);
};
