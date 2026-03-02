'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { confidenceFromDeltas, mapDifficultyToCefr, weightedSkillBreakdown } from '@/lib/adaptive';
import { clearSession, loadSession } from '@/lib/storage';
import { SessionState } from '@/lib/types';

export default function ResultsPage() {
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  if (!session || session.attempts.length === 0) {
    return (
      <div className="card">
        <p className="mb-4">No completed test found.</p>
        <Link href="/" className="rounded bg-primary px-4 py-2 text-white">Go Home</Link>
      </div>
    );
  }

  const finalDifficulty = session.currentDifficulty;
  const cefr = mapDifficultyToCefr(finalDifficulty);
  const confidence = confidenceFromDeltas(session.difficultyHistory);
  const breakdown = weightedSkillBreakdown(session.attempts);
  const correct = session.attempts.filter((a) => a.isCorrect).length;
  const accuracy = Math.round((correct / session.attempts.length) * 100);

  return (
    <div className="space-y-4 pt-4">
      <div className="card space-y-2">
        <h1 className="text-2xl font-bold text-primary">Your Results</h1>
        <p>Final CEFR estimate: <span className="font-semibold">{cefr}</span></p>
        <p>Final difficulty score: <span className="font-semibold">{finalDifficulty}</span></p>
        <p>Overall accuracy: <span className="font-semibold">{accuracy}%</span></p>
        <p>Confidence: <span className="font-semibold">{confidence.percent}% ({confidence.label})</span></p>
      </div>

      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Skill Breakdown (weighted by attempted difficulty)</h2>
        {Object.entries(breakdown).map(([name, score]) => (
          <div key={name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{name}</span>
              <span>{score}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card flex gap-2">
        <Link href="/test?mode=new" className="rounded bg-primary px-4 py-2 text-white" onClick={() => clearSession()}>
          Retake Test
        </Link>
        <Link href="/" className="rounded border border-slate-300 px-4 py-2">Home</Link>
      </div>
    </div>
  );
}
