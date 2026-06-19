// ============================================================
// Application Constants
// ============================================================

export const APP_NAME = 'AI Career Roadmap';
export const APP_DESCRIPTION = 'Discover your ideal career path with AI-powered assessments and personalized roadmaps.';

// ---- Route Paths ----
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ASSESSMENT: '/assessment',
  RECOMMENDATIONS: '/recommendations',
  ROADMAP: '/roadmap',
  PROFILE: '/profile',
} as const;

// ---- API Endpoints ----
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    GOOGLE: '/auth/google',
    ME: '/auth/me',
  },
  ASSESSMENT: {
    QUESTIONS: '/assessments/questions',
    SUBMIT: '/assessments/submit',
  },
  RECOMMENDATIONS: {
    LIST: '/recommendations',
    DETAIL: (id: string) => `/recommendations/${id}`,
  },
  ROADMAP: {
    GENERATE: '/roadmaps/generate',
    GET: (id: string) => `/roadmaps/${id}`,
    UPDATE_MILESTONE: (roadmapId: string, milestoneId: string) =>
      `/roadmaps/${roadmapId}/milestones/${milestoneId}`,
  },
  USER: {
    PROFILE: '/users/profile',
    STATS: '/users/stats',
  },
} as const;

// ---- Local Storage Keys ----
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
} as const;

// ---- Assessment Questions (Mock Data) ----
import type { AssessmentQuestion } from '@/types/career.types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
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
      'Land my first job in this field',
      'Switch to a new career path',
      'Get promoted in my current role',
      'Transition to a specialized role',
      'Start my own business or freelance',
      'Build expertise for research or academia',
    ],
  },
];

// ---- Mock Career Recommendations ----
import type { CareerRecommendation } from '@/types/career.types';

export const MOCK_RECOMMENDATIONS: CareerRecommendation[] = [
  {
    id: 'career-1',
    title: 'Full-Stack Developer',
    description:
      'Build complete web applications from frontend interfaces to backend APIs. Full-stack developers are versatile engineers who understand the entire development lifecycle and can create end-to-end solutions.',
    matchScore: 94,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs'],
    avgSalary: '$95,000 - $145,000',
    growthRate: '+22% by 2030',
    demandLevel: 'High',
    icon: 'code-2',
    category: 'Engineering',
  },
  {
    id: 'career-2',
    title: 'Machine Learning Engineer',
    description:
      'Design and deploy machine learning models at scale. ML Engineers bridge the gap between data science research and production systems, building the infrastructure that powers intelligent applications.',
    matchScore: 87,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'AWS SageMaker', 'Statistics'],
    avgSalary: '$120,000 - $180,000',
    growthRate: '+40% by 2030',
    demandLevel: 'High',
    icon: 'brain',
    category: 'AI & ML',
  },
  {
    id: 'career-3',
    title: 'Cloud Solutions Architect',
    description:
      'Design and oversee cloud computing strategies for organizations. Cloud architects create scalable, resilient infrastructure solutions and guide technical teams on best practices.',
    matchScore: 78,
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Networking', 'Security', 'Cost Optimization'],
    avgSalary: '$130,000 - $190,000',
    growthRate: '+35% by 2030',
    demandLevel: 'High',
    icon: 'cloud',
    category: 'Infrastructure',
  },
  {
    id: 'career-4',
    title: 'Product Designer (UX/UI)',
    description:
      'Create intuitive and beautiful user experiences across digital products. Product designers research user needs, prototype solutions, and work closely with engineering to ship delightful interfaces.',
    matchScore: 72,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'CSS', 'Accessibility'],
    avgSalary: '$85,000 - $140,000',
    growthRate: '+18% by 2030',
    demandLevel: 'Medium',
    icon: 'palette',
    category: 'Design',
  },
  {
    id: 'career-5',
    title: 'Data Engineer',
    description:
      'Build and maintain the data infrastructure that powers analytics and machine learning. Data engineers design pipelines, optimize databases, and ensure data quality at scale.',
    matchScore: 68,
    skills: ['SQL', 'Apache Spark', 'Airflow', 'Python', 'Data Modeling', 'ETL'],
    avgSalary: '$105,000 - $160,000',
    growthRate: '+28% by 2030',
    demandLevel: 'High',
    icon: 'database',
    category: 'Data',
  },
];

// ---- Mock Roadmap Data ----
import type { Roadmap } from '@/types/roadmap.types';

