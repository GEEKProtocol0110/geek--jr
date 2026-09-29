"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from "@/lib/settings";
import { loadFromStorage } from "@/lib/storage";
import { AgeTier, GameStatsByTier, GeekJrSettings, SessionSize, TimeLimitSec } from "@/lib/types";

const AGE_TIERS: AgeTier[] = ["1-2", "3-4", "5-7", "8-10"];
const SESSION_SIZES: SessionSize[] = [3, 5, 10];
const TIME_LIMITS: TimeLimitSec[] = [60, 120, 180];

const GAME_KEYS = [
  { id: "phonics", label: "Phonics Tap", key: "geekjr_stats_phonics_v1" },
  { id: "memory", label: "Memory Match", key: "geekjr_stats_memory_v2" },
  { id: "patterns", label: "Patterns & Logic", key: "geekjr_stats_patterns_v1" },
  { id: "stories", label: "Story Sequence", key: "geekjr_stats_stories_v1" },
];

const EMPTY = { totalAttempts: 0, correctCount: 0, bestStreak: 0 };

function statsSummary(statsByTier: GameStatsByTier) {
  return AGE_TIERS.reduce(
    (acc, tier) => {
      const tierStats = statsByTier[tier] ?? EMPTY;
      return {
        totalAttempts: acc.totalAttempts + tierStats.totalAttempts,
        correctCount: acc.correctCount + tierStats.correctCount,
        bestStreak: Math.max(acc.bestStreak, tierStats.bestStreak),
      };
    },
    { totalAttempts: 0, correctCount: 0, bestStreak: 0 },
  );
}

