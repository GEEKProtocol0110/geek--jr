import type { AgeTier } from "./types";
import type { WordCard } from "./firstWords";

export const WORD_LESSONS = [
  { id: "play", title: "Let's play", description: "Roll, drive, and share a book.", words: ["obj-ball", "obj-car", "obj-book"] },
  { id: "everyday", title: "Around our home", description: "Name things you use together.", words: ["obj-cup", "obj-shoe", "obj-bed"] },
  { id: "animals", title: "Animals & people", description: "Notice a dog, a cat, and a baby.", words: ["obj-dog", "obj-cat", "family-baby"] },
  { id: "food", title: "At the table", description: "Look, name, and talk about food.", words: ["food-apple", "food-banana", "food-bread"] },
  { id: "snack", title: "More food words", description: "Use familiar words at mealtimes.", words: ["food-milk", "food-egg", "food-cheese"] },
  { id: "body", title: "Head to toes", description: "Point and name together.", words: ["body-head", "body-eyes", "body-nose", "body-mouth", "body-ears"] },
] as const;

// These concrete words have purpose-made illustrations. Other words remain in the full deck.
export const PICTURE_WORD_IDS = new Set<string>(WORD_LESSONS.flatMap((lesson) => [...lesson.words]));

export function wordPool(cards: WordCard[], tier: AgeTier, lesson?: string, category?: string): WordCard[] {
  const selectedLesson = WORD_LESSONS.find((item) => item.id === lesson);
  if (selectedLesson) return selectedLesson.words.flatMap((id) => cards.filter((card) => card.id === id));
  // Explicit parent selections can explore the full deck; the toddler default stays concrete.
  if (category) return cards.filter((card) => card.category === category);
  return tier === "1-2" ? cards.filter((card) => PICTURE_WORD_IDS.has(card.id)) : cards;
}

export function togetherPrompt(card: WordCard): string {
  const prompts: Record<string, string> = {
    "obj-ball": "Show a real ball. Say ‘ball’ and roll it together. Pause for a look, gesture, or sound.",
    "obj-car": "Show a toy car or point to a parked car. Say ‘car.’ Move the toy and say ‘car goes!’",
    "obj-book": "Hold a book. Say ‘book.’ Let your child point, touch, or help turn a page.",
    "obj-cup": "Show your child's cup. Say ‘cup.’ Ask ‘Where is the cup?’ and wait before helping.",
    "obj-shoe": "Hold a shoe. Say ‘shoe.’ Point to your shoe and your child's shoe.",
    "obj-bed": "Point to a bed. Say ‘bed.’ Use the word again during the bedtime routine.",
    "obj-dog": "Point to a dog in a book or nearby. Say ‘dog.’ Respond to your child's gesture or sound.",
    "obj-cat": "Find a cat in a book. Say ‘cat.’ Try a gentle ‘meow’ and pause for a response.",
    "family-baby": "Point to a baby in a family photo or book. Say ‘baby.’ Talk about what the baby is doing.",
    "food-apple": "Show an apple or a photo. Say ‘apple.’ Look at its color and shape together.",
    "food-banana": "Show a banana or a photo. Say ‘banana.’ Let your child point while you name it.",
    "food-bread": "Show bread at the table. Say ‘bread.’ Use the word in a short phrase: ‘Here is bread.’",
    "food-milk": "Point to milk in its usual container. Say ‘milk.’ Respond to requests with a short phrase.",
    "food-egg": "Show an egg or a picture. Say ‘egg.’ Name it again when preparing a meal together.",
    "food-cheese": "Point to cheese or a picture. Say ‘cheese.’ Pause before naming it again.",
    "body-head": "Point to your head, then your child's head. Say ‘head.’ Invite pointing without pressure.",
    "body-eyes": "Point near your own eyes. Say ‘eyes.’ Ask ‘Where are your eyes?’ and wait.",
    "body-nose": "Point to your nose. Say ‘nose.’ Try finding a nose in a picture book too.",
    "body-mouth": "Point to your mouth. Say ‘mouth.’ Watch how your mouth moves as you talk.",
    "body-ears": "Point to your ears. Say ‘ears.’ Name them again while singing together.",
  };
  return prompts[card.id] ?? card.prompt;
}
