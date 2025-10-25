export interface CodeExercise {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in minutes
  category: ExerciseCategory;
  type: ExerciseType;
  quiz?: Quiz;
  codingChallenge?: CodingChallenge;
  projectAssignment?: ProjectAssignment;
  knowledgeChecks?: KnowledgeCheck[];
  prerequisites?: string[];
  completed?: boolean;
  score?: number;
}

export enum ExerciseType {
  QUIZ = 'Quiz',
  CODING_CHALLENGE = 'Coding Challenge',
  PROJECT_ASSIGNMENT = 'Project Assignment',
  MIXED = 'Mixed'
}

export enum ExerciseCategory {
  FUNDAMENTALS = 'Fundamentals',
  COMPONENTS = 'Components',
  SERVICES = 'Services',
  ROUTING = 'Routing',
  FORMS = 'Forms',
  HTTP = 'HTTP',
  STATE_MANAGEMENT = 'State Management',
  TESTING = 'Testing',
  PERFORMANCE = 'Performance'
}

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  code?: string; // Optional code snippet for context
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  TRUE_FALSE = 'True/False',
  CODE_OUTPUT = 'Code Output',
  FILL_BLANK = 'Fill in the Blank'
}

export interface CodingChallenge {
  id: string;
  prompt: string;
  starterCode: string;
  solution: string;
  testCases: ChallengeTestCase[];
  hints: string[];
  guidelines: string[];
}

export interface ChallengeTestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface ProjectAssignment {
  id: string;
  brief: string;
  requirements: string[];
  userStories: string[];
  technicalSpecs: string[];
  designMockup?: string;
  milestones: Milestone[];
  resources: Resource[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  estimatedTime: number;
}

export interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'example' | 'tool';
}

export interface KnowledgeCheck {
  id: string;
  concept: string;
  question: string;
  answer: string;
  importance: 'low' | 'medium' | 'high';
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  score?: number;
  attempts: number;
  timeSpent: number;
  quizAnswers?: Map<string, any>;
  codeSubmissions?: string[];
  lastAttempt: Date;
}

export interface UserExerciseData {
  completedExercises: string[];
  exerciseProgress: Map<string, ExerciseProgress>;
  totalScore: number;
  totalTimeSpent: number;
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}
