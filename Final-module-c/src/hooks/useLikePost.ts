import { useState, useEffect } from "react";
import { unlikePost } from "@/api/posts/likePostAPI";
import { likePost } from "@/api/posts/postAPI";

export function useLikePost({postId, initialLikes}: {
  postId: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`liked_${postId}`);
    setLiked(saved === "true");
    setLikes(initialLikes);
  }, [postId, initialLikes]);

  const handleToggleLike = async () => {
    if (loading) return;

    const nextLiked = !liked;

    try {
      setLoading(true);

      // UI 
      setLiked(nextLiked);
      localStorage.setItem(`liked_${postId}`, String(nextLiked));

      const data = nextLiked
        ? await likePost(postId)
        : await unlikePost(postId);

      if (data?.likes !== undefined) {
        setLikes(data.likes);
      }
    } catch {
      // rollback UI
      setLiked(liked);
      localStorage.setItem(`liked_${postId}`, String(liked));
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
