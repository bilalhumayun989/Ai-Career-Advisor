import React, { useState } from "react";
import "./login.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContainer = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate()
  // Sign Up State
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", signupData);
      alert(res.data.message);
      setIsRightPanelActive(false); // switch to login panel
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", loginData);
      // alert(res.data.message);
      localStorage.setItem("token", res.data.token); // save token if using JWT
      navigate('/')
      // redirect or update UI here
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <motion.div
      className="main"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">

        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup}>
            <h1 className="heading-primary">Create Account</h1>
            <p className="text-paragraph"><span>or use your email for registration</span></p>
            <input type="text" placeholder="Name" value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
            <input type="email" placeholder="Email" value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
            <input type="password" placeholder="Confirm Password" value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} required />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-sign"
              type="submit"
            >
              Sign Up
            </motion.button>

            <p className="switch-text">
              Already have an account?{" "}
              <button type="button" className="switch-link" onClick={() => setIsRightPanelActive(false)}>
                Sign In
              </button>
            </p>
          </form>
        </div>

        {/* Login Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h3 className="heading-primary">Sign in to Ai Career Advisor</h3>
            <p className="text-paragraph"><span>or use your account</span></p>
            <input type="email" placeholder="Email" value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />

            <a href="#">Forgot your password?</a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-sign"
              type="submit"
            >
              Sign In
            </motion.button>

            <p className="switch-text">
              Don’t have an account?{" "}
              <button type="button" className="switch-link" onClick={() => setIsRightPanelActive(true)}>
                Sign Up
              </button>
            </p>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="heading-primary">Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost btn-sign" id="signIn" onClick={() => setIsRightPanelActive(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="heading-primary">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost btn-sign" id="signUp" onClick={() => setIsRightPanelActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthContainer;
