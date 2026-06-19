const logger = require('../../utils/logger');

/**
 * Parses raw text from AI into structured roadmap data
 * @param {string} text - Raw output from AI model
 * @returns {Object} Structured roadmap object
 */
const parseRoadmapResponse = (text) => {
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

    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.phases)) {
      throw new Error('AI output is not a structured roadmap object with a phases array');
    }

    // Sanitize and validate fields
    const phases = parsed.phases.map((phase, pIdx) => {
      const milestones = Array.isArray(phase.milestones)
        ? phase.milestones.map((ms, mIdx) => {
            const resources = Array.isArray(ms.resources)
              ? ms.resources.map((res) => ({
                  title: String(res.title || 'Learning Resource'),
                  url: String(res.url || 'https://roadmap.sh'),
                  type: ['article', 'video', 'course', 'book', 'tool'].includes(res.type)
                    ? res.type
                    : 'article',
                }))
              : [];

            return {
              id: String(ms.id || `ms-${pIdx + 1}-${mIdx + 1}`),
              title: String(ms.title || 'Untitled Milestone'),
              description: String(ms.description || ''),
              resources,
              completed: false,
              completedAt: null,
            };
          })
        : [];

      return {
        id: String(phase.id || `phase-${pIdx + 1}`),
        title: String(phase.title || 'Untitled Phase'),
        description: String(phase.description || ''),
        duration: String(phase.duration || '4 weeks'),
        order: Number(phase.order) || (pIdx + 1),
        progress: 0,
        milestones,
      };
    });

    return {
      careerTitle: String(parsed.careerTitle || 'Career Path'),
      phases,
    };
  } catch (error) {
    logger.error(`Failed to parse AI Roadmap Response: ${error.message}. Raw text: ${text}`);
    throw new Error('Could not parse AI roadmap response');
  }
};

module.exports = parseRoadmapResponse;
