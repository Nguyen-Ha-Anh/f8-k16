import SidebarMenu from "./SidebarMenu";
import { NavLink } from "react-router-dom";
import type { SidebarItemProps } from "@/types/FeedType";
import { useSidebar } from "@/context/SidebarContext";

export default function SidebarItem(props: SidebarItemProps) {
  const { toggleSearch, collapsed, toggleNotification } = useSidebar();

  if (props.type === "action") {
    const Icon = props.icon;
    return (
      <button
        onClick={() => {
          if (props.action === "search") toggleSearch();
          if (props.action === "notification") toggleNotification();
        }}
        className="flex items-center gap-4 p-2 rounded-lg transition w-full"
      >
        {Icon && <Icon size={24} />}
        {!collapsed && <span>{props.label}</span>}
      </button>
    );
  }

  if (props.type === "menu") {
    return (
      <SidebarMenu
        label={!collapsed ? props.label : ""}
        icon={props.icon}
        items={props.items}
      />
    );
  }

  const { label, path, icon: Icon } = props;

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-4 p-2 rounded-lg transition
     ${isActive ? "bg-accent font-semibold" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          {Icon && <Icon size={24} className="text-foreground" />}
          {!collapsed && (
            <span className={isActive ? "font-semibold" : ""}>{label}</span>
          )}
        </>
      )}
    </NavLink>
  );
}
