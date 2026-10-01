export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function prepareChoiceRound<T extends { choices: string[] }>(
  pool: readonly T[], size: number, random = Math.random,
): T[] {
  return shuffle(pool, random).slice(0, size).map((item) => ({
    ...item, choices: shuffle(item.choices, random),
  }));
}
