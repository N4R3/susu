export type CompletedSubjectResult = {
  id: string;
  name: string;
  code: string;
  credit: number;
  type: string;
  resultText: string;
  numericGrade: number | null;
  completed: boolean;
  includeInAverage: boolean;
};

export type SemesterResult = {
  semesterId: string;
  name: string;
  credits: number;
  enrolledCredits: number;
  completedCredits: number;
  weightedAverage: number;
  cumulativeWeightedAverage: number;
  subjects: CompletedSubjectResult[];
};

export const semesterResults: SemesterResult[] = [
  {
    semesterId: "2025-26-1",
    name: "2025/26/1",
    credits: 30,
    enrolledCredits: 30,
    completedCredits: 30,
    weightedAverage: 4.13,
    cumulativeWeightedAverage: 4.13,
    subjects: [
      {
        id: "bt-fizika",
        name: "Mérnöki fizika (természettudományi alapok)",
        code: "BTXFZ11BLF",
        credit: 4,
        type: "Kötelező törzsanyag",
        resultText: "Elégséges",
        numericGrade: 2,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bk-hirkozl",
        name: "Hírközléstechnika",
        code: "BBXHZ11BLF",
        credit: 4,
        type: "Kötelező törzsanyag",
        resultText: "Jó",
        numericGrade: 4,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bt-patronal",
        name: "Patronálás",
        code: "BTIPAT1BLF",
        credit: 0,
        type: "Kötelező törzsanyag",
        resultText: "Aláírva",
        numericGrade: null,
        completed: true,
        includeInAverage: false,
      },
      {
        id: "bk-info1",
        name: "Informatika I.",
        code: "BBXIN1KBLF",
        credit: 5,
        type: "Kötelező törzsanyag",
        resultText: "Közepes",
        numericGrade: 3,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bt-gazdasag",
        name: "Gazdálkodási és vállalkozási (Startup) ismeretek",
        code: "BTXGV11BLF",
        credit: 4,
        type: "Kötelező törzsanyag",
        resultText: "Jeles",
        numericGrade: 5,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bk-elektro",
        name: "Elektrotechnika, digitális technika",
        code: "BBXED11BLF",
        credit: 5,
        type: "Kötelező törzsanyag",
        resultText: "Jeles",
        numericGrade: 5,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bk-projekt",
        name: "Projektfeladat",
        code: "BBPPF11BLF",
        credit: 2,
        type: "Kötelező törzsanyag",
        resultText: "Jeles",
        numericGrade: 5,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "ot-testneveles",
        name: "Testnevelés I.",
        code: "OTTESI1BLF",
        credit: 1,
        type: "Kötelező törzsanyag",
        resultText: "Kiválóan megfelelt",
        numericGrade: 5,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bt-jog",
        name: "Információbiztonság jogi- és humán aspektusai",
        code: "BTXJH11BLF",
        credit: 3,
        type: "Kötelező törzsanyag",
        resultText: "Jeles",
        numericGrade: 5,
        completed: true,
        includeInAverage: true,
      },
      {
        id: "bt-tanulastechnika",
        name: "Tanulástechnika és tutorálás",
        code: "BTXTU11BLF",
        credit: 2,
        type: "Kötelező törzsanyag",
        resultText: "Jeles",
        numericGrade: 5,
        completed: true,
        includeInAverage: true,
      },
    ],
  },
];

export const gradeMapping: Record<string, number | null> = {
  "Elégtelen": 1,
  "Elégséges": 2,
  "Közepes": 3,
  "Jó": 4,
  "Jeles": 5,
  "Aláírva": null,
  "Megfelelt": null,
  "Kiválóan megfelelt": 5,
};

export function getNumericGrade(resultText: string): number | null {
  return gradeMapping[resultText] || null;
}
