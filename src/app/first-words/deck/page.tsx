import Link from "next/link";
import cards from "@/data/decks/first-words.json";
import { PICTURE_WORD_IDS, WORD_LESSONS, togetherPrompt } from "@/lib/wordLessons";
import WordPicture from "@/modules/first-words/WordPicture";

export default function FirstWordsDeckPage() {
  const categories = [...new Set(cards.map((card) => card.category))];
  return (
    <main id="main-content" className="activity-page">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
        <Link href="/first-words" className="back-link"><span aria-hidden="true">←</span> First Words</Link>
        <h1 className="mt-5 text-3xl font-black text-slate-900">Browse the word deck</h1>
        <p className="mt-2 text-slate-600">Explore {cards.length} words. Choose a little lesson, a category, or an individual word to practice together.</p>
        <h2 className="mt-7 text-xl font-bold text-slate-900">Picture-and-word lessons</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORD_LESSONS.map((lesson) => <Link key={lesson.id} href={`/first-words?lesson=${lesson.id}`} className="rounded-xl border border-teal-200 bg-teal-50 p-4 hover:bg-teal-100"><strong className="text-teal-950">{lesson.title} <span aria-hidden="true">↗</span></strong><p className="mt-1 text-sm text-teal-900">{lesson.description}</p></Link>)}
        </div>
        <div className="mt-7 space-y-7">
          {categories.map((category) => (
            <details key={category} className="rounded-xl border border-slate-200 p-4">
              <summary className="cursor-pointer text-lg font-bold text-slate-900">{category} <span className="text-sm font-normal text-slate-500">({cards.filter((card) => card.category === category).length})</span></summary>
              <Link href={`/first-words?category=${encodeURIComponent(category)}`} className="mt-4 inline-block rounded-lg bg-teal-800 px-4 py-3 text-sm font-bold text-white">Practice {category}</Link>
              <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {cards.filter((card) => card.category === category).map((card) => (
                  <li key={card.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    {PICTURE_WORD_IDS.has(card.id) && <WordPicture word={card.word} className="mx-auto h-24 w-28" />}
                    <strong className="text-teal-950">{card.word}</strong>
                    <p className="mt-1 text-sm text-slate-600">{togetherPrompt(card)}</p>
                    <Link href={`/first-words?word=${encodeURIComponent(card.id)}`} className="mt-3 inline-block min-h-11 rounded-lg border border-teal-300 px-3 py-2 text-sm font-bold text-teal-900">Practice this word</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
