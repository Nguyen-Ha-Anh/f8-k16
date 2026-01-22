import axiosClient from "@/api/profile/axiosClient";

export const getPostDetail = async (postId: string) => {
  const res = await axiosClient.get(`/posts/${postId}`);
  return res.data.data
};
