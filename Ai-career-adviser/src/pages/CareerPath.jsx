import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowLeft, RefreshCw, AlertTriangle,
  Compass, CheckCircle2, Briefcase, Lightbulb,
  ChevronRight, Download, Share2, User
} from 'lucide-react';
import './career-path.css';

/* ── Parse the plain-text AI response into named sections ── */
function parseResponse(text) {
  if (!text) return [];

  // section headings the AI typically uses
  const sectionDefs = [
    { key: 'summary',   icon: Compass,       title: 'Career Direction Summary',  patterns: ['summary', 'career direction', 'suitable career'] },
    { key: 'why',       icon: Lightbulb,     title: 'Why This Path Suits You',   patterns: ['why this path', 'why this is suitable', 'explanation', 'suitable because'] },
    { key: 'roles',     icon: Briefcase,     title: 'Recommended Job Roles',     patterns: ['job roles', 'recommended roles', 'roles', 'positions'] },
    { key: 'advice',    icon: CheckCircle2,  title: 'Next Steps & Advice',       patterns: ['advice', 'next steps', 'helpful', 'tips', 'steps'] },
  ];

  // Split by lines and look for section headers
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const sections = [];
  let currentSection = null;
  let currentLines = [];

  const findSectionDef = (line) => {
    const lower = line.toLowerCase().replace(/[*#\-:]/g, '');
    return sectionDefs.find(def =>
      def.patterns.some(p => lower.includes(p))
    );
  };

  for (const line of lines) {
    const def = findSectionDef(line);
    if (def && line.length < 80) {
      // save previous section
      if (currentSection && currentLines.length > 0) {
        sections.push({ ...currentSection, content: currentLines.join('\n') });
      }
      currentSection = def;
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  // flush last section
  if (currentSection && currentLines.length > 0) {
    sections.push({ ...currentSection, content: currentLines.join('\n') });
  }

  // If parsing found nothing, fall back to one "full response" section
  if (sections.length === 0) {
    sections.push({
      key: 'full',
      icon: Sparkles,
      title: 'Your Career Analysis',
      content: text,
    });
  }

  return sections;
}

/* ── Render section content: bullet lists or paragraphs ── */
function SectionContent({ content }) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  // detect bullet lines
  const isBullet = (l) => /^[-•*]|^\d+[.)]\s/.test(l);

  const items = [];
  let paraBuffer = [];

  const flushPara = () => {
    if (paraBuffer.length > 0) {
      items.push({ type: 'para', text: paraBuffer.join(' ') });
      paraBuffer = [];
    }
  };

  for (const line of lines) {
    const cleaned = line.replace(/^[-•*\d.)\s]+/, '').trim();
    if (isBullet(line)) {
      flushPara();
      items.push({ type: 'bullet', text: cleaned });
    } else {
      paraBuffer.push(cleaned);
    }
  }
  flushPara();

  return (
    <div className="cp-section-content">
      {items.map((item, i) =>
        item.type === 'bullet' ? (
          <div key={i} className="cp-bullet-row">
            <ChevronRight size={14} className="cp-bullet-icon" />
            <span>{item.text}</span>
          </div>
        ) : (
          <p key={i} className="cp-para">{item.text}</p>
        )
      )}
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut', delay },
});

export default function CareerPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const { geminiResponse, formData } = location.state || {};

  const sections = useMemo(() => parseResponse(geminiResponse), [geminiResponse]);

  return (
    <div className="cp-page">
      <div className="cp-bg-dots" />
      <div className="cp-bg-blob cp-blob-1" />
      <div className="cp-bg-blob cp-blob-2" />

      <div className="cp-inner">

        {/* ── TOP NAV ── */}
        <motion.div className="cp-topbar" {...fadeUp(0)}>
          <button className="cp-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="cp-topbar-right">
            <button className="cp-icon-btn" title="Start over" onClick={() => navigate('/info-form')}>
              <RefreshCw size={16} />
            </button>
          </div>
        </motion.div>

        {/* ── HERO HEADER ── */}
        <motion.div className="cp-hero" {...fadeUp(0.08)}>
          <div className="cp-hero-icon">
            <Sparkles size={26} strokeWidth={1.8} />
          </div>
          <div>
            <span className="cp-eyebrow">AI Career Analysis</span>
            <h1 className="cp-hero-title">Your Personalised Career Roadmap</h1>
            <p className="cp-hero-sub">
              Based on your profile, our AI has generated a tailored career direction, job roles, and next steps just for you.
            </p>
          </div>
        </motion.div>

        {/* ── CONTENT ── */}
        {geminiResponse ? (
          <div className="cp-sections">
            {sections.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <motion.div key={sec.key} className="cp-section-card" {...fadeUp(0.15 + i * 0.1)}>
                  <div className="cp-section-header">
                    <div className="cp-section-icon">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h2 className="cp-section-title">{sec.title}</h2>
                  </div>
                  <SectionContent content={sec.content} />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div className="cp-empty" {...fadeUp(0.15)}>
            <div className="cp-empty-icon">
              <AlertTriangle size={28} strokeWidth={1.5} />
            </div>
            <h3>No results yet</h3>
            <p>Please complete the career form first to get your AI-powered career analysis.</p>
            <button className="cp-primary-btn" onClick={() => navigate('/info-form')}>
              Fill Career Form <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

        {/* ── BOTTOM ACTIONS ── */}
        {geminiResponse && (
          <motion.div className="cp-actions" {...fadeUp(0.5)}>
            <button className="cp-primary-btn" onClick={() => navigate('/info-form')}>
              <RefreshCw size={16} /> Start New Analysis
            </button>
            <button className="cp-outline-btn" onClick={() => navigate('/')}>
              <User size={16} /> Back to Home
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
