import type { CareerRecommendation } from '@/types/career.types';
import api from './api';
import { API_ENDPOINTS, MOCK_RECOMMENDATIONS } from '@/utils/constants';

const USE_MOCK = false;

function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const recommendationService = {
  async getRecommendations(): Promise<CareerRecommendation[]> {
    if (USE_MOCK) {
      await delay(1000);
      return MOCK_RECOMMENDATIONS;
    }
    const { data } = await api.get<CareerRecommendation[]>(API_ENDPOINTS.RECOMMENDATIONS.LIST);
    return data;
  },

  async getRecommendationById(id: string): Promise<CareerRecommendation | undefined> {
    if (USE_MOCK) {
      await delay(500);
      return MOCK_RECOMMENDATIONS.find((r) => r.id === id);
    }
    const { data } = await api.get<CareerRecommendation>(API_ENDPOINTS.RECOMMENDATIONS.DETAIL(id));
    return data;
  },
};
