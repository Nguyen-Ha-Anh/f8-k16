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

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired → logout");

      localStorage.removeItem("accessToken");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);


export default axiosClient;
