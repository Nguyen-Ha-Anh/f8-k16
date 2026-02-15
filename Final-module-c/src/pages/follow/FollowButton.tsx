import { useFollowUser } from "@/hooks/useFollowUser";
import type { FollowButtonType } from "@/types/actions/followButtonType";

export default function FollowButton({
  userId,
  initialFollowing,
  onChange,
}: FollowButtonType) {
  const { isFollowing, loading, toggleFollow } = useFollowUser(
    userId,
    initialFollowing,
    onChange,
  );

  return (
    <button
      disabled={loading}
      onClick={toggleFollow}
      className={`px-4 py-1 rounded rounded-xl transition cursor-pointer ${
        isFollowing
          ? "bg-[#333333] hover:bg-[#333333]/80 text-white px-40"
          : "bg-[#4A5DF9] hover:bg-[#4A5DF9]/80 text-white px-40"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
