import type { UserProfile } from "@/types/users/userType";
import axiosClient from "../profile/axiosClient";

export const getSuggestedUsers = async (limit = 5) => {
  const res = await axiosClient.get(`/users/suggested?limit=${limit}`);
  return res.data.data;
};

export const getUserById = async (userId: string): Promise<UserProfile> => {
  const res = await axiosClient.get(`/users/${userId}`);

  const raw = res.data?.data;
  if (!raw) {
    throw new Error("User not found");
  }
  return {
    _id: raw._id,
    username: raw.username || raw.name || "unknown",
    fullName: raw.fullName || raw.name || raw.username || "Unknown",
    profilePicture: raw.profilePicture || raw.avatar || "",
    bio: raw.bio || "",
    postsCount: raw.postsCount ?? 0,
    followersCount: raw.followersCount ?? 0,
    followingCount: raw.followingCount ?? 0,
    isFollowing: raw.isFollowing ?? false,
    posts: raw.posts || [],
  };
};