export const MOCK_ROADMAP: Roadmap = {
  id: 'roadmap-1',
  careerId: 'career-1',
  careerTitle: 'Full-Stack Developer',
  overallProgress: 35,
  createdAt: '2025-01-15',
  phases: [
    {
      id: 'phase-1',
      title: 'Foundation & Core Skills',
      description: 'Build a strong foundation in web development fundamentals.',
      duration: '2-3 months',
      order: 1,
      progress: 75,
      milestones: [
        {
          id: 'ms-1',
          title: 'Master HTML5 & Semantic Markup',
          description: 'Learn proper HTML structure, accessibility, and semantic elements.',
          completed: true,
          completedAt: '2025-02-01',
          resources: [
            { title: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'article' },
            { title: 'HTML & CSS Full Course', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
          ],
        },
        {
          id: 'ms-2',
          title: 'CSS3 & Responsive Design',
          description: 'Master CSS layouts, Flexbox, Grid, animations, and responsive design principles.',
          completed: true,
          completedAt: '2025-02-20',
          resources: [
            { title: 'CSS Tricks Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'article' },
            { title: 'Kevin Powell CSS Course', url: 'https://www.youtube.com/watch?v=example', type: 'course' },
          ],
        },
        {
          id: 'ms-3',
          title: 'JavaScript ES6+ Fundamentals',
          description: 'Learn modern JavaScript including async/await, destructuring, modules, and DOM manipulation.',
          completed: true,
          completedAt: '2025-03-15',
          resources: [
            { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'article' },
            { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/', type: 'book' },
          ],
        },
        {
          id: 'ms-4',
          title: 'Git & Version Control',
          description: 'Learn Git workflow, branching, merging, and GitHub collaboration.',
          completed: false,
          resources: [
            { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'book' },
            { title: 'GitHub Skills', url: 'https://skills.github.com/', type: 'course' },
          ],
        },
      ],
    },
    {
      id: 'phase-2',
      title: 'Frontend Framework Mastery',
      description: 'Deep dive into React and modern frontend tooling.',
      duration: '2-3 months',
      order: 2,
      progress: 33,
      milestones: [
        {
          id: 'ms-5',
          title: 'React Fundamentals & Hooks',
          description: 'Learn component architecture, state management, hooks, and the React ecosystem.',
          completed: true,
          completedAt: '2025-04-10',
          resources: [
            { title: 'React Official Docs', url: 'https://react.dev/', type: 'article' },
            { title: 'Full React Course 2025', url: 'https://www.youtube.com/watch?v=example', type: 'course' },
          ],
        },
        {
          id: 'ms-6',
          title: 'TypeScript for React',
          description: 'Add type safety to React applications with TypeScript.',
          completed: false,
          resources: [
            { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'article' },
            { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'article' },
          ],
        },
        {
          id: 'ms-7',
          title: 'State Management & Routing',
          description: 'Master React Router, Context API, and advanced state patterns.',
          completed: false,
          resources: [
            { title: 'React Router Documentation', url: 'https://reactrouter.com/', type: 'article' },
            { title: 'State Management in React', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
          ],
        },
      ],
    },
    {
      id: 'phase-3',
      title: 'Backend Development',
      description: 'Learn server-side programming, APIs, and databases.',
      duration: '3-4 months',
      order: 3,
      progress: 0,
      milestones: [
        {
          id: 'ms-8',
          title: 'Node.js & Express.js',
          description: 'Build RESTful APIs with Node.js and Express framework.',
          completed: false,
          resources: [
            { title: 'Node.js Official Guide', url: 'https://nodejs.org/en/docs/guides', type: 'article' },
            { title: 'Express.js Crash Course', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
          ],
        },
        {
          id: 'ms-9',
          title: 'Database Design & SQL',
          description: 'Master PostgreSQL, database design, ORMs, and query optimization.',
          completed: false,
          resources: [
            { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'article' },
            { title: 'Database Design Course', url: 'https://www.youtube.com/watch?v=example', type: 'course' },
          ],
        },
        {
          id: 'ms-10',
          title: 'Authentication & Security',
          description: 'Implement JWT auth, OAuth, CORS, and API security best practices.',
          completed: false,
          resources: [
            { title: 'OWASP Security Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/', type: 'article' },
            { title: 'Auth0 Documentation', url: 'https://auth0.com/docs', type: 'article' },
          ],
        },
      ],
    },
    {
      id: 'phase-4',
      title: 'DevOps & Deployment',
      description: 'Learn to containerize, deploy, and monitor applications.',
      duration: '1-2 months',
      order: 4,
      progress: 0,
      milestones: [
        {
          id: 'ms-11',
          title: 'Docker & Containerization',
          description: 'Containerize applications and manage multi-service environments.',
          completed: false,
          resources: [
            { title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/', type: 'article' },
            { title: 'Docker Mastery Course', url: 'https://www.udemy.com/course/docker-mastery/', type: 'course' },
          ],
        },
        {
          id: 'ms-12',
          title: 'CI/CD & Cloud Deployment',
          description: 'Set up continuous integration, delivery pipelines, and deploy to cloud platforms.',
          completed: false,
          resources: [
            { title: 'GitHub Actions Guide', url: 'https://docs.github.com/en/actions', type: 'article' },
            { title: 'AWS Deployment Guide', url: 'https://aws.amazon.com/getting-started/', type: 'article' },
          ],
        },
      ],
    },
  ],
};
