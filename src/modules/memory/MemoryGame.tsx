"use client";

import TimedChoicesGame from "@/modules/common/TimedChoicesGame";
import { ChoicePrompt } from "@/modules/common/TimedChoicesGame";
import prompts from "@/data/memory/pairs.json";

export default function MemoryGame() {
  return (
    <TimedChoicesGame
      title="Memory Match"
      storageKey="geekjr_stats_memory_v1"
      prompts={prompts as ChoicePrompt[]}
    />
  );
}
