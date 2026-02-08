import axiosClient from "@/api/profile/axiosClient";
import type { ExploreResponse } from "@/types/exploreType";

export const getExplorePosts = async (page = 1, limit = 20): Promise<ExploreResponse> => {
  const res = await axiosClient.get(
    `/posts/explore?page=${page}&limit=${limit}`
  );

  return res.data.data; 
};
