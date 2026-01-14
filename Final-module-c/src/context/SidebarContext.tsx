import type { SidebarContextType } from "@/types/SearchType";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const collapsed = searchOpen || notificationOpen

  // const openSearch = () => {
  //   setCollapsed(true);
  //   setSearchOpen(true);
  // };

  // const closeSearch = () => {
  //   setCollapsed(false);
  //   setSearchOpen(false);
  // };

  const toggleSearch = () => {
    setSearchOpen((prev) => {
      const next = !prev;
      if (next) setNotificationOpen(false);
      return next;
    });
  };

  // const openNotification = () => {
  //   setCollapsed(true);
  //   setNotificationOpen(true);
  //   setSearchOpen(false);
  // };

  // const closeNotification = () => {
  //   setNotificationOpen(false);
  //   setCollapsed(false);
  // };

  const toggleNotification = () => {
    setNotificationOpen((prev) => {
      const next = !prev;
      if (next) setSearchOpen(false);
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        searchOpen,
        notificationOpen,
        // openSearch,
        // closeSearch,
        toggleSearch,
        // openNotification,
        // closeNotification,
        toggleNotification,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("sidebar");
  }
  return context;
}
