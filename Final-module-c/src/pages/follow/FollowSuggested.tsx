import { useFollowUser } from "@/hooks/useFollowUser";
import type { FollowButtonType } from "@/types/actions/followButtonType";

export default function FollowSuggested({
    userId,
  initialFollowing,
  onChange,
}: FollowButtonType) {
  const { isFollowing, loading, toggleFollow } =
    useFollowUser(userId, initialFollowing, onChange);

  return (
    <span
      onClick={!loading ? toggleFollow : undefined}
      className={`
        text-sm font-semibold cursor-pointer
        ${isFollowing
          ? "text-neutral-400"
          : "text-[#4A5DF9] hover:text-blue-400"}
        ${loading ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </span>
  );
}
