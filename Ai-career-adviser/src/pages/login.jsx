import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.email || !formData.password || (isSignup && (!formData.name || !formData.confirmPassword))) {
      setMessageType("error");
      setMessage("Please fill in all required fields.");
      return;
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
    const payload = isSignup
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
      if (isSignup) {
        setMessageType("success");
        setMessage(res.data.message || "Signup successful. Please sign in.");
        setIsSignup(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Request failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isSignup ? "Create Account" : "Sign In"}</h1>
        <p>{isSignup ? "Enter your details to start." : "Enter your email and password."}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="auth-button">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="auth-switch">
          <span>{isSignup ? "Already have an account?" : "Don’t have an account?"}</span>
          <button type="button" onClick={() => { setIsSignup(!isSignup); setMessage(""); setMessageType("error"); }}>
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {message && <div className={`auth-message auth-message--${messageType}`}>{message}</div>}
      </div>
    </div>
  );
};

export default Login;
