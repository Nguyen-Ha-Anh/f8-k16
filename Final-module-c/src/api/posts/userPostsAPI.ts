import axiosClient from "@/api/profile/axiosClient";

export const getUserPosts = async (
  userId: string,
  filter: "all" | "video" | "saved" = "all",
  limit = 20,
  offset = 0
) => {
  const res = await axiosClient.get(
    `/posts/user/${userId}?filter=${filter}&limit=${limit}&offset=${offset}`
  );

  return res.data.data;
};
