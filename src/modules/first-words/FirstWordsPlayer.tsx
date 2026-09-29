"use client";

import { useEffect, useState } from "react";
import cards from "@/data/decks/first-words.json";
import { FIRST_WORDS_KEY, nextWordProgress, pickWordSession, WordCard, WordCardProgress } from "@/lib/firstWords";
import { loadSettings } from "@/lib/settings";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

const wordCards = cards as WordCard[];

function speak(word: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function FirstWordsPlayer() {
  const [progress, setProgress] = useState<Record<string, WordCardProgress>>({});
  const [session, setSession] = useState<WordCard[] | null>(null);
  const [size, setSize] = useState(5);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = loadFromStorage<Record<string, WordCardProgress>>(FIRST_WORDS_KEY, {});
      const sessionSize = loadSettings().sessionSize;
      setProgress(saved);
      setSize(sessionSize);
      setSession(pickWordSession(wordCards, saved, sessionSize));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function mark(correct: boolean) {
    const current = session?.[index];
    if (!current) return;
    const updated = {
      ...progress,
      [current.id]: nextWordProgress(progress[current.id], correct),
    };
    setProgress(updated);
    saveToStorage(FIRST_WORDS_KEY, updated);
    setCompleted((count) => count + 1);
    setIndex((position) => position + 1);
  }

  function newRound() {
    setSession(pickWordSession(wordCards, progress, size));
    setIndex(0);
    setCompleted(0);
  }

  if (!session) return <p className="rounded-2xl bg-white p-6 text-slate-700">Loading word cards...</p>;

  const current = session[index];
  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-widest text-teal-700">Parent guided · No timer</p>
      <h1 className="mt-2 text-3xl font-black text-slate-900">First Words</h1>
      {current ? (
        <>
          <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-600">
            <span>{current.category}</span>
            <span>Card {index + 1} of {session.length}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Round progress" aria-valuenow={index} aria-valuemin={0} aria-valuemax={session.length}>
            <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${(index / session.length) * 100}%` }} />
          </div>
          <div className="mt-6 rounded-2xl bg-teal-50 px-5 py-12 text-center">
            <p className="break-words text-5xl font-black tracking-tight text-teal-950 sm:text-6xl">{current.word}</p>
            <button type="button" onClick={() => speak(current.word)} className="mt-7 rounded-xl bg-teal-900 px-5 py-3 font-bold text-white hover:bg-teal-800">🔊 Hear the word</button>
          </div>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Try together</p>
            <p className="mt-2 text-lg text-slate-800">{current.prompt}</p>
            <p className="mt-2 text-sm text-slate-600">Sound hint: {current.soundHint}</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => mark(false)} className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 font-bold text-rose-800 hover:bg-rose-100">Practice again</button>
            <button type="button" onClick={() => mark(true)} className="rounded-xl bg-teal-800 px-4 py-3 font-bold text-white hover:bg-teal-900">Got it</button>
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-xl bg-teal-50 p-5 text-teal-950" role="status">
          <h2 className="text-xl font-bold">Round complete</h2>
          <p className="mt-2">You practiced {completed} words. Come back for another short round whenever you like.</p>
          <button type="button" onClick={newRound} className="mt-5 rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900">Start another round</button>
        </div>
      )}
    </section>
  );
}
