import Link from "next/link";

const activities = [
  {
    title: "Index Cards",
    description: "Quick flashcard rounds with spaced repetition.",
    href: "/cards",
  },
  {
    title: "Phonics Tap",
    description: "Hear a sound idea and tap the correct match.",
    href: "/phonics",
  },
  {
    title: "Memory Match",
    description: "Build recall by matching the right pair.",
    href: "/memory",
  },
  {
    title: "Patterns & Logic",
    description: "Find what comes next in simple logic chains.",
    href: "/patterns",
  },
  {
    title: "Story Sequence",
    description: "Pick what happens next in a short sequence.",
    href: "/stories",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-lime-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Geek Jr</h1>
            <p className="mt-2 text-slate-600">Playful learning activities for ages 1 to 10.</p>
          </div>
          <Link
            href="/parent"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700"
          >
            Parent Mode
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Link
              key={activity.href}
              href={activity.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-900">{activity.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{activity.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
