import React from 'react';
import {
  Code2, BarChart2, BrainCircuit, Target,
  Palette, Cloud, ShieldCheck, Smartphone, ArrowRight
} from 'lucide-react';
import "./carasol-image.css";

const careerPaths = [
  { Icon: Code2,        label: "Software Engineering",  color: "#dbeafe", accent: "#2563eb", sub: "1.2M+ jobs" },
  { Icon: BarChart2,    label: "Data Science",           color: "#eff6ff", accent: "#1d4ed8", sub: "890K+ jobs" },
  { Icon: BrainCircuit, label: "AI & Machine Learning",  color: "#dbeafe", accent: "#1e40af", sub: "640K+ jobs" },
  { Icon: Target,       label: "Product Management",     color: "#e0e7ff", accent: "#3730a3", sub: "520K+ jobs" },
  { Icon: Palette,      label: "UX / UI Design",         color: "#eff6ff", accent: "#2563eb", sub: "430K+ jobs" },
  { Icon: Cloud,        label: "Cloud Architecture",     color: "#dbeafe", accent: "#1d4ed8", sub: "380K+ jobs" },
  { Icon: ShieldCheck,  label: "Cybersecurity",          color: "#f1f5f9", accent: "#1e293b", sub: "350K+ jobs" },
  { Icon: Smartphone,   label: "Mobile Development",     color: "#e0e7ff", accent: "#2563eb", sub: "310K+ jobs" },
];

const DualDirectionCarousel = () => {
  // triple-clone so the seamless loop never gaps
  const row1 = [...careerPaths, ...careerPaths, ...careerPaths];
  const row2 = [...[...careerPaths].reverse(), ...[...careerPaths].reverse(), ...[...careerPaths].reverse()];

  return (
    <section className="cp-section">

      {/* ── Header ── */}
      <div className="cp-header">
        <span className="cp-eyebrow">Explore Careers</span>
        <h2 className="cp-title">Popular Career Paths</h2>
        <p className="cp-sub">
          Explore thousands of career opportunities tailored to your skills and interests
        </p>
      </div>

      {/* ── Carousels ── */}
      <div className="cp-carousels">

        {/* Row 1 — scrolls left */}
        <div className="cp-row-wrap">
          <div className="cp-fade-left" />
          <div className="cp-fade-right" />
          <ul className="cp-row cp-row--left">
            {row1.map((item, i) => (
              <li key={`r1-${i}`} className="cp-card">
                <span className="cp-card-icon" style={{ background: item.color }}>
                  <item.Icon size={22} color={item.accent} strokeWidth={2} />
                </span>
                <div className="cp-card-body">
                  <span className="cp-card-label">{item.label}</span>
                  <span className="cp-card-sub" style={{ color: item.accent }}>{item.sub}</span>
                </div>
                <ArrowRight size={15} className="cp-card-arrow" style={{ color: item.accent }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="cp-row-wrap">
          <div className="cp-fade-left" />
          <div className="cp-fade-right" />
          <ul className="cp-row cp-row--right">
            {row2.map((item, i) => (
              <li key={`r2-${i}`} className="cp-card">
                <span className="cp-card-icon" style={{ background: item.color }}>
                  <item.Icon size={22} color={item.accent} strokeWidth={2} />
                </span>
                <div className="cp-card-body">
                  <span className="cp-card-label">{item.label}</span>
                  <span className="cp-card-sub" style={{ color: item.accent }}>{item.sub}</span>
                </div>
                <ArrowRight size={15} className="cp-card-arrow" style={{ color: item.accent }} />
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Bottom tag row ── */}
      <div className="cp-tags">
        {careerPaths.map((item, i) => (
          <span key={i} className="cp-tag" style={{ borderColor: item.accent + "33", color: item.accent }}>
            <item.Icon size={13} strokeWidth={2.5} /> {item.label}
          </span>
        ))}
      </div>

    </section>
  );
};

export default DualDirectionCarousel;
