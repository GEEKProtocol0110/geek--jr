"use client";

import { useMemo, useState } from "react";
import deck from "@/data/decks/starter-30.json";
import { pickLeitnerSession } from "@/lib/leitner";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { AgeTier, CardItem, SessionSize } from "@/lib/types";

const LEITNER_KEY = "geekjr_cards_leitner_v1";

interface CardPlayerProps {
  ageTier: AgeTier;
  sessionSize: SessionSize;
}

export default function CardPlayer({ ageTier, sessionSize }: CardPlayerProps) {
  const cardsForTier = useMemo(() => {
    const typedDeck = deck as CardItem[];
    return typedDeck.filter((c) => c.tier === ageTier);
  }, [ageTier]);

  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(0);
  const [leitnerState, setLeitnerState] = useState<Record<string, 1 | 2 | 3>>(() =>
    loadFromStorage<Record<string, 1 | 2 | 3>>(LEITNER_KEY, {}),
  );

  const sessionCards = useMemo(
    () => pickLeitnerSession(cardsForTier, leitnerState, sessionSize),
    [cardsForTier, leitnerState, sessionSize],
  );

  const current = sessionCards[index];

  function markCard(correct: boolean) {
    if (!current) {
      return;
    }

    const bucket = leitnerState[current.id] ?? 1;
    const nextBucket = correct ? (Math.min(bucket + 1, 3) as 1 | 2 | 3) : 1;
    const updated = {
      ...leitnerState,
      [current.id]: nextBucket,
    };

    setLeitnerState(updated);
    saveToStorage(LEITNER_KEY, updated);
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  }

  if (!cardsForTier.length) {
    return <p className="rounded-xl bg-amber-100 p-4 text-amber-900">No cards found for this age tier.</p>;
  }

  if (!current) {
    return (
      <section className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Index Cards</h1>
        <p className="mt-2 text-slate-700">Session complete.</p>
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
        >
          Start new session
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <h1 className="text-2xl font-bold text-slate-900">Index Cards</h1>
      <p className="mt-1 text-sm text-slate-600">Age tier: {ageTier} · Session: {Math.min(sessionSize, cardsForTier.length)} cards</p>
      <p className="mt-1 text-sm text-slate-600">Card {index + 1} of {Math.min(sessionSize, cardsForTier.length)}</p>

      <div className="mt-6 rounded-xl bg-indigo-50 p-6 text-center">
        <p className="text-xl font-semibold text-indigo-900">{current.question}</p>
        {showAnswer && <p className="mt-3 text-lg text-indigo-700">{current.answer}</p>}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowAnswer((prev) => !prev)}
          className="rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800"
        >
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
        <button
          type="button"
          onClick={() => markCard(false)}
          className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-100"
        >
          Need practice
        </button>
        <button
          type="button"
          onClick={() => markCard(true)}
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-100"
        >
          Got it
        </button>
      </div>
    </section>
  );
}
