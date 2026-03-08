"use client";

import TimedChoicesGame from "@/modules/common/TimedChoicesGame";
import { ChoicePrompt } from "@/modules/common/TimedChoicesGame";
import prompts from "@/data/phonics/sounds.json";

export default function PhonicsGame() {
  return (
    <TimedChoicesGame
      title="Phonics Tap"
      storageKey="geekjr_stats_phonics_v1"
      prompts={prompts as ChoicePrompt[]}
    />
  );
}
