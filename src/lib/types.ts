export type AgeTier = "1-2" | "3-4" | "5-7" | "8-10";

export type SessionSize = 3 | 5 | 10;
export type TimeLimitSec = 60 | 120 | 180;

export interface GeekJrSettings {
  sessionSize: SessionSize;
  timeLimitSec: TimeLimitSec;
  ageTier: AgeTier;
  christianPacks: boolean;
}

export interface GameStats {
  totalAttempts: number;
  correctCount: number;
  bestStreak: number;
}

export type GameStatsByTier = Record<AgeTier, GameStats>;

export interface CardItem {
  id: string;
  tier: AgeTier;
  question: string;
  answer: string;
}

export interface PhonicsItem {
  id: string;
  tier: AgeTier;
  prompt: string;
  choices: string[];
  correct: string;
}

export interface MemoryItem {
  id: string;
  tier: AgeTier;
  prompt: string;
  choices: string[];
  correct: string;
}

export interface PatternItem {
  id: string;
  tier: AgeTier;
  prompt: string;
  choices: string[];
  correct: string;
}

export interface StoryItem {
  id: string;
  tier: AgeTier;
  prompt: string;
  choices: string[];
  correct: string;
}
