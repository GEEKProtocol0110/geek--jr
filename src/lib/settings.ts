import { GeekJrSettings } from "@/lib/types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

export const SETTINGS_STORAGE_KEY = "geekjr_settings_v2";

export const DEFAULT_SETTINGS: GeekJrSettings = {
  sessionSize: 5,
  timeLimitSec: 120,
  ageTier: "5-7",
  christianPacks: false,
};

export function loadSettings(): GeekJrSettings {
  const loaded = loadFromStorage<GeekJrSettings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...loaded,
  };
}

export function saveSettings(settings: GeekJrSettings) {
  saveToStorage(SETTINGS_STORAGE_KEY, settings);
}
