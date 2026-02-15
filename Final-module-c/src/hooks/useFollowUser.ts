import { followUser, unfollowUser } from "@/api/users/followAPI";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "@/store/followSlice";
import { useCallback, useState } from "react";
import { fetchProfile, updateFollowingCount } from "@/store/authSlice";

export function useFollowUser(
  userId: string,
  initialFollowing = false,
  onChange?: (v: boolean) => void,
  onSuccess?: () => void,
) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const globalFollowing = useSelector(
    (state: any) => state.follow.followingMap[userId],
  );

  const isFollowing = globalFollowing ?? initialFollowing;

  const toggleFollow = useCallback(async () => {
    if (loading) return;

    const prev = isFollowing;
    const next = !prev;

    setLoading(true);

    dispatch(setFollowing({ userId, value: next }));
    onChange?.(next);

    const delta = next ? 1 : -1;
    dispatch(updateFollowingCount(delta));

    try {
      if (next) await followUser(userId);
      else await unfollowUser(userId);

      onSuccess?.();
      dispatch(fetchProfile() as any);
    } catch {
      dispatch(setFollowing({ userId, value: prev }));
      onChange?.(prev);
    } finally {
      setLoading(false);
    }
  }, [loading, isFollowing, userId]);

  return { isFollowing, loading, toggleFollow };
}
