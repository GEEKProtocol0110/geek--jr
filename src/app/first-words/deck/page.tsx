import Link from "next/link";
import cards from "@/data/decks/first-words.json";

export default function FirstWordsDeckPage() {
  const categories = [...new Set(cards.map((card) => card.category))];
  return (
    <main id="main-content" className="activity-page">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
        <Link href="/first-words" className="back-link"><span aria-hidden="true">←</span> First Words</Link>
        <h1 className="mt-5 text-3xl font-black text-slate-900">Browse the word deck</h1>
        <p className="mt-2 text-slate-600">Explore {cards.length} words and their parent prompts. Start a round when you are ready.</p>
        <div className="mt-7 space-y-7">
          {categories.map((category) => (
            <details key={category} className="rounded-xl border border-slate-200 p-4">
              <summary className="cursor-pointer text-lg font-bold text-slate-900">{category} <span className="text-sm font-normal text-slate-500">({cards.filter((card) => card.category === category).length})</span></summary>
              <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {cards.filter((card) => card.category === category).map((card) => (
                  <li key={card.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <strong className="text-teal-950">{card.word}</strong>
                    <p className="mt-1 text-sm text-slate-600">{card.prompt}</p>
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
