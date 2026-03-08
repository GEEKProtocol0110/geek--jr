import Link from "next/link";
import StoryGame from "@/modules/stories/StoryGame";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
          Back to hub
        </Link>
        <div className="mt-4">
          <StoryGame />
        </div>
      </div>
    </main>
  );
}
