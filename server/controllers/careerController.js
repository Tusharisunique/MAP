// server/controllers/careerController.js
const { Mistral } = require("@mistralai/mistralai");

const apiKey = "4WPvJ6I1OVck1ePjsfik46cc3cXpvt0N";
const client = new Mistral({ apiKey: apiKey });

exports.generateCareerTrajectory = async (req, res) => {
  const { name, age, education, skills, experience, interests } = req.body;

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: `Suggest a detailed and personalized career trajectory for me based on the following information:

          Name: ${name}
          Age: ${age}
          Educational Qualifications: ${education}
          Skills: ${skills}
          Experience: ${experience}
          Interests: ${interests}
          Include the following elements to ensure the career trajectory is complete, actionable, and directly relevant to me:
          "Focus on the age group of the individual, and five the results accordingly."
          1. Self-Assessment
          Identification of Interests and Strengths: Highlight my skills, hobbies, and motivations.
          Personality Traits: Explain how my personality (e.g., introvert/extrovert, creative/analytical) aligns with career choices.
          Values and Goals: Outline my short-term and long-term career aspirations and priorities.
          2. Exploration of Career Options
          Job Profiles: Provide descriptions of potential roles and industries that suit my profile.
          Market Trends: Discuss demand and growth trends in relevant sectors.
          Alternate Career Paths: Suggest unconventional or niche options that match my background and interests.
          3. Skill Gap Analysis
          Required Skills: List technical, soft, and domain-specific skills needed for my desired career.
          Current vs. Required: Compare my existing skills to what is required.
          Action Plan: Recommend certifications, degrees, or projects to bridge these gaps.
          4. Education and Training Roadmap
          Formal Education: Suggest degree programs, universities, or colleges that align with my goals.
          Professional Certifications: Recommend specific courses or bootcamps to strengthen my qualifications.
          Online Resources: List platforms like Coursera, Udemy, or LinkedIn Learning for upskilling.
          5. Practical Experience Suggestions
          Internships and Apprenticeships: Recommend ways to gain hands-on experience.
          Volunteer Work: Suggest how unpaid opportunities can help build skills.
          Portfolio Development: Propose projects or case studies to demonstrate my expertise.
          6. Milestones and Timeline
          Short-Term Goals (6 months - 2 years): Specific actions I should take immediately.
          Mid-Term Goals (3-5 years): Career milestones like promotions, leadership roles, or advanced education.
          Long-Term Goals (10+ years): Vision for my career, including potential shifts or specialization.
          7. Guidance on Networking
          Building Connections: Strategies for networking with industry professionals and alumni.
          Professional Profiles: Tips to optimize my LinkedIn, GitHub, or personal website.
          Events and Communities: Recommendations for webinars, conferences, and communities to join.
          8. Financial Considerations
          Cost of Education: Estimate expenses for relevant courses or training.
          Expected Earnings: Provide salary benchmarks for potential roles.
          Funding Options: Suggest scholarships, loans, or funding resources.
          9. Contingency Plans
          Backup Options: Recommend alternate fields or roles if the primary goal doesn’t materialize.
          Flexibility: Highlight transferable skills that allow adaptability across careers.
          10. Personalized Flowchart or Career Path
          Visual Representation: Include a flowchart showing steps to reach my goals, key decision points, and milestones.
          Opportunities for Diversification: Highlight paths for further specialization or branching out.
          Customized Advice: Tailor the flowchart to my personal circumstances and goals.
          11. Evaluation and Follow-Up
          Progress Tracking: Include methods to regularly assess and adjust my plan.
          Skill Updates: Recommend strategies to stay current with industry standards.
          Continuous Mentorship: Provide tips for maintaining guidance from mentors or professionals.
          Output Requirements:
          Respond ONLY with valid JSON (no markdown, no backticks). Use this exact schema:
          {
            "title": string,
            "summary": string,
            "sections": [
              { "title": string, "items": [string, ...] }
            ]
          }
          Style guidelines: concise, human, practical, no buzzwords, no asterisks or markdown. Address me directly.`,
        },
      ],
    });

    const firstChoice = chatResponse?.choices?.[0];
    const content = firstChoice?.message?.content;
    const advice = Array.isArray(content)
      ? content
          .map(part => {
            if (typeof part === "string") return part;
            if (part && typeof part.text === "string") return part.text;
            return "";
          })
          .join("")
      : typeof content === "string"
      ? content
      : "";

    if (!advice) {
      throw new Error("Empty response content from Mistral chat completion");
    }

    res.json({ advice });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interacting with Mistral AI: " + error.message });
  }
};
