const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in the server environment.");
}

// Signup Route
router.post("/signup", async (req, res) => {
  console.log("Signup request body:", req.body);
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err.stack || err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    console.log(req.body)
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
     
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    console.log('send token 2')
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
     console.log('send token 2')
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
    console.log('successfull')
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
