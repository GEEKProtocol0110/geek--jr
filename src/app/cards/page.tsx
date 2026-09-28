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
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
          Back to hub
        </Link>
        <div className="mt-4">
          {settings ? <CardPlayer ageTier={settings.ageTier} sessionSize={settings.sessionSize} /> : <p>Loading cards...</p>}
        </div>
      </div>
    </main>
  );
}
