import axiosClient from "@/api/profile/axiosClient";

export const getPostDetail = async (postId: string) => {
  const res = await axiosClient.get(`/posts/${postId}`);

  const raw = res.data?.data 
  const post = raw?.post || raw

  if(!post) throw new Error('Post not found')
  return {
    ...post,
    user: post.user || post.userId
  }
};
