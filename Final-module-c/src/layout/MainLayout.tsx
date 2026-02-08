import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import SearchPanel from "@/pages/sidebar/SearchPanel";
import NotificationPanel from "@/pages/sidebar/NotificationPanel";
import MessageBubble from "./MessageBubble";

export default function MainLayout() {
  const { searchOpen, notificationOpen, collapsed } = useSidebar();
  const sidebarWidth = collapsed ? 59 : 240;
  const panelWidth = searchOpen || notificationOpen ? 400 : 0;

  return (
    <div className="h-screen bg-background text-foreground">
      <Sidebar />

      {searchOpen && <SearchPanel />}
      {notificationOpen && <NotificationPanel />}

      <main
        style={{
          marginLeft: sidebarWidth + panelWidth,
        }}
        className={`
          min-h-screen
        `}
      >
        {/* <div className="w-full max-w-[1900px] px-6"> */}
          <Outlet />
        {/* </div> */}
      </main>

      <MessageBubble/>
    </div>
  );
}
