import { useSidebar } from "@/context/SidebarContext";
import { sidebarItems, bottomSidebarItems } from "@/pages/sidebar/sidebarData";
import SidebarItem from "@/pages/sidebar/sidebarItem";
import { Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { collapsed } = useSidebar();
  return (
    <div
      className={`
      fixed left-0 top-0 z-50
      h-screen
      flex flex-col
      border-r border-border
      bg-background text-foreground
      transition-all duration-300 overflow-hidden
      ${collapsed ? "w-[59px] px-2" : "w-[240px] px-4"}
    `}
    >
      <NavLink to='/home' className="h-[60px] flex items-center mb-6 px-2">
        {collapsed ? (
          <Instagram size={24} />
        ) : (
          <h1
            style={{ fontFamily: "Lobster, cursive" }}
            className="text-3xl font-instagram"
          >
            Instagram
          </h1>
        )}
      </NavLink>

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
