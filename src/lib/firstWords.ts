export type WordCard = {
  id: string;
  word: string;
  category: string;
  prompt: string;
  soundHint: string;
};

export type WordCardProgress = {
  box: 1 | 2 | 3 | 4 | 5;
  lastSeen: number;
  seenCount: number;
};

export const FIRST_WORDS_KEY = "geekjr_first_words_v1";

const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [0, 0, DAY, 3 * DAY, 7 * DAY, 14 * DAY];

export function nextWordProgress(
  current: WordCardProgress | undefined,
  correct: boolean,
  now = Date.now(),
): WordCardProgress {
  const box = current?.box ?? 1;
  return {
    box: (correct ? Math.min(5, box + 1) : Math.max(1, box - 1)) as WordCardProgress["box"],
    lastSeen: now,
    seenCount: (current?.seenCount ?? 0) + 1,
  };
}

export function pickWordSession(
  cards: WordCard[],
  progress: Record<string, WordCardProgress>,
  size: number,
  now = Date.now(),
): WordCard[] {
  // Revisit missed words, introduce new ones, then fill with due reviews.
  return [...cards]
    .sort((a, b) => {
      const aState = progress[a.id];
      const bState = progress[b.id];
      const aDue = aState ? aState.lastSeen + INTERVALS[aState.box] : 0;
      const bDue = bState ? bState.lastSeen + INTERVALS[bState.box] : 0;
      const aPriority = aState?.box === 1 ? 0 : !aState ? 1 : aDue <= now ? 2 : 3;
      const bPriority = bState?.box === 1 ? 0 : !bState ? 1 : bDue <= now ? 2 : 3;
      return aPriority - bPriority || aDue - bDue || a.id.localeCompare(b.id);
    })
    .slice(0, Math.min(size, cards.length));
}
