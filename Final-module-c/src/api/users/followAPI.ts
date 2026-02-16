import axiosClient from "@/api/profile/axiosClient";

export async function followUser(userId: string) {
  const res = await axiosClient.post(`/follow/${userId}/follow`);
  return res.data;
}

export async function unfollowUser(userId: string) {
  const res = await axiosClient.delete(`/follow/${userId}/follow`);
  return res.data;
}

export async function getFollowCounts(userId: string) {
  const [followersRes, followingRes] = await Promise.all([
    axiosClient.get(`/follow/${userId}/followers?limit=1`),
    axiosClient.get(`/follow/${userId}/following?limit=1`),
  ]);

  return {
    followersCount:
      followersRes.data.data.pagination.totalFollowers,
    followingCount:
      followingRes.data.data.pagination.totalFollowing,
  };
}
