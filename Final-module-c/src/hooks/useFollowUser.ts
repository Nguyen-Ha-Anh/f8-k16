import { followUser, unfollowUser } from "@/api/users/followAPI";
import { useState } from "react";

export function useFollowUser(
  userId: string,
  initialFollowing = false
) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    if (loading || !userId) return;

    const prev = isFollowing;
    const next = !prev;

    try {
      setLoading(true);
      setIsFollowing(next);

      if (next) {
        await followUser(userId);
      } else {
        await unfollowUser(userId);
      }
    } catch {
      setIsFollowing(prev);
      alert("Follow action failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    isFollowing,
    loading,
    toggleFollow
  };
}
