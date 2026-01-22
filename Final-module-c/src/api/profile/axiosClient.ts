import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://instagram.f8team.dev/api",
  // headers: {
  //   "Content-Type": "application/json",
  //   "Cache-Control": "no-cache",
  //   "Pragma": "no-cache",
  //   "Expires": "0"
  // },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  console.log("axios:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
