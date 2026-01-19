import axiosClient from "./axiosClient";

export const getUserById = async (userId: string) => {
  const res = await axiosClient.get(`/users/${userId}`);
  return res.data.data;
};
