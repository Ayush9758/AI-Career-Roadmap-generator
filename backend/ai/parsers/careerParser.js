const logger = require('../../utils/logger');

/**
 * Parses raw text from AI into career recommendation objects
 * @param {string} text - Raw output from AI model
 * @returns {Array} List of career recommendation objects
 */
const parseCareerResponse = (text) => {
  try {
    let cleanText = text.trim();

    // Strip markdown code block wrappers if present (e.g. ```json ... ``` or ``` ...)
    if (cleanText.startsWith('```')) {
      const match = cleanText.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
      if (match) {
        cleanText = match[1];
      }
    }

    cleanText = cleanText.trim();

    // Parse JSON
    const parsed = JSON.parse(cleanText);

    if (!Array.isArray(parsed)) {
      throw new Error('AI output is not a JSON array');
    }

    // Sanitize and validate fields
    return parsed.map((item) => ({
      title: String(item.title || 'Untitled Career'),
      description: String(item.description || ''),
      matchScore: Number(item.matchScore) || 70,
      skills: Array.isArray(item.skills) ? item.skills.map(String) : [],
      avgSalary: String(item.avgSalary || '$60,000 - $100,000'),
      growthRate: String(item.growthRate || 'Stable'),
      demandLevel: ['High', 'Medium', 'Low'].includes(item.demandLevel)
        ? item.demandLevel
        : 'Medium',
      icon: String(item.icon || 'code-2'),
      category: String(item.category || 'General Tech'),
    }));
  } catch (error) {
    logger.error(`Failed to parse AI Career Response: ${error.message}. Raw text: ${text}`);
    throw new Error('Could not parse AI recommendation response');
  }
};

module.exports = parseCareerResponse;
