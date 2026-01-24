import type { UserProfile } from "@/types/users/userType";
import axiosClient from "../profile/axiosClient";

export const searchUsers = async (query: string): Promise<UserProfile[]> => {
  const res = await axiosClient.get(`/users/search?q=${query}`);
  return res.data.data;
};
