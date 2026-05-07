import { CalendarEvent } from "../types";

// All events use semesterId "2025-26-2" — the current semester
export const events: CalendarEvent[] = [
  // Programozás vizsga — 2026-05-09 (Saturday)
  {
    id: "evt-prog-vizsga",
    subjectId: "bbxpr12blf",
    semesterId: "2025-26-2",
    title: "Programozás – Vizsga",
    type: "exam",
    start: "2026-05-09T09:00:00",
    end: "2026-05-09T11:00:00",
    location: "TBA",
    isOnline: false,
  },
  // Informatika II. vizsga — 2026-05-09 (Saturday)
  {
    id: "evt-info2-vizsga",
    subjectId: "bbxin2kblf",
    semesterId: "2025-26-2",
    title: "Informatika II. – Laborvizsga",
    type: "exam",
    start: "2026-05-09T11:30:00",
    end: "2026-05-09T13:30:00",
    location: "Labor",
    isOnline: false,
  },
  // Matematika I. vizsga — 2026-05-23 (Saturday)
  {
    id: "evt-matek-vizsga",
    subjectId: "btxmak2blf",
    semesterId: "2025-26-2",
    title: "Matematika I. – Vizsga",
    type: "exam",
    start: "2026-05-23T09:00:00",
    end: "2026-05-23T11:00:00",
    location: "TBA",
    isOnline: false,
  },
  // Hálózatok vizsga — 2026-05-23 (Saturday)
  {
    id: "evt-halozat-vizsga",
    subjectId: "bbxvn12blf",
    semesterId: "2025-26-2",
    title: "Hálózatok – Vizsga",
    type: "exam",
    start: "2026-05-23T12:00:00",
    end: "2026-05-23T14:00:00",
    location: "TBA",
    isOnline: false,
  },
  // Testnevelés II. alkalom — 2026-05-23 (Saturday)
  {
    id: "evt-tesó-alkalom",
    subjectId: "ottesi2blf",
    semesterId: "2025-26-2",
    title: "Testnevelés II. – Alkalom",
    type: "class",
    start: "2026-05-23T08:00:00",
    end: "2026-05-23T09:30:00",
    location: "Sportpálya",
    isOnline: false,
  },
  // Tanulásmódszertan — deadline már elmúlt (2026-05-04), lezárva
  {
    id: "evt-tanulas-deadline",
    subjectId: "btxtn12blf",
    semesterId: "2025-26-2",
    title: "Tanulásmódszertan – Online határidő",
    type: "assignment_deadline",
    start: "2026-05-04T23:59:00",
    isOnline: true,
  },
  // Dokumentumvédelem beadandó — leadva
  {
    id: "evt-dokved-beadando",
    subjectId: "bbxdv12blf",
    semesterId: "2025-26-2",
    title: "Dokumentumvédelem – Beadandó (leadva)",
    type: "assignment_deadline",
    start: "2026-03-20T23:59:00",
    isOnline: true,
  },
  // Adatvédelem beadandó — leadva
  {
    id: "evt-adatved-beadando",
    subjectId: "bbxvd12blf",
    semesterId: "2025-26-2",
    title: "Adatvédelem – Beadandó (leadva)",
    type: "assignment_deadline",
    start: "2026-04-14T23:59:00",
    isOnline: true,
  },
];
