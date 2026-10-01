import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit, Target, Users, Zap, ShieldCheck,
  TrendingUp, ArrowRight, CheckCircle2, Star, Award
} from 'lucide-react';
import './about.css';
import Footer from "../components/footer";
import Navbar from '../components/Navbar';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: 'easeOut', delay },
  viewport: { once: true },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: 'easeOut', delay },
  viewport: { once: true },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: 'easeOut', delay },
  viewport: { once: true },
});

const stats = [
  { num: '10K+',  label: 'Users Guided' },
  { num: '95%',   label: 'Satisfaction Rate' },
  { num: '500+',  label: 'Career Paths' },
  { num: '2 min', label: 'Avg. Analysis Time' },
];

const values = [
  { Icon: BrainCircuit, title: 'AI-Powered',      desc: 'Cutting-edge algorithms analyse your unique profile to surface the most relevant opportunities.' },
  { Icon: Target,        title: 'Personalised',    desc: 'Every recommendation is tailored to your skills, interests, and long-term ambitions.' },
  { Icon: ShieldCheck,   title: 'Trustworthy',     desc: 'We never sell your data. Your career journey stays private, secure, and fully in your control.' },
  { Icon: Zap,           title: 'Fast & Simple',   desc: 'Go from sign-up to actionable career insights in under two minutes — no friction, ever.' },
  { Icon: Users,         title: 'Community-Led',   desc: 'Built with feedback from thousands of students and professionals across every industry.' },
  { Icon: TrendingUp,    title: 'Always Improving',desc: 'Our models learn continuously so your advice stays current with real-world market trends.' },
];