export default function ParentPage() {
  const [settings, setSettings] = useState<GeekJrSettings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState<Record<string, ReturnType<typeof statsSummary>>>({});
  const [practicedCards, setPracticedCards] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSettings(loadSettings());
      setPracticedCards(Object.keys(loadFromStorage<Record<string, 1 | 2 | 3>>("geekjr_cards_leitner_v1", {})).length);
      setStats(Object.fromEntries(GAME_KEYS.map((game) => {
        const raw = loadFromStorage<GameStatsByTier>(game.key, {
          "1-2": EMPTY, "3-4": EMPTY, "5-7": EMPTY, "8-10": EMPTY,
        });
        return [game.id, statsSummary(raw)];
      })));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function update<K extends keyof GeekJrSettings>(key: K, value: GeekJrSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  }

  return (
    <main id="main-content" className="activity-page">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-black text-slate-900">Parent settings</h1>
          <Link href="/#activities" className="back-link">
            <span aria-hidden="true">←</span> All activities
          </Link>
        </div>
        <p className="mt-3 text-sm text-slate-600">Choose the learning level and round length. Your settings stay on this device.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Session size
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from "@/lib/settings";
import { loadFromStorage } from "@/lib/storage";
import { FIRST_WORDS_KEY, WordCardProgress } from "@/lib/firstWords";
import { AgeTier, GameStatsByTier, GeekJrSettings, SessionSize, TimeLimitSec } from "@/lib/types";

const AGE_TIERS: AgeTier[] = ["1-2", "3-4", "5-7", "8-10"];
const SESSION_SIZES: SessionSize[] = [3, 5, 10];
const TIME_LIMITS: TimeLimitSec[] = [60, 120, 180];

const GAME_KEYS = [
  { id: "phonics", label: "Phonics Tap", key: "geekjr_stats_phonics_v1" },
  { id: "memory", label: "Memory Match", key: "geekjr_stats_memory_v2" },
  { id: "patterns", label: "Patterns & Logic", key: "geekjr_stats_patterns_v1" },
  { id: "stories", label: "Story Sequence", key: "geekjr_stats_stories_v1" },
];

const EMPTY = { totalAttempts: 0, correctCount: 0, bestStreak: 0 };

function statsSummary(statsByTier: GameStatsByTier) {
  return AGE_TIERS.reduce(
    (acc, tier) => {
      const tierStats = statsByTier[tier] ?? EMPTY;
      return {
        totalAttempts: acc.totalAttempts + tierStats.totalAttempts,
        correctCount: acc.correctCount + tierStats.correctCount,
        bestStreak: Math.max(acc.bestStreak, tierStats.bestStreak),
      };
    },
    { totalAttempts: 0, correctCount: 0, bestStreak: 0 },
  );
}

export default function ParentPage() {
  const [settings, setSettings] = useState<GeekJrSettings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState<Record<string, ReturnType<typeof statsSummary>>>({});
  const [practicedCards, setPracticedCards] = useState(0);
  const [practicedWords, setPracticedWords] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSettings(loadSettings());
      setPracticedCards(Object.keys(loadFromStorage<Record<string, 1 | 2 | 3>>("geekjr_cards_leitner_v1", {})).length);
      setPracticedWords(Object.values(loadFromStorage<Record<string, WordCardProgress>>(FIRST_WORDS_KEY, {})).filter((word) => word.seenCount > 0).length);
      setStats(Object.fromEntries(GAME_KEYS.map((game) => {
        const raw = loadFromStorage<GameStatsByTier>(game.key, {
          "1-2": EMPTY, "3-4": EMPTY, "5-7": EMPTY, "8-10": EMPTY,
        });
        return [game.id, statsSummary(raw)];
      })));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function update<K extends keyof GeekJrSettings>(key: K, value: GeekJrSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  }

  return (
    <main id="main-content" className="activity-page">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-black text-slate-900">Parent settings</h1>
          <Link href="/#activities" className="back-link">
            <span aria-hidden="true">←</span> All activities
          </Link>
        </div>
        <p className="mt-3 text-sm text-slate-600">Choose the learning level and round length. Your settings stay on this device.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Session size
            <select
              value={settings.sessionSize}
              onChange={(e) => update("sessionSize", Number(e.target.value) as SessionSize)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {SESSION_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Time limit (seconds)
            <select
              value={settings.timeLimitSec}
              onChange={(e) => update("timeLimitSec", Number(e.target.value) as TimeLimitSec)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {TIME_LIMITS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-slate-500">Ages 1–2 always play without a timer.</span>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Age tier
            <select
              value={settings.ageTier}
              onChange={(e) => update("ageTier", e.target.value as AgeTier)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {AGE_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 self-end rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={settings.christianPacks}
              onChange={(e) => update("christianPacks", e.target.checked)}
              className="size-4"
            />
            Include Bible story questions
          </label>
        </div>

        <h2 className="mt-8 text-xl font-bold text-slate-900">Progress on this device</h2>
        <p className="mt-2 text-sm text-slate-600">Picture Cards: {practicedCards} unique cards practiced</p>
        <p className="mt-1 text-sm text-slate-600">First Words: {practicedWords} unique words practiced</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_KEYS.map((game) => {
            const summary = stats[game.id] ?? EMPTY;

            return (
              <article key={game.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">{game.label}</h3>
                <p className="text-sm text-slate-700">Attempts: {summary.totalAttempts}</p>
                <p className="text-sm text-slate-700">Correct: {summary.correctCount}</p>
                <p className="text-sm text-slate-700">Best streak: {summary.bestStreak}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
            <select
              value={settings.sessionSize}
              onChange={(e) => update("sessionSize", Number(e.target.value) as SessionSize)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {SESSION_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Time limit (seconds)
            <select
              value={settings.timeLimitSec}
              onChange={(e) => update("timeLimitSec", Number(e.target.value) as TimeLimitSec)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {TIME_LIMITS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-slate-500">Ages 1–2 always play without a timer.</span>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Age tier
            <select
              value={settings.ageTier}
              onChange={(e) => update("ageTier", e.target.value as AgeTier)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {AGE_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 self-end rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={settings.christianPacks}
              onChange={(e) => update("christianPacks", e.target.checked)}
              className="size-4"
            />
            Include Bible story questions
          </label>
        </div>

        <h2 className="mt-8 text-xl font-bold text-slate-900">Progress on this device</h2>
        <p className="mt-2 text-sm text-slate-600">Picture Cards: {practicedCards} unique cards practiced</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_KEYS.map((game) => {
            const summary = stats[game.id] ?? EMPTY;

            return (
              <article key={game.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">{game.label}</h3>
                <p className="text-sm text-slate-700">Attempts: {summary.totalAttempts}</p>
                <p className="text-sm text-slate-700">Correct: {summary.correctCount}</p>
                <p className="text-sm text-slate-700">Best streak: {summary.bestStreak}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
