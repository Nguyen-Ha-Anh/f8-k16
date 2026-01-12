import { useSidebar } from "@/context/SidebarContext";
import { sidebarItems, bottomSidebarItems } from "@/pages/sidebar/sidebarData";
import SidebarItem from "@/pages/sidebar/sidebarItem";
import {Instagram} from 'lucide-react'

export default function Sidebar() {
  const {collapsed} = useSidebar();
  return (
    <div
      className={`h-screen flex flex-col p-4 border-r border-border bg-background text-foreground transition-all duration-300 overflow-hidden
        ${collapsed ? "w-[59px] px-2" : "w-[240px] px-4"}`}
    >
        <div className="h-[60px] flex items-center mb-6 px-2">
        {collapsed ? (
          <Instagram size={24} />
        ) : (
          <h1
          style={{ fontFamily: "Lobster, cursive" }}
          className="text-3xl font-instagram">Instagram</h1>
        )}
      </div>

      {/* sidebar */}
      <div className="space-y-5">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      {/* buttom sidebar */}
      <div className="mt-auto space-y-2">
        {bottomSidebarItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
