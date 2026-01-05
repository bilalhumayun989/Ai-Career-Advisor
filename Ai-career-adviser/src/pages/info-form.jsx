import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './info-form.css';
import axios from 'axios';

const InnovateInitiativeForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    const requiredFields = {
      1: ['fullName', 'age', 'email', 'location'],
      2: ['qualification', 'institute', 'field', 'gradYear', 'jobStatus', 'skills'],
      3: ['careerInterests', 'bio'],
    };
    const stepFields = requiredFields[step];
    const newErrors = {};

    stepFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        const res = await axios.post('http://localhost:5000/api/gemini-career', formData);
        const geminiResponse = res.data.result;
        navigate('/career-path', { state: { geminiResponse } });
      } catch (err) {
        console.error(err);
        alert('Failed to generate career path. Please try again.');
      }
    }
  };

  const renderInput = (label, name, type = 'input', rows = 1) => (
    <>
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          rows={rows}
          value={formData[name] || ''}
          onChange={handleChange}
          className={`custom-form-input ${errors[name] ? 'error' : ''}`}
        />
      ) : (
        <input
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          className={`custom-form-input ${errors[name] ? 'error' : ''}`}
        />
      )}
      {errors[name] && <span className="error-message">{errors[name]}</span>}
    </>
  );

  const stepFields = {
    1: [
      { label: "What's your full name?", name: 'fullName' },
      { label: 'How old are you?', name: 'age' },
      { label: "What's your email address?", name: 'email' },
      { label: 'Where are you located?', name: 'location' },
    ],
    2: [
      { label: 'What is your highest qualification or degree?', name: 'qualification' },
      { label: 'Which institute or university did you attend?', name: 'institute' },
      { label: 'What was your field of study?', name: 'field' },
      { label: 'When did you graduate?', name: 'gradYear' },
      { label: 'What is your current job title or employment status?', name: 'jobStatus' },
      { label: 'What skills or technologies are you familiar with?', name: 'skills' },
    ],
    3: [
      { label: 'What are your career interests or passions?', name: 'careerInterests' },
      { label: 'Tell us a short bio or your career goals.', name: 'bio', type: 'textarea', rows: 4 },
    ],
  };

  return (
    <div className="custom-form-wrapper">
      <h2 className="custom-form-title">Personal Info</h2>
      <p className="custom-form-subtitle">
        ( This form was created to gather basic personal info )
      </p>

      {submitted && <p style={{ color: 'green', textAlign: 'center' }}>Form submitted successfully!</p>}

      <form className="custom-form-body" onSubmit={handleSubmit}>
        {stepFields[step].map((field, i) =>
          renderInput(field.label, field.name, field.type, field.rows)
        )}

        <div className="custom-form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="custom-form-btn previous">
              Previous
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="custom-form-btn next">
              Next
            </button>
          ) : (
            <button type="submit" className="custom-form-btn next">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InnovateInitiativeForm;
