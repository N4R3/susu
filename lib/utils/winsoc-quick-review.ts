// Helper functions for Informatika II. Quick Review

import {
  winsocQuickReviewCards,
  winsocCheatSheetSections,
  winsocLastMinuteChecklist,
  type WinsocQuickReviewCard,
  type WinsocCheatSheetSection
} from "@/lib/mock-data/winsoc-quick-review";

// Get all quick review cards
export function getWinsocQuickReviewCards(): WinsocQuickReviewCard[] {
  return winsocQuickReviewCards;
}

// Get quick review card by module ID
export function getWinsocQuickReviewCard(moduleId: string): WinsocQuickReviewCard | undefined {
  return winsocQuickReviewCards.find((card) => card.moduleId === moduleId);
}

// Get quick review card by card ID
export function getWinsocQuickReviewCardById(id: string): WinsocQuickReviewCard | undefined {
  return winsocQuickReviewCards.find((card) => card.id === id);
}

// Get all cheat sheet sections
export function getWinsocCheatSheetSections(): WinsocCheatSheetSection[] {
  return winsocCheatSheetSections;
}

// Get critical cheat sheet sections
export function getCriticalCheatSheetSections(): WinsocCheatSheetSection[] {
  return winsocCheatSheetSections.filter((section) => section.priority === "critical");
}

// Get cheat sheet section by ID
export function getWinsocCheatSheetSection(id: string): WinsocCheatSheetSection | undefined {
  return winsocCheatSheetSections.find((section) => section.id === id);
}

// Get last minute checklist
export function getLastMinuteChecklist(): string[] {
  return winsocLastMinuteChecklist;
}

// Get quick review cards by priority (based on module priority from readiness data)
export function getWinsocQuickReviewCardsByPriority(): {
  critical: WinsocQuickReviewCard[];
  high: WinsocQuickReviewCard[];
  medium: WinsocQuickReviewCard[];
} {
  const criticalModules = ["template-engine", "windows-log-parser", "anomaly-detector", "integrity-checker"];
  const highModules = ["mock-log-generator", "report-generator", "main-application", "unit-tests"];
  const mediumModules = ["cli", "integration-test"];

  return {
    critical: winsocQuickReviewCards.filter((card) => criticalModules.includes(card.moduleId)),
    high: winsocQuickReviewCards.filter((card) => highModules.includes(card.moduleId)),
    medium: winsocQuickReviewCards.filter((card) => mediumModules.includes(card.moduleId))
  };
}
