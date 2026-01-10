import { sidebarItems } from "@/pages/sidebar/sidebarData";
import SidebarItem from "@/pages/sidebar/sidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-[240px] p-4">
      <h1 className="text-3xl font-instagram mb-8">Instagram</h1>

      <nav className="space-y-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
}
