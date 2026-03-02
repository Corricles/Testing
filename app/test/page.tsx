'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Progress from '@/components/Progress';
import QuestionRenderer from '@/components/QuestionRenderer';
import Timer from '@/components/Timer';
import { evaluateAttempt, getQuestionById, getStartDifficulty, mapDifficultyToCefr, pickNextQuestion, timerSeconds, TOTAL_QUESTIONS, updateDifficulty } from '@/lib/adaptive';
import { saveSession, loadSession, clearSession } from '@/lib/storage';
import { Attempt, SessionState } from '@/lib/types';

function buildInitial(): SessionState {
  return {
    currentIndex: 1,
    currentDifficulty: getStartDifficulty(),
    difficultyHistory: [getStartDifficulty()],
    askedQuestionIds: [],
    attempts: [],
    pendingQuestionId: undefined,
    feedback: undefined,
    isComplete: false,
    startedAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export default function TestPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    const mode = params.get('mode');
    const existing = loadSession();
    if (mode === 'resume' && existing && !existing.isComplete) {
      setSession(existing);
      return;
    }

    if (mode === 'new') {
      clearSession();
      setSession(buildInitial());
      return;
    }

    if (existing && !existing.isComplete) {
      setSession(existing);
    } else {
      setSession(buildInitial());
    }
  }, [params]);

  const currentQuestion = useMemo(() => {
    if (!session) return undefined;
    if (session.pendingQuestionId) return getQuestionById(session.pendingQuestionId);

    const q = pickNextQuestion({
      currentDifficulty: session.currentDifficulty,
      questionNumber: session.currentIndex,
      usedIds: session.askedQuestionIds,
      recentTypes: session.attempts.slice(-2).map((a) => a.type),
    });
    return q;
  }, [session]);

  useEffect(() => {
    if (!session || !currentQuestion || session.pendingQuestionId) return;
    const next: SessionState = { ...session, pendingQuestionId: currentQuestion.id, updatedAt: Date.now() };
    setSession(next);
    saveSession(next);
  }, [currentQuestion, session]);

  const finalizeAttempt = useCallback((attempt: Attempt, autoAdvance: boolean) => {
    setSession((prev) => {
      if (!prev) return prev;
      const nextDifficulty = updateDifficulty(prev.currentDifficulty, attempt.isCorrect);
      const nextIndex = prev.currentIndex + 1;
      const complete = nextIndex > TOTAL_QUESTIONS;
      const next: SessionState = {
        ...prev,
        attempts: [...prev.attempts, attempt],
        askedQuestionIds: [...prev.askedQuestionIds, attempt.questionId],
        currentDifficulty: nextDifficulty,
        difficultyHistory: [...prev.difficultyHistory, nextDifficulty],
        currentIndex: complete ? TOTAL_QUESTIONS : nextIndex,
        pendingQuestionId: undefined,
        feedback: autoAdvance ? undefined : (attempt.isCorrect ? 'correct' : 'incorrect'),
        isComplete: complete,
        updatedAt: Date.now(),
      };
      saveSession(next);
      if (complete) {
        setTimeout(() => router.push('/results'), 0);
      }
      return next;
    });
  }, [router]);

  const onSubmit = useCallback((payload: { answer?: string; speakingDurationSec?: number }, timedOut = false) => {
    if (!session || !currentQuestion) return;

    const isCorrect = evaluateAttempt(currentQuestion, payload.answer, payload.speakingDurationSec);
    const attempt: Attempt = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      answer: payload.answer,
      isCorrect,
      timedOut,
      speakingDurationSec: payload.speakingDurationSec,
      difficultyAtAttempt: session.currentDifficulty,
      timeSpentSec: timedOut ? timerSeconds(currentQuestion) : Math.max(1, Math.floor((Date.now() - session.updatedAt) / 1000)),
    };

    const isAutoAdvance = timedOut;
    finalizeAttempt(attempt, isAutoAdvance);
  }, [session, currentQuestion, finalizeAttempt]);

  if (!session || !currentQuestion) {
    return <div className="card">Loading test…</div>;
  }

  if (session.feedback) {
    return (
      <div className="space-y-4 pt-4">
        <div className="card">
          <p className={`text-lg font-semibold ${session.feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
            {session.feedback === 'correct' ? 'Correct ✅' : 'Incorrect ❌'}
          </p>
          <button
            type="button"
            className="mt-4 rounded bg-primary px-4 py-2 text-white"
            onClick={() => {
              setSession((prev) => {
                if (!prev) return prev;
                const next = { ...prev, feedback: undefined, updatedAt: Date.now() };
                saveSession(next);
                return next;
              });
            }}
          >
            Next
          </button>
        </div>
        <Progress current={session.currentIndex - 1} total={TOTAL_QUESTIONS} />
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-3">
      <div className="card flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-primary">Adaptive CEFR Placement Test</h1>
        <p className="text-sm text-slate-700">Question {session.currentIndex} of {TOTAL_QUESTIONS} · Estimated {mapDifficultyToCefr(session.currentDifficulty)}</p>
      </div>

      <Timer
        durationSec={timerSeconds(currentQuestion)}
        questionKey={`${session.currentIndex}-${currentQuestion.id}`}
        onExpire={() => onSubmit({}, true)}
      />

      <QuestionRenderer question={currentQuestion} locked={Boolean(session.feedback)} onSubmit={(payload) => onSubmit(payload, false)} />

      <Progress current={session.currentIndex - 1} total={TOTAL_QUESTIONS} />
    </div>
  );
}
