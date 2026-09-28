import Link from "next/link";
import PatternGame from "@/modules/patterns/PatternGame";

export default function PatternsPage() {
  return (
    <main id="main-content" className="activity-page">
      <div className="mx-auto max-w-3xl">
        <Link href="/#activities" className="back-link">
          <span aria-hidden="true">←</span> All activities
        </Link>
        <div className="activity-content">
          <PatternGame />
        </div>
      </div>
    </main>
  );
}
