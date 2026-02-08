import Feed from "@/components/feed/Feed";
import RightSidebar from "@/layout/sidebar/RightSidebar";

export default function Home() {
  return (
    <div>
      <div className="mx-auto flex justify-between max-w-[780px] pt-8">
        <div className="w-[470px]">
          <Feed />
        </div>

        <div className="fixed top-3 right-13 h-screen w-[320px] hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
