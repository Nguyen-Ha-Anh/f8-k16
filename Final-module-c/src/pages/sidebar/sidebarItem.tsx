import type { SidebarItemProps } from "@/types/FeedType";
import { NavLink } from "react-router-dom";

export default function SidebarItem({
  label,
  path,
  icon: Icon,
}: SidebarItemProps) {

  const content = (
    <div className="flex items-center gap-4 p-2 rounded-lg transition hover:bg-[#1a1a1a]">
      {Icon && <Icon size={24} />}
      <span className="">{label}</span>
    </div>
  );

  if (path) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-4 p-2 rounded-lg transition
         ${isActive ? "bg-[#1a1a1a] font-semibold" : ""}`
        }
      >
        {({ isActive }) => (
          <>
            {Icon && (
              <Icon size={24} active={isActive ? "text-white" : "text-black"} />
            )}
            <span className={isActive ? "font-semibold" : ""}>{label}</span>
          </>
        )}
      </NavLink>
    );
  }
  return content;
}
