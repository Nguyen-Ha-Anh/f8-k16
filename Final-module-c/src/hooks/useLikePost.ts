import { useState } from "react";
import { unlikePost } from "@/api/posts/likePostAPI";
import { likePost } from "@/api/posts/postAPI";

export function useLikePost({postId, initialLikes, initialLiked}: {
  postId: string;
  initialLikes: number;
  initialLiked: boolean
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = async () => {
    if (loading) return;

    const nextLiked = !liked;

    try {
      setLoading(true);

      // UI 
      setLiked(nextLiked);
      setLikes((prev) => prev + (nextLiked ? 1 : -1))

      const data = nextLiked
        ? await likePost(postId)
        : await unlikePost(postId);

      if (data?.likes !== undefined) {
        setLikes(data.likes);
      }
    } catch {
      // rollback UI
      setLiked(liked);
      setLikes((prev) => prev + (liked ? 1 : -1))
    } finally {
      setLoading(false);
    }
  };

  return {
    likes,
    liked,
    loading,
    handleToggleLike,
  };
}
