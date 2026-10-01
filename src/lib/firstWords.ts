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
  observations?: Partial<Record<WordSkill, WordObservation>>;
};

export type WordSkill = "understands" | "speaks" | "print";
export type ObservationLevel = "not-yet" | "with-help" | "independent";
export type WordObservation = { level: ObservationLevel; lastObserved: number; independentCount: number };
export type WordObservations = Partial<Record<WordSkill, ObservationLevel>>;
export const WORD_SKILLS: { id: WordSkill; label: string; hint: string }[] = [
  { id: "understands", label: "Understands the word", hint: "Points to, finds, or uses the named thing. A gesture counts." },
  { id: "speaks", label: "Says or attempts the word", hint: "A meaningful early word attempt counts. Model it gently; do not demand perfect pronunciation." },
  { id: "print", label: "Recognizes the printed word", hint: "Try without a picture, spoken answer, or other clue. Recognition does not establish decoding." },
];
export const OBSERVATION_LEVELS: { id: ObservationLevel; label: string }[] = [
  { id: "not-yet", label: "Not yet" }, { id: "with-help", label: "With help" }, { id: "independent", label: "On their own" },
];

export const FIRST_WORDS_KEY = "geekjr_first_words_v1";

const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [0, DAY, DAY, 3 * DAY, 7 * DAY, 14 * DAY];

export function nextWordProgress(
  current: WordCardProgress | undefined,
  correct: boolean,
  now = Date.now(),
): WordCardProgress {
  const box = current?.box ?? 1;
  return {
    ...current,
    box: (correct ? Math.min(5, box + 1) : Math.max(1, box - 1)) as WordCardProgress["box"],
    lastSeen: now,
    seenCount: (current?.seenCount ?? 0) + 1,
  };
}

export function recordWordObservations(
  current: WordCardProgress | undefined, observations: WordObservations,
  focus: WordSkill = "understands", now = Date.now(),
): WordCardProgress {
  const level = observations[focus];
  const next = level ? nextWordProgress(current, level === "independent", now) : {
    ...current, box: current?.box ?? 1, lastSeen: now, seenCount: (current?.seenCount ?? 0) + 1,
  };
  const updated = { ...current?.observations };
  for (const skill of WORD_SKILLS) {
    const observed = observations[skill.id];
    if (!observed) continue;
    updated[skill.id] = {
      level: observed, lastObserved: now,
      independentCount: (updated[skill.id]?.independentCount ?? 0) + (observed === "independent" ? 1 : 0),
    };
  }
  return { ...next, observations: updated };
}

export function pickWordSession(
  cards: WordCard[],
  progress: Record<string, WordCardProgress>,
  size: number,
  now = Date.now(),
): WordCard[] {
  // Only select due reviews or new words; early revisits are a deliberate parent choice.
  return [...cards]
    .filter((card) => !progress[card.id] || progress[card.id].lastSeen + INTERVALS[progress[card.id].box] <= now)
    .sort((a, b) => {
      const aState = progress[a.id];
      const bState = progress[b.id];
      const aDue = aState ? aState.lastSeen + INTERVALS[aState.box] : 0;
      const bDue = bState ? bState.lastSeen + INTERVALS[bState.box] : 0;
      const aPriority = aState ? 0 : 1;
      const bPriority = bState ? 0 : 1;
      return aPriority - bPriority || aDue - bDue;
    })
    .slice(0, Math.min(size, cards.length));
}
