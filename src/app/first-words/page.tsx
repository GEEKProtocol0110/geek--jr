import Link from "next/link";
import FirstWordsPlayer from "@/modules/first-words/FirstWordsPlayer";

export default function FirstWordsPage() {
  return (
    <main id="main-content" className="activity-page">
      <div className="mx-auto max-w-3xl">
        <Link href="/#activities" className="back-link"><span aria-hidden="true">←</span> All activities</Link>
        <div className="activity-content"><FirstWordsPlayer /></div>
        <p className="mt-5 text-center text-sm text-slate-600">Want to choose a word? <Link href="/first-words/deck" className="font-bold text-teal-800 underline">Browse the deck</Link></p>
      </div>
    </main>
  );
}
