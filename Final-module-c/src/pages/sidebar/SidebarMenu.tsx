import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/layout/switch/ThemeProvider";
import { logout } from "@/store/authSlice";
import { Sun, Moon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  label: string;
  icon?: React.ElementType;
  action?: string;
};

type SidebarMenuProps = {
  label: string;
  icon?: React.ElementType;
  items: MenuItem[];
};

export default function SidebarMenu({
  label,
  icon: Icon,
  items,
}: SidebarMenuProps) {
  const { theme, setTheme } = useTheme();
  const { collapsed } = useSidebar();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-accent data-[state=open]:bg-accent select-none">
          {Icon && <Icon size={24} />}
          {!collapsed && <span>{label}</span>}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="h-[390px] w-[280px] p-4 bg-[#262626] bg-background text-foreground border border-border"
      >
        {items.map((item, index) => (
          <div key={item.label}>
            <DropdownMenuItem
              className="flex gap-3 cursor-pointer focus:bg-accent hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:text-accent-foreground text-md mt-3"
              onClick={() => {
                if (item.action === "appearance") {
                  setTheme(theme === "dark" ? "light" : "dark");
                }
                if (item.label === "Log out") {
                  // console.log("logout");
                  dispatch(logout())
                  localStorage.removeItem('accessToken')
                  navigate('/')
                }
              }}
            >
              {item.action === "appearance" ? (
                theme === "dark" ? (
                  <Sun size={24} className="text-foreground" />
                ) : (
                  <Moon size={24} className="text-foreground" />
                )
              ) : (
                item.icon && <item.icon size={24} className="text-foreground" />
              )}

              <span>{item.label}</span>
            </DropdownMenuItem>

            {index === items.length - 3 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
