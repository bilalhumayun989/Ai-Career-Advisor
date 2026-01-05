const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/gemini-career', async (req, res) => {
  const {
    fullName,
    age,
    email,
    location,
    qualification,
    institute,
    field,
    gradYear,
    jobStatus,
    skills,
    careerInterests,
    bio
  } = req.body;

  const prompt = `
A student named ${fullName}, aged ${age}, from ${location}, email: ${email}, graduated from ${institute} in ${gradYear} with a degree in ${field}.
Their qualification is ${qualification}. Current employment status: ${jobStatus}. Known skills: ${skills}.
They are interested in: ${careerInterests}. Personal bio: ${bio}.

Based on this profile, suggest a personalized career path. Include:
- Summary of suitable career direction
- Explanation of why this path is suitable
- Recommended job roles
- Any helpful advice or next steps
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ result: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: 'Failed to generate response from Gemini.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
