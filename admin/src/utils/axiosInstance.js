import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Response interceptor - REMOVE automatic redirect
// utils/axiosInstance.js - Update the response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only logout if it's NOT a delete request and NOT on login page
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname === "/";
      const isDeleteRequest = error.config.method === "delete";

      if (!isLoginPage && !isDeleteRequest) {
        localStorage.removeItem("userInfo");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
