 import React, { useState } from 'react';
import { motion } from "framer-motion";
import Navbar  from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import Footer from"../components/footer"
import {
  BriefcaseIcon, 
  GraduationCapIcon,
  CompassIcon,
  LightbulbIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import "./services.css";

const sections = [
  {
    icon: <BriefcaseIcon size={36} />,
    title: "AI-Powered Job Matching",
    description:
      "Get career suggestions based on your skills, goals, and educational background using intelligent algorithms.",
  },
  {
    icon: <GraduationCapIcon size={36} />,
    title: "Skill Development Guidance",
    description:
      "We recommend learning paths and certifications tailored to your career goals, from beginner to advanced.",
  },
  {
    icon: <CompassIcon size={36} />,
    title: "Personalized Roadmaps",
    description:
      "We build clear, step-by-step roadmaps to help you reach your dream job efficiently.",
  },
  {
    icon: <LightbulbIcon size={36} />,
    title: "AI Career Insights",
    description:
      "Stay updated with market trends and evolving career landscapes using AI-generated insights.",
  },
  {
    icon: <TargetIcon size={36} />,
    title: "Goal-Oriented Planning",
    description:
      "Set and track your career goals with actionable steps and progress reports.",
  },
  {
    icon: <UsersIcon size={36} />,
    title: "Mentor Connections (Coming Soon)",
    description:
      "Connect with industry mentors and professionals to boost your journey with real-world advice.",
  },
];

const Services = ({ text = "Get Started", text1= "About us" }) => {
  const navigate = useNavigate()
 const handleGetStarted = () => {
  const token = localStorage.getItem("token"); // or sessionStorage.getItem("token") if you're using sessionStorage

  if (token) {
    navigate("/info-form");
  } else {
    navigate("/login");
  }
};
    const handleAbout = () => {
    navigate("/about");   
  };
   return (
    <>
    <Navbar/>
    <div className="services-page">
     <div className="text"> <h1 className="services-heading">Our Services</h1>
      <p className="services-subheading">
        Smart career support powered by artificial intelligence combines cutting-edge technology with personalized guidance to help you navigate your professional journey. By analyzing your skills, goals, and market trends, AI-driven tools offer tailored advice, job matching, and growth opportunities—making your career decisions smarter, faster, and more confident.
      </p>
</div>
      <div className="services-grid">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="service-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="icon-wrapper">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </motion.div>
        ))}
      </div>

 <div className="contact-section">
  <div className="content">
    <h2>Let’s Connect and Shape Your Career Future</h2>
    <p>We’re here to guide you with AI-powered insights and personalized career support. Whether you're just starting or planning your next move — we’re happy to help.</p>
    <div className="buttons">
      <button className="animated-button" onClick={handleGetStarted}>
      <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
      <span className="text">{text}</span>
      <span className="circle"></span>
      <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </button>
  <button className="animated-button" onClick={handleAbout}>
      <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
      <span className="text">{text1}</span>
      <span className="circle"></span>
      <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </button>    </div>
  </div>
</div>

    </div>
    <Footer/>
    </>
  );
};

export default Services;
