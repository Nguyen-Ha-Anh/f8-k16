import type { SidebarItemProps } from "@/types/FeedType";
import {
  Home,
  Search,
  Compass,
  Clapperboard,
  Send,
  Heart,
  PlusSquare,
  Menu,
  Bookmark,
  Moon,
  Settings,
  ChartLine,
  MessageSquareWarning,
  LayoutGrid
} from "lucide-react";

export type SidebarItem =
  | {
      type: 'link'
      label: string;
      icon?: React.ElementType;
      path: string;
    }
  | {
      type: 'menu'
      label: string;
      icon?: React.ElementType;
      items: {
        label: string;
        icon?: React.ElementType;
        action?: string;
      }[];
    }
  | {
      type: "action";
      label: string;
      icon?: React.ElementType;
    };

export const sidebarItems: SidebarItemProps[] = [
  { type: 'link', label: "Home", icon: Home, path: "/home" },
  { type: 'action', label: "Search", icon: Search, action: 'search' },
  { type: 'link', label: "Explore", icon: Compass, path: "/explore" },
  { type: 'link', label: "Reels", icon: Clapperboard, path: "/reels" },
  { type: 'link', label: "Messages", icon: Send, path: "/messages" },
  { type: 'link', label: "Notifications", icon: Heart, path: "/notifications" },
  { type: 'link', label: "Create", icon: PlusSquare, path: "/create" },
  { type: 'link', label: "Profile", path: "/profile" },
];

export const bottomSidebarItems: SidebarItemProps[] = [
  {
    type: 'menu', 
    label: "More",
    icon: Menu,
    items: [
      { label: "Settings", icon: Settings },
      { label: "Your activity", icon: ChartLine },
      { label: "Saved", icon: Bookmark },
      { label: "Switch appearance", icon: Moon, action: "appearance" },
      { label: "Report a problem", icon: MessageSquareWarning },
      { label: "Switch accounts"},
      { label: "Log out"},
    ],
  },
  { type: 'link', label: "Also from F88", icon: LayoutGrid, path: '/f88' },
];
