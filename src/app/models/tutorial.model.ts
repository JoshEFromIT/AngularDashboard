export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: TutorialCategory;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in minutes
  sections: TutorialSection[];
  prerequisites?: string[];
  completed?: boolean;
}

export interface TutorialSection {
  id: string;
  title: string;
  content: string;
  codeExample?: CodeExample;
  exercise?: Exercise;
  order: number;
}

export interface CodeExample {
  language: string;
  code: string;
  description?: string;
  runnable?: boolean;
}

export interface Exercise {
  id: string;
  question: string;
  initialCode: string;
  solution: string;
  hints?: string[];
  testCases?: TestCase[];
}

export interface TestCase {
  input: any;
  expectedOutput: any;
  description: string;
}

export enum TutorialCategory {
  BASICS = 'Basics',
  COMPONENTS = 'Components',
  SERVICES = 'Services',
  ROUTING = 'Routing',
  FORMS = 'Forms',
  HTTP = 'HTTP',
  STATE_MANAGEMENT = 'State Management',
  ADVANCED = 'Advanced'
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface UserProgress {
  userId?: string;
  completedTutorials: string[];
  currentTutorial?: string;
  currentSection?: string;
  totalTimeSpent: number; // in minutes
  lastAccessed: Date;
}
