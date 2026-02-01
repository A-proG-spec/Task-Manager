// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import "../styles/global.css";

const Home = () => {
  return (
    <>
      <Header showMobileMenu={true} />
      
      <main className="hero">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1>Olympus Task Manager</h1>
            <p className="subtitle">
              <strong>Master your mountain, one task at a time.</strong>
            </p>
          </div>
        </div>
      </main>

      <hr className="black-divider" />

      <section className="content-grid">
        <div className="right-col">
          <p>
            <strong>
              Olympus Task Manager is an elite productivity suite designed for
              those who seek clarity in chaos. By blending intuitive UI with
              powerful automation, we help you organize complex projects into
              manageable steps.
            </strong>
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;