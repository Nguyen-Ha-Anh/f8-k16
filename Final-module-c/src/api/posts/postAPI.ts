import axiosClient from "@/api/profile/axiosClient";
import type { Post } from "@/types/posts/PostType";

export const getFeedPosts = async (limit = 20, offset = 0): Promise<Post[]> => {
  const res = await axiosClient.get("/posts/feed", {
    params: { limit, offset },
  });

  const rawPosts = res.data.data.posts;

  return rawPosts.map((post: any) => ({
    ...post,
    user: {
      ...(post.user || post.userId),
      profilePicture:
        (post.user || post.userId)?.profilePicture ||
        (post.user || post.userId)?.avatar ||
        null,
    },
  }));
};

export const getPostDetail = async (postId: string): Promise<Post> => {
  const res = await axiosClient.get(`/posts/${postId}`);
  return res.data.data;
};

// like
export const likePost = async (
  postId: string
): Promise<{ likes: number; isLiked?: boolean }> => {
  const res = await axiosClient.post(`/posts/${postId}/like`);
  return res.data.data;
};

// delete post
export const deletePost = async (postId: string) => {
  const res = await axiosClient.delete(`/posts/${postId}`);
  return res.data.data;
};