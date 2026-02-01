// src/pages/Support.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import { useAuth } from "../context/AuthContext";
const Support = () => {
  const { user } = useAuth();
  return (
    <>
      <header className="dash-header">
        <Link to="/" className="logo">
          OLYMPUS
        </Link>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
        <nav className="header-nav">
          <Link to="/about" className="nav-link">
            ABOUT
          </Link>

          {user ? (
            <Link to="/dashboard" className="nav-link">
              DASHBOARD
            </Link>
          ) : (
            <>
              <Link to="/register" className="nav-link">
                REGISTER
              </Link>
              <Link to="/login" className="nav-link">
                LOGIN
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="content-wrapper">
        <div className="text-container">
          <img
            src="/images/logo.png"
            alt="Support Icon"
            className="page-logo"
          />
          <h1 className="page-title">Support Hub</h1>
          <p>
            Having trouble scaling your mountain? Our dedicated support team is
            available 24/7 to ensure your workflow remains uninterrupted.
            Whether it's a technical bug or a billing question, we've got you
            covered.
          </p>
          <p>
            Visit our community forums for quick tips, or reach out directly at
            <strong> support@olympustech.com</strong>. We aim to respond to all
            high-priority inquiries within 2 hours.
          </p>
        </div>
      </main>
    </>
  );
};

export default Support;
