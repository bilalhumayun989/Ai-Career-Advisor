import React from 'react';
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import {
  BriefcaseIcon, GraduationCapIcon, CompassIcon,
  LightbulbIcon, TargetIcon, UsersIcon,
  ArrowRight, CheckCircle2, Zap, ShieldCheck,
  Clock, Star, ChevronRight,
  Layers, Route, Users, TrendingUp
} from "lucide-react";
import "./services.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
  viewport: { once: true },
});

const services = [
  {
    Icon: BriefcaseIcon,
    tag: "Core",
    title: "AI-Powered Job Matching",
    desc: "Get career suggestions based on your skills, goals, and educational background using intelligent algorithms that learn from real market data.",
    features: ["Skill-based matching", "Industry filters", "Salary insights"],
  },
  {
    Icon: GraduationCapIcon,
    tag: "Learning",
    title: "Skill Development Guidance",
    desc: "Personalised learning paths and certification recommendations — from beginner fundamentals to advanced specialisations.",
    features: ["Course recommendations", "Skill gap analysis", "Progress tracking"],
  },
  {
    Icon: CompassIcon,
    tag: "Planning",
    title: "Personalised Roadmaps",
    desc: "Clear, step-by-step career roadmaps built around your specific destination — no generic advice, just your path.",
    features: ["Custom milestones", "Timeline view", "Actionable steps"],
  },
  {
    Icon: LightbulbIcon,
    tag: "Insights",
    title: "AI Career Insights",
    desc: "Stay ahead with AI-generated market trend reports — know which skills are rising, which roles are growing, and where to focus.",
    features: ["Trend reports", "Market demand data", "Future-proof paths"],
  },
  {
    Icon: TargetIcon,
    tag: "Goals",
    title: "Goal-Oriented Planning",
    desc: "Set measurable career goals, break them into weekly actions, and track your progress with a clean dashboard.",
    features: ["Goal setting", "Weekly action plans", "Progress reports"],
  },
  {
    Icon: UsersIcon,
    tag: "Coming Soon",
    title: "Mentor Connections",
    desc: "Connect with industry mentors and professionals to get real-world advice and accelerate your career with experienced guidance.",
    features: ["1-on-1 sessions", "Industry experts", "Peer network"],
    soon: true,
  },
];

const perks = [
  { Icon: Zap,          title: "Results in 2 minutes",    desc: "Fill the form, get your AI career analysis instantly — no waiting." },
  { Icon: ShieldCheck,  title: "Private & secure",         desc: "Your data is never sold or shared. It stays yours, always." },
  { Icon: Clock,        title: "Always up to date",        desc: "Our AI learns continuously from live labour market data." },
  { Icon: Star,         title: "95% satisfaction rate",    desc: "Thousands of users found clarity and direction with CareerAI." },
];

const Services = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(localStorage.getItem("token") ? "/info-form" : "/login");
  };

  return (
    <>
      <Navbar />
      <main className="sv-page">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="sv-hero">
          <div className="sv-hero-dots" />
          <div className="sv-hero-blob sv-blob-1" />
          <div className="sv-hero-blob sv-blob-2" />
          <div className="sv-hero-inner">

            {/* LEFT — text */}
            <motion.div {...fadeUp(0)} className="sv-hero-text">
              <span className="sv-eyebrow">What We Offer</span>
              <h1 className="sv-hero-title">
                Everything you need to<br />
                <span className="sv-blue-grad">build the right career</span>
              </h1>
              <p className="sv-hero-sub">
                Six powerful AI-driven services — job matching, roadmaps, skill guidance,
                and market insights — all in one platform, completely free to start.
              </p>
              <div className="sv-hero-actions">
                <button className="sv-btn-primary" onClick={handleGetStarted}>
                  Start Free Analysis <ArrowRight size={17} />
                </button>
                <button className="sv-btn-outline" onClick={() => navigate('/about')}>
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* RIGHT — 2×2 stat cards */}
            <motion.div {...fadeUp(0.18)} className="sv-hero-stats">
              {[
                { Icon: Layers,     num: "6",     label: "AI-Powered Services" },
                { Icon: Route,      num: "500+",  label: "Career Paths Mapped" },
                { Icon: Users,      num: "10K+",  label: "Users Guided" },
                { Icon: TrendingUp, num: "Free",  label: "To Get Started" },
              ].map((s, i) => (
                <div key={i} className="sv-hero-stat">
                  <div className="sv-stat-icon"><s.Icon size={20} strokeWidth={1.8} /></div>
                  <span className="sv-hero-stat-num">{s.num}</span>
                  <span className="sv-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══ SERVICES GRID ══════════════════════════════════════ */}
        <section className="sv-grid-sec">
          <div className="sv-grid-inner">
            <motion.div className="sv-sec-header" {...fadeUp(0)}>
              <span className="sv-eyebrow">Our Services</span>
              <h2 className="sv-sec-title">Six tools. One clear career direction.</h2>
              <p className="sv-sec-sub">
                Every service is built around one goal — helping you find and reach the career that fits you best.
              </p>
            </motion.div>

            <div className="sv-grid">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  className={`sv-card${s.soon ? ' sv-card--soon' : ''}`}
                  {...fadeUp(i * 0.07)}
                >
                  {s.soon && <span className="sv-soon-badge">Coming Soon</span>}
                  <div className="sv-card-top">
                    <div className="sv-card-icon">
                      <s.Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="sv-card-tag">{s.tag}</span>
                  </div>
                  <h3 className="sv-card-title">{s.title}</h3>
                  <p className="sv-card-desc">{s.desc}</p>
                  <ul className="sv-card-features">
                    {s.features.map((f, j) => (
                      <li key={j}>
                        <CheckCircle2 size={14} className="sv-feat-icon" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!s.soon && (
                    <button className="sv-card-btn" onClick={handleGetStarted}>
                      Try it free <ChevronRight size={15} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══════════════════════════════════════ */}
        <section className="sv-perks">
          <div className="sv-perks-inner">
            <motion.div className="sv-sec-header" {...fadeUp(0)}>
              <span className="sv-eyebrow">Why CareerAI</span>
              <h2 className="sv-sec-title">Built different. Built for you.</h2>
            </motion.div>
            <div className="sv-perks-grid">
              {perks.map((p, i) => (
                <motion.div key={i} className="sv-perk" {...fadeUp(i * 0.1)}>
                  <div className="sv-perk-icon">
                    <p.Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="sv-perk-title">{p.title}</h3>
                    <p className="sv-perk-desc">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ════════════════════════════════════════ */}
        <section className="sv-cta">
          <div className="sv-cta-blob" />
          <motion.div className="sv-cta-inner" {...fadeUp(0)}>
            <span className="sv-eyebrow sv-eyebrow-light">Ready?</span>
            <h2 className="sv-cta-title">
              Start building your career<br />path today — it's free
            </h2>
            <p className="sv-cta-sub">
              No credit card. No friction. Just answer a few questions and let
              our AI do the heavy lifting.
            </p>
            <div className="sv-cta-actions">
              <button className="sv-cta-btn" onClick={handleGetStarted}>
                Get My Career Analysis <ArrowRight size={18} />
              </button>
              <button className="sv-btn-outline sv-outline-light" onClick={() => navigate('/about')}>
                About Us
              </button>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Services;
