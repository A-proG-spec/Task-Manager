// src/pages/About.jsx
import React from "react";
import Header from "../components/Header";
import "../styles/global.css";
import "../styles/about.css"

const About = () => {
  return (
    <>
      <Header showMobileMenu={true} />

      <main className="content-wrapper">
        <div className="text-container">
          <img
            src="/images/logo.png"
            alt="Olympus Logo"
            className="page-logo"
          />
          <h1 className="page-title">About Olympus Tech</h1>
          <p>
            <strong>Olympus Tech</strong> was founded on the principle that peak
            performance shouldn't be a struggle. We build software for
            high-achievers who need their digital workspace to be as sharp and
            focused as their own minds.
          </p>
          <p>
            Our philosophy merges stoic simplicity with cutting-edge automation.
            By removing the friction from task management, Olympus Tech allows
            you to reclaim your time and focus on the work that actually defines
            your legacy.
          </p>
        </div>
      </main>
    </>
  );
};

export default About;