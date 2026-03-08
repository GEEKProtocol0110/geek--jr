"use client";

import TimedChoicesGame from "@/modules/common/TimedChoicesGame";
import { ChoicePrompt } from "@/modules/common/TimedChoicesGame";
import prompts from "@/data/patterns/patterns.json";

export default function PatternGame() {
  return (
    <TimedChoicesGame
      title="Patterns & Logic"
      storageKey="geekjr_stats_patterns_v1"
      prompts={prompts as ChoicePrompt[]}
    />
  );
}
