import { getSuggestedUsers } from "@/api/users/userAPI";
import type { SuggestedUser } from "@/types/rightSidebarType";
import { getAvatar } from "@/utils/getAvatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function RightSidebar() {
  const profile = useSelector((state: any) => state.auth.profile);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const data = await getSuggestedUsers(5);
        console.log("suggested:", data);
        setSuggestedUsers(data);
      } catch (err) {
        console.error("failed", err);
      }
    };
    fetchSuggested();
  }, []);

  return (
    <div className="hidden xl:block w-[320px] px-4 pt-8">
      <NavLink to={`/profile`} className="flex items-center justify-between mb-6">
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
        <button className="text-blue-500 text-sm font-semibold">Switch</button>
      </NavLink>

      {/* title */}
      <div className="flex justify-between mb-3">
        <p className="text-sm text-gray-400 font-semibold">Suggested for you</p>
        <button className="text-xs font-semibold">See All</button>
      </div>

      {/* suggested list */}
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <NavLink 
            to={`/profile/${user._id}`}
            key={user._id} 
            className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={getAvatar(user)}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-400">Suggested for you</p>
              </div>
            </div>
            <button 
              className="text-blue-500 text-sm font-semibold"
              onClick={(e) => e.preventDefault()}>
              Follow
            </button>
          </NavLink>
        ))}
      </div>

      {/* footer */}
      <div className="mt-10 text-xs text-gray-500 space-y-2">
        <p className="hover:underline">About · Help · Press · API · Jobs · Privacy · Terms</p>
        <p>© 2026 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
