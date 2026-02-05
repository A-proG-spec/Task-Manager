// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/footer.css";

/**
 * Footer Component
 *
 * Professional footer with developer info, links, and copyright
 * @component
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Developer Information</h4>
            <div className="footer-info">
              <div className="info-item">
                <i className="fas fa-user"></i>
                <span>Anteneh Wondwosen</span>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <a
                  href="mailto:antenehwondwosen@gmail.com"
                  className="footer-link"
                >
                  antenehwondwosen@gmail.com
                </a>
              </div>
              <div className="info-item">
                <i className="fab fa-github"></i>
                <a
                  href="https://github.com/A-proG-spec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  github.com/A-proG-spec
                </a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/support" className="footer-link">
                Support
              </Link>
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Technology Stack</h4>
            <div className="tech-stack">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">Express</span>
              <span className="tech-badge">MongoDB</span>
              <span className="tech-badge">CSS3</span>
            </div>

            <div className="footer-social">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://github.com/A-proG-spec/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear} Olympus Task Manager. All rights reserved.
            </p>
            <p className="disclaimer">
              This application is a demonstration project for portfolio
              purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
