// server/routes/careerRoutes.js
const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");

router.post("/career-trajectory", careerController.generateCareerTrajectory);

module.exports = router;
