import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL ;
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
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      console.log("API registration error: ", error);
      throw error; // 🔥 VERY IMPORTANT
    }
  },
  login: (credentials) => api.post("auth/login", credentials),
  getProfile: () => api.get("/auth/me"),
};

// Tasks API calls
export const tasksAPI = {
  getTasks: (params) => api.get("/tasks/", { params }),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (taskData) => api.post("/tasks", taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getTaskReport: async () => {
    try {
      const response = await api.get("/tasks/report");
      
      return response;
    } catch (error) {
      console.log("API get error: ", error);
      throw error;
    }
  },
  getUpcomingTasks: async() => {
    try {
      const response = await api.get("/tasks/upcoming/soon")
      return response
    } catch (error) {
           console.log("API get upcomingtask error: ", error);
      throw error;
    }
  
  },
};

// Posts API calls
export const postsAPI = {
  getPosts: async() => {
    try {
      const response = await api.get("/posts")
      return response
    } catch (error) {
      console.log("API get upcomingtask error: ", error);
      throw error;
    }
  },
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (postData) => api.post("/posts/write", postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/posts/${id}`),
};

// Community API calls

export const communityAPI = {
  getTopPerformers: () => api.get("/community/top-performers"),
  getUserRank: () => api.get("/community/user-rank"),
};

// Admin API calls (if needed for future)
export const adminAPI = {
  getUsers: () => api.get("/admin/users"),
  getStatistics: () => api.get("/admin/statistics"),
  getAllPosts: () => api.get("/admin/posts"),
};

export default api;
