import Link from "next/link";

const activities = [
  {
    number: "01",
    title: "Picture Cards",
    description: "See it. Say it. Remember it.",
    href: "/cards",
    color: "bg-amber-100 text-amber-950",
  },
  {
    number: "02",
    title: "Phonics Tap",
    description: "Listen, read, and choose a sound.",
    href: "/phonics",
    color: "bg-sky-100 text-sky-950",
  },
  {
    number: "03",
    title: "Memory Match",
    description: "Flip cards and find the pairs.",
    href: "/memory",
    color: "bg-emerald-100 text-emerald-950",
  },
  {
    number: "04",
    title: "Patterns & Logic",
    description: "Spot what comes next.",
    href: "/patterns",
    color: "bg-violet-100 text-violet-950",
  },
  {
    number: "05",
    title: "Story Sequence",
    description: "Choose how the story continues.",
    href: "/stories",
    color: "bg-rose-100 text-rose-950",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f2] px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Learn through play</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight text-slate-900">Geek Jr<span className="text-emerald-600">.</span></h1>
            <p className="mt-3 max-w-md text-base text-slate-600">Small activities for curious kids, ages 1–10. Pick one and begin.</p>
          </div>
          <Link
            href="/parent"
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
          >
            Parent settings
          </Link>
        </div>

        <h2 className="mt-12 text-lg font-bold text-slate-800">Choose an activity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Link
              key={activity.href}
              href={activity.href}
              className={`group flex min-h-48 flex-col justify-between rounded-2xl border border-black/5 p-6 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-4 focus-visible:outline-emerald-600 ${activity.color}`}
            >
              <span className="text-sm font-bold opacity-60">{activity.number} / 05</span>
              <div><h3 className="text-2xl font-bold">{activity.title} <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">↗</span></h3>
              <p className="mt-2 text-sm opacity-80">{activity.description}</p></div>
            </Link>
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-slate-500">Progress stays on this device. No account needed.</p>
      </section>
    </main>
  );
}
