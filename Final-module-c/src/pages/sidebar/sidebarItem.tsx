export default function SidebarItem({ label, icon: Icon, badge }: any) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer">
      {Icon && <Icon size={24} />}
      <span className="text-lg">{label}</span>

      {badge && (
        <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
