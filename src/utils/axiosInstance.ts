import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todo-backend-6ed0.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

//自动附加JWT token
axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
