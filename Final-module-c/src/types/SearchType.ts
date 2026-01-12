export type SidebarContextType = {
  collapsed: boolean;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
};
