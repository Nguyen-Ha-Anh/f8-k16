import axios from "axios";

const BASE_URL = "https://instagram.f8team.dev";

export const resetPassword = (
  token: string,
  password: string,
  confirmPassword: string
) => {
  return axios
    .post(`${BASE_URL}/api/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    })
    .then((res) => res.data);
};
