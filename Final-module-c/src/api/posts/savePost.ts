import axiosClient from "@/api/profile/axiosClient";

export async function savePost(postId: string) {
  const res = await axiosClient.post(`/posts/${postId}/save`);
  return res.data;
}

export async function unsavePost(postId: string) {
  const res = await axiosClient.delete(`/posts/${postId}/save`);
  return res.data;
}
