import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api.js";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);

      // If we have stored user data, use it immediately
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setLoading(false);
        } catch (err) {
          console.error("Failed to parse stored user:", err);
          localStorage.removeItem("user");
          loadUser(); // Try to fetch fresh user data
        }
      } else {
        // No stored user, fetch from API
        loadUser();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await authAPI.getProfile();
      const userData = response.data;

      // Save user to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setError(null);
    } catch (err) {
      console.error("Failed to load user:", err);
      // Clear invalid auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      const { token, ...user } = response.data;

      // Store both token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      const { token, ...userData } = response.data;

      // Store both token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    // Clear everything
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setError(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    loadUser,
    updateUser,
    isAuthenticated: !!token, // Helper to check auth status
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
