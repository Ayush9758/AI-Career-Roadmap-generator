const Assessment = require('../models/Assessment');
const Career = require('../models/Career');
const Progress = require('../models/Progress');
const aiService = require('./aiService');
const logger = require('../utils/logger');

// Assessment Questions (mirrored from frontend)
const QUESTIONS = [
  {
    id: 'q1',
    question: 'What is your current level of professional/academic experience?',
    type: 'single',
    options: [
      'Complete beginner — I have no experience in this field',
      'Hobbyist — I dabble in this area on the side',
      'Student — Currently studying in a related field',
      'Early career — 1-3 years of professional experience',
      'Mid-level — 3-7 years of professional experience',
      'Senior — 7+ years of professional experience',
    ],
  },
  {
    id: 'q2',
    question: 'Which professional fields or areas of technology interest you the most?',
    type: 'multiple',
    options: [
      'Web Development (Frontend/Backend)',
      'Mobile App Development',
      'Data Science & Analytics',
      'Machine Learning & AI',
      'Cloud Computing & DevOps',
      'Cybersecurity',
      'UI/UX Design',
      'Law & Legal Services',
      'Healthcare & Pharmacy',
      'Finance & Investment',
      'Education & Teaching',
      'Creative Arts & Writing',
    ],
  },
  {
    id: 'q3',
    question: 'How comfortable/interested are you with programming and writing code?',
    type: 'scale',
    min: 1,
    max: 10,
    scaleLabels: { min: 'Not interested', max: 'Very comfortable' },
  },
  {
    id: 'q4',
    question: 'What type of work environment do you prefer?',
    type: 'single',
    options: [
      'Solo deep work — I love solving problems independently',
      'Small team collaboration — Working closely with a few people',
      'Large cross-functional teams — Coordinating across departments',
      'Leadership roles — Managing and mentoring others',
      'Client-facing — Direct interaction with stakeholders',
    ],
  },
  {
    id: 'q5',
    question: 'Which skills do you already possess?',
    type: 'multiple',
    options: [
      'HTML/CSS',
      'JavaScript/TypeScript',
      'Python',
      'SQL & Databases',
      'Git & Version Control',
      'Data Analysis & Visualization',
      'Legal Research & Writing',
      'Pharmacology & Clinical Care',
      'Financial Analysis & Budgeting',
      'Public Speaking & Communication',
      'Teaching & Instruction',
    ],
  },
  {
    id: 'q6',
    question: 'How important is salary potential in your career decision?',
    type: 'scale',
    min: 1,
    max: 10,
    scaleLabels: { min: 'Not important', max: 'Very important' },
  },
  {
    id: 'q7',
    question: 'What is your preferred learning style?',
    type: 'single',
    options: [
      'Hands-on projects — Building things from scratch',
      'Structured courses — Following a curriculum step by step',
      'Reading documentation — Self-guided learning',
      'Video tutorials — Watching and following along',
      'Mentorship — One-on-one guidance from experienced professionals',
    ],
  },
  {
    id: 'q8',
    question: 'What is your primary goal for the next 2 years?',
    type: 'single',
    options: [
      'Land my first tech job',
      'Switch from a non-tech career to tech',
      'Get promoted in my current role',
      'Transition to a specialized tech role',
      'Start my own tech company or freelance',
      'Build expertise for research or academia',
    ],
  },
];

class AssessmentService {
  /**
   * Returns static list of assessment questions
   */
  async getQuestions() {
    return QUESTIONS;
  }

  /**
   * Submits user assessment answers, triggers AI recommendations, saves results
   */
  async submitAssessment(userId, answers) {
    logger.info(`Processing assessment submission for user: ${userId}`);

    // 1. Save the assessment submission
    const assessment = await Assessment.create({
      userId,
      answers,
    });

    // 2. Generate career recommendations via AI
    const recommendedCareers = await aiService.generateCareerRecommendations(answers);

    // 3. Clear out old career recommendations for this user to avoid stale results
    await Career.deleteMany({ userId });

    // 4. Save new recommendations to DB
    const careerDocuments = recommendedCareers.map((c) => ({
      userId,
      title: c.title,
      description: c.description,
      matchScore: c.matchScore,
      skills: c.skills,
      avgSalary: c.avgSalary,
      growthRate: c.growthRate,
      demandLevel: c.demandLevel,
      icon: c.icon,
      category: c.category,
    }));

    await Career.insertMany(careerDocuments);

    // 5. Update user stats (increment assessmentsTaken and careersExplored)
    const progress = await Progress.findOne({ userId });
    if (progress) {
      progress.assessmentsTaken += 1;
      progress.careersExplored += careerDocuments.length;
      await progress.save();
    }

    logger.info(`Assessment processing complete. Generated ${careerDocuments.length} recommendations.`);

    return {
      success: true,
      message: 'Assessment completed! Your career recommendations are ready.',
    };
  }
}

module.exports = new AssessmentService();
