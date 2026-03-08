"use client";

import { useEffect, useMemo, useState } from "react";
import { loadSettings } from "@/lib/settings";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { AgeTier, GameStats, GameStatsByTier } from "@/lib/types";

export interface ChoicePrompt {
  id: string;
  tier: AgeTier;
  prompt: string;
  choices: string[];
  correct: string;
}

interface TimedChoicesGameProps {
  title: string;
  storageKey: string;
  prompts: ChoicePrompt[];
}

const EMPTY_STATS: GameStats = {
  totalAttempts: 0,
  correctCount: 0,
  bestStreak: 0,
};

const EMPTY_BY_TIER: GameStatsByTier = {
  "1-2": { ...EMPTY_STATS },
  "3-4": { ...EMPTY_STATS },
  "5-7": { ...EMPTY_STATS },
  "8-10": { ...EMPTY_STATS },
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TimedChoicesGame({ title, storageKey, prompts }: TimedChoicesGameProps) {
  const settings = useMemo(() => loadSettings(), []);
  const filtered = useMemo(
    () => prompts.filter((p) => p.tier === settings.ageTier),
    [prompts, settings.ageTier],
  );

  const sessionPrompts = useMemo(() => {
    const pool = filtered.length ? filtered : prompts;
    return shuffle(pool).slice(0, Math.min(settings.sessionSize, pool.length));
  }, [filtered, prompts, settings.sessionSize]);

  const [secondsLeft, setSecondsLeft] = useState<number>(settings.timeLimitSec);
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [ended, setEnded] = useState(false);
  const [stats, setStats] = useState<GameStatsByTier>(EMPTY_BY_TIER);

  useEffect(() => {
    setStats(loadFromStorage<GameStatsByTier>(storageKey, EMPTY_BY_TIER));
  }, [storageKey]);

  useEffect(() => {
    if (ended) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [ended]);

  const current = sessionPrompts[index];

  useEffect(() => {
    if (!ended && index >= sessionPrompts.length && sessionPrompts.length > 0) {
      setEnded(true);
    }
  }, [ended, index, sessionPrompts.length]);

  function updateStats(wasCorrect: boolean, nextStreak: number) {
    setStats((prev) => {
      const tier = settings.ageTier;
      const currentTier = prev[tier] ?? { ...EMPTY_STATS };
      const updatedTier: GameStats = {
        totalAttempts: currentTier.totalAttempts + 1,
        correctCount: currentTier.correctCount + (wasCorrect ? 1 : 0),
        bestStreak: Math.max(currentTier.bestStreak, nextStreak),
      };
      const updated = {
        ...prev,
        [tier]: updatedTier,
      };
      saveToStorage(storageKey, updated);
      return updated;
    });
  }

  function handleChoice(choice: string) {
    if (!current || ended) {
      return;
    }

    const wasCorrect = choice === current.correct;
    const nextStreak = wasCorrect ? streak + 1 : 0;

    setStreak(nextStreak);
    setFeedback(wasCorrect ? "Correct!" : "Try again.");
    updateStats(wasCorrect, nextStreak);

    if (wasCorrect) {
      setTimeout(() => {
        setFeedback("");
        setIndex((prev) => prev + 1);
      }, 350);
    }
  }

  function restart() {
    window.location.reload();
  }

  const attempts = stats[settings.ageTier]?.totalAttempts ?? 0;
  const correctCount = stats[settings.ageTier]?.correctCount ?? 0;

  if (!sessionPrompts.length) {
    return <p className="rounded-xl bg-amber-100 p-4 text-amber-900">No prompts found for this activity.</p>;
  }

  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">Age tier: {settings.ageTier}</p>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-lg bg-slate-100 p-2">Timer: {secondsLeft}s</div>
        <div className="rounded-lg bg-slate-100 p-2">Progress: {Math.min(index + 1, sessionPrompts.length)}/{sessionPrompts.length}</div>
        <div className="rounded-lg bg-slate-100 p-2">Streak: {streak}</div>
      </div>

      {!ended && current ? (
        <>
          <div className="mt-6 rounded-xl bg-sky-50 p-4 text-center text-lg font-semibold text-sky-900">
            {current.prompt}
          </div>
          <div className="mt-4 grid gap-3">
            {current.choices.map((choice) => (
              <button
                key={`${current.id}-${choice}`}
                type="button"
                onClick={() => handleChoice(choice)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left font-medium text-slate-800 transition hover:bg-slate-50"
              >
                {choice}
              </button>
            ))}
          </div>
          <p className="mt-4 min-h-6 text-sm font-semibold text-slate-700">{feedback}</p>
        </>
      ) : (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-900">
          <h2 className="text-xl font-bold">Session Complete</h2>
          <p className="mt-2">Attempts: {attempts}</p>
          <p>Correct: {correctCount}</p>
          <p>Best streak: {stats[settings.ageTier]?.bestStreak ?? 0}</p>
          <button
            type="button"
            onClick={restart}
            className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
          >
            Play again
          </button>
        </div>
      )}
    </section>
  );
}
