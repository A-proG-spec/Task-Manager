// utils/auth.js
export const login = (userData) => {
  // Make sure we're storing all necessary user info
  localStorage.setItem("userInfo", JSON.stringify({
    token: userData.token,
    name: userData.name || userData.username || userData.email?.split('@')[0],
    email: userData.email,
    role: userData.role,
    id: userData._id || userData.id,
    // Add any other user data you need
  }));
};

export const logout = () => {
  localStorage.removeItem("userInfo");
};

export const isAuthenticated = () => {
  return localStorage.getItem("userInfo") === "true";
};
export const getUser = () => {
  const user = localStorage.getItem("userInfo");
  return user ? JSON.parse(user) : null;
};