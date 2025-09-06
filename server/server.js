// server/server.js
const express = require("express");
const cors = require("cors");
const careerRoutes = require("./routes/careerRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Allow requests from any origin in production, or localhost in development
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://your-frontend-domain.vercel.app'] // We'll update this after deployment
  : ['http://localhost:3000'];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
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
