// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "../styles/global.css";
import "../styles/auth.css";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, error: authError } = useAuth();

  useEffect(() => {
    setLocalError("");
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.email || !formData.password) {
      setLocalError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const result = await login(formData);
    setIsLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setLocalError(result.error || "Demo login failed");
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
            <h2>Portal Access</h2>
            <hr className="shell-hr" />
          </div>

          {(localError || authError) && (
            <div className="error-message">{localError || authError}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
              <label>Password</label>
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

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login to Dashboard"}
            </button>

            <p className="auth-switch">
              New to the peak? <Link to="/register">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
