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
