import { QUESTION_BANK } from '@/lib/questions';
import { Attempt, CEFRLevel, Question, QuestionType, SelectionContext } from '@/lib/types';

export const TOTAL_QUESTIONS = 30;
const START_DIFFICULTY = 40;

export function getStartDifficulty(): number {
  return START_DIFFICULTY;
}

export function clampDifficulty(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function updateDifficulty(current: number, isCorrect: boolean): number {
  return clampDifficulty(current + (isCorrect ? 3 : -2));
}

export function cefrMapping(difficulty: number): CEFRLevel {
  if (difficulty <= 20) return 'A1';
  if (difficulty <= 40) return 'A2';
  if (difficulty <= 60) return 'B1';
  if (difficulty <= 80) return 'B2';
  return 'C1+';
}

export const mapDifficultyToCefr = cefrMapping;

export function timerSeconds(question: Question): number {
  switch (question.type) {
    case 'mcq_vocab':
    case 'mcq_grammar':
      return 20;
    case 'gap':
      return 25;
    case 'reading_mcq':
      return 90;
    case 'listening_mcq':
      return (question.audio_duration_sec ?? 15) + 10;
    case 'speaking':
      return 45;
    default:
      return 20;
  }
}

function violatesThreeInRow(recentTypes: QuestionType[], nextType: QuestionType): boolean {
  if (recentTypes.length < 2) return false;
  return recentTypes[recentTypes.length - 1] === nextType && recentTypes[recentTypes.length - 2] === nextType;
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_BANK.find((q) => q.id === id);
}

export function selectNextQuestion(
  context: SelectionContext,
  questionPool: Question[] = QUESTION_BANK,
): Question | undefined {
  const { questionNumber, usedIds, currentDifficulty, recentTypes } = context;
  const unused = questionPool.filter((q) => !usedIds.includes(q.id));

  if (questionNumber === 10 || questionNumber === 20) {
    return unused
      .filter((q) => q.type === 'speaking')
      .sort((a, b) => Math.abs(a.difficulty_score - currentDifficulty) - Math.abs(b.difficulty_score - currentDifficulty))[0];
  }

  const ranked = [...unused].sort((a, b) => {
    return Math.abs(a.difficulty_score - currentDifficulty) - Math.abs(b.difficulty_score - currentDifficulty);
  });

  const constrained = ranked.filter((q) => !violatesThreeInRow(recentTypes, q.type));
  return constrained[0] ?? ranked[0];
}

export const pickNextQuestion = selectNextQuestion;

function evaluateSpeakingAttempt(question: Question, answer?: string, speakingDurationSec?: number): boolean {
  const durationOk = (speakingDurationSec ?? 0) >= 10;
  if (!durationOk) return false;

  const expected = Array.isArray(question.correct_answer) ? question.correct_answer : [];
  if (expected.length === 0) return true;

  const normalized = (answer ?? '').toLowerCase();
  const hits = expected.filter((kw) => normalized.includes(kw.toLowerCase())).length;
  return hits >= 2;
}

export function evaluateAttempt(question: Question, answer?: string, speakingDurationSec?: number): boolean {
  if (question.type === 'speaking') {
    return evaluateSpeakingAttempt(question, answer, speakingDurationSec);
  }

  if (!answer) return false;

  if (Array.isArray(question.correct_answer)) {
    return question.correct_answer.some((v) => v.toLowerCase() === answer.toLowerCase());
  }

  return (question.correct_answer ?? '').toLowerCase() === answer.toLowerCase();
}

export function confidenceFromDeltas(history: number[]): { percent: number; label: 'Low' | 'Med' | 'High' } {
  const windowed = history.slice(-9);
  const deltas = windowed.slice(1).map((value, idx) => value - windowed[idx]);
  if (deltas.length === 0) return { percent: 50, label: 'Med' };

  const mean = deltas.reduce((s, d) => s + d, 0) / deltas.length;
  const variance = deltas.reduce((s, d) => s + (d - mean) ** 2, 0) / deltas.length;
  const normalized = Math.max(0, Math.min(1, 1 - variance / 6));
  const percent = Math.round(normalized * 100);
  const label = percent >= 75 ? 'High' : percent >= 45 ? 'Med' : 'Low';

  return { percent, label };
}

export function weightedSkillBreakdown(attempts: Attempt[]): Record<'Grammar' | 'Vocab' | 'Reading' | 'Listening' | 'Speaking', number> {
  const groups: Record<'Grammar' | 'Vocab' | 'Reading' | 'Listening' | 'Speaking', Attempt[]> = {
    Grammar: attempts.filter((a) => a.type === 'mcq_grammar' || a.type === 'gap'),
    Vocab: attempts.filter((a) => a.type === 'mcq_vocab'),
    Reading: attempts.filter((a) => a.type === 'reading_mcq'),
    Listening: attempts.filter((a) => a.type === 'listening_mcq'),
    Speaking: attempts.filter((a) => a.type === 'speaking'),
  };

  const scoreFor = (items: Attempt[]): number => {
    if (!items.length) return 0;
    const totalWeight = items.reduce((s, a) => s + Math.max(1, a.difficultyAtAttempt), 0);
    const earned = items.reduce((s, a) => s + (a.isCorrect ? Math.max(1, a.difficultyAtAttempt) : 0), 0);
    return Math.round((earned / totalWeight) * 100);
  };

  return {
    Grammar: scoreFor(groups.Grammar),
    Vocab: scoreFor(groups.Vocab),
    Reading: scoreFor(groups.Reading),
    Listening: scoreFor(groups.Listening),
    Speaking: scoreFor(groups.Speaking),
  };
}
