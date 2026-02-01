// src/pages/TermsOfService.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/global.css";

const TermsOfService = () => {
  return (
    <>
      <Header />

      <div className="page-wrapper">
        <div className="main-shell">
          <div className="shell-title-area">
            <h2>Terms of Service</h2>
            <hr className="shell-hr" />
            <p className="muted" style={{ marginTop: "15px" }}>
              Effective Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="content-wrapper" style={{ textAlign: "left", maxWidth: "800px" }}>
            <div className="text-container">
              <div className="policy-section">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing and using Olympus Task Manager (the "Service"), you accept and agree 
                  to be bound by the terms and provision of this agreement. If you do not agree to 
                  abide by these terms, please do not use this Service.
                </p>
              </div>

              <div className="policy-section">
                <h3>2. Description of Service</h3>
                <p>
                  Olympus Task Manager is a productivity application that allows users to:
                </p>
                <ul>
                  <li>Create and manage tasks with due dates and priorities</li>
                  <li>Track task completion and progress</li>
                  <li>Participate in community discussions</li>
                  <li>View performance statistics and reports</li>
                  <li>Collaborate with team members (if applicable)</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>3. User Accounts</h3>
                <p>
                  To use certain features of the Service, you must register for an account. You agree to:
                </p>
                <ul>
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept all risks of unauthorized access to your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Not create accounts for others without their permission</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>4. User Responsibilities</h3>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the Service for any illegal purpose</li>
                  <li>Post or transmit any harmful, abusive, or offensive content</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use automated systems to extract data from the Service</li>
                  <li>Share your account credentials with others</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>5. Intellectual Property</h3>
                <p>
                  The Service and its original content, features, and functionality are owned by 
                  Olympus Task Manager and are protected by international copyright, trademark, patent, 
                  trade secret, and other intellectual property laws.
                </p>
                <p>
                  You retain ownership of any content you create or upload to the Service. By posting 
                  content, you grant us a non-exclusive, worldwide, royalty-free license to use, 
                  reproduce, modify, and display such content for the purpose of providing the Service.
                </p>
              </div>

              <div className="policy-section">
                <h3>6. Termination</h3>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will immediately cease. If you wish 
                  to terminate your account, you may simply discontinue using the Service or contact us 
                  to request account deletion.
                </p>
              </div>

              <div className="policy-section">
                <h3>7. Limitation of Liability</h3>
                <p>
                  In no event shall Olympus Task Manager, nor its developers, be liable for any indirect, 
                  incidental, special, consequential or punitive damages, including without limitation, 
                  loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul>
                  <li>Your access to or use of or inability to access or use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>8. Disclaimer</h3>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" 
                  and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, 
                  whether express or implied, including, but not limited to, implied warranties of 
                  merchantability, fitness for a particular purpose, non-infringement or course of 
                  performance.
                </p>
              </div>

              <div className="policy-section">
                <h3>9. Governing Law</h3>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Ethiopia, 
                  without regard to its conflict of law provisions. Our failure to enforce any right 
                  or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </div>

              <div className="policy-section">
                <h3>10. Changes to Terms</h3>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at 
                  any time. If a revision is material, we will provide at least 30 days' notice prior 
                  to any new terms taking effect. What constitutes a material change will be determined 
                  at our sole discretion.
                </p>
              </div>

              <div className="policy-section">
                <h3>11. Contact Information</h3>
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:antenehwondwosen@gmail.com" style={{ color: "#00ffcc" }}>
                    antenehwondwosen@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Developer:</strong> Anteneh Wondwosen
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

export default TermsOfService;