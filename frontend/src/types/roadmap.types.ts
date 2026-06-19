export interface Roadmap {
  id: string;
  careerId: string;
  careerTitle: string;
  phases: RoadmapPhase[];
  createdAt: string;
  overallProgress: number;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  milestones: Milestone[];
  progress: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
  completedAt?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'tool';
}
