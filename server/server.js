const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require('openai');
const authRoutes = require("./routes/auth");
const { initializeDatabase, pool } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.post('/api/career', async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      result: 'OpenAI is not configured. Add OPENAI_API_KEY to server/.env, then restart the server.',
    });
  }

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
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      input: prompt,
    });

    res.json({ result: response.output_text });
  } catch (err) {
    console.error('OpenAI career request failed:', err.message);
    res.status(502).json({
      result: 'OpenAI could not generate a career path. Check OPENAI_API_KEY, account billing, and the configured model, then try again.',
    });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await initializeDatabase();
  const server = app.listen(PORT, () => {
    console.log(`PostgreSQL connected. Server running on port ${PORT}.`);
  });

  const shutdown = () => {
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

startServer().catch(async (err) => {
  console.error("Could not start backend with PostgreSQL:", err.message);
  await pool.end();
  process.exit(1);
});
