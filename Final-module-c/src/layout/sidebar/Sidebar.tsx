import { useSidebar } from "@/context/SidebarContext";
import { sidebarItems, bottomSidebarItems } from "@/pages/sidebar/sidebarData";
import SidebarItem from "@/pages/sidebar/sidebarItem";
import { Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAvatar } from "@/utils/getAvatar";

export default function Sidebar() {
  const { collapsed } = useSidebar();
  const profile = useSelector((state: any) => state.auth.profile);

  return (
    <div
      className={`
      fixed left-0 top-0 z-50
      py-5
      h-screen
      flex flex-col
      border-r border-border
      bg-background text-foreground
      transition-all duration-300 overflow-hidden
      ${collapsed ? "w-[59px] px-2" : "w-[240px] px-4"}
    `}
    >
      <NavLink to="/home" className="h-[60px] flex items-center mb-6 px-2">
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
        {sidebarItems.map((item) => {
          if (item.label === "Profile") {
            return (
              <NavLink
                key="Profile"
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded-lg transition
                  ${isActive ? "bg-accent font-semibold" : ""}`
                }
              >
                <img
                  src={getAvatar(profile)}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                {!collapsed && <span>Profile</span>}
              </NavLink>
            );
          }

          return <SidebarItem key={item.label} {...item} />;
        })}
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
