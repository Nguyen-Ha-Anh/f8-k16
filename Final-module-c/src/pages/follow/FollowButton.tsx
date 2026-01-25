import { useState } from "react";
import axiosClient from "@/api/profile/axiosClient";

interface FollowButtonProps {
  userId: string;
  initialFollowing: boolean;
  onChange?: (followed: boolean) => void;
}

export default function FollowButton({
  userId,
  initialFollowing,
  onChange,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState<boolean>(initialFollowing);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFollowing) {
        await axiosClient.delete(`/follow/${userId}/follow`);
        setIsFollowing(false);
        onChange?.(false);
      } else {
        await axiosClient.post(`/follow/${userId}/follow`);
        setIsFollowing(true);
        onChange?.(true);
      }
    } catch (err) {
      console.error("Follow error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={toggleFollow}
      className={`px-4 py-1 rounded transition ${
        isFollowing
          ? "bg-gray-300 text-black hover:bg-gray-400"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
