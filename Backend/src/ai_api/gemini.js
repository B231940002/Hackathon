const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const scoreReportSeverity = async ({ report_type, reporter_role, description, knows_bully }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a school bullying case severity evaluator. Analyze the following bullying report and return ONLY a single integer from 1 to 10 representing severity (1 = minor incident, 10 = extreme emergency requiring immediate action).

Report details:
- Type: ${report_type}
- Reporter role: ${reporter_role || "unknown"}
- Knows bully: ${knows_bully ? "yes" : "no"}
- Description: ${description}

Scoring guide:
- 1-3: Mild verbal/social conflict, no physical harm, isolated incident
- 4-6: Repeated psychological bullying, cyber harassment, moderate distress
- 7-8: Physical bullying, threats, victim clearly distressed, ongoing pattern
- 9-10: Severe physical harm, self-harm risk, immediate danger

Respond with ONLY the number, nothing else.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const score = parseInt(text, 10);

    if (isNaN(score) || score < 1 || score > 10) {
      return 5;
    }

    return score;
  } catch {
    return 5;
  }
};

module.exports = { scoreReportSeverity };