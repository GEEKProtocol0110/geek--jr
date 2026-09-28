"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CardPlayer from "@/modules/cards/CardPlayer";
import { DEFAULT_SETTINGS, loadSettings } from "@/lib/settings";

export default function CardsPage() {
  const [settings, setSettings] = useState<typeof DEFAULT_SETTINGS | null>(null);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setSettings(loadSettings()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main id="main-content" className="activity-page">
      <div className="mx-auto max-w-3xl">
        <Link href="/#activities" className="back-link">
          <span aria-hidden="true">←</span> All activities
        </Link>
        <div className="activity-content">
          {settings ? <CardPlayer ageTier={settings.ageTier} sessionSize={settings.sessionSize} /> : <p>Loading cards...</p>}
        </div>
      </div>
    </main>
  );
}
