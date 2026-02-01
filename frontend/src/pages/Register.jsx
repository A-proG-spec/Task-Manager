// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "../styles/global.css";

/**
 * Register Component
 * 
 * Handles user registration with form validation and API integration
 * @component
 * @returns {JSX.Element} Register page component
 */
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.name || !formData.email || !formData.password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const result = await register(formData);

    setIsLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setLocalError(result.error || "Registration failed");
      console.log("registration error: ", localError);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Header with hamburger menu enabled */}
      <Header />

      <div className="page-wrapper">
        <div className="auth-shell">
          <div className="shell-title-area">
            <div className="login-logo-container">
              <img
                src="/images/logo.png"
                alt="Olympus Logo"
                className="login-logo"
              />
            </div>
            <h2>Account Creation</h2>
            <hr className="shell-hr" />
          </div>

          {localError && <div className="error-message">{localError}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Julian Mount"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="input-group">
              <label>Password (min 6 characters)</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading}
                className="role-select"
              >
                <option value="user">User</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register Account"}
            </button>

            <p className="auth-switch">
              Already a member? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;