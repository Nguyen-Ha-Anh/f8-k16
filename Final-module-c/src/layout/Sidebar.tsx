import { sidebarItems, bottomSidebarItems } from "@/pages/sidebar/sidebarData";
import SidebarItem from "@/pages/sidebar/sidebarItem";

export default function Sidebar() {
  return (
    <div className="w-[240px] h-screen flex flex-col p-4 border-r border-[#262626]">
      <h1
        style={{ fontFamily: "Lobster, cursive" }}
        className="text-3xl font-instagram mb-8"
      >
        Instagram
      </h1>

      {/* sidebar */}
      <div className="space-y-5">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      {/* buttom sidebar */}
      <div className="mt-auto space-y-2">
        {bottomSidebarItems.map((item) => (
            <SidebarItem key={item.label} {...item}/>
        ))}
      </div>
    </div>
  );
}
