import axios from "axios";

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const token = localStorage.getItem("access_token");

  const res = await axios.post(
    "/api/auth/change-password",
    {
      currentPassword,
      newPassword,
      confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
