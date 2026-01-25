import axiosClient from "@/api/profile/axiosClient";

export async function followUser(userId: string) {
  const res = await axiosClient.post(`/follow/${userId}/follow`);
  return res.data;
}

export async function unfollowUser(userId: string) {
  const res = await axiosClient.delete(`/follow/${userId}/follow`);
  return res.data;
}
