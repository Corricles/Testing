export type QuestionType =
  | 'mcq_vocab'
  | 'mcq_grammar'
  | 'gap'
  | 'reading_mcq'
  | 'listening_mcq'
  | 'speaking';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1+';

export interface Question {
  id: string;
  type: QuestionType;
  cefr_level: CEFRLevel;
  difficulty_score: number;
  prompt: string;
  options?: string[];
  correct_answer?: string | string[];
  passage?: string;
  audio_src?: string;
  audio_duration_sec?: number;
  speaking_prompt?: string;
}

export interface Attempt {
  questionId: string;
  type: QuestionType;
  answer?: string;
  isCorrect: boolean;
  timedOut: boolean;
  timeSpentSec: number;
  difficultyAtAttempt: number;
  speakingDurationSec?: number;
}

export interface SessionState {
  currentIndex: number;
  currentDifficulty: number;
  difficultyHistory: number[];
  askedQuestionIds: string[];
  attempts: Attempt[];
  pendingQuestionId?: string;
  feedback?: 'correct' | 'incorrect';
  isComplete: boolean;
  startedAt: number;
  updatedAt: number;
}

export interface SelectionContext {
  currentDifficulty: number;
  usedIds: string[];
  recentTypes: QuestionType[];
  questionNumber: number;
}
