import { describe, expect, it } from 'vitest';
import { cefrMapping, evaluateAttempt, selectNextQuestion, updateDifficulty } from '../lib/adaptive';
import type { Question, SelectionContext } from '../lib/types';

describe('cefrMapping', () => {
  it('maps boundaries correctly including C1+', () => {
    expect(cefrMapping(0)).toBe('A1');
    expect(cefrMapping(20)).toBe('A1');
    expect(cefrMapping(21)).toBe('A2');
    expect(cefrMapping(40)).toBe('A2');
    expect(cefrMapping(41)).toBe('B1');
    expect(cefrMapping(60)).toBe('B1');
    expect(cefrMapping(61)).toBe('B2');
    expect(cefrMapping(80)).toBe('B2');
    expect(cefrMapping(81)).toBe('C1+');
    expect(cefrMapping(100)).toBe('C1+');
  });
});

describe('updateDifficulty', () => {
  it('applies +3/-2 and clamps 0..100', () => {
    expect(updateDifficulty(40, true)).toBe(43);
    expect(updateDifficulty(40, false)).toBe(38);
    expect(updateDifficulty(99, true)).toBe(100);
    expect(updateDifficulty(1, false)).toBe(0);
  });
});

describe('selectNextQuestion', () => {
  const pool: Question[] = [
    { id: 'q1', type: 'mcq_vocab', cefr_level: 'A2', difficulty_score: 40, prompt: 'q1', options: ['a'], correct_answer: 'a' },
    { id: 'q2', type: 'mcq_grammar', cefr_level: 'A2', difficulty_score: 42, prompt: 'q2', options: ['a'], correct_answer: 'a' },
    { id: 'q3', type: 'mcq_vocab', cefr_level: 'A2', difficulty_score: 41, prompt: 'q3', options: ['a'], correct_answer: 'a' },
  ];

  it('chooses nearest difficulty', () => {
    const context: SelectionContext = {
      currentDifficulty: 41,
      usedIds: [],
      recentTypes: ['gap', 'reading_mcq'],
      questionNumber: 1,
    };

    const selected = selectNextQuestion(context, pool);
    expect(selected?.id).toBe('q3');
  });

  it('respects no more than 2 same types in a row when possible', () => {
    const context: SelectionContext = {
      currentDifficulty: 41,
      usedIds: [],
      recentTypes: ['mcq_vocab', 'mcq_vocab'],
      questionNumber: 1,
    };

    const selected = selectNextQuestion(context, pool);
    expect(selected?.type).toBe('mcq_grammar');
    expect(selected?.id).toBe('q2');
  });
});

describe('evaluateAttempt speaking', () => {
  const speakingQuestion: Question = {
    id: 's-test',
    type: 'speaking',
    cefr_level: 'B1',
    difficulty_score: 55,
    prompt: 'Speak about your day.',
    speaking_prompt: 'Include morning, work, evening.',
    correct_answer: ['morning', 'work', 'evening'],
  };

  it('requires duration >= 10s and at least 2 expected keywords', () => {
    expect(evaluateAttempt(speakingQuestion, 'morning work details', 10)).toBe(true);
    expect(evaluateAttempt(speakingQuestion, 'morning only', 12)).toBe(false);
    expect(evaluateAttempt(speakingQuestion, 'morning work details', 9)).toBe(false);
  });

  it('accepts duration-only when expected keyword list is empty', () => {
    const noKeywordQuestion: Question = {
      ...speakingQuestion,
      correct_answer: [],
    };

    expect(evaluateAttempt(noKeywordQuestion, '', 10)).toBe(true);
    expect(evaluateAttempt(noKeywordQuestion, '', 8)).toBe(false);
  });
});
