import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./landing-page.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Testimonals from "../components/testimonals";
import DualDirectionCarousel from "../components/carasol-image";
import {
  FaBrain,
  FaChartLine,
  FaCheckCircle,
  FaPlay,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaUserCheck,
  FaGraduationCap,
  FaExchangeAlt,
  FaArrowRight,
  FaTrophy,
  FaLightbulb,
} from "react-icons/fa";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import { MdTrendingUp, MdVerified, MdWorkspacePremium } from "react-icons/md";
import { BsBarChartFill, BsPersonCheckFill, BsStarFill } from "react-icons/bs";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/info-form" : "/login");
  };
  const handleLearnMore = () => navigate("/services");

  // Trigger counters when stats section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const animate = (target, setter, duration = 1800) => {
      let start = 0;
      const step = target / (duration / 16);
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setter(target); clearInterval(t); }
        else setter(Math.floor(start));
      }, 16);
    };
    animate(10000, setCount1);
    animate(500, setCount2);
    animate(95, setCount3);
  }, [statsVisible]);

  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      desc: "Our AI analyses your unique skill set, education, and goals to generate career paths built specifically for you.",
      color: "#6366f1",
      bg: "rgba(99,102,241,0.08)",
    },
    {
      icon: <MdTrendingUp />,
      title: "Real-Time Market Data",
      desc: "Stay ahead with live job market insights. Know which skills are in demand and what salaries look like across industries.",
      color: "#0ea5e9",
      bg: "rgba(14,165,233,0.08)",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Actionable Roadmaps",
      desc: "Get a clear step-by-step roadmap with courses, certifications, and milestones to reach your career goal.",
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted & Secure",
      desc: "Your data stays private. We never sell your information and use enterprise-grade security to protect your profile.",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
    },
    {
      icon: <FaUserCheck />,
      title: "Expert Validation",
      desc: "Our recommendations are validated by career coaches and industry experts to ensure quality guidance.",
      color: "#ec4899",
      bg: "rgba(236,72,153,0.08)",
    },
    {
      icon: <FaTrophy />,
      title: "Track Your Progress",
      desc: "Set milestones, track achievements, and celebrate wins as you move forward on your career journey.",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: <FaUserCheck />,
      title: "Tell Us About Yourself",
      desc: "Fill out a quick profile — your background, skills, education, and what you're looking for in a career.",
      color: "#6366f1",
    },
    {
      num: "02",
      icon: <FaBrain />,
      title: "AI Analyses Your Profile",
      desc: "Our engine processes your data against thousands of real career patterns to find your best-fit paths.",
      color: "#0ea5e9",
    },
    {
      num: "03",
      icon: <FaRocket />,
      title: "Get Your Career Plan",
      desc: "Receive a personalised roadmap with specific roles, required skills, and actionable next steps.",
      color: "#10b981",
    },
  ];

  const perks = [
    { icon: <FaUserCheck />, text: "Personalised to your skills & goals" },
    { icon: <MdTrendingUp />, text: "Updated with real job market data" },
    { icon: <FaMapMarkedAlt />, text: "Step-by-step actionable roadmap" },
    { icon: <FaShieldAlt />, text: "Free to start, no credit card needed" },
    { icon: <FaGraduationCap />, text: "Works for students & professionals" },
    { icon: <FaExchangeAlt />, text: "Career switch support included" },
  ];

  return (
    <>
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section className="lp-hero">
        {/* decorative blobs */}
        <div className="lp-hero-blob lp-blob-a" />
        <div className="lp-hero-blob lp-blob-b" />

        <div className="lp-hero-inner">
          {/* ── LEFT ── */}
          <div className="lp-hero-left">
            <div className="lp-pill">
              <HiSparkles className="lp-pill-icon" />
              <span>AI-powered career guidance</span>
            </div>

            <h1 className="lp-hero-heading">
              Build a career path<br />
              that <span className="lp-grad-text">feels right.</span>
            </h1>

            <p className="lp-hero-sub">
              CareerAI turns your unique strengths, goals, and experience into a
              clear next move — so you can choose your future with confidence.
            </p>

            <div className="lp-hero-actions">
              <button className="lp-btn-primary" onClick={handleGetStarted}>
                Create my career plan
                <HiArrowRight className="lp-btn-icon" />
              </button>
              <button className="lp-btn-outline" onClick={handleLearnMore}>
                <span className="lp-play-wrap"><FaPlay /></span>
                See how it works
              </button>
            </div>
          </div>

          {/* ── RIGHT – dashboard card ── */}
          <div className="lp-hero-right">
            <div className="lp-dash-card">
              <div className="lp-dash-header">
                <div className="lp-dash-avatar">
                  <img src="assets/image__4_-removebg-preview.png" alt="profile" />
                </div>
                <div className="lp-dash-meta">
                  <p className="lp-dash-title">Your next direction</p>
                  <p className="lp-dash-role">Product Designer</p>
                  <span className="lp-dash-match">
                    <BsStarFill /> 92% match
                  </span>
                </div>
                <div className="lp-verified-badge">
                  <MdVerified />
                </div>
              </div>

              <div className="lp-dash-divider" />

              <p className="lp-dash-label">Your roadmap</p>
              <div className="lp-roadmap-steps">
                <div className="lp-rs lp-rs-done">
                  <span className="lp-rs-dot lp-dot-done"><FaCheckCircle /></span>
                  <span className="lp-rs-text">Discover strengths</span>
                  <span className="lp-rs-status">Completed</span>
                </div>
                <div className="lp-rs lp-rs-active">
                  <span className="lp-rs-dot lp-dot-active"><BsBarChartFill /></span>
                  <span className="lp-rs-text">Build your core skills</span>
                  <span className="lp-rs-status lp-status-active">In progress</span>
                </div>
                <div className="lp-rs lp-rs-next">
                  <span className="lp-rs-dot lp-dot-next"><FaRocket /></span>
                  <span className="lp-rs-text">Apply with confidence</span>
                  <span className="lp-rs-status lp-status-next">Next milestone</span>
                </div>
              </div>

              <div className="lp-dash-divider" />

              <div className="lp-dash-metrics">
                <div className="lp-metric">
                  <div className="lp-metric-ring">
                    <svg viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="3"
                        strokeDasharray="75 25" strokeLinecap="round"
                        transform="rotate(-90 18 18)" />
                    </svg>
                    <span>78%</span>
                  </div>
                  <p className="lp-metric-label">Career readiness</p>
                </div>
                <div className="lp-metric">
                  <div className="lp-metric-icon-wrap"><MdTrendingUp /></div>
                  <p className="lp-metric-label">Career clarity</p>
                  <p className="lp-metric-sub">Growing every step</p>
                </div>
                <div className="lp-metric">
                  <div className="lp-metric-icon-wrap lp-icon-green"><FaCheckCircle /></div>
                  <p className="lp-metric-label">Skills selected</p>
                  <p className="lp-metric-sub">Built around your goals</p>
                </div>
              </div>
            </div>

            {/* floating tags */}
            {/* <div className="lp-float-tag lp-ft-1">
              <BsPersonCheckFill className="lp-ft-icon" />
              <span>10,000+ guided</span>
            </div>
            <div className="lp-float-tag lp-ft-2">
              <FaStar className="lp-ft-icon lp-ft-star" />
              <span>4.9 avg rating</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="lp-stats" ref={statsRef}>
        <div className="lp-stats-inner">
          <div className="lp-stat">
            <span className="lp-stat-num">{count1.toLocaleString()}+</span>
            <span className="lp-stat-label">Students Guided</span>
          </div>
          <div className="lp-stat-div" />
          <div className="lp-stat">
            <span className="lp-stat-num">{count2}+</span>
            <span className="lp-stat-label">Career Paths</span>
          </div>
          <div className="lp-stat-div" />
          <div className="lp-stat">
            <span className="lp-stat-num">{count3}%</span>
            <span className="lp-stat-label">Success Rate</span>
          </div>
          <div className="lp-stat-div" />
          <div className="lp-stat">
            <span className="lp-stat-num">4.9 <FaStar className="lp-star-inline" /></span>
            <span className="lp-stat-label">Average Rating</span>
          </div>
        </div>
      </section>


      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="lp-how">
        <div className="lp-section-wrap">
          <div className="lp-sec-eyebrow">How It Works</div>
          <h2 className="lp-sec-title">Three steps to your dream career</h2>
          <p className="lp-sec-sub">From profile to personalised roadmap in under 3 minutes.</p>
          <div className="lp-steps-grid">
            {steps.map((s) => (
              <div className="lp-step-card" key={s.num} style={{ "--sc": s.color }}>
                <div className="lp-step-icon" style={{ background: s.color + "14", color: s.color }}>
                  {s.icon}
                </div>
                <span className="lp-step-badge" style={{ color: s.color, background: s.color + "10" }}>{s.num}</span>
                <h3 className="lp-step-title">{s.title}</h3>
                <p className="lp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PERKS SPLIT ══════════ */}
      <section className="lp-perks">
        <div className="lp-perks-inner">
          <div className="lp-perks-left">
            <div className="lp-sec-eyebrow">Everything Included</div>
            <h2 className="lp-perks-title">Everything you need to level up your career</h2>
            <p className="lp-perks-sub">
              No hidden fees, no paywalled features. Career guidance should be accessible
              to everyone — whether you're a student or a seasoned professional.
            </p>
            <button className="lp-btn-primary" onClick={handleGetStarted}>
              Get Started Free <HiArrowRight className="lp-btn-icon" />
            </button>
          </div>
          <div className="lp-perks-right">
            {perks.map((p, i) => (
              <div className="lp-perk-card" key={i}>
                <span className="lp-perk-icon">{p.icon}</span>
                <span className="lp-perk-text">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════ FEATURES ══════════ */}
      <section className="lp-features">
        <div className="lp-section-wrap">
          <div className="lp-sec-eyebrow">Why Choose Us</div>
          <h2 className="lp-sec-title">Built different, on purpose</h2>
          <p className="lp-sec-sub">Most career tools give generic advice. Ours is built to understand you.</p>
          <div className="lp-feat-grid">
            {features.map((f, i) => (
              <div className="lp-feat-card" key={i} style={{ "--fc": f.color }}>
                <div className="lp-feat-icon" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
                <h3 className="lp-feat-title">{f.title}</h3>
                <p className="lp-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════ CAROUSEL ══════════ */}
      <DualDirectionCarousel />

      {/* ══════════ TESTIMONIALS ══════════ */}
      <Testimonals />

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="lp-cta">
        <div className="lp-cta-blob" />
        <div className="lp-cta-inner">
          <div className="lp-sec-eyebrow">Start Today</div>
          <h2 className="lp-cta-title">
            Your future career is <span className="lp-cta-grad">one click away</span>
          </h2>
          <p className="lp-cta-sub">
            Join over 10,000 professionals who found their path. Start your free career
            analysis today — no friction, no credit card.
          </p>
          <div className="lp-cta-trust">
            <span><span className="lp-cta-trust-icon">✓</span> Free to get started</span>
            <span><span className="lp-cta-trust-icon">✓</span> No credit card needed</span>
            <span><span className="lp-cta-trust-icon">✓</span> Results in 2 minutes</span>
          </div>
          <button className="lp-btn-white" onClick={handleGetStarted}>
            Start Free Career Analysis <HiArrowRight className="lp-btn-icon" />
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WelcomePage;
