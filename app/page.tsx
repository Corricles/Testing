'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearSession, loadSession } from '@/lib/storage';

export default function WelcomePage() {
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    const session = loadSession();
    setHasResume(Boolean(session && !session.isComplete));
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-4 pt-10">
      <div className="card space-y-3">
        <h1 className="text-2xl font-bold text-primary">Adaptive CEFR Placement Test</h1>
        <p className="text-sm text-slate-700">30 compulsory questions with adaptive difficulty, timer-based flow, and mixed skills (vocabulary, grammar, reading, listening, speaking).</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/test?mode=new" className="rounded bg-primary px-4 py-2 text-center text-white">Start New Test</Link>
          {hasResume && <Link href="/test?mode=resume" className="rounded border border-primary px-4 py-2 text-center text-primary">Resume Test</Link>}
          {hasResume && <button type="button" className="rounded border border-slate-300 px-4 py-2" onClick={() => { clearSession(); setHasResume(false); }}>Reset</button>}
        </div>
      </div>
    </div>
  );
}
