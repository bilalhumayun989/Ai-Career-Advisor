import React from 'react';
import { motion } from 'framer-motion';
import './testimonals.css';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonialData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Data Analyst',
    company: 'Google',
    img: 'assets/staff-img (1).png',
    rating: 5,
    quote:
      'Thanks to AI Career Advisor, I discovered roles in machine learning I never knew existed. It\'s like having an expert mentor by your side 24/7.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'AI Researcher',
    company: 'OpenAI',
    img: 'assets/staff-img (2).png',
    rating: 5,
    quote:
      'I used AI Career Advisor to map out my transition into AI development. The clarity and personalized advice it offers are truly unmatched.',
  },
  {
    id: 3,
    name: 'Michael Lee',
    role: 'Product Manager',
    company: 'Microsoft',
    img: 'assets/staff-img (1).png',
    rating: 5,
    quote:
      'This tool simplified my career shift into AI product strategy. The tailored guidance was incredibly valuable and saved me months of uncertainty.',
  },
  {
    id: 4,
    name: 'Emily Chen',
    role: 'AI Ethics Consultant',
    company: 'Meta',
    img: 'assets/staff-img (2).png',
    rating: 5,
    quote:
      'AI Career Advisor opened my eyes to emerging ethical roles in AI that align perfectly with my passion and values. Truly life-changing.',
  },
];

const StarRating = ({ rating }) => (
  <div className="testimonial-stars">
    {Array.from({ length: rating }).map((_, i) => (
      <FaStar key={i} className="star-icon" />
    ))}
  </div>
);

const TestimonialCard = ({ name, role, company, img, quote, rating, delay = 0 }) => (
  <motion.div
    className="testimonial-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
  >
    <div className="testimonial-content">
      <FaQuoteLeft className="testimonial-quote-icon" />
      <StarRating rating={rating} />
      <p className="testimonial-para">{quote}</p>
      <div className="testimonial-footer">
        <img src={img} alt={name} className="testimonial-img" />
        <div className="testimonial-author-info">
          <span className="testimonial-name">{name}</span>
          <span className="testimonial-role">{role}</span>
          <span className="testimonial-company">@ {company}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonals = () => {
  return (
    <section className="testimonials-section">
      <motion.div
        className="testimonials-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>What Our Users Say</h2>
        <p>
          AI Career Advisor has helped thousands of professionals discover their ideal career paths
          with personalized, AI-powered guidance.
        </p>
      </motion.div>

      <div className="testimonials-grid">
        {testimonialData.map((t, i) => (
          <TestimonialCard key={t.id} {...t} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
};

export default Testimonals;
