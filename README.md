# Geek Jr

Five small learning activities for ages 1–10. Parents choose an age tier and session length; children can practice without an account. Geek Jr grew from a picture and word card idea for the youngest learners.

| Activity | What children do |
| --- | --- |
| Picture Cards | See a picture, hear the word, and mark whether they know it |
| Phonics Tap | Listen to a prompt and sounds, then pick an answer |
| Memory Match | Flip picture cards to find matching pairs |
| Patterns & Logic | Choose what comes next |
| Story Sequence | Complete a short story, with optional Bible story questions |

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Check code with `npm run lint` and `npm run build`.

## Parent settings

Open **Parent settings** from the home page. Choose an age tier (`1–2`, `3–4`, `5–7`, `8–10`), a round size, and a time limit. Ages 1–2 have no timer. Bible story questions are off by default and appear in Story Sequence when enabled. The current starter content includes one Bible question per tier.

Learning progress and preferences stay in this browser's localStorage. They do not sync across devices and will be lost if browser data is cleared. The progress panel shows lifetime attempts for activities, plus the number of distinct picture cards practiced; each game shows its own round result separately.

Memory Match now uses a new progress key because the previous activity was a question quiz, so its old quiz scores are not counted as matching pairs. The old data remains in the browser.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, and browser speech synthesis. Speech playback depends on the device's available voices. There is no backend or wallet integration in this early learning app.
