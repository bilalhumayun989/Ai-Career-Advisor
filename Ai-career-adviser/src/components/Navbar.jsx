import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);
  const start = () => {
    navigate(localStorage.getItem("token") ? "/info-form" : "/login");
    closeMenu();
  };

  return (
    <header id="nav-wrapper" className={scrolled ? "scrolled" : ""}>
      <nav id="nav" aria-label="Main navigation">
        <NavLink to="/" className="nav-left" onClick={closeMenu}>
          <span className="nav-mark">C</span>
          <span className="nav-brand">Career<span>AI</span></span>
        </NavLink>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>Services</NavLink>
          <div className="mobile-cta"><button className="nav-cta-btn" onClick={start}>Get Started</button></div>
        </div>

        {menuOpen && <button type="button" className="nav-overlay" onClick={closeMenu} aria-label="Close navigation" />}

        <div className="nav-actions">
          <button className="nav-cta-btn desktop-only" onClick={start}>Get Started</button>
          <button className="menu-icon" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
