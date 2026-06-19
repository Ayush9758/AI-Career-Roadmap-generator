import type { User, ProfileUpdateData, DashboardStats } from '@/types/user.types';
import api from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/utils/constants';

const USE_MOCK = false;

function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_STATS: DashboardStats = {
  assessmentsTaken: 2,
  careersExplored: 5,
  milestonesCompleted: 4,
  totalMilestones: 12,
  daysActive: 45,
  currentStreak: 7,
  matchScore: 94,
};

export const userService = {
  async getProfile(): Promise<User> {
    if (USE_MOCK) {
      await delay(500);
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored) as User;
      return {
        id: 'user-1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        createdAt: '2025-01-10T00:00:00Z',
      };
    }
    const { data } = await api.get<User>(API_ENDPOINTS.USER.PROFILE);
    return data;
  },

  async updateProfile(updates: ProfileUpdateData): Promise<User> {
    if (USE_MOCK) {
      await delay(600);
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      const current = stored ? (JSON.parse(stored) as User) : { id: 'user-1', name: '', email: '', createdAt: '' };
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    }
    const { data } = await api.put<User>(API_ENDPOINTS.USER.PROFILE, updates);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
    return data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK) {
      await delay(700);
      return MOCK_STATS;
    }
    const { data } = await api.get<DashboardStats>(API_ENDPOINTS.USER.STATS);
    return data;
  },
};
