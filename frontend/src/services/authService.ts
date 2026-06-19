import type { AuthResponse, LoginCredentials, RegisterData, User } from '@/types/user.types';
import api from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/utils/constants';

// Toggle this to use mock data instead of real API
const USE_MOCK = false;

const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: undefined,
  createdAt: '2025-01-10T00:00:00Z',
};

const MOCK_TOKEN = 'mock-jwt-token-abc123def456';

function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK) {
      await delay();
      if (credentials.email && credentials.password) {
        const response: AuthResponse = { user: MOCK_USER, token: MOCK_TOKEN };
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
        return response;
      }
      throw new Error('Invalid email or password');
    }
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    return data;
  },

  async register(registerData: RegisterData): Promise<AuthResponse> {
    if (USE_MOCK) {
      await delay();
      const newUser: User = {
        ...MOCK_USER,
        id: 'user-' + Date.now(),
        name: registerData.name,
        email: registerData.email,
        createdAt: new Date().toISOString(),
      };
      const response: AuthResponse = { user: newUser, token: MOCK_TOKEN };
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response;
    }
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, registerData);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    return data;
  },

  async googleLogin(credential: string): Promise<AuthResponse> {
    if (USE_MOCK) {
      await delay();
      void credential;
      const response: AuthResponse = {
        user: { ...MOCK_USER, name: 'Google User' },
        token: MOCK_TOKEN,
      };
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response;
    }
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE, { credential });
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    return data;
  },

  async getCurrentUser(): Promise<User> {
    if (USE_MOCK) {
      await delay(300);
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored) as User;
      return MOCK_USER;
    }
    const { data } = await api.get<User>(API_ENDPOINTS.AUTH.ME);
    return data;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
};
