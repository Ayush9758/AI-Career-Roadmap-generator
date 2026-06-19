import type { AssessmentQuestion, AssessmentAnswer } from '@/types/career.types';
import api from './api';
import { API_ENDPOINTS, ASSESSMENT_QUESTIONS } from '@/utils/constants';

const USE_MOCK = false;

function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const assessmentService = {
  async getQuestions(): Promise<AssessmentQuestion[]> {
    if (USE_MOCK) {
      await delay(500);
      return ASSESSMENT_QUESTIONS;
    }
    const { data } = await api.get<AssessmentQuestion[]>(API_ENDPOINTS.ASSESSMENT.QUESTIONS);
    return data;
  },

  async submitAssessment(answers: AssessmentAnswer[]): Promise<{ success: boolean; message: string }> {
    if (USE_MOCK) {
      await delay(2000); // Simulate AI processing time
      void answers;
      return { success: true, message: 'Assessment completed! Your career recommendations are ready.' };
    }
    const { data } = await api.post(API_ENDPOINTS.ASSESSMENT.SUBMIT, { answers });
    return data;
  },
};
