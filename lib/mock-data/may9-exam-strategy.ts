// May 9 Exam Strategy Data Model
// Coordinates Informatika II. as 70% primary focus and Programozás as 30% secondary review

export type May9StrategyBlock = {
  id: string;
  title: string;
  subjectId: string;
  focusWeight: number;
  priority: "primary" | "secondary";
  badges: string[];
  summary: string;
  quickLinks: { label: string; href: string }[];
  topTopics: string[];
  likelyTasks: string[];
  commonMistakes: string[];
};

export type SurvivalPathItem = {
  id: string;
  order: number;
  subjectId: string;
  title: string;
  why: string;
  link?: string;
};

export type TimeBoxPlan = {
  id: string;
  minutes: 30 | 60 | 120;
  title: string;
  steps: string[];
};

// Strategy blocks for Informatika II. and Programozás
export const may9StrategyBlocks: May9StrategyBlock[] = [
  {
    id: "may9-informatika2",
    title: "Informatika II.",
    subjectId: "bbxin2kblf",
    focusWeight: 70,
    priority: "primary",
    badges: ["FŐ FÓKUSZ", "NEHEZEBB", "SOC PROJEKT"],
    summary: "Windows SOC Analyst Tool – SOC pipeline, Template Engine, Parser + Detector, Report Generator",
    quickLinks: [
      { label: "SOC felkészülés", href: "/programozas/winsoc" },
      { label: "Gyorsismétlő", href: "/programozas/winsoc/gyorsismetlo" }
    ],
    topTopics: [
      "SOC pipeline megértése",
      "Template Engine",
      "Parser + Detector",
      "Report Generator",
      "Unit tests / integration test"
    ],
    likelyTasks: [
      "SOC pipeline implementálása",
      "Template Engine használata",
      "Parser + Detector integráció",
      "Report generálás",
      "Unit tesztek írása"
    ],
    commonMistakes: [
      "Pipeline sorrend keverése",
      "Template szintaxis hiba",
      "Parser output nem megfelelő",
      "Report formátum hiba",
      "Tesztek nem fedik le az edge case-eket"
    ]
  },
  {
    id: "may9-programozas",
    title: "Programozás",
    subjectId: "bbxpr12blf",
    focusWeight: 30,
    priority: "secondary",
    badges: ["ALAPOZÓ", "AI HASZNÁLHATÓ", "PROJECT SENTINEL"],
    summary: "Project Sentinel – Secret Database CLI Tool: string normalizálás, bcrypt ellenőrzés, CLI argumentumok, unit tesztek",
    quickLinks: [
      { label: "Programozás vizsgafókusz", href: "/subjects/bbxpr12blf/study" },
      { label: "Programozás HUB", href: "/programozas" }
    ],
    topTopics: [
      "String normalization",
      "Sets for O(1) lookup",
      "File I/O and streaming",
      "Argparse",
      "Bcrypt",
      "Environment variables",
      "Unittest"
    ],
    likelyTasks: [
      "normalize_string függvény írása",
      "Set alapú adatbázis betöltése",
      "Fájl soronkénti olvasása",
      "CLI argumentumok parszolása",
      "Bcrypt hash ellenőrzés",
      "Unit tesztek írása"
    ],
    commonMistakes: [
      "None érték nem kezelése",
      "Set helyett list használata",
      "Fájl nem záródik le",
      "Argparse kötelező argumentumok nincsenek megadva",
      "Bcrypt cost faktor túl magas",
      "PEPPER környezeti változó hiányzik",
      "Unit tesztek nem mockolják a függőségeket"
    ]
  }
];

