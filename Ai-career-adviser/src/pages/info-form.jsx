import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './info-form.css';
import axios from 'axios';
import {
  User, Mail, MapPin, Calendar, GraduationCap,
  Building2, BookOpen, Briefcase, Code2, Heart,
  FileText, ArrowRight, ArrowLeft, CheckCircle2,
  Sparkles, Brain, Target
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const steps = [
  {
    id: 1,
    title: 'Personal Info',
    subtitle: 'Tell us who you are',
    icon: User,
    fields: [
      { label: "Full Name",       name: 'fullName',  icon: User,       placeholder: 'e.g. Alex Johnson' },
      { label: "Age",             name: 'age',        icon: Calendar,   placeholder: 'e.g. 24' },
      { label: "Email Address",   name: 'email',      icon: Mail,       placeholder: 'you@example.com' },
      { label: "Location",        name: 'location',   icon: MapPin,     placeholder: 'e.g. New York, USA' },
    ],
  },
  {
    id: 2,
    title: 'Education & Skills',
    subtitle: 'Your background & experience',
    icon: GraduationCap,
    fields: [
      { label: "Highest Qualification", name: 'qualification', icon: GraduationCap, placeholder: 'e.g. Bachelor of Science' },
      { label: "Institute / University", name: 'institute',     icon: Building2,     placeholder: 'e.g. MIT, Oxford...' },
      { label: "Field of Study",         name: 'field',         icon: BookOpen,      placeholder: 'e.g. Computer Science' },
      { label: "Graduation Year",        name: 'gradYear',      icon: Calendar,      placeholder: 'e.g. 2022' },
      { label: "Current Job / Status",   name: 'jobStatus',     icon: Briefcase,     placeholder: 'e.g. Software Engineer / Student' },
      { label: "Skills & Technologies",  name: 'skills',        icon: Code2,         placeholder: 'e.g. Python, React, Excel...' },
    ],
  },
  {
    id: 3,
    title: 'Career Goals',
    subtitle: 'What drives you forward',
    icon: Target,
    fields: [
      { label: "Career Interests & Passions", name: 'careerInterests', icon: Heart,    placeholder: 'e.g. AI, Product Design, Finance...' },
      { label: "Your Bio / Career Goals",     name: 'bio',             icon: FileText, placeholder: 'Tell us about yourself and where you want to go...', type: 'textarea', rows: 5 },
    ],
  },
];

const InnovateInitiativeForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    const currentFields = steps[step - 1].fields;
    const newErrors = {};
    currentFields.forEach(f => {
      if (!formData[f.name]?.trim()) newErrors[f.name] = 'This field is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(s => Math.min(s + 1, 3)); };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/career`, formData);
      navigate('/career-path', { state: { geminiResponse: res.data.result } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.result || 'Failed to generate career path. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStep = steps[step - 1];
  const StepIcon = currentStep.icon;
  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="if-page">
      {/* bg decoration */}
      <div className="if-bg-dots" />
      <div className="if-bg-blob if-blob-1" />
      <div className="if-bg-blob if-blob-2" />

      <div className="if-wrapper">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="if-sidebar">
          <div className="if-sidebar-top">
            <div className="if-logo" onClick={() => navigate('/')}>
              <span className="if-logo-mark">C</span>
              <span className="if-logo-brand">Career<span>AI</span></span>
            </div>
            <p className="if-sidebar-tagline">
              Answer a few questions — get your personalised AI career roadmap.
            </p>
          </div>

          {/* step list */}
          <nav className="if-steps-nav">
            {steps.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className={`if-step-item ${active ? 'if-step-active' : ''} ${done ? 'if-step-done' : ''}`}>
                  <div className="if-step-dot">
                    {done ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                  </div>
                  <div className="if-step-meta">
                    <span className="if-step-name">{s.title}</span>
                    <span className="if-step-sub">{s.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* progress bar */}
          <div className="if-progress-wrap">
            <div className="if-progress-bar">
              <div className="if-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="if-progress-label">Step {step} of {steps.length}</span>
          </div>

          {/* sidebar info card */}
          <div className="if-sidebar-card">
            <Brain size={22} className="if-sidebar-card-icon" />
            <p>Your data is analysed by our AI to generate a <strong>personalised career roadmap</strong> — never sold or shared.</p>
          </div>
        </aside>

        {/* ── MAIN FORM ── */}
        <main className="if-main">

          {/* header */}
          <div className="if-form-header">
            <div className="if-form-header-icon">
              <StepIcon size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="if-form-title">{currentStep.title}</h1>
              <p className="if-form-subtitle">{currentStep.subtitle}</p>
            </div>
          </div>

          {/* mobile step pills */}
          <div className="if-mobile-steps">
            {steps.map((s) => (
              <div key={s.id} className={`if-mobile-step ${step === s.id ? 'if-ms-active' : ''} ${step > s.id ? 'if-ms-done' : ''}`}>
                {step > s.id ? <CheckCircle2 size={13} /> : s.id}
              </div>
            ))}
          </div>

          {/* form */}
          <form className="if-form" onSubmit={handleSubmit} noValidate>
            <div className="if-fields">
              {currentStep.fields.map((field) => {
                const FIcon = field.icon;
                return (
                  <div key={field.name} className={`if-field ${field.type === 'textarea' ? 'if-field--full' : ''}`}>
                    <label className="if-label">
                      <FIcon size={14} className="if-label-icon" />
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        rows={field.rows || 4}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`if-input if-textarea ${errors[field.name] ? 'if-input--error' : ''}`}
                      />
                    ) : (
                      <input
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`if-input ${errors[field.name] ? 'if-input--error' : ''}`}
                      />
                    )}
                    {errors[field.name] && (
                      <span className="if-error">{errors[field.name]}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* navigation */}
            <div className="if-nav">
              {step > 1 ? (
                <button type="button" className="if-btn-back" onClick={prevStep}>
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button type="button" className="if-btn-next" onClick={nextStep}>
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" className="if-btn-submit" disabled={loading}>
                  {loading ? (
                    <><span className="if-spinner" /> Analysing...</>
                  ) : (
                    <><Sparkles size={16} /> Generate My Career Path</>
                  )}
                </button>
              )}
            </div>
          </form>
        </main>

      </div>
    </div>
  );
};

export default InnovateInitiativeForm;
