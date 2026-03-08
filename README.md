# Geek Jr

Geek Jr is a modular learning app for children ages 1-10, built with Next.js 16 App Router, TypeScript, and Tailwind CSS.

It includes 5 activities plus a Parent Mode panel:

- Index Cards
- Phonics Tap
- Memory Match
- Patterns and Logic
- Story Sequence
- Parent Mode (settings + stats)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- localStorage for persistence (no backend yet)

## Project Structure

```text
src/
	app/
		page.tsx
		cards/page.tsx
		phonics/page.tsx
		memory/page.tsx
		patterns/page.tsx
		stories/page.tsx
		parent/page.tsx
	modules/
		cards/CardPlayer.tsx
		common/TimedChoicesGame.tsx
		phonics/PhonicsGame.tsx
		memory/MemoryGame.tsx
		patterns/PatternGame.tsx
		stories/StoryGame.tsx
	data/
		decks/starter-30.json
		phonics/sounds.json
		memory/pairs.json
		patterns/patterns.json
		stories/stories.json
	lib/
		settings.ts
		storage.ts
		leitner.ts
		types.ts
```

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server on port 3000:

```bash
npm run dev -- -p 3000
```

Open `http://localhost:3000`.

## Routes

- `/` Activity Hub
- `/cards` Index Cards
- `/phonics` Phonics Tap
- `/memory` Memory Match
- `/patterns` Patterns and Logic
- `/stories` Story Sequence
- `/parent` Parent Mode

## Settings and Persistence

Parent Mode stores shared app settings in:

- `geekjr_settings_v2`

Settings shape:

- `sessionSize`: `3 | 5 | 10`
- `timeLimitSec`: `60 | 120 | 180`
- `ageTier`: `"1-2" | "3-4" | "5-7" | "8-10"`
- `christianPacks`: `boolean`

Game stats are saved per game and age tier in localStorage:

- `geekjr_stats_phonics_v1`
- `geekjr_stats_memory_v1`
- `geekjr_stats_patterns_v1`
- `geekjr_stats_stories_v1`

Cards module data/progress key:

- `geekjr_cards_leitner_v1`

## Quality Checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```
