import Feed from "@/components/feed/Feed";
import RightSidebar from "@/layout/sidebar/RightSidebar";

export default function Home() {
  return (
    <div className="flex gap-8 pt-8">
      <div className="w-[470px]">
        <Feed />
      </div>

      <div className="hidden lg:block w-[320px] pl-32">
        <RightSidebar/>
      </div>
    </div>
  );
}
