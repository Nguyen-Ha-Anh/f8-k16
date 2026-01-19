import { getAvatar } from "@/utils/getAvatar";
import { useSelector } from "react-redux";

export default function RightSidebar() {
  const profile = useSelector((state: any) => state.auth.profile)

  return (
    <div className="hidden xl:block w-[320px] px-4 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={getAvatar(profile)}
            className="w-11 h-11 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="font-semibold text-sm">
              {profile?.username || "username"}
            </p>
            <p className="text-xs text-gray-400">
              {profile?.fullName || "Full Name"}
            </p>
          </div>
        </div>
        <button className="text-blue-500 text-sm font-semibold">
          Switch
        </button>
      </div>

      {/* title */}
      <div className="flex justify-between mb-3">
        <p className="text-sm text-gray-400 font-semibold">Suggested for you</p>
        <button className="text-xs font-semibold">See All</button>
      </div>

      {/* suggested list */}
      <div className="space-y-4">
        {/* {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                className="w-9 h-9 rounded-full object-cover"
              />

              <div className="leading-tight">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-400">
                  {user.followedBy
                    ? `Followed by ${user.followedBy}`
                    : "Suggested for you"}
                </p>
              </div>
            </div>

            <button className="text-blue-500 text-xs font-semibold">
              Follow
            </button>
          </div>
        ))} */}
      </div>

      {/* FOOTER */}
      <div className="mt-10 text-xs text-gray-500 space-y-2">
        <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
        <p>© 2026 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
