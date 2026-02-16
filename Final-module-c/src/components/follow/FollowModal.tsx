import { useEffect, useState } from "react";
import axiosClient from "@/api/profile/axiosClient";
import type { FollowProps, UserFollow } from "@/types/actions/followButtonType";
import { X } from "lucide-react";
import { getAvatar } from "@/utils/getAvatar";
import { useNavigate } from "react-router-dom";

export default function FollowModal({ type, userId, onClose }: FollowProps) {
  const [users, setUsers] = useState<UserFollow[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axiosClient.get(`/follow/${userId}/${type}`);

        const list =
          type === "followers"
            ? res.data.data.followers
            : res.data.data.following;

        setUsers((list || []).filter(Boolean));
      } catch (err) {
        console.error("Fetch follow error:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [type, userId]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-card w-[420px] rounded-2xl p-4">
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg capitalize">{type}</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* list */}
        {loading ? (
          <p className="text-center py-6">Loading...</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {users.map((user) => (
              <div 
                key={user._id} 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => {
                    navigate(`/profile/${user._id}`)
                    onClose()
                }}>
                <div className="flex items-center gap-3">
                  <img
                    src={getAvatar(user)}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{user?.username ?? "unknown"}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.fullName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
