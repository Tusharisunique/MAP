// server/server.js
const express = require("express");
const cors = require("cors");
const careerRoutes = require("./routes/careerRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Allow requests from any origin in production, or localhost in development
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://mapp-n9czf0taz-trytusharjoshi-gmailcoms-projects.vercel.app'] // Your current Vercel URL
  : ['http://localhost:3000'];

app.use(cors());
app.use(express.json());

// Use the career routes
app.use("/api", careerRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
