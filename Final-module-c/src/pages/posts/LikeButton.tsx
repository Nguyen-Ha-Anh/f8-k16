import { Heart } from "lucide-react";
import { useLikePost } from "@/hooks/useLikePost";
import type { LikeProps } from "@/types/posts/likeType";

export default function LikeButton({postId, initialLikes, size = 20}: LikeProps) {
  const { likes, liked, handleToggleLike, loading } =
    useLikePost({
      postId,
      initialLikes,
    });

  return (
    <div className="flex items-center gap-2 select-none">
      <Heart
        size={size}
        onClick={handleToggleLike}
        className={`
          cursor-pointer transition-all duration-200
          ${liked ? "text-red-500 fill-red-500 fill-current" : "text-foreground"}
          ${loading ? "opacity-50 pointer-events-none" : ""}
        `}
      />
      <span className="text-sm font-semibold">{likes}</span>
    </div>
  );
}
