import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import SearchPanel from "@/pages/sidebar/SearchPanel";

export default function MainLayout() {
  const {searchOpen} = useSidebar()
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      {searchOpen && <SearchPanel />}
      <main className="flex-1 bg-background text-foreground overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
