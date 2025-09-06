// server/app.js
const express = require("express");
const cors = require("cors");
const careerRoutes = require("./routes/careerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", careerRoutes);

module.exports = app;
