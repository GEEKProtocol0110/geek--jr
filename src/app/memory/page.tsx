import Link from "next/link";
import MemoryGame from "@/modules/memory/MemoryGame";

export default function MemoryPage() {
  return (
    <main id="main-content" className="activity-page">
      <div className="mx-auto max-w-3xl">
        <Link href="/#activities" className="back-link">
          <span aria-hidden="true">←</span> All activities
        </Link>
        <div className="activity-content">
          <MemoryGame />
        </div>
      </div>
    </main>
  );
}
