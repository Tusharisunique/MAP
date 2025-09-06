// server/controllers/careerController.js
const { Mistral } = require("@mistralai/mistralai");

const apiKey = "4WPvJ6I1OVck1ePjsfik46cc3cXpvt0N";
const client = new Mistral({ apiKey: apiKey });

exports.generateCareerTrajectory = async (req, res) => {
  const { name, age, education, skills, experience, interests } = req.body;

  try {
    // For now, let's return a mock response to test the connection
    const mockAdvice = {
      title: `Career Trajectory for ${name}`,
      summary: `Based on your profile as a ${age}-year-old with ${education} education and ${experience} experience in ${skills}, here's your personalized career roadmap.`,
      sections: [
        {
          title: "Immediate Next Steps (0-6 months)",
          items: [
            "Enhance your technical skills in " + skills,
            "Build a portfolio showcasing your " + experience + " experience",
            "Network with professionals in your field of interest: " + interests,
            "Consider taking relevant certifications"
          ]
        },
        {
          title: "Short-term Goals (6 months - 2 years)",
          items: [
            "Apply for mid-level positions in your field",
            "Gain additional experience in " + interests,
            "Develop leadership skills through projects",
            "Consider advanced education if needed"
          ]
        },
        {
          title: "Long-term Vision (2-5 years)",
          items: [
            "Aim for senior-level positions",
            "Consider specialization in " + interests,
            "Build a strong professional network",
            "Explore opportunities for career advancement"
          ]
        }
      ]
    };

    res.json({ advice: mockAdvice });
  } catch (error) {
    console.error("Error in generateCareerTrajectory:", error);
    res
      .status(500)
      .json({ error: "Error generating career trajectory: " + error.message });
  }
};
