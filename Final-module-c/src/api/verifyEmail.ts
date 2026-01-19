import axios from "axios";

const BASE_URL = "https://instagram.f8team.dev";

export const verifyEmailApi = async (token: string) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/verify-email/${token}`
  );
  return res.data;
};
