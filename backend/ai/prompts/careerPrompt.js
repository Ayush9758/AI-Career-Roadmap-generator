/**
 * Prompt builder for AI career recommendations
 */
const buildCareerPrompt = (answers) => {
  // Convert answers array to a readable text representation
  const formattedAnswers = answers
    .map((item) => {
      let ansStr = '';
      if (Array.isArray(item.answer)) {
        ansStr = item.answer.join(', ');
      } else {
        ansStr = String(item.answer);
      }
      return `- Question ID: ${item.questionId}\n  Answer: ${ansStr}`;
    })
    .join('\n');

  return `
You are an expert career counselor and AI advisor.
Based on the following user responses to a career assessment, recommend exactly 3-5 career paths that best match their interests, skills, and experience level. These recommendations are NOT limited to technology; you should actively recommend careers in law, healthcare/pharmacy, finance, education, or creative fields if the user's responses indicate interest or experience in those fields.

### User Assessment Data:
${formattedAnswers}

### Output Format:
You MUST respond with a valid JSON array of objects and NOTHING ELSE. No explanation, no markdown blocks (like \`\`\`json ... \`\`\`), just the raw JSON.
Each object in the array must match this schema:
{
  "title": "Job Title (e.g. Frontend Developer, Corporate Lawyer, Pharmacist, Financial Analyst)",
  "description": "Short description of the career path, what they do, and why it matches the user profile.",
  "matchScore": 85, // Integer score between 50 and 100 based on alignment
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"], // 5-8 relevant skills
  "avgSalary": "$90,000 - $130,000", // Current average industry salary range
  "growthRate": "+15% by 2030", // Estimated industry growth
  "demandLevel": "High", // Can be "High", "Medium", or "Low"
  "icon": "Lucide icon name (e.g., 'code-2' for coding, 'brain' for AI, 'database' for data, 'cloud' for devops, 'shield' for cyber, 'palette' for design, 'scale' for law/legal, 'pill' for healthcare/pharmacy, 'trending-up' for finance/investment)",
  "category": "High-level domain (e.g., 'Engineering', 'AI & ML', 'Data', 'Infrastructure', 'Design', 'Cybersecurity', 'Law & Legal', 'Healthcare', 'Finance')"
}
`;
};

module.exports = buildCareerPrompt;
