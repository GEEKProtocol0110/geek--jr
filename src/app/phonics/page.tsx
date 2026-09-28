import Link from "next/link";
import PhonicsGame from "@/modules/phonics/PhonicsGame";

export default function PhonicsPage() {
  return (
    <main id="main-content" className="activity-page">
      <div className="mx-auto max-w-3xl">
        <Link href="/#activities" className="back-link">
          <span aria-hidden="true">←</span> All activities
        </Link>
        <div className="activity-content">
          <PhonicsGame />
        </div>
      </div>
    </main>
  );
}
