import type { Roadmap } from '@/types/roadmap.types';
import api from './api';
import { API_ENDPOINTS, MOCK_ROADMAP } from '@/utils/constants';

const USE_MOCK = false;

function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const roadmapService = {
  async generateRoadmap(careerId: string): Promise<Roadmap> {
    if (USE_MOCK) {
      await delay(2500); // Simulate AI generation time
      void careerId;
      return { ...MOCK_ROADMAP, id: 'roadmap-' + Date.now() };
    }
    const { data } = await api.post<Roadmap>(API_ENDPOINTS.ROADMAP.GENERATE, { careerId });
    return data;
  },

  async getRoadmap(roadmapId: string): Promise<Roadmap> {
    if (USE_MOCK) {
      await delay(600);
      void roadmapId;
      return MOCK_ROADMAP;
    }
    const { data } = await api.get<Roadmap>(API_ENDPOINTS.ROADMAP.GET(roadmapId));
    return data;
  },

  async updateMilestone(
    roadmapId: string,
    milestoneId: string,
    completed: boolean
  ): Promise<{ success: boolean }> {
    if (USE_MOCK) {
      await delay(400);
      void roadmapId;
      void milestoneId;
      void completed;
      return { success: true };
    }
    const { data } = await api.patch(
      API_ENDPOINTS.ROADMAP.UPDATE_MILESTONE(roadmapId, milestoneId),
      { completed }
    );
    return data;
  },
};
