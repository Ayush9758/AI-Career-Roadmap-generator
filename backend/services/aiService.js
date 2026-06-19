const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
const logger = require('../utils/logger');
const buildCareerPrompt = require('../ai/prompts/careerPrompt');
const parseCareerResponse = require('../ai/parsers/careerParser');
const buildRoadmapPrompt = require('../ai/prompts/roadmapPrompt');
const parseRoadmapResponse = require('../ai/parsers/roadmapParser');

// Safe mock database for local fallback
const MOCK_CAREERS_LIBRARY = [
  {
    title: 'Full-Stack Developer',
    description: 'Build complete web applications from frontend interfaces to backend APIs. Full-stack developers understand the entire development lifecycle and are highly versatile.',
    matchScore: 95,
    skills: ['React', 'Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Git'],
    avgSalary: '$95,000 - $145,000',
    growthRate: '+22% by 2030',
    demandLevel: 'High',
    icon: 'code-2',
    category: 'Engineering',
  },
  {
    title: 'Machine Learning Engineer',
    description: 'Design, implement, and deploy machine learning models at scale. Bridges the gap between data research and production software engineering.',
    matchScore: 88,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Pandas', 'Scikit-Learn'],
    avgSalary: '$120,000 - $185,000',
    growthRate: '+40% by 2030',
    demandLevel: 'High',
    icon: 'brain',
    category: 'AI & ML',
  },
  {
    title: 'Cloud Solutions Architect',
    description: 'Design and oversee cloud computing environments for organizations. Create secure, scalable, and cost-effective cloud infrastructures.',
    matchScore: 82,
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'Linux', 'Network Security'],
    avgSalary: '$130,000 - $190,000',
    growthRate: '+35% by 2030',
    demandLevel: 'High',
    icon: 'cloud',
    category: 'Infrastructure',
  },
  {
    title: 'Product Designer (UX/UI)',
    description: 'Create intuitive, user-friendly layouts and visually stunning interface designs for applications. Involves high-fidelity prototyping and user research.',
    matchScore: 78,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'CSS/HTML', 'Wireframing'],
    avgSalary: '$85,000 - $140,000',
    growthRate: '+18% by 2030',
    demandLevel: 'Medium',
    icon: 'palette',
    category: 'Design',
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organization systems, networks, and data from cyber threats. Analyze vulnerabilities and respond to security incidents.',
    matchScore: 75,
    skills: ['Firewalls', 'Penetration Testing', 'Network Security', 'SIEM Tools', 'Linux', 'Cryptography'],
    avgSalary: '$90,000 - $145,000',
    growthRate: '+33% by 2030',
    demandLevel: 'High',
    icon: 'shield',
    category: 'Cybersecurity',
  },
  {
    title: 'Corporate Lawyer',
    description: 'Provide legal counsel to corporations on their legal rights, duties, and responsibilities. Specializes in transactions, compliance, and corporate structures.',
    matchScore: 90,
    skills: ['Legal Research & Writing', 'Corporate Governance', 'Regulatory Compliance', 'Contract Drafting', 'Negotiation', 'Public Speaking & Communication'],
    avgSalary: '$115,000 - $185,000',
    growthRate: '+9% by 2030',
    demandLevel: 'High',
    icon: 'scale',
    category: 'Law & Legal',
  },
  {
    title: 'Pharmacist',
    description: 'Dispense prescription medications, provide vital advice on drug interactions, and help patients manage their health through clinical guidance and pharmacy operations.',
    matchScore: 88,
    skills: ['Pharmacology & Clinical Care', 'Chemistry & Biochemistry', 'Prescription Verification', 'Patient Counseling', 'Pharmacy Law & Ethics', 'Medical Terminology'],
    avgSalary: '$120,000 - $150,000',
    growthRate: '+3% by 2030',
    demandLevel: 'Medium',
    icon: 'pill',
    category: 'Healthcare',
  },
  {
    title: 'Financial Analyst',
    description: 'Analyze financial data, research macroeconomic trends, construct valuation models, and guide investment decisions for corporations and portfolio managers.',
    matchScore: 92,
    skills: ['Financial Analysis & Budgeting', 'Excel & Financial Modeling', 'Micro & Macroeconomics', 'Data Analysis & Visualization', 'Portfolio Management', 'Corporate Finance'],
    avgSalary: '$85,000 - $130,000',
    growthRate: '+12% by 2030',
    demandLevel: 'High',
    icon: 'trending-up',
    category: 'Finance',
  },
];

