// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";
import "../styles/header.css"

/**
 * Common Header Component
 *
 * Responsive header with navigation based on authentication state
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.additionalAction] - Additional action button (e.g., "+ NEW TASK")
 * @returns {JSX.Element} Header component
 */
const Header = ({ additionalAction = null }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="dash-header">
      <div onClick={handleLogoClick} className="logo">
        <strong>OLYMPUS</strong>
      </div>

      {/* Hamburger menu for mobile */}
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>

      <nav className="header-nav">
        {/* Common navigation links */}
        <Link to="/about" className="nav-link">
          ABOUT
        </Link>
        <Link to="/support" className="nav-link">
          SUPPORT
        </Link>

        {/* Additional action button if provided */}
        {additionalAction}

        {/* Authentication-based navigation */}
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              DASHBOARD
            </Link>
            <Link to="/community" className="nav-link">
              COMMUNITY
            </Link>
            <button className="btn-logout" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              LOGIN
            </Link>
            <Link to="/register" className="nav-link">
              REGISTER
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
