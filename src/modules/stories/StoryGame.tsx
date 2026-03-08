"use client";

import TimedChoicesGame from "@/modules/common/TimedChoicesGame";
import { ChoicePrompt } from "@/modules/common/TimedChoicesGame";
import prompts from "@/data/stories/stories.json";

export default function StoryGame() {
  return (
    <TimedChoicesGame
      title="Story Sequence"
      storageKey="geekjr_stats_stories_v1"
      prompts={prompts as ChoicePrompt[]}
    />
  );
}