const MOCK_ROADMAPS_LIBRARY = {
  'full-stack developer': {
    careerTitle: 'Full-Stack Developer',
    phases: [
      {
        id: 'phase-1',
        title: 'Foundation & Frontend Core',
        description: 'Establish modern HTML/CSS foundations and standard Javascript scripting.',
        duration: '2 months',
        order: 1,
        milestones: [
          {
            id: 'ms-1-1',
            title: 'HTML5 & Semantic Markup',
            description: 'Learn structure, forms, SEO tags, and page layouts.',
            resources: [
              { title: 'MDN Web Docs HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'article' },
              { title: 'freeCodeCamp Responsive Design', url: 'https://www.freecodecamp.org/learn', type: 'course' },
            ],
          },
          {
            id: 'ms-1-2',
            title: 'CSS Grid & Flexbox Layouts',
            description: 'Understand responsive layouts, custom styling, and viewport alignment.',
            resources: [
              { title: 'A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'article' },
              { title: 'Kevin Powell CSS Course', url: 'https://www.youtube.com/c/KevinPowell', type: 'video' },
            ],
          },
          {
            id: 'ms-1-3',
            title: 'JavaScript DOM & Asynchronous APIs',
            description: 'Master event listeners, async execution, fetch requests, and JSON data.',
            resources: [
              { title: 'JavaScript.info Complete Tutorial', url: 'https://javascript.info/', type: 'article' },
              { title: 'Eloquent JavaScript Book', url: 'https://eloquentjavascript.net/', type: 'book' },
            ],
          },
        ],
      },
      {
        id: 'phase-2',
        title: 'Frontend Framework & Styling',
        description: 'Build single-page web applications with React, TailwindCSS, and state managers.',
        duration: '2 months',
        order: 2,
        milestones: [
          {
            id: 'ms-2-1',
            title: 'React Components & Hook States',
            description: 'Understand component lifecycles, states, and properties.',
            resources: [
              { title: 'React Official Documentation', url: 'https://react.dev/', type: 'article' },
              { title: 'React JS Crash Course', url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0', type: 'video' },
            ],
          },
          {
            id: 'ms-2-2',
            title: 'React Router & Global Context APIs',
            description: 'Implement frontend route endpoints and shared global stores.',
            resources: [
              { title: 'React Router v6 Docs', url: 'https://reactrouter.com/en/main', type: 'article' },
              { title: 'Academind React Context Guide', url: 'https://academind.com/', type: 'course' },
            ],
          },
        ],
      },
      {
        id: 'phase-3',
        title: 'Backend API Engineering',
        description: 'Design secure web servers, routes, and link relational/non-relational databases.',
        duration: '3 months',
        order: 3,
        milestones: [
          {
            id: 'ms-3-1',
            title: 'Express REST Server & Routing',
            description: 'Set up endpoints, configure status codes, and write custom validation handlers.',
            resources: [
              { title: 'ExpressJS Guide', url: 'https://expressjs.com/', type: 'article' },
              { title: 'The Net Ninja Node.js Tutorial', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkc79jA57n2g8O7903_58F-NZ2s', type: 'video' },
            ],
          },
          {
            id: 'ms-3-2',
            title: 'MongoDB Schema Design & Querying',
            description: 'Build schemas using Mongoose, perform CRUD commands, and manage joins.',
            resources: [
              { title: 'Mongoose Getting Started', url: 'https://mongoosejs.com/docs/', type: 'article' },
              { title: 'MongoDB University Courses', url: 'https://university.mongodb.com/', type: 'course' },
            ],
          },
          {
            id: 'ms-3-3',
            title: 'JSON Web Token (JWT) Security',
            description: 'Incorporate tokens, hash user credentials with bcrypt, and secure route access.',
            resources: [
              { title: 'JWT.io Debugger & Guides', url: 'https://jwt.io/', type: 'tool' },
              { title: 'Web Dev Simplified Auth Tutorial', url: 'https://www.youtube.com/watch?v=27KeRjD2S2M', type: 'video' },
            ],
          },
        ],
      },
    ],
  },
  'machine learning engineer': {
    careerTitle: 'Machine Learning Engineer',
    phases: [
      {
        id: 'phase-1',
        title: 'Data Science Fundamentals & Math',
        description: 'Master Python libraries, statistics, linear algebra, and data preparation.',
        duration: '2-3 months',
        order: 1,
        milestones: [
          {
            id: 'ms-1-1',
            title: 'Python for Data Analysis (Pandas & Numpy)',
            description: 'Manipulate matrix vectors and clean tabular datasets.',
            resources: [
              { title: 'Pandas Tutorials', url: 'https://pandas.pydata.org/docs/', type: 'article' },
              { title: 'Python for Data Analysis Book', url: 'https://wesmckinney.com/book/', type: 'book' },
            ],
          },
          {
            id: 'ms-1-2',
            title: 'Statistics & Linear Algebra',
            description: 'Understand regressions, probability curves, eigenvalues, and vectors.',
            resources: [
              { title: '3Blue1Brown Linear Algebra Series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'video' },
              { title: 'Khan Academy College Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'course' },
            ],
          },
        ],
      },
      {
        id: 'phase-2',
        title: 'Classical Machine Learning',
        description: 'Build predictive regression, classification, and clustering models with Scikit-learn.',
        duration: '2 months',
        order: 2,
        milestones: [
          {
            id: 'ms-2-1',
            title: 'Supervised Learning Algorithms',
            description: 'Train decision trees, random forests, support vector machines, and linear models.',
            resources: [
              { title: 'Scikit-Learn Tutorials', url: 'https://scikit-learn.org/stable/', type: 'article' },
              { title: 'Andrew Ng ML Course', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'course' },
            ],
          },
        ],
      },
      {
        id: 'phase-3',
        title: 'Deep Learning & Neural Networks',
        description: 'Understand multi-layer perceptrons, backpropagation, and train CNNs/RNNs/Transformers.',
        duration: '3 months',
        order: 3,
        milestones: [
          {
            id: 'ms-3-1',
            title: 'PyTorch/TensorFlow Frameworks',
            description: 'Define tensors, custom layers, loss variables, and configure backprop optimizers.',
            resources: [
              { title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', type: 'article' },
              { title: 'Deep Learning Book (Goodfellow)', url: 'https://www.deeplearningbook.org/', type: 'book' },
            ],
          },
        ],
      },
    ],
  },
  'corporate lawyer': {
    careerTitle: 'Corporate Lawyer',
    phases: [
      {
        id: 'phase-1',
        title: 'Phase 1: Legal Education & Foundation',
        description: 'Establish foundational case law analysis capabilities and learn key legal research methodologies.',
        duration: '1-2 months',
        order: 1,
        milestones: [
          {
            id: 'ms-1-1',
            title: 'Master Case Law Analysis',
            description: 'Learn how to read legal briefs, extract holdings, and analyze judicial opinions.',
            resources: [
              { title: 'Oyez Supreme Court Resources', url: 'https://www.oyez.org/', type: 'tool' },
              { title: 'Introduction to Legal Analysis', url: 'https://www.law.georgetown.edu/academics/academic-success/', type: 'article' },
            ],
          },
          {
            id: 'ms-1-2',
            title: 'Legal Research & Databases (Westlaw/LexisNexis)',
            description: 'Master legal search queries, shepardizing cases, and citation formatting.',
            resources: [
              { title: 'Westlaw Training Guides', url: 'https://legal.thomsonreuters.com/en/products/westlaw', type: 'tool' },
              { title: 'LexisNexis Legal Research Academy', url: 'https://www.lexisnexis.com/en-us/home.page', type: 'course' },
            ],
          },
        ],
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Corporate Law Specialization',
        description: 'Understand regulatory filings, corporate structures, and contract governance.',
        duration: '2-3 months',
        order: 2,
        milestones: [
          {
            id: 'ms-2-1',
            title: 'Corporate Governance & Formation',
            description: 'Learn differences between LLCs, C-corps, and partnerships; drafting bylaws and articles.',
            resources: [
              { title: 'Harvard Law School Forum on Corporate Governance', url: 'https://corpgov.law.harvard.edu/', type: 'article' },
              { title: 'Delaware Division of Corporations Guide', url: 'https://corp.delaware.gov/', type: 'article' },
            ],
          },
          {
            id: 'ms-2-2',
            title: 'Securities Regulation & SEC Filings',
            description: 'Understand SEC disclosures, form 10-K, 10-Q, and insider trading laws.',
            resources: [
              { title: 'SEC Investor.gov Guides', url: 'https://www.investor.gov/', type: 'article' },
              { title: 'SEC EDGAR Database Guide', url: 'https://www.sec.gov/edgar/searchedgar/companysearch', type: 'tool' },
            ],
          },
        ],
      },
      {
        id: 'phase-3',
        title: 'Phase 3: Practical Advocacy & Licensing',
        description: 'Refine transaction drafting skills and prepare for state bar licensure.',
        duration: '2 months',
        order: 3,
        milestones: [
          {
            id: 'ms-3-1',
            title: 'Corporate Contract Drafting Lab',
            description: 'Draft standard acquisition agreements, NDA disclosures, and shareholder covenants.',
            resources: [
              { title: 'Transactional Drafting Manuals', url: 'https://www.americanbar.org/groups/business_law/', type: 'book' },
            ],
          },
          {
            id: 'ms-3-2',
            title: 'Bar Examination Preparation',
            description: 'Study Multistate Bar Examination (MBE) subjects and corporate law essay topics.',
            resources: [
              { title: 'NCBE Bar Exam practice', url: 'https://www.ncbex.org/', type: 'course' },
              { title: 'Barbri Review Courses', url: 'https://www.barbri.com/', type: 'course' },
            ],
          },
        ],
      },
    ],
  },
  'pharmacist': {
    careerTitle: 'Pharmacist',
    phases: [
      {
        id: 'phase-1',
        title: 'Phase 1: Pharmaceutical Sciences & Foundation',
        description: 'Understand medical biochemistry, physiology, and general drug classifications.',
        duration: '2-3 months',
        order: 1,
        milestones: [
          {
            id: 'ms-1-1',
            title: 'Medical Biochemistry & Physiology',
            description: 'Master organ systems, cellular metabolic pathways, and chemical cellular receptors.',
            resources: [
              { title: 'Khan Academy Organic Chemistry & Biology', url: 'https://www.khanacademy.org/', type: 'video' },
              { title: 'LibreTexts Biochemistry', url: 'https://chem.libretexts.org/', type: 'book' },
            ],
          },
          {
            id: 'ms-1-2',
            title: 'Foundational Principles of Pharmacology',
            description: 'Learn pharmacokinetics (absorption, distribution, metabolism) and drug target receptors.',
            resources: [
              { title: 'NIH PubChem Drug Information', url: 'https://pubchem.ncbi.nlm.nih.gov/', type: 'tool' },
              { title: 'Merck Manual Professional Version', url: 'https://www.merckmanuals.com/professional', type: 'article' },
            ],
          },
        ],
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Pharmacy Practice & Therapeutics',
        description: 'Evaluate patient case studies, prescriptions, and pharmacy law protocols.',
        duration: '3 months',
        order: 2,
        milestones: [
          {
            id: 'ms-2-1',
            title: 'Prescription Verification & Interactions',
            description: 'Learn dosage calculations, pediatric scaling, and detecting adverse drug interactions.',
            resources: [
              { title: 'FDA Approved Drug Products (Orange Book)', url: 'https://www.fda.gov/drugs/drug-approvals-and-databases/orange-book', type: 'tool' },
              { title: 'CDC Clinical Practice Guidelines', url: 'https://www.cdc.gov/', type: 'article' },
            ],
          },
          {
            id: 'ms-2-2',
            title: 'Pharmacy Law & Regulatory Ethics',
            description: 'Study federal Controlled Substances Act rules and state Board of Pharmacy guidelines.',
            resources: [
              { title: 'DEA Diversion Control Division Manual', url: 'https://www.deadiversion.usdoj.gov/', type: 'article' },
            ],
          },
        ],
      },
      {
        id: 'phase-3',
        title: 'Phase 3: Clinical Care & Licensing',
        description: 'Complete hands-on internships and prepare for national board examinations.',
        duration: '2 months',
        order: 3,
        milestones: [
          {
            id: 'ms-3-1',
            title: 'Clinical Patient Counseling & Rounds',
            description: 'Practice vaccine administration, blood pressure counseling, and diabetic testing instructions.',
            resources: [
              { title: 'ASHP Clinical Skills Competition Case Studies', url: 'https://www.ashp.org/', type: 'article' },
            ],
          },
          {
            id: 'ms-3-2',
            title: 'NAPLEX & MPJE Licensing Exam Prep',
            description: 'Complete mock drug calculation exams and legal case study reviews.',
            resources: [
              { title: 'NABP Licensing Exam Guides', url: 'https://nabp.pharmacy/', type: 'course' },
              { title: 'RxPrep NAPLEX Review Courses', url: 'https://www.uworld.com/rxprep/', type: 'course' },
            ],
          },
        ],
      },
    ],
  },
  'financial analyst': {
    careerTitle: 'Financial Analyst',
    phases: [
      {
        id: 'phase-1',
        title: 'Phase 1: Financial Accounting & Economics',
        description: 'Understand micro/macroeconomic trends and how to dissect standard financial statements.',
        duration: '2 months',
        order: 1,
        milestones: [
          {
            id: 'ms-1-1',
            title: 'Dissecting Financial Statements',
            description: 'Master balance sheets, income statements, cash flow statements, and ratios.',
            resources: [
              { title: 'Investopedia Financial Statement Analysis', url: 'https://www.investopedia.com/', type: 'article' },
              { title: 'SEC Edgar Company Search', url: 'https://www.sec.gov/edgar/searchedgar/companysearch', type: 'tool' },
            ],
          },
          {
            id: 'ms-1-2',
            title: 'Corporate Finance & Economics Core',
            description: 'Learn time value of money, cost of capital, and net present value calculations.',
            resources: [
              { title: 'MIT OpenCourseWare Corporate Finance', url: 'https://ocw.mit.edu/', type: 'course' },
              { title: 'Damodaran Corporate Finance Online', url: 'http://pages.stern.nyu.edu/~adamodar/', type: 'article' },
            ],
          },
        ],
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Valuation & Financial Modeling',
        description: 'Construct forecasting models and compute valuation multiples using Excel.',
        duration: '3 months',
        order: 2,
        milestones: [
          {
            id: 'ms-2-1',
            title: 'Excel Financial Modeling & Forecasting',
            description: 'Build three-statement integrated models and cash flow projections.',
            resources: [
              { title: 'Multiple Expansion Valuation Guides', url: 'https://www.multipleexpansion.com/', type: 'article' },
              { title: 'BIWS Financial Modeling Course', url: 'https://breakingintowallstreet.com/', type: 'course' },
            ],
          },
          {
            id: 'ms-2-2',
            title: 'Equity Research & Valuation Multiples',
            description: 'Master DCF valuation models, comparable company analysis, and precedent transactions.',
            resources: [
              { title: 'Wall Street Prep Valuation Tutorials', url: 'https://www.wallstreetprep.com/', type: 'course' },
            ],
          },
        ],
      },
      {
        id: 'phase-3',
        title: 'Phase 3: Portfolio Management & CFA Prep',
        description: 'Perform risk-return optimization and prepare for professional CFA certification.',
        duration: '2 months',
        order: 3,
        milestones: [
          {
            id: 'ms-3-1',
            title: 'Portfolio Theory & Risk Analysis',
            description: 'Learn modern portfolio theory, capital asset pricing models (CAPM), and Sharpe ratios.',
            resources: [
              { title: 'Yale Open Financial Markets Course', url: 'https://openmedia.yale.edu/', type: 'course' },
            ],
          },
          {
            id: 'ms-3-2',
            title: 'CFA Level 1 Study and Practice',
            description: 'Study ethics standards, quantitative methods, and alternative investments.',
            resources: [
              { title: 'CFA Institute Candidate Resources', url: 'https://www.cfainstitute.org/', type: 'course' },
              { title: 'Kaplan Schweser CFA Prep', url: 'https://www.schweser.com/', type: 'course' },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Handles LLM requests to Gemini or OpenAI with graceful fallback
 */
class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'gemini';
    this.geminiKey = process.env.GEMINI_API_KEY;
    this.openaiKey = process.env.OPENAI_API_KEY;

    // Initialize Gemini Client
    if (this.geminiKey && this.geminiKey !== 'your_gemini_api_key' && !this.geminiKey.startsWith('your_')) {
      try {
        const genAI = new GoogleGenerativeAI(this.geminiKey);
        this.geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        logger.info('Gemini AI Provider initialized successfully');
      } catch (err) {
        logger.error(`Failed to initialize Gemini Client: ${err.message}`);
      }
    } else {
      logger.warn('GEMINI_API_KEY not configured or is placeholder.');
    }

    // Initialize OpenAI Client
    if (this.openaiKey && this.openaiKey !== 'your_openai_api_key' && !this.openaiKey.startsWith('your_')) {
      try {
        this.openai = new OpenAI({ apiKey: this.openaiKey });
        logger.info('OpenAI Provider initialized successfully');
      } catch (err) {
        logger.error(`Failed to initialize OpenAI Client: ${err.message}`);
      }
    } else {
      logger.warn('OPENAI_API_KEY not configured or is placeholder.');
    }
  }

  /**
   * Generates career recommendations based on user answers with automatic failover
   */
  async generateCareerRecommendations(answers) {
    const primary = this.provider;
    const prompt = buildCareerPrompt(answers);

    if (primary === 'openai') {
      const result = await this.tryOpenAICareer(prompt);
      if (result) return result;
      
      const fallbackResult = await this.tryGeminiCareer(prompt);
      if (fallbackResult) return fallbackResult;
    } else {
      // Default to Gemini as primary
      const result = await this.tryGeminiCareer(prompt);
      if (result) return result;

      const fallbackResult = await this.tryOpenAICareer(prompt);
      if (fallbackResult) return fallbackResult;
    }

    // Fallback: Smart local recommender
    return this.generateMockRecommendations(answers);
  }

  async tryGeminiCareer(prompt) {
    if (!this.geminiModel) return null;
    try {
      logger.info('Sending career recommendation prompt to Gemini');
      const result = await this.geminiModel.generateContent(prompt);
      const text = result.response.text();
      return parseCareerResponse(text);
    } catch (error) {
      logger.error(`Gemini API Error (Career Recommendations): ${error.message}`);
      return null;
    }
  }

  async tryOpenAICareer(prompt) {
    if (!this.openai) return null;
    try {
      logger.info('Sending career recommendation prompt to OpenAI');
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });
      const text = response.choices[0].message.content;
      return parseCareerResponse(text);
    } catch (error) {
      logger.error(`OpenAI API Error (Career Recommendations): ${error.message}`);
      return null;
    }
  }

  /**
   * Generates a detailed learning roadmap for a career path with automatic failover
   */
  async generateRoadmap(careerTitle, skills = []) {
    const primary = this.provider;
    const prompt = buildRoadmapPrompt(careerTitle, skills);

    if (primary === 'openai') {
      const result = await this.tryOpenAIRoadmap(prompt, careerTitle);
      if (result) return result;

      const fallbackResult = await this.tryGeminiRoadmap(prompt, careerTitle);
      if (fallbackResult) return fallbackResult;
    } else {
      const result = await this.tryGeminiRoadmap(prompt, careerTitle);
      if (result) return result;

      const fallbackResult = await this.tryOpenAIRoadmap(prompt, careerTitle);
      if (fallbackResult) return fallbackResult;
    }

    // Fallback: Smart local roadmap library
    return this.generateMockRoadmap(careerTitle, skills);
  }

  async tryGeminiRoadmap(prompt, careerTitle) {
    if (!this.geminiModel) return null;
    try {
      logger.info(`Sending roadmap generation prompt to Gemini for career: ${careerTitle}`);
      const result = await this.geminiModel.generateContent(prompt);
      const text = result.response.text();
      return parseRoadmapResponse(text);
    } catch (error) {
      logger.error(`Gemini API Error (Roadmap): ${error.message}`);
      return null;
    }
  }

  async tryOpenAIRoadmap(prompt, careerTitle) {
    if (!this.openai) return null;
    try {
      logger.info(`Sending roadmap generation prompt to OpenAI for career: ${careerTitle}`);
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });
      const text = response.choices[0].message.content;
      return parseRoadmapResponse(text);
    } catch (error) {
      logger.error(`OpenAI API Error (Roadmap): ${error.message}`);
      return null;
    }
  }

  /**
   * Mock career generator matching user answers
   */
  generateMockRecommendations(answers) {
    logger.info('Generating career recommendations using rule-based local engine');
    
    const interestAnswerObj = answers.find(a => a.questionId === 'q2');
    const interests = interestAnswerObj && Array.isArray(interestAnswerObj.answer)
      ? interestAnswerObj.answer.map(i => i.toLowerCase())
      : [];

    const skillsAnswerObj = answers.find(a => a.questionId === 'q5');
    const skills = skillsAnswerObj && Array.isArray(skillsAnswerObj.answer)
      ? skillsAnswerObj.answer.map(s => s.toLowerCase())
      : [];

    const codingComfortObj = answers.find(a => a.questionId === 'q3');
    const codingComfort = codingComfortObj ? Number(codingComfortObj.answer) : 5;

    let recommendations = [...MOCK_CAREERS_LIBRARY];

    // Filter or adjust scores based on interests, skills, and coding comfort
    recommendations = recommendations.map(c => {
      let scoreBonus = 0;
      const category = c.category.toLowerCase();
      const title = c.title.toLowerCase();

      // Interest matches
      if (category.includes('ai') && interests.some(i => i.includes('learning') || i.includes('ai'))) {
        scoreBonus += 15;
      }
      if (title.includes('developer') && interests.some(i => i.includes('web') || i.includes('mobile'))) {
        scoreBonus += 15;
      }
      if (category.includes('design') && interests.some(i => i.includes('design') || i.includes('ui'))) {
        scoreBonus += 15;
      }
      if (category.includes('cyber') && interests.some(i => i.includes('security') || i.includes('cyber'))) {
        scoreBonus += 15;
      }
      if (category.includes('law') && interests.some(i => i.includes('law') || i.includes('legal'))) {
        scoreBonus += 20;
      }
      if (category.includes('health') && interests.some(i => i.includes('health') || i.includes('pharmacy'))) {
        scoreBonus += 20;
      }
      if (category.includes('finance') && interests.some(i => i.includes('finance') || i.includes('investment'))) {
        scoreBonus += 20;
      }

      // Skill matches
      if (category.includes('law') && skills.some(s => s.includes('legal') || s.includes('research'))) {
        scoreBonus += 15;
      }
      if (category.includes('health') && skills.some(s => s.includes('pharmacol') || s.includes('clinical'))) {
        scoreBonus += 15;
      }
      if (category.includes('finance') && skills.some(s => s.includes('financial') || s.includes('budgeting'))) {
        scoreBonus += 15;
      }

      // Coding comfort logic
      const isCodingCareer = title.includes('developer') || category.includes('ai') || category.includes('infrastructure');
      if (isCodingCareer) {
        if (codingComfort <= 3) {
          scoreBonus -= 25; // Large penalty if user dislikes coding
        } else if (codingComfort >= 8) {
          scoreBonus += 10;
        }
      } else {
        // Boost non-coding careers if coding comfort is low
        if (codingComfort <= 3) {
          scoreBonus += 15;
        } else if (codingComfort >= 8) {
          scoreBonus -= 10;
        }
      }

      return {
        ...c,
        matchScore: Math.max(50, Math.min(100, c.matchScore + scoreBonus)),
      };
    });

    // Sort by match score
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    return recommendations.slice(0, 3); // Return top 3
  }

  /**
   * Mock roadmap generator using lookup library
   */
  generateMockRoadmap(careerTitle, skills = []) {
    logger.info(`Generating roadmap using local lookup library for career: ${careerTitle}`);
    const key = careerTitle.toLowerCase().trim();

    if (MOCK_ROADMAPS_LIBRARY[key]) {
      return MOCK_ROADMAPS_LIBRARY[key];
    }

    // Fallback template for any other career request
    return {
      careerTitle: careerTitle,
      phases: [
        {
          id: 'phase-1',
          title: 'Phase 1: Getting Started & Basics',
          description: `Learn the fundamentals required to enter the field of ${careerTitle}.`,
          duration: '4-6 weeks',
          order: 1,
          milestones: [
            {
              id: 'ms-1-1',
              title: 'Understand Core Industry Terminology',
              description: `Research high level topics related to ${careerTitle} and set up your workspace.`,
              resources: [
                { title: 'Roadmap.sh Guides', url: 'https://roadmap.sh', type: 'article' },
                { title: 'Introductory YouTube Tutorial', url: 'https://www.youtube.com', type: 'video' },
              ],
            },
            {
              id: 'ms-1-2',
              title: 'Learn Foundational Skills',
              description: `Learn primary skills needed: ${skills.slice(0, 3).join(', ') || 'Core concepts'}.`,
              resources: [
                { title: 'Official Documentation', url: 'https://google.com', type: 'article' },
              ],
            },
          ],
        },
        {
          id: 'phase-2',
          title: 'Phase 2: Deep Dive & Practice',
          description: 'Acquire practical expertise by building projects and applying skills.',
          duration: '6-8 weeks',
          order: 2,
          milestones: [
            {
              id: 'ms-2-1',
              title: 'Intermediate Concepts Practice',
              description: 'Examine common patterns, tools, and libraries.',
              resources: [
                { title: 'Intermediate Learning Guide', url: 'https://roadmap.sh', type: 'course' },
              ],
            },
          ],
        },
      ],
    };
  }
}

module.exports = new AIService();
