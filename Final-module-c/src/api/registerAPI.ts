import axios from "axios";
import type { RegisterFormData } from "@/types/AuthType";

const BASE_URL = "https://instagram.f8team.dev";

export const registerApi = async (data: RegisterFormData) => {
  const payload = {
    email: data.email,
    username: data.username,
    password: data.password,
    confirmPassword: data.confirmPassword,
    fullName: data.fullName,
  };

  const res = await axios.post(`${BASE_URL}/api/auth/register`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
