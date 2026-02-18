import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;
//console.log(API_URL);
// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post("/api/auth/register", userData);

      return response.data;
    } catch (error) {
      console.log("API registration error: ", error);
      throw error;
    }
  },
  login: (credentials) => api.post("/api/auth/login", credentials),
  getProfile: () => api.get("/api/auth/me"),
};

// Tasks API calls
export const tasksAPI = {
  getTasks: (params) => api.get("/api/tasks/", { params }),
  getTask: (id) => api.get(`/api/tasks/${id}`),
  createTask: (taskData) => api.post("/api/tasks", taskData),
  updateTask: (id, taskData) => api.put(`/api/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/api/tasks/${id}`),
  getTaskReport: async () => {
    try {
      const response = await api.get("/api/tasks/report");

      return response;
    } catch (error) {
      console.log("API get error: ", error);
      throw error;
    }
  },
  getUpcomingTasks: async () => {
    try {
      const response = await api.get("/api/tasks/upcoming/soon");
      return response;
    } catch (error) {
      console.log("API get upcomingtask error: ", error);
      throw error;
    }
  },
};

// Posts API calls
export const postsAPI = {
  getPosts: async () => {
    try {
      const response = await api.get("/api/posts");
      return response;
    } catch (error) {
      console.log("API get upcomingtask error: ", error);
      throw error;
    }
  },
  getPost: (id) => api.get(`/api/posts/${id}`),
  createPost: (postData) => api.post("/api/posts/write", postData),
  updatePost: (id, postData) => api.put(`/api/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/api/posts/${id}`),
};

// Community API calls

export const communityAPI = {
  getTopPerformers: () => api.get("/api/community/top-performers"),
  getUserRank: () => api.get("/api/community/user-rank"),
};

// Admin API calls (if needed for future)
export const adminAPI = {
  getUsers: () => api.get("/api/admin/users"),
  getStatistics: () => api.get("/api/admin/statistics"),
  getAllPosts: () => api.get("/api/admin/posts"),
};

export default api;
