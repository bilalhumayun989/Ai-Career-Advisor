import React from 'react';
import './footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return ( 

    <footer className="footer-section">
  <div className="footer-top-container">
    <h3 className="footer-top-heading">Please feel free to get in touch with us</h3>
   <div className="footer-info-boxes">
  <div className="footer-info-box">
    <div className="footer-icon-heading">
      <FaMapMarkerAlt className="footer-icon-style" />
      <h4 className="footer-info-title">Our Location</h4>
    </div>
    <p className="footer-info-text">
      401 Broadway, 24th Floor, <br/>Orchard Cloud View, London
    </p>
  </div>
  <div className="footer-info-box">
  <h4 className="footer-info-title">Quick Links</h4>
  <ul className="footer-links-horizontal">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/info-form">Get started</a></li>
  </ul>
</div>

  <div className="footer-info-box">
    <div className="footer-icon-heading">
      <FaEnvelope className="footer-icon-style" />
      <h4 className="footer-info-title">How Can We Help?</h4>
    </div>
    <p className="footer-info-text">info@yourdomain.com</p>
    <p className="footer-info-text">contact@yourdomain.com</p>
  </div>


</div>

  </div>

  <div className="footer-bottom-container">
    <div className="footer-bottom-row">
      <div className="footer-brand">
        <img className="footer-logo" src="assets/logo (2).png" alt="Logo" />
      </div>
      <div className="footer-copy-text">
        © 2025 TailGrids | All Rights Reserved
      </div>
      <div className="footer-social-icons">
        <FaFacebookF />
        <FaTwitter />
        <FaInstagram />
        <FaLinkedinIn />
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
