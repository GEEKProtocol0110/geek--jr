import Link from "next/link";
import StoryGame from "@/modules/stories/StoryGame";

export default function StoriesPage() {
  return (
    <main id="main-content" className="activity-page">
      <div className="mx-auto max-w-3xl">
        <Link href="/#activities" className="back-link">
          <span aria-hidden="true">←</span> All activities
        </Link>
        <div className="activity-content">
          <StoryGame />
        </div>
      </div>
    </main>
  );
}
