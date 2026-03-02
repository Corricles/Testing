# adaptive-cefr-test

Adaptive CEFR placement MVP built with **Next.js (App Router) + TypeScript + Tailwind**.

## Setup

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
npm run test
npm run test:watch
```

## Routes

- `/` Welcome page with start/resume/reset
- `/test` Adaptive 30-question runner
- `/results` CEFR estimate, confidence, and weighted skill breakdown

## Adaptive scoring model

- Starting difficulty: `40`
- Correct answer: `+3`
- Incorrect answer or timeout: `-2`
- Difficulty is clamped to `0..100`
- Next question is selected by nearest `difficulty_score` to current difficulty
- Type balancing avoids repeating the same question type more than 2 times consecutively (fallback relaxes if needed)
- Speaking is forced at Q10 and Q20

### CEFR mapping table

| Difficulty score | CEFR |
|---|---|
| 0–20 | A1 |
| 21–40 | A2 |
| 41–60 | B1 |
| 61–80 | B2 |
| 81–100 | C1+ |

## How to add questions

Questions live in `lib/questions.ts`.

Supported types:
- `mcq_vocab`
- `mcq_grammar`
- `gap`
- `reading_mcq`
- `listening_mcq`
- `speaking`

Each question uses:
- `id`
- `type`
- `cefr_level`
- `difficulty_score`
- `prompt`
- optional: `options`, `correct_answer`, `passage`, `audio_src`, `speaking_prompt`, `audio_duration_sec`

Tips:
- keep `id` unique
- keep `difficulty_score` distributed across bands
- for speaking, set `correct_answer` to an array of expected keywords for scoring

## How to add listening audio

Audio files are served from `public/audio`.

Replace placeholder files with real MP3s using the same names:
- `listening-a1-1.mp3`, `listening-a1-2.mp3`
- `listening-a2-1.mp3`, `listening-a2-2.mp3`, `listening-a2-3.mp3`
- `listening-b1-1.mp3`, `listening-b1-2.mp3`, `listening-b1-3.mp3`
- `listening-b2-1.mp3`, `listening-b2-2.mp3`

If a file is missing, the UI shows a warning and still allows answer submission.

## Known limitations

- Speaking scoring is still MVP logic: **duration (>=10s) + keyword matching** on typed transcript; it is **not real speech-to-text scoring**.
- Listening assets are placeholders unless real MP3s are added in `public/audio`.
- Adaptive model is heuristic and not true IRT.
- No backend/user accounts; data is local to one browser.
