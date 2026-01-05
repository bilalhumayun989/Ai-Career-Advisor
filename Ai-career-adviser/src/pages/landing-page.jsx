import React, { useState, useEffect } from "react";
import "./landing-page.css";
import DualDirectionCarousel from "../components/carasol-image";
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Testimonals from "../components/testimonals"
// import 'bootstrap/dist/css/bootstrap.min.css';

 
 
import { useNavigate } from "react-router-dom";
 
 
const WelcomePage = () => {
  const navigate = useNavigate();
    const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/info-form");
    } else {
      navigate("/login");
    }
  };
  const handleLearnMore = () =>{
    navigate('/services')
  }

    const [billingType, setBillingType] = useState('monthly');

  const pricing = {
    basic: billingType === 'monthly' ? 9.99 : 99.99,
    business: billingType === 'monthly' ? 19.99 : 199.99,
    enterprise: billingType === 'monthly' ? 29.99 : 299.99,
  };

const Card = ({ icon, text }) => (
  <div className="card">
    <div className="content">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path d={icon}></path>
      </svg>
      <p className="para">{text}</p>
    </div>
  </div>
);
  return (
    <>
    <Navbar />
 

      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to AI Career Advisor</h1>
        <p className="welcome-description">
          Get personalized career advice powered by AI technology. Whether
          you're a student, job seeker, or looking to switch careers, we're here
          to guide you towards the best career path.
        </p>
        <div className="button-group">
<button className="btn primary" onClick={handleGetStarted}>
      Get Started
    </button>
              <button className="btn secondary button-48" onClick={handleLearnMore}><span>Learn More</span></button>
        </div>
      </div>

      {/* image carasol */}
      <DualDirectionCarousel />

      <section  className="section-3">
        <div className="about-us-container">
          <div className="about-us-image">
            <img
              src="assets/image__4_-removebg-preview.png "
              alt="Dental chair"
            />
          </div>
          <div className="about-us-content">
            <div className="content-1">
              <h2>AI-Powered Platform</h2>
              <p>
                Get personalized career advice based on your skills, education,
                and ambitions.
              </p>
            </div>

            <div className="content-2">
              <h2>Customized Career Paths</h2>
              <p>Tailored Suggestions</p>
            </div>

            <div className="content-3">
              <h2>Intelligent Recommendations</h2>
              <p>Real-time Guidance</p>
            </div>
          </div>
        </div>
      </section>

      <div className="angled-card-wrapper">
      <div className="angled-card">
        <div className="angled-card-content">
          <h2>Ready to take control of your career?</h2>
          <p>Sign up now to get personalized career advice tailored just for you.</p>
          <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  <Testimonals />
  <Footer />
    </>
  );
};

export default WelcomePage;
