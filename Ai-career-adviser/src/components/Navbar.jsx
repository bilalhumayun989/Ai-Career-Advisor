import { Link, useNavigate } from "react-router-dom";
import "../pages/landing-page.css";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest("#nav")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/info-form");
    } else {
      navigate("/login");
    }
  };

  return (
    <header id="nav-wrapper" className={scrolled ? "scrolled" : ""}>
      <nav id="nav">
        <div
          className="menu-icon"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="nav left">
          <img className="logo" src="assets/logo (2).png" alt="Logo" />
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</Link>
        </div>

        <div className="nav-buttons desktop-buttons">
          <button className="nav-button outlined" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
