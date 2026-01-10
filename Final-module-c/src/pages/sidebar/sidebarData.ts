import {
  Home,
  Search,
  Compass,
  Clapperboard,
  Send,
  Heart,
  PlusSquare,
  Menu,
  Bookmark
} from "lucide-react";

export const sidebarItems = [
  { label: "Home", icon: Home, path: '/home' },
  { label: "Search", icon: Search, path: '/search' },
  { label: "Explore", icon: Compass, path: '/explore' },
  { label: "Reels", icon: Clapperboard, path: '/reels' },
  { label: "Messages", icon: Send, path: '/messages' },
  { label: "Notifications", icon: Heart, path: '/notifications' },
  { label: "Create", icon: PlusSquare, path: '/create' },
  { label: "Profile", path: '/profile' },
];

export const bottomSidebarItems = [
    {label: 'More', icon: Menu},
    {label: 'Also from F88', icon: Bookmark}
]