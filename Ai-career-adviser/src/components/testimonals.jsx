import React from 'react';
import './testimonals.css';

const Testimonals = () => {
  return (
    <div>
      {/* testimonials */}
      <section className="testimonials">
        <h1>Testimonials</h1>
        <p>
          AI Career Advisor provided me with personalized insights and confidence to explore AI-related fields. It truly feels like a mentor guiding my career journey.
        </p>
      </section>

      <div
        className="testimonial-card-container"
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Card 1 */}
        <div className="testimonial-card">
          <div className="testimonial-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img
              src="assets/staff-img (1).png"
              alt="John Doe"
              className="testimonial-img"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>John Doe</strong>
              <div style={{ fontSize: '0.9rem', color: '#d5d5d5' }}>Data Analyst</div>
            </div>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-para" style={{ color: '#d5d5d5' }}>
              Thanks to AI Career Advisor, I discovered roles in machine learning I never knew existed. It's like having an expert by your side.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="testimonial-card">
          <div className="testimonial-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img
              src="assets/staff-img (2).png"
              alt="Jane Smith"
              className="testimonial-img"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Jane Smith</strong>
              <div style={{ fontSize: '0.9rem', color: '#d5d5d5' }}>AI Researcher</div>
            </div>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-para" style={{ color: '#d5d5d5' }}>
              I used AI Career Advisor to map out my transition into AI development. The advice and clarity it offers are unmatched.
            </p>
          </div>
        </div>
      </div>

      <div
        className="testimonial-card-container"
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Card 3 */}
        <div className="testimonial-card">
          <div className="testimonial-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img
              src="assets/staff-img (1).png"
              alt="Michael Lee"
              className="testimonial-img"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Michael Lee</strong>
              <div style={{ fontSize: '0.9rem', color: '#d5d5d5' }}>AI Product Manager</div>
            </div>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-para" style={{ color: '#d5d5d5' }}>
              This tool simplified my career shift into AI product strategy. The tailored guidance was incredibly valuable.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="testimonial-card">
          <div className="testimonial-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img
              src="assets/staff-img (2).png"
              alt="Emily Chen"
              className="testimonial-img"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Emily Chen</strong>
              <div style={{ fontSize: '0.9rem', color: '#d5d5d5' }}>AI Ethics Consultant</div>
            </div>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-para" style={{ color: '#d5d5d5' }}>
              AI Career Advisor opened my eyes to emerging ethical roles in AI that align with my passion and values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonals;
