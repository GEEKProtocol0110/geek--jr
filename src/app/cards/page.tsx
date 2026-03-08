"use client";

import Link from "next/link";
import { useMemo } from "react";
import CardPlayer from "@/modules/cards/CardPlayer";
import { loadSettings } from "@/lib/settings";

export default function CardsPage() {
  const settings = useMemo(() => loadSettings(), []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
          Back to hub
        </Link>
        <div className="mt-4">
          <CardPlayer ageTier={settings.ageTier} sessionSize={settings.sessionSize} />
        </div>
      </div>
    </main>
  );
}