const milestones = [
  {
    step: 'Step 01',
    title: 'Create Your Profile',
    desc: 'Sign up and tell us about yourself — your background, education, and where you are in your career journey right now.',
    icon: Users,
  },
  {
    step: 'Step 02',
    title: 'Share Your Interests & Skills',
    desc: 'Fill out a smart form that captures your strengths, passions, preferred work style, and the industries that excite you.',
    icon: Target,
  },
  {
    step: 'Step 03',
    title: 'AI Analyses Your Profile',
    desc: 'Our AI engine processes your inputs against real-world labour market data — identifying patterns, skill gaps, and opportunities.',
    icon: BrainCircuit,
  },
  {
    step: 'Step 04',
    title: 'Get Your Career Roadmap',
    desc: 'Receive a personalised career report with top-matched paths, required skills, salary insights, and a clear action plan to move forward.',
    icon: TrendingUp,
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="ab-page">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="ab-hero">
          <div className="ab-hero-bg-dots" />
          <div className="ab-hero-blob ab-blob-1" />
          <div className="ab-hero-blob ab-blob-2" />

          <div className="ab-hero-inner">
            <motion.div className="ab-hero-text" {...fadeUp(0)}>
              <span className="ab-eyebrow">About Us</span>
              <h1 className="ab-hero-title">
                Helping people find careers<br />
                <span className="ab-blue-grad">they actually love</span>
              </h1>
              <p className="ab-hero-sub">
                AI Career Advisor is an intelligent platform that cuts through the noise of career
                planning and delivers sharp, personalised guidance — powered by real AI, not guesswork.
              </p>
              <div className="ab-hero-actions">
                <button className="ab-btn-primary" onClick={() => navigate('/services')}>
                  Explore Services <ArrowRight size={17} />
                </button>
                <button className="ab-btn-outline" onClick={() => navigate('/login')}>
                  Get Started Free
                </button>
              </div>
            </motion.div>

            <motion.div className="ab-hero-img-wrap" {...fadeRight(0.2)}>
              <div className="ab-img-card">
                <img src="assets/about-img.webp" alt="AI Career Advisor" />
                <div className="ab-img-badge ab-badge-1">
                  <Star size={14} /> &nbsp;4.9 / 5 Rating
                </div>
                <div className="ab-img-badge ab-badge-2">
                  <CheckCircle2 size={14} /> &nbsp;10K+ Users
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ══════════════════════════════════════════════ */}
        <section className="ab-stats">
          <div className="ab-stats-inner">
            {stats.map((s, i) => (
              <motion.div key={i} className="ab-stat" {...fadeUp(i * 0.1)}>
                <span className="ab-stat-num">{s.num}</span>
                <span className="ab-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ MISSION ════════════════════════════════════════════ */}
        <section className="ab-mission">
          <div className="ab-mission-inner">
            <motion.div className="ab-mission-left" {...fadeLeft(0)}>
              <span className="ab-eyebrow">Our Mission</span>
              <h2 className="ab-section-title">
                Career clarity for<br />every person on earth
              </h2>
              <p className="ab-section-sub">
                We believe career confusion is one of the biggest obstacles holding talented
                people back. Our mission is to remove that barrier — using AI to make
                personalised career guidance as easy as a two-minute form.
              </p>
              <ul className="ab-check-list">
                {[
                  'Free to access, no hidden costs',
                  'No prior knowledge or experience required',
                  'Supports every career stage — student to senior',
                  'Backed by real labour market data',
                ].map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={17} className="ab-check-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="ab-mission-right" {...fadeRight(0.15)}>
              <div className="ab-mission-card">
                <div className="ab-mc-header">
                  <Award size={28} className="ab-mc-icon" />
                  <span>Our Promise</span>
                </div>
                <p className="ab-mc-quote">
                  "We're not here to tell you what career to chase.
                  We're here to show you what's possible — and give
                  you the clarity to choose confidently."
                </p>
                <div className="ab-mc-author">
                  <div className="ab-mc-avatar">C</div>
                  <div>
                    <strong>CareerAI Team</strong>
                    <span>Founded 2022</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ VALUES ═════════════════════════════════════════════ */}
        <section className="ab-values">
          <div className="ab-values-inner">
            <motion.div className="ab-section-header" {...fadeUp(0)}>
              <span className="ab-eyebrow">What We Stand For</span>
              <h2 className="ab-section-title">Our core values</h2>
              <p className="ab-section-sub">
                Six principles that guide every decision we make — from the AI we build
                to the experience we deliver.
              </p>
            </motion.div>

            <div className="ab-values-grid">
              {values.map((v, i) => (
                <motion.div key={i} className="ab-value-card" {...fadeUp(i * 0.08)}>
                  <div className="ab-value-icon">
                    <v.Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="ab-value-title">{v.title}</h3>
                  <p className="ab-value-desc">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ═══════════════════════════════════════════ */}
        <section className="ab-timeline-sec">
          <div className="ab-timeline-inner">
            <motion.div className="ab-section-header" {...fadeUp(0)}>
              <span className="ab-eyebrow">How It Works</span>
              <h2 className="ab-section-title">From your info to your career — in 4 steps</h2>
              <p className="ab-section-sub" style={{ margin: '0 auto' }}>
                No guesswork, no generic advice. Here's exactly how CareerAI turns your profile into a personalised career roadmap.
              </p>
            </motion.div>

            <div className="ab-timeline">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  className={`ab-tl-item ${i % 2 === 0 ? 'ab-tl-left' : 'ab-tl-right'}`}
                  {...fadeUp(i * 0.1)}
                >
                  <div className="ab-tl-card">
                    <div className="ab-tl-icon-wrap">
                      <m.icon size={20} strokeWidth={1.8} />
                    </div>
                    <span className="ab-tl-year">{m.step}</span>
                    <h3 className="ab-tl-title">{m.title}</h3>
                    <p className="ab-tl-desc">{m.desc}</p>
                  </div>
                  <div className="ab-tl-dot">{i + 1}</div>
                </motion.div>
              ))}
              <div className="ab-tl-line" />
            </div>
          </div>
        </section>

        {/* ══ CTA ════════════════════════════════════════════════ */}
        <section className="ab-cta">
          <div className="ab-cta-blob" />
          <motion.div className="ab-cta-inner" {...fadeUp(0)}>
            <span className="ab-eyebrow ab-eyebrow-light">Ready to start?</span>
            <h2 className="ab-cta-title">Your career breakthrough<br />starts right here</h2>
            <p className="ab-cta-sub">
              Join thousands of people who used AI Career Advisor to find their path.
              It's free, fast, and built for you.
            </p>
            <button className="ab-cta-btn" onClick={() => navigate('/login')}>
              Start Free Analysis <ArrowRight size={18} />
            </button>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;
