export const resolveMedia = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://instagram.f8team.dev${url}`;
};
