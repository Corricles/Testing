'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface TimerProps {
  durationSec: number;
  questionKey: string;
  onExpire: () => void;
}

export default function Timer({ durationSec, questionKey, onExpire }: TimerProps) {
  const [endTime, setEndTime] = useState(() => Date.now() + durationSec * 1000);
  const [now, setNow] = useState(Date.now());
  const didExpireRef = useRef(false);

  useEffect(() => {
    didExpireRef.current = false;
    setEndTime(Date.now() + durationSec * 1000);
    setNow(Date.now());
  }, [durationSec, questionKey]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, endTime - now);
  const remainingSec = Math.ceil(remainingMs / 1000);

  useEffect(() => {
    if (!didExpireRef.current && remainingMs <= 0) {
      didExpireRef.current = true;
      onExpire();
    }
  }, [remainingMs, onExpire]);

  const pct = useMemo(() => Math.max(0, Math.min(100, (remainingMs / (durationSec * 1000)) * 100)), [remainingMs, durationSec]);

  return (
    <div className="card" role="status" aria-live="polite" aria-label={`Time remaining: ${remainingSec} seconds`}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">Time remaining</p>
        <p className="text-2xl font-bold text-slate-800">{remainingSec}s</p>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
        <div
          className={`h-full transition-all ${pct > 50 ? 'bg-blue-500' : pct > 20 ? 'bg-amber-500' : 'bg-red-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
