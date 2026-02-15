import {
  createComment,
  getPostComments,
} from "@/api/posts/comments/commentAPI";
import {
  likeComment,
  unlikeComment,
} from "@/api/posts/comments/commentLikeAPI";
import { createReply, getReplies } from "@/api/posts/comments/replyAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useComments(postId: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const currentUser = useSelector((state: any) => state.auth.profile);

  const limit = 20;

  const fetchComments = async () => {
    if (!hasMore || loading || !postId) return;

    try {
      setLoading(true);

      const data = await getPostComments(postId, limit, offset);

      console.log("FIRST COMMENT:", data.comments[0]);

      const processed = data.comments.map((c: any) => ({
        ...c,
        isLiked: c.likedBy?.includes(currentUser?._id),
        replies: [],
        showReplies: false,
        replyCount: c.repliesCount ?? 0,
      }));
      // auto load replies neu cmt co reply
      processed.forEach((c: any) => {
        if (c.replyCount > 0) {
          loadReplies(c._id);
        }
      });

      setComments((prev) => {
        const merged = [...prev, ...processed];

        const unique = merged.filter(
          (item, index, self) =>
            index === self.findIndex((c) => c._id === item._id),
        );

        setTimeout(() => {
          unique.forEach((c) => {
            if (c.replyCount > 0) {
              loadReplies(c._id);
            }
          });
        }, 0);

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

  const loadReplies = async (commentId: string) => {
    setComments((prev) => {
      const target = prev.find((c) => c._id === commentId);

      if (target?.replies?.length) {
        return prev.map((c) =>
          c._id === commentId ? { ...c, showReplies: !c.showReplies } : c,
        );
      }

      return prev;
    });

    const data = await getReplies(postId, commentId);

    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? {
              ...c,
              replies: data.replies,
              showReplies: true,
            }
          : c,
      ),
    );
  };

  const addReply = async (commentId: string, content: string) => {
    const res = await createReply(postId, commentId, content);

    // const newReply = res;

    setComments((prev) =>
      prev.map((c) => (c._id === commentId ? { ...c, showReplies: true } : c)),
    );
    await loadReplies(commentId);
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
    toggleLike,
    loadReplies,
    addReply,
  };
}
