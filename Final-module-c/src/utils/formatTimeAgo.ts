export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);

  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diffInSeconds < 10) return "Recently";

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;

  return created.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "numeric",
  });
}
