import axiosClient from "@/api/profile/axiosClient";

export const likeComment = async (
  postId: string,
  commentId: string
) => {
  const res = await axiosClient.post(
    `/posts/${postId}/comments/${commentId}/like`
  );

  return res.data.data;
};

export const unlikeComment = async (
  postId: string,
  commentId: string
) => {
  const res = await axiosClient.delete(
    `/posts/${postId}/comments/${commentId}/like`
  );

  return res.data.data;
};
