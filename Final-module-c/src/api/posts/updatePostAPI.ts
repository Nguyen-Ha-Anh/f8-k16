import axiosClient from "@/api/profile/axiosClient";

export const updatePostCaption = async (
  postId: string,
  caption: string
) => {
  const res = await axiosClient.patch(`/posts/${postId}`, {
    caption,
  });

  return res.data.data;
};

