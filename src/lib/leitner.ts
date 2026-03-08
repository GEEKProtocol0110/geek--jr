export type LeitnerBucket = 1 | 2 | 3;

export interface LeitnerCardState {
  cardId: string;
  bucket: LeitnerBucket;
}

export function nextBucket(current: LeitnerBucket, wasCorrect: boolean): LeitnerBucket {
  if (!wasCorrect) {
    return 1;
  }
  if (current >= 3) {
    return 3;
  }
  return (current + 1) as LeitnerBucket;
}

export function pickLeitnerSession<T extends { id: string }>(
  cards: T[],
  states: Record<string, LeitnerBucket>,
  sessionSize: number,
): T[] {
  const weighted = [...cards].sort((a, b) => {
    const aBucket = states[a.id] ?? 1;
    const bBucket = states[b.id] ?? 1;
    return aBucket - bBucket;
  });

  return weighted.slice(0, Math.min(sessionSize, weighted.length));
}
