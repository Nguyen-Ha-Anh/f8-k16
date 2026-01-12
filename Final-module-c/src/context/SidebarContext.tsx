import type { SidebarContextType } from "@/types/SearchType";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false)

  const openSearch = () => {
    setCollapsed(true);
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setCollapsed(false);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        searchOpen,
        openSearch,
        closeSearch,
        toggleSearch
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
