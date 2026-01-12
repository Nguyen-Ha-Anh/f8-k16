import type { ElementType } from "react";

export type SidebarItemProps =
  | {
      type: "link";
      label: string;
      icon?: ElementType;
      path: string;
    }
  | {
      type: "menu";
      label: string;
      icon?: ElementType;
      items: {
        label: string;
        icon?: ElementType;
        action?: string;
      }[];
    }
  | {
      type: "action";
      label: string;
      icon?: ElementType;
      action: "search";
    };
