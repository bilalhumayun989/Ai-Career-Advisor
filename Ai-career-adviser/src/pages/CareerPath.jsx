import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './career-path.css';

export default function CareerPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const { geminiResponse } = location.state || {};

  return (
    <div className="career-glass-background">
      <motion.div
        className="career-glass-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h2
          className="glass-title"
          whileHover={{ scale: 1.05 }}
        >
          🌟 Career Guidance Result
        </motion.h2>

        {geminiResponse ? (
          <motion.div
            className="glass-response"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p>{geminiResponse}</p>
          </motion.div>
        ) : (
          <p className="glass-error">⚠️ Please submit the form first.</p>
        )}

        <motion.button
          className="glass-back-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
        >
          🔙 Back
        </motion.button>
      </motion.div>
    </div>
  );
}
