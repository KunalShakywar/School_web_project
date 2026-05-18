import React from "react";
import "../../styles/pages/about.css";
import Footer from "../../components/layout/Footer";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-page__content">
        <h1 className="about-page__title">About Us</h1>
        <p className="about-page__text">
          We focus on academic excellence, character building, and student growth.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;
