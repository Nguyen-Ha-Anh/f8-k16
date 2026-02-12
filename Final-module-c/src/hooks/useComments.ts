import { createComment, getPostComments } from "@/api/posts/commentAPI";
import { likeComment, unlikeComment } from "@/api/posts/commentLikeAPI";
import { useEffect, useState } from "react";

export function useComments(postId: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const limit = 20;

  const fetchComments = async () => {
    if (!hasMore || loading || !postId) return;

    try {
      setLoading(true);

      const data = await getPostComments(postId, limit, offset);

      setComments((prev) => {
        const merged = [...prev, ...data.comments];

        const unique = merged.filter(
          (item, index, self) =>
            index === self.findIndex((c) => c._id === item._id),
        );

        return unique;
      });

      setHasMore(data.pagination.hasMore);
      setOffset((prev) => prev + limit);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string) => {
    const newComment = await createComment(postId, content);

    // add len tren dau
    setComments((prev) => [newComment, ...prev]);
  };

  //like comment
  const toggleLike = async (commentId: string, isLiked: boolean) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? {
              ...c,
              isLiked: !isLiked,
              likes: isLiked ? c.likes - 1 : c.likes + 1,
            }
          : c,
      ),
    );

    try {
      if (isLiked) {
        await unlikeComment(postId, commentId);
      } else {
        await likeComment(postId, commentId);
      }
    } catch {
      // rollback 
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? {
                ...c,
                isLiked,
                likes: isLiked ? c.likes + 1 : c.likes - 1,
              }
            : c,
        ),
      );
    }
  };

  useEffect(() => {
    if (!postId) return;

    setComments([]);
    setOffset(0);
    setHasMore(true);
    fetchComments();
  }, [postId]);

  return {
    comments,
    loading,
    hasMore,
    fetchComments,
    addComment,
    toggleLike
  };
}
