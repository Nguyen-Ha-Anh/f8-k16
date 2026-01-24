import axiosClient from "@/api/profile/axiosClient";

export const deletePost = async (postId: string) => {
  const res = await axiosClient.delete(`/posts/${postId}`);
  return res.data;
};
