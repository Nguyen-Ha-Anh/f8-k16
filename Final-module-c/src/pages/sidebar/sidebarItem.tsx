import SidebarMenu from "./SidebarMenu";
import { NavLink } from "react-router-dom";
import type { SidebarItemProps } from "@/types/FeedType";
import { useSidebar } from "@/context/SidebarContext";

export default function SidebarItem(props: SidebarItemProps) {
  const {
    toggleSearch,
    collapsed,
    toggleNotification,
    searchOpen,
    notificationOpen,
    closePanels
  } = useSidebar();

  const isPanelOpen = searchOpen || notificationOpen;

  if (props.type === "action") {
    const Icon = props.icon;

    const isActive =
      (props.action === "search" && searchOpen) ||
      (props.action === "notification" && notificationOpen);

    return (
      <button
        onClick={() => {
          if (props.action === "search") toggleSearch();
          if (props.action === "notification") toggleNotification();
        }}
        className={`
        flex items-center gap-4 p-2 rounded-lg transition w-full cursor-pointer
        ${isActive ? "bg-accent font-semibold" : ""}
      `}
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
      onClick={closePanels}
      className={({ isActive }) =>
        `flex items-center gap-4 p-2 rounded-lg transition
        ${isActive && !isPanelOpen ? "bg-accent font-semibold" : ""}`
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
