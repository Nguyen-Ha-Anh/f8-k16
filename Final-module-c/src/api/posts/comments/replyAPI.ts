import axiosClient from "@/api/profile/axiosClient";

export const getReplies = async (
  postId: string,
  commentId: string,
) => {
  const res = await axiosClient.get(
    `/posts/${postId}/comments/${commentId}/replies`,
  );

  return res.data.data;
};

export const createReply = async (
  postId: string,
  commentId: string,
  content: string
) => {
  const res = await axiosClient.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    { content }
  );

  return res.data.data;
};
