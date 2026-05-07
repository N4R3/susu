import { Deadline, DeadlineGroup } from "../types";

// Find urgent deadlines within 7 days
export function findUrgentDeadlines(deadlines: Deadline[]): Deadline[] {
  const today = new Date();
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  return deadlines.filter((deadline) => {
    const deadlineDate = new Date(deadline.firstDeadline);
    return (
      !deadline.isDone &&
      deadline.priority === "urgent" &&
      deadlineDate <= sevenDaysFromNow
    );
  });
}

// Group deadlines into categories
export function groupDeadlines(deadlines: Deadline[]): Record<DeadlineGroup, Deadline[]> {
  const today = new Date();
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const groups: Record<DeadlineGroup, Deadline[]> = {
    urgent: [],
    completedAwaitingGrade: [],
    closed: [],
    upcoming: [],
  };

  deadlines.forEach((deadline) => {
    const deadlineDate = new Date(deadline.firstDeadline);

    if (!deadline.isDone && deadline.priority === "urgent" && deadlineDate <= sevenDaysFromNow) {
      groups.urgent.push(deadline);
    } else if (deadline.isDone && !deadline.gradeReceived && !deadline.noMoreActionNeeded) {
      groups.completedAwaitingGrade.push(deadline);
    } else if (deadline.isDone && deadline.noMoreActionNeeded) {
      groups.closed.push(deadline);
    } else if (!deadline.isDone && deadlineDate > sevenDaysFromNow) {
      groups.upcoming.push(deadline);
    } else {
      groups.upcoming.push(deadline);
    }
  });

  return groups;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get days until deadline
export function getDaysUntilDeadline(dateString: string): number {
  const today = new Date();
  const deadlineDate = new Date(dateString);
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
