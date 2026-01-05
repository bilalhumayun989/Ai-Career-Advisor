import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './About.css';
 import Footer from "../components/footer"
 import Navbar from '../components/Navbar';
const About = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/services'); // Replace with your route path
  };
  return (
    <>
      <Navbar/>
    <div className="about-page-wrapper">
    
      <div className="about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.div
            className="about-image"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
          >
            <img src= "assets/about-img.webp" alt="AI Career Advisor" className="about-img" />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>About AI Career Advisor</h2>
            <p>
              AI Career Advisor is an intelligent platform that helps users explore suitable career paths using advanced AI algorithms.
              After logging in, users fill out a smart form that evaluates their interests and skills, then returns to the home page for personalized insights.
            </p>
            <p>
              Our mission is to simplify career decisions and empower individuals through modern technology.
              Whether you're a student or professional, our tool adapts to your goals.
            </p>
            {/* <a href="/" className="about-btn">Go to Home</a> */}
                <div className="blob-button-container">
      <button className="blob-button" onClick={handleClick}>
     Learn More
      <span className="blob-button-inner">
        <span className="blob-button-blobs">
          <span className="blob-button-blob"></span>
          <span className="blob-button-blob"></span>
          <span className="blob-button-blob"></span>
          <span className="blob-button-blob"></span>
        </span>
      </span>
    </button>
      <br />

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
