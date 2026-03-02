'use client';

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Question } from '@/lib/types';

interface Props {
  question: Question;
  locked: boolean;
  onSubmit: (payload: { answer?: string; speakingDurationSec?: number }) => void;
}

export default function QuestionRenderer({ question, locked, onSubmit }: Props) {
  const [answer, setAnswer] = useState('');
  const [recording, setRecording] = useState(false);
  const [durationSec, setDurationSec] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const startMsRef = useRef<number>(0);
  const optionRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setAnswer('');
    setRecording(false);
    setDurationSec(0);
    setAudioError(false);
    optionRefs.current = [];
  }, [question.id]);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => {
      setDurationSec(Math.floor((Date.now() - startMsRef.current) / 1000));
    }, 250);
    return () => window.clearInterval(id);
  }, [recording]);

  const submitDisabled = useMemo(() => {
    if (locked) return true;
    return answer.trim().length === 0;
  }, [answer, locked]);

  const startRecording = async () => {
    if (typeof window === 'undefined' || !window.navigator?.mediaDevices || typeof MediaRecorder === 'undefined') {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      mediaRecorderRef.current = rec;
      startMsRef.current = Date.now();
      setDurationSec(0);
      setRecording(true);
      rec.start();
    } catch {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    setRecording(false);
    setDurationSec(Math.floor((Date.now() - startMsRef.current) / 1000));
  };

  const submitCurrent = () => {
    const trimmed = answer.trim();
    if (trimmed.length === 0) return;
    onSubmit({ answer: trimmed, speakingDurationSec: question.type === 'speaking' ? durationSec : undefined });
  };

  const handleMcqKeyDown = (event: KeyboardEvent<HTMLDivElement>, idx: number, option: string) => {
    if (!question.options || locked) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIdx = (idx + 1) % question.options.length;
      setAnswer(question.options[nextIdx]);
      optionRefs.current[nextIdx]?.focus();
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIdx = (idx - 1 + question.options.length) % question.options.length;
      setAnswer(question.options[prevIdx]);
      optionRefs.current[prevIdx]?.focus();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setAnswer(option);
      if (event.key === 'Enter') {
        onSubmit({ answer: option, speakingDurationSec: question.type === 'speaking' ? durationSec : undefined });
      }
    }
  };

  return (
    <div className="card space-y-4">
      {question.passage && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{question.passage}</p>}
      <h2 className="text-lg font-semibold">{question.prompt}</h2>

      {question.type === 'listening_mcq' && (
        <div className="space-y-2" aria-label="Listening audio controls container">
          <audio controls className="w-full" onError={() => setAudioError(true)} aria-label="Listening question audio player">
            <source src={question.audio_src} type="audio/mpeg" />
          </audio>
          {audioError && <p className="text-sm text-amber-700">Audio file missing. Add file under /public/audio and continue answering.</p>}
        </div>
      )}

      {question.type === 'speaking' && (
        <div className="space-y-3 rounded-lg border border-slate-200 p-3">
          <p className="text-sm text-slate-600">{question.speaking_prompt}</p>
          <div className="flex gap-2">
            {!recording ? (
              <button
                type="button"
                disabled={locked}
                onClick={startRecording}
                aria-label="Start recording your speaking answer"
                className="rounded bg-primary px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-50"
              >
                Start recording
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                aria-label="Stop recording your speaking answer"
                className="rounded bg-red-500 px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                Stop recording
              </button>
            )}
            <span className="self-center text-sm text-slate-700">Recorded: {durationSec}s / 45s</span>
          </div>
          <textarea
            className="w-full rounded border border-slate-300 p-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            rows={3}
            placeholder="Type your spoken response (keywords are checked in MVP)..."
            value={answer}
            disabled={locked}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      )}

      {question.options && (
        <div role="radiogroup" aria-label="Answer options" className="space-y-2">
          {question.options.map((opt, idx) => (
            <div
              key={opt}
              role="radio"
              tabIndex={answer === opt ? 0 : -1}
              aria-checked={answer === opt}
              onKeyDown={(event) => handleMcqKeyDown(event, idx, opt)}
              className="rounded border border-slate-200 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700"
            >
              <label className="flex cursor-pointer items-center gap-2 p-2">
                <input
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  type="radio"
                  name={`q-${question.id}`}
                  disabled={locked}
                  value={opt}
                  checked={answer === opt}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <span>{opt}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {question.type === 'gap' && !question.options && (
        <input
          className="w-full rounded border border-slate-300 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          disabled={locked}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer"
          aria-label="Type your gap-fill answer"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submitCurrent();
            }
          }}
        />
      )}

      <button
        type="button"
        disabled={submitDisabled}
        onClick={submitCurrent}
        className="rounded bg-primary px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Submit Answer
      </button>
    </div>
  );
}
