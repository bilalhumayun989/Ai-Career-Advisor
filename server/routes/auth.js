const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in the server environment.");
}

async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Sign in to update your account." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: "Account not found." });
    if (
      user.passwordChangedAt &&
      payload.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)
    ) {
      return res.status(401).json({ message: "Your password changed. Sign in again." });
    }
    req.accountUser = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Your session expired. Sign in again." });
    }
    console.error("Account authentication failed:", err.message);
    return res.status(500).json({ message: "Could not verify your account." });
  }
}

// Signup Route
router.post("/signup", async (req, res) => {
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
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
     
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/profile", requireAuth, async (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  if (name.length < 2 || name.length > 80) {
    return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
  }

  try {
    req.accountUser.name = name;
    await req.accountUser.save();
    return res.json({ user: { name: req.accountUser.name, email: req.accountUser.email } });
  } catch (err) {
    console.error("Profile update failed:", err.message);
    return res.status(500).json({ message: "Could not update your profile." });
  }
});

router.patch("/password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Complete all password fields." });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ message: "New password must be at least 8 characters." });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match." });
  }
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "Choose a password you have not used here." });
  }

  try {
    const matches = await bcrypt.compare(currentPassword, req.accountUser.password);
    if (!matches) return res.status(400).json({ message: "Current password is incorrect." });
    req.accountUser.password = await bcrypt.hash(newPassword, 10);
    req.accountUser.passwordChangedAt = new Date();
    await req.accountUser.save();
    return res.json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Password update failed:", err.message);
    return res.status(500).json({ message: "Could not change your password." });
  }
});

module.exports = router;
