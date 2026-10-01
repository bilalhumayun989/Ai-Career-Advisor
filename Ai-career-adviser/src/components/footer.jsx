import React from 'react';
import './footer.css';
import { 
  FaMapMarkerAlt, FaEnvelope, FaPhone,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Top accent line */}
      <div className="footer-accent-line" />

      <div className="footer-main">
        {/* Brand column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <img className="footer-logo" src="assets/logo (2).png" alt="AI Career Advisor Logo" />
            <span className="footer-brand-name">CareerAI</span>
          </div>
          <p className="footer-tagline">
            Empowering professionals worldwide with AI-driven career guidance. 
            Discover your ideal path and achieve your ambitions.
          </p>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook" className="social-icon"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="social-icon"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="social-icon"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="social-icon"><FaLinkedinIn /></a>
            <a href="#" aria-label="GitHub" className="social-icon"><FaGithub /></a>
          </div>
        </div>

        {/* Quick Links column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-link-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/info-form">Get Started</Link></li>
          </ul>
        </div>

        {/* Services column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Services</h4>
          <ul className="footer-link-list">
            <li><a href="#">Career Assessment</a></li>
            <li><a href="#">Skills Analysis</a></li>
            <li><a href="#">Resume Builder</a></li>
            <li><a href="#">Interview Prep</a></li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Get in Touch</h4>
          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <FaMapMarkerAlt className="footer-contact-icon" />
              <span>401 Broadway, 24th Floor, London</span>
            </div>
            <div className="footer-contact-item">
              <FaEnvelope className="footer-contact-icon" />
              <a href="mailto:info@careerai.com">info@careerai.com</a>
            </div>
            <div className="footer-contact-item">
              <FaPhone className="footer-contact-icon" />
              <a href="tel:+11234567890">+1 (123) 456-7890</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copy">
            © 2025 AI Career Advisor. All rights reserved.
          </span>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
