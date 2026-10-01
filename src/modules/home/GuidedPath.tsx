"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from "@/lib/settings";
import { AgeTier, GeekJrSettings } from "@/lib/types";
import { FIRST_WORDS_KEY, WordCardProgress } from "@/lib/firstWords";
import { loadFromStorage } from "@/lib/storage";
import { WORD_LESSONS } from "@/lib/wordLessons";

const ages: AgeTier[] = ["1-2", "3-4", "5-7", "8-10"];

const paths: Record<AgeTier, { href: string; title: string; focus: string }[]> = {
  "1-2": [
    { href: "/first-words", title: "First Words", focus: "Look, say, and play together" },
    { href: "/cards", title: "Picture Cards", focus: "Name what you see" },
    { href: "/memory", title: "Picture matching", focus: "Match two visible pictures" },
  ],
  "3-4": [
    { href: "/first-words", title: "First Words", focus: "Build vocabulary" },
    { href: "/phonics", title: "Phonics Tap", focus: "Hear the sounds" },
    { href: "/memory", title: "Memory Match", focus: "Find a pair" },
  ],
  "5-7": [
    { href: "/phonics", title: "Phonics Tap", focus: "Explore sounds" },
    { href: "/patterns", title: "Patterns & Logic", focus: "Spot what comes next" },
    { href: "/stories", title: "Story Sequence", focus: "Put ideas in order" },
  ],
  "8-10": [
    { href: "/patterns", title: "Patterns & Logic", focus: "Stretch your reasoning" },
    { href: "/stories", title: "Story Sequence", focus: "Think in steps" },
    { href: "/memory", title: "Memory Match", focus: "Sharpen recall" },
  ],
};

export default function GuidedPath() {
  const [settings, setSettings] = useState<GeekJrSettings>(DEFAULT_SETTINGS);
  const [wordProgress, setWordProgress] = useState<Record<string, WordCardProgress>>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSettings(loadSettings());
      setWordProgress(loadFromStorage<Record<string, WordCardProgress>>(FIRST_WORDS_KEY, {}));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function chooseAge(ageTier: AgeTier) {
    const next = { ...settings, ageTier };
    setSettings(next);
    saveSettings(next);
  }

  const suggestedLesson = WORD_LESSONS.find((lesson) => lesson.words.some((id) => wordProgress[id]?.observations?.understands?.level !== "independent")) ?? [...WORD_LESSONS].sort((a, b) => Math.min(...a.words.map((id) => wordProgress[id]?.lastSeen ?? 0)) - Math.min(...b.words.map((id) => wordProgress[id]?.lastSeen ?? 0)))[0];

  return (
    <section className="guided-section" id="start" aria-labelledby="guided-title">
      <div className="guided-inner">
        <div className="guided-intro">
          <p className="eyebrow">A PLACE TO BEGIN</p>
          <h2 id="guided-title">A little learning path.</h2>
          <p>Pick an age, then start with one short round. Come back for the next step when you like.</p>
          <Link href="/parent">More parent settings <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="guided-content">
          <div className="age-picker" role="group" aria-label="Choose an age level">
            <span>AGE LEVEL</span>
            <div>
              {ages.map((age) => (
                <button key={age} type="button" aria-pressed={settings.ageTier === age} onClick={() => chooseAge(age)}>
                  {age.replace("-", "–")}
                </button>
              ))}
            </div>
          </div>
          {(settings.ageTier === "1-2" || settings.ageTier === "3-4") && <div className="mt-4 rounded-xl border border-teal-300 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700">A lesson to try together</p>
            <Link href={`/first-words?lesson=${suggestedLesson.id}`} className="mt-2 block text-xl font-bold text-teal-950">{suggestedLesson.title} <span aria-hidden="true">↗</span></Link>
            <p className="mt-1 text-sm text-slate-600">{suggestedLesson.description} Suggested from your parent observations; follow your child’s interest.</p>
            <Link href="/first-words/deck" className="mt-3 inline-block text-sm font-semibold text-teal-800 underline">Choose a different lesson</Link>
          </div>}
          <div className="guided-steps">
            {paths[settings.ageTier].map((step, index) => (
              <Link key={step.href} href={step.href} className="guided-step">
                <span className="step-number">0{index + 1}</span>
                <span className="step-copy"><strong>{step.title}</strong><small>{step.focus}</small></span>
                <span className="step-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
