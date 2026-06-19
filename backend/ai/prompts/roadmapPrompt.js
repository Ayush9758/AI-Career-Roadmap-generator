/**
 * Prompt builder for AI career roadmap generation
 */
const buildRoadmapPrompt = (careerTitle, skills = []) => {
  const skillsContext = skills.length > 0
    ? `The user's career recommendation includes these key skills: ${skills.join(', ')}.`
    : '';

  return `
You are an elite educational curator and engineering training director.
Generate a comprehensive, structured, step-by-step learning roadmap for a student aiming to become a "${careerTitle}".
${skillsContext}

### Requirements:
1. Divide the roadmap into exactly 3-4 chronological, progressive learning phases (e.g. Foundation, Intermediate, Advanced, Project/DevOps).
2. For each phase, provide 3-4 specific, actionable learning milestones.
3. For each milestone, provide exactly 2 high-quality learning resources. Ensure they reference popular, real resources (e.g., MDN Web Docs, freeCodeCamp, roadmap.sh, official documentation, major YouTube courses, books).
4. The response MUST be a valid JSON object matching the schema below and NOTHING ELSE. Do not include explanation or markdown formatting.

### Output JSON Schema:
{
  "careerTitle": "${careerTitle}",
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase Title (e.g., frontend foundations)",
      "description": "Short explanation of what is learned in this phase.",
      "duration": "Duration in weeks/months (e.g., 2-3 months)",
      "order": 1,
      "milestones": [
        {
          "id": "ms-1",
          "title": "Milestone Title (e.g., Master HTML & CSS)",
          "description": "Clear explanation of what needs to be built or understood to complete this milestone.",
          "resources": [
            {
              "title": "Resource Title (e.g., MDN HTML Guide)",
              "url": "https://developer.mozilla.org/... (a real valid learning url)",
              "type": "article" // Choose from: 'article', 'video', 'course', 'book', 'tool'
            },
            {
              "title": "Resource 2 Title",
              "url": "https://...",
              "type": "course"
            }
          ]
        }
      ]
    }
  ]
}
`;
};

module.exports = buildRoadmapPrompt;
