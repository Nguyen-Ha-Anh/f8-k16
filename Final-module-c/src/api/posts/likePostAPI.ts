import axiosClient from "@/api/profile/axiosClient";

export const toggleLikePost = async (postId: string) => {
  const res = await axiosClient.post(`/posts/${postId}/like`);
  return res.data.data; 
};

export async function unlikePost(postId: string) {
  const res = await axiosClient.delete(`/posts/${postId}/like`);
  return res.data.data; 
}
