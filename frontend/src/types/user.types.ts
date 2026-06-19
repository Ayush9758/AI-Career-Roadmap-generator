export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface DashboardStats {
  assessmentsTaken: number;
  careersExplored: number;
  milestonesCompleted: number;
  totalMilestones: number;
  daysActive: number;
  currentStreak: number;
  matchScore: number;
}
