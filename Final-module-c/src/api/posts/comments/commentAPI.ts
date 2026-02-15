import axiosClient from "@/api/profile/axiosClient";

// lay comments
export const getPostComments = async (
  postId: string,
  limit = 20,
  offset = 0
) => {
  const res = await axiosClient.get(
    `/posts/${postId}/comments`,
    { params: { limit, offset } }
  );

  return res.data.data;
};

// tao comment
export const createComment = async (
  postId: string,
  content: string,
  parentCommentId: string | null = null
) => {
  const res = await axiosClient.post(
    `/posts/${postId}/comments`,
    { content, parentCommentId }
  );

  return res.data.data;
};
