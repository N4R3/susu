// Exam Sprint study structures for urgent subjects
// Programozás and Informatika II. (laborgyak) - Exam on 2026-05-09

import { ExamSprintSubject, StudySection } from "../types";

export const examSprintSubjects: ExamSprintSubject[] = [
  {
    subjectId: "bbxpr12blf",
    subjectName: "Programozás",
    examDate: "2026-05-09",
    status: "not_completed",
    studySections: [
      {
        id: "prog-basics",
        name: "Alapok",
        topics: [
          { id: "prog-basics-1", name: "Változók", completed: false },
          { id: "prog-basics-2", name: "Adattípusok", completed: false },
          { id: "prog-basics-3", name: "Operátorok", completed: false },
          { id: "prog-basics-4", name: "Input/Output", completed: false },
          { id: "prog-basics-5", name: "Feltételek", completed: false },
          { id: "prog-basics-6", name: "Ciklusok", completed: false },
        ],
      },
      {
        id: "prog-functions",
        name: "Függvények",
        topics: [
          { id: "prog-func-1", name: "Paraméter", completed: false },
          { id: "prog-func-2", name: "Visszatérési érték", completed: false },
          { id: "prog-func-3", name: "Lokális/globális változó", completed: false },
          { id: "prog-func-4", name: "Egyszerű algoritmusok", completed: false },
        ],
      },
      {
        id: "prog-datastruct",
        name: "Adatszerkezetek",
        topics: [
          { id: "prog-ds-1", name: "Tömb/Lista", completed: false },
          { id: "prog-ds-2", name: "Stringkezelés", completed: false },
          { id: "prog-ds-3", name: "Dictionary/Map (ha volt)", completed: false },
          { id: "prog-ds-4", name: "Fájlkezelés (ha volt)", completed: false },
        ],
      },
      {
        id: "prog-exam-tasks",
        name: "Tipikus vizsgafeladatok",
        topics: [
          { id: "prog-exam-1", name: "Számításos feladat", completed: false },
          { id: "prog-exam-2", name: "Feltételes logika", completed: false },
          { id: "prog-exam-3", name: "Ciklusos feladat", completed: false },
          { id: "prog-exam-4", name: "Lista feldolgozása", completed: false },
          { id: "prog-exam-5", name: "Hibakeresés", completed: false },
          { id: "prog-exam-6", name: "Kódkiegészítés", completed: false },
        ],
      },
      {
        id: "prog-practice",
        name: "Gyakorlás",
        topics: [
          { id: "prog-prac-1", name: "Rövid feladatok", completed: false },
          { id: "prog-prac-2", name: "Közepes feladatok", completed: false },
          { id: "prog-prac-3", name: "Vizsgaszimuláció", completed: false },
          { id: "prog-prac-4", name: "Megoldásellenőrzés", completed: false },
        ],
      },
    ],
  },
  {
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    examDate: "2026-05-09",
    status: "not_completed",
    studySections: [
      {
        id: "info-os",
        name: "Operációs rendszer / Fájlkezelés",
        topics: [
          { id: "info-os-1", name: "Mappák, fájlok", completed: false },
          { id: "info-os-2", name: "Jogosultságok", completed: false },
          { id: "info-os-3", name: "Parancsok", completed: false },
          { id: "info-os-4", name: "Tömörítés", completed: false },
          { id: "info-os-5", name: "Alap rendszerhasználat", completed: false },
        ],
      },
      {
        id: "info-office",
        name: "Irodai / Technikai eszközök",
        topics: [
          { id: "info-off-1", name: "Táblázatkezelés", completed: false },
          { id: "info-off-2", name: "Dokumentumszerkesztés", completed: false },
          { id: "info-off-3", name: "Prezentáció", completed: false },
          { id: "info-off-4", name: "Adatkezelési alapok", completed: false },
        ],
      },
      {
        id: "info-lab",
        name: "Laborfeladatok",
        topics: [
          { id: "info-lab-1", name: "Gyakorlati lépéssorok", completed: false },
          { id: "info-lab-2", name: "Beállítások", completed: false },
          { id: "info-lab-3", name: "Hibakeresés", completed: false },
          { id: "info-lab-4", name: "Exportálás / Mentés / Feltöltés", completed: false },
        ],
      },
      {
        id: "info-exam",
        name: "Tipikus vizsgafeladatok",
        topics: [
          { id: "info-exam-1", name: "Adott fájl átalakítása", completed: false },
          { id: "info-exam-2", name: "Táblázat képletezése", completed: false },
          { id: "info-exam-3", name: "Dokumentum formázása", completed: false },
          { id: "info-exam-4", name: "Alap informatikai művelet végrehajtása", completed: false },
          { id: "info-exam-5", name: "Screenshot / Beadás", completed: false },
        ],
      },
      {
        id: "info-checklist",
        name: "Ellenőrzőlista",
        topics: [
          { id: "info-check-1", name: "Minden fájl jó néven mentve?", completed: false },
          { id: "info-check-2", name: "Formátum jó?", completed: false },
          { id: "info-check-3", name: "Képlet működik?", completed: false },
          { id: "info-check-4", name: "Beadási mappa jó?", completed: false },
          { id: "info-check-5", name: "Nincs elfelejtett részfeladat?", completed: false },
        ],
      },
    ],
  },
];
