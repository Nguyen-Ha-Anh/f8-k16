import { notifications } from "@/mock/notificationAPI";

export default function NotificationPanel() {
  return (
    <div
      className="
      fixed
      top-0
      left-[59px]
      w-[400px]
      h-screen
      border-r
      border-border
      bg-background
      p-4
      z-40"
    >
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {/* list */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
          >
            {/* left */}
            <div className="flex items-center gap-3">
              <img
                src={n.user.avatar}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="text-sm leading-tight">
                <span className="font-semibold">{n.user.username}</span> liked
                your post
                <div className="text-xs text-muted-foreground">{n.time}</div>
              </div>
            </div>

            <img
              src={n.postThumbnail}
              className="w-10 h-10 rounded object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