// Combined survival path for both exams
export const may9SurvivalPath: SurvivalPathItem[] = [
  {
    id: "survival-1",
    order: 1,
    subjectId: "bbxin2kblf",
    title: "Informatika II.: SOC pipeline megértése",
    why: "A SOC pipeline az alapja az egész projektnek, minden ezen múlik",
    link: "/programozas/winsoc"
  },
  {
    id: "survival-2",
    order: 2,
    subjectId: "bbxin2kblf",
    title: "Informatika II.: Template Engine",
    why: "Template Engine használata kritikus a report generáláshoz",
    link: "/programozas/winsoc"
  },
  {
    id: "survival-3",
    order: 3,
    subjectId: "bbxin2kblf",
    title: "Informatika II.: Parser + Detector",
    why: "Parser + Detector integráció a legbonyolultabb rész",
    link: "/programozas/winsoc"
  },
  {
    id: "survival-4",
    order: 4,
    subjectId: "bbxin2kblf",
    title: "Informatika II.: Report Generator",
    why: "Report Generator a végső output, kritikus a formátum",
    link: "/programozas/winsoc"
  },
  {
    id: "survival-5",
    order: 5,
    subjectId: "bbxin2kblf",
    title: "Informatika II.: Unit tests / integration test",
    why: "Unit tesztek bizonyítják a működést, gyakran követelmény",
    link: "/programozas/winsoc"
  },
  {
    id: "survival-6",
    order: 6,
    subjectId: "bbxpr12blf",
    title: "Programozás: string normalization",
    why: "String normalizálás alapvető a Project Sentinelben",
    link: "/subjects/bbxpr12blf/study"
  },
  {
    id: "survival-7",
    order: 7,
    subjectId: "bbxpr12blf",
    title: "Programozás: sets + file I/O",
    why: "Set alapú adatbázis és fájl olvasás a leggyakoribb minta",
    link: "/subjects/bbxpr12blf/study"
  },
  {
    id: "survival-8",
    order: 8,
    subjectId: "bbxpr12blf",
    title: "Programozás: argparse + environment variables",
    why: "CLI argumentumok és PEPPER környezeti változó szükséges",
    link: "/subjects/bbxpr12blf/study"
  },
  {
    id: "survival-9",
    order: 9,
    subjectId: "bbxpr12blf",
    title: "Programozás: bcrypt",
    why: "Bcrypt ellenőrzés a Project Sentinel kulcs funkciója",
    link: "/subjects/bbxpr12blf/study"
  },
  {
    id: "survival-10",
    order: 10,
    subjectId: "bbxpr12blf",
    title: "Programozás: unittest",
    why: "Unit tesztek bizonyítják a működést, gyakran követelmény",
    link: "/subjects/bbxpr12blf/study"
  }
];

// Time-boxed study plans
export const may9TimeBoxPlans: TimeBoxPlan[] = [
  {
    id: "timebox-30",
    minutes: 30,
    title: "30 perc terv",
    steps: [
      "Informatika II. gyorsismétlő megnyitása (/programozas/winsoc/gyorsismetlo)",
      "SOC pipeline áttekintése (5 perc)",
      "Template Engine kulcs fogalmak (5 perc)",
      "Programozás critical topics átfutása (5 perc)",
      "String normalization és sets gyors áttekintése (5 perc)",
      "Gyorsismétlő utolsó pillanatos átnézése (10 perc)"
    ]
  },
  {
    id: "timebox-60",
    minutes: 60,
    title: "60 perc terv",
    steps: [
      "Informatika II. quick review megnyitása (/programozas/winsoc/gyorsismetlo)",
      "SOC pipeline részletes áttekintése (10 perc)",
      "Template Engine és Parser + Detector áttekintése (15 perc)",
      "2 SOC gyakorlati feladat megoldása (15 perc)",
      "Programozás critical topics áttekintése (10 perc)",
      "2 Programozás gyakorlati feladat megoldása (10 perc)"
    ]
  },
  {
    id: "timebox-120",
    minutes: 120,
    title: "120 perc terv",
    steps: [
      "Informatika II. quick review teljes áttekintése (15 perc)",
      "SOC critical modules áttekintése (20 perc)",
      "3 SOC gyakorlati feladat megoldása (25 perc)",
      "Programozás minimum path áttekintése (15 perc)",
      "3 Project Sentinel gyakorlati feladat megoldása (25 perc)",
      "Kritikus témák és gyakori hibák átnézése (20 perc)",
      "Gyorsismétlő utolsó átnézése (10 perc)"
    ]
  }
];

// Quick review links
export const may9QuickLinks = [
  { label: "Informatika II. gyorsismétlő", href: "/programozas/winsoc/gyorsismetlo", subject: "bbxin2kblf" },
  { label: "SOC részletes felkészülés", href: "/programozas/winsoc", subject: "bbxin2kblf" },
  { label: "Programozás vizsgafókusz", href: "/subjects/bbxpr12blf/study", subject: "bbxpr12blf" },
  { label: "Programozás HUB", href: "/programozas", subject: "bbxpr12blf" },
  { label: "Informatika II. subject page", href: "/subjects/bbxin2kblf/study", subject: "bbxin2kblf" }
];
