// @ts-nocheck - Supabase type inference issues with update/insert methods
import { createSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

// Get Clerk user ID from client-side Clerk auth
export function getClerkUserId(): string | null {
  if (typeof window !== "undefined" && (window as any).Clerk) {
    try {
      const clerk = (window as any).Clerk;
      if (clerk.user) {
        return clerk.user.id;
      }
    } catch (error) {
      console.error("Error getting Clerk user ID:", error);
    }
  }
  return null;
}

// Sync local progress to Supabase
export async function syncLocalProgressToSupabase(localProgress: any, clerkUserId?: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  const supabase = createSupabaseClient();
  if (!supabase) {
    return false;
  }

  const userId = clerkUserId || getClerkUserId();
  if (!userId) {
    console.error("No Clerk user ID available for sync");
    return false;
  }

  try {
    // Sync each progress item
    const syncPromises = [];

    // Sync completed lessons
    if (localProgress.completedLessons) {
      for (const lessonId of localProgress.completedLessons) {
        syncPromises.push(
          saveProgressItem("lessons", lessonId, "completed", { timestamp: new Date().toISOString() }, userId)
        );
      }
    }

    // Sync completed practice questions
    if (localProgress.completedPracticeQuestions) {
      for (const questionId of localProgress.completedPracticeQuestions) {
        syncPromises.push(
          saveProgressItem("practice", questionId, "completed", { timestamp: new Date().toISOString() }, userId)
        );
      }
    }

    // Sync completed checklist items
    if (localProgress.completedChecklistItems) {
      for (const itemId of localProgress.completedChecklistItems) {
        syncPromises.push(
          saveProgressItem("checklist", itemId, "completed", { timestamp: new Date().toISOString() }, userId)
        );
      }
    }

    // Sync completed quick review cards
    if (localProgress.completedQuickReviewCards) {
      for (const cardId of localProgress.completedQuickReviewCards) {
        syncPromises.push(
          saveProgressItem("quickReview", cardId, "completed", { timestamp: new Date().toISOString() }, userId)
        );
      }
    }

    await Promise.all(syncPromises);
    return true;
  } catch (error) {
    console.error("Error syncing progress to Supabase:", error);
    return false;
  }
}

// Load progress from Supabase
export async function loadProgressFromSupabase(clerkUserId?: string): Promise<any | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = createSupabaseClient();
  if (!supabase) {
    return null;
  }

  const userId = clerkUserId || getClerkUserId();
  if (!userId) {
    console.error("No Clerk user ID available for loading progress");
    return null;
  }

  try {
    const { data: progressData, error } = await supabase
      .from("study_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading progress from Supabase:", error);
      return null;
    }

    // Convert Supabase data to local progress format
    const localProgress: any = {
      completedLessons: [],
      completedPracticeQuestions: [],
      completedChecklistItems: [],
      completedQuickReviewCards: [],
    };

    for (const row of (progressData as any[]) || []) {
      if (row.scope === "lessons" && row.status === "completed") {
        localProgress.completedLessons.push(row.item_id);
      } else if (row.scope === "practice" && row.status === "completed") {
        localProgress.completedPracticeQuestions.push(row.item_id);
      } else if (row.scope === "checklist" && row.status === "completed") {
        localProgress.completedChecklistItems.push(row.item_id);
      } else if (row.scope === "quickReview" && row.status === "completed") {
        localProgress.completedQuickReviewCards.push(row.item_id);
      }
    }

    return localProgress;
  } catch (error) {
    console.error("Error loading progress from Supabase:", error);
    return null;
  }
}

// Save a single progress item to Supabase
export async function saveProgressItem(
  scope: string,
  itemId: string,
  status: string,
  metadata: Record<string, any> = {},
  clerkUserId?: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  const supabase = createSupabaseClient();
  if (!supabase) {
    return false;
  }

  const userId = clerkUserId || getClerkUserId();
  if (!userId) {
    console.error("No Clerk user ID available for saving progress");
    return false;
  }

  try {
    // Check if record exists first, then upsert
    const { data: existing } = await supabase
      .from("study_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("scope", scope)
      .eq("item_id", itemId)
      .single();

    let error;
    if (existing) {
      const updateData = {
        status,
        metadata,
        updated_at: new Date().toISOString(),
      };
      const result = await supabase
        .from("study_progress")
        .update(updateData)
        .eq("user_id", userId)
        .eq("scope", scope)
        .eq("item_id", itemId);
      error = (result as any).error;
    } else {
      const insertData = {
        user_id: userId,
        scope,
        item_id: itemId,
        status,
        metadata,
        updated_at: new Date().toISOString(),
      };
      const result = await supabase
        .from("study_progress")
        .insert(insertData);
      error = (result as any).error;
    }

    if (error) {
      console.error("Error saving progress item:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving progress item:", error);
    return false;
  }
}

// Save practice exam attempt to Supabase
export async function savePracticeExamAttempt(
  examId: string,
  result: {
    scorePercent: number;
    achievedPoints: number;
    totalPoints: number;
    answers: Record<string, any>;
  },
  clerkUserId?: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  const supabase = createSupabaseClient();
  if (!supabase) {
    return false;
  }

  const userId = clerkUserId || getClerkUserId();
  if (!userId) {
    console.error("No Clerk user ID available for saving practice exam attempt");
    return false;
  }

  try {
    const insertData = {
      user_id: userId,
      exam_id: examId,
      score_percent: result.scorePercent,
      achieved_points: result.achievedPoints,
      total_points: result.totalPoints,
      answers: result.answers,
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("practice_exam_attempts")
      .insert(insertData);

    if (error) {
      console.error("Error saving practice exam attempt:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving practice exam attempt:", error);
    return false;
  }
}

// Merge local and remote progress states
export function mergeProgressStates(local: any, remote: any): any {
  if (!remote) {
    return local;
  }

  const merged: any = {
    completedLessons: [...new Set([...(local.completedLessons || []), ...(remote.completedLessons || [])])],
    completedPracticeQuestions: [...new Set([...(local.completedPracticeQuestions || []), ...(remote.completedPracticeQuestions || [])])],
    completedChecklistItems: [...new Set([...(local.completedChecklistItems || []), ...(remote.completedChecklistItems || [])])],
    completedQuickReviewCards: [...new Set([...(local.completedQuickReviewCards || []), ...(remote.completedQuickReviewCards || [])])],
  };

  return merged;
}

// Get sync status for UI
export function getSyncStatus(): "local" | "cloud" | "syncing" | "offline" {
  if (!isSupabaseConfigured()) {
    return "local";
  }
  
  // In a real implementation, this would check actual sync state
  // For now, return "cloud" if Supabase is configured
  return "cloud";
}
