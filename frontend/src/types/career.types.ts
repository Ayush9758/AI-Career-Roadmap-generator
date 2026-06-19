export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  skills: string[];
  avgSalary: string;
  growthRate: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  icon: string;
  category: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale';
  options?: string[];
  min?: number;
  max?: number;
  scaleLabels?: { min: string; max: string };
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string | string[] | number;
}

export interface AssessmentSubmission {
  answers: AssessmentAnswer[];
  completedAt: string;
}
