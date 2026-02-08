export type SidebarAction = "search" | "notification" | null;

export type SidebarContextType = {
  collapsed: boolean;
  searchOpen: boolean;
  // openSearch: () => void;
  // closeSearch: () => void;
  toggleSearch: () => void;
  notificationOpen: boolean;
  // openNotification: () => void;
  // closeNotification: () => void;
  toggleNotification: () => void;
  closePanels: () => void;
};
