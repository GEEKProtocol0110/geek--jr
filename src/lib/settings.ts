import { GeekJrSettings } from "@/lib/types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

export const SETTINGS_STORAGE_KEY = "geekjr_settings_v2";

export const DEFAULT_SETTINGS: GeekJrSettings = {
  sessionSize: 5,
  timeLimitSec: 0,
  ageTier: "5-7",
  christianPacks: false,
};

export function loadSettings(): GeekJrSettings {
  const loaded = loadFromStorage<GeekJrSettings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    sessionSize: [3, 5, 10].includes(loaded?.sessionSize) ? loaded.sessionSize : DEFAULT_SETTINGS.sessionSize,
    timeLimitSec: [0, 60, 120, 180].includes(loaded?.timeLimitSec) ? loaded.timeLimitSec : DEFAULT_SETTINGS.timeLimitSec,
    ageTier: ["1-2", "3-4", "5-7", "8-10"].includes(loaded?.ageTier) ? loaded.ageTier : DEFAULT_SETTINGS.ageTier,
    christianPacks: loaded?.christianPacks === true,
  };
}

export function saveSettings(settings: GeekJrSettings) {
  saveToStorage(SETTINGS_STORAGE_KEY, settings);
}
