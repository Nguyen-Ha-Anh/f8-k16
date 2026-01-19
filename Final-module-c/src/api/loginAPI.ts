import axios from "axios";
import type { LoginFormData } from "@/types/AuthType";

const BASE_URL = "https://instagram.f8team.dev";

export const loginApi = async (data: LoginFormData) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/login`,
    {
      email: data.email.trim(),
      password: data.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
