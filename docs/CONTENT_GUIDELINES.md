# Content guidelines

Geek Jr is a starter practice library for ages 1–10. It is built for short sessions and for a parent or caregiver to help when needed.

## Age ranges

| Tier | Guideline |
| --- | --- |
| `1-2` | Concrete pictures and common words; parent reads prompts aloud; no timer |
| `3-4` | Familiar objects, simple sounds, and short sequences |
| `5-7` | Beginning reading, counting, and two-step reasoning |
| `8-10` | More detailed reading, patterns, and reasoning |

Keep one clear answer per question. Avoid trick wording, frightening examples, and unnecessary reading load. Audio from browser speech synthesis helps accessibility but is not a substitute for carefully checked phonics audio.

## Data format

Multiple-choice prompts in `src/data/phonics`, `src/data/patterns`, and `src/data/stories` use `id`, `tier`, `prompt`, `choices`, and `correct`. The `correct` value must be one of the `choices`. A story prompt may set `"pack": "christian"` to include it only when a parent turns on Bible story questions.

Picture cards in `src/data/decks` use `id`, `tier`, `question`, `answer`, and optional `visual`. Memory pairs in `src/data/memory` use `id`, `tier`, `label`, and `visual`; the matching game makes two tiles from each pair.

For every change, try the relevant age tier in Parent settings and complete a full round. Content should remain useful without internet access after the app loads.

## First Words lessons

The original 112-word deck remains available. The default ages 1–2 path draws from 20 concrete illustrated words in six themes, with at most three cards per round. Parents can deliberately choose a category or individual card from the full deck. Illustrations are original SVG drawings, not photographs; use the parent prompt to connect each word with real objects, people, or books.

The teaching loop is picture + printed word, parent naming, a real-world action, waiting for a response, and an optional parent observation. Understanding and saying/attempting a word are separate observations. Print recognition is an optional focus that hides illustrations; playing the spoken answer prevents an independent print observation for that attempt. Recognizing memorized print is not evidence of decoding unfamiliar words. The app does not record or grade a child's voice, diagnose development, or promise reading at a particular age.

Record only what was observed: not yet, with help, or on their own. Existing Got it marks are retained as practice history and never converted to skill observations. Due reviews precede new cards. Recently practiced words do not fill a review round before their interval; parents can choose clearly labeled extra practice. Intervals are 1, 1, 3, 7, and 14 days across the five review boxes.

All ages can use untimed practice. The toddler Memory Match mode presents two visible pairs; older modes retain hidden-card recall. Multiple-choice answer positions shuffle once per round and stay stable while a question is being answered. First-try results are shown separately from retries.

Run `npm run check:content` for dataset and learning regression checks, then `npm run lint` and `npm run build`. Manually check a toddler lesson, saved parent observations, print mode, individual-word links, visible matching, and an older untimed round.
