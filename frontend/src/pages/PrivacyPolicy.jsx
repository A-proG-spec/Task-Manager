// src/pages/PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/global.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />

      <div className="page-wrapper">
        <div className="main-shell">
          <div className="shell-title-area">
            <h2>Privacy Policy</h2>
            <hr className="shell-hr" />
            <p className="muted" style={{ marginTop: "15px" }}>
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="content-wrapper" style={{ textAlign: "left", maxWidth: "800px" }}>
            <div className="text-container">
              <div className="policy-section">
                <h3>1. Introduction</h3>
                <p>
                  Welcome to Olympus Task Manager. This Privacy Policy explains how we collect, use, 
                  disclose, and safeguard your information when you use our web application. Please read 
                  this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                  please do not access the application.
                </p>
              </div>

              <div className="policy-section">
                <h3>2. Information We Collect</h3>
                <p><strong>Personal Data:</strong></p>
                <ul>
                  <li>Email address</li>
                  <li>Full name</li>
                  <li>Password (encrypted)</li>
                  <li>User role (admin/user)</li>
                </ul>
                
                <p><strong>Task Data:</strong></p>
                <ul>
                  <li>Task titles and descriptions</li>
                  <li>Due dates and priorities</li>
                  <li>Task status and completion dates</li>
                  <li>Project information</li>
                </ul>
                
                <p><strong>Community Data:</strong></p>
                <ul>
                  <li>Posts and comments</li>
                  <li>Likes and interactions</li>
                  <li>Performance statistics</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>3. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide and maintain the Task Manager service</li>
                  <li>Process your transactions and manage your account</li>
                  <li>Send you administrative information and updates</li>
                  <li>Enable community features and interactions</li>
                  <li>Generate performance reports and statistics</li>
                  <li>Improve our application and user experience</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>4. Data Security</h3>
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information. Passwords are encrypted using industry-standard hashing 
                  algorithms. However, no method of transmission over the Internet or electronic storage 
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div className="policy-section">
                <h3>5. Data Retention</h3>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the 
                  purposes outlined in this Privacy Policy. You may request deletion of your account 
                  and associated data by contacting us at{" "}
                  <a href="mailto:antenehwondwosen@gmail.com" style={{ color: "#00ffcc" }}>
                    antenehwondwosen@gmail.com
                  </a>.
                </p>
              </div>

              <div className="policy-section">
                <h3>6. Third-Party Services</h3>
                <p>
                  This application may use third-party services that collect information used to 
                  identify you. These services have their own privacy policies addressing how they 
                  use such information.
                </p>
              </div>

              <div className="policy-section">
                <h3>7. Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request transfer of your personal information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>8. Children's Privacy</h3>
                <p>
                  Our application is not intended for individuals under the age of 13. We do not 
                  knowingly collect personal information from children under 13. If you are a parent 
                  or guardian and believe your child has provided us with personal information, please 
                  contact us.
                </p>
              </div>

              <div className="policy-section">
                <h3>9. Changes to This Privacy Policy</h3>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </div>

              <div className="policy-section">
                <h3>10. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:antenehwondwosen@gmail.com" style={{ color: "#00ffcc" }}>
                    antenehwondwosen@gmail.com
                  </a>
                </p>
                <p>
                  <strong>GitHub:</strong>{" "}
                  <a 
                    href="https://github.com/A-proG-spec/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "#00ffcc" }}
                  >
                    github.com/A-proG-spec
                  </a>
                </p>
              </div>

              <div className="form-actions" style={{ marginTop: "40px", justifyContent: "center" }}>
                <Link to="/" className="btn-secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;