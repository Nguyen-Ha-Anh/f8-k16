import axiosClient from "@/api/profile/axiosClient";
import type { Post } from "@/types/posts/PostType";

export const getFeedPosts = async (limit = 20, offset = 0): Promise<{posts: Post[]; hasMore: boolean}> => {
  const res = await axiosClient.get("/posts/feed", {
    params: { limit, offset },
  });

  const rawPosts = res.data.data.posts || [];

  const posts = rawPosts.map((post: any) => ({
    ...post,
    user: {
      ...(post.user || post.userId),
      profilePicture:
        (post.user || post.userId)?.profilePicture ||
        (post.user || post.userId)?.avatar ||
        null,
    },
  }));

  return {
    posts,
    hasMore: posts.length === limit
  }
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

// save
export const savePost = async (postId: string) => {
  const res = await axiosClient.post(`/posts/${postId}/save`);
  return res.data.data;
};

// unsave
export const unsavePost = async (postId: string) => {
  const res = await axiosClient.delete(`/posts/${postId}/save`);
  return res.data.data;
};

// get saved posts
export const getSavedPosts = async (): Promise<Post[]> => {
  const res = await axiosClient.get("/users/me/saved-posts");
  return res.data.data.posts;
};