// Curriculum data for BBLFKM - Kiberbiztonsági mérnöki
// Extracted from curriculum image, with current semester BLF codes as authoritative

export const curriculumSemesters = [
  {
    semesterNumber: 1,
    name: "1. félév",
    subjects: [
      { id: "inf-1", name: "Informatika I.", code: null, isRequired: true, isCompleted: false },
      { id: "hirkoz", name: "Hírközléstechnika", code: null, isRequired: true, isCompleted: false },
      { id: "gazdasag", name: "Gazdasági és vállalkozási ismeretek / Startup ismeretek", code: null, isRequired: true, isCompleted: false },
      { id: "fizika", name: "Mérnöki fizika", code: null, isRequired: true, isCompleted: false },
      { id: "info-jog", name: "Információbiztonság jogi- és humán aspektusai", code: null, isRequired: true, isCompleted: false },
      { id: "tanulastech", name: "Tanulástechnika és tutorálás", code: null, isRequired: true, isCompleted: false },
      { id: "elektro", name: "Elektrotechnika, digitális technika", code: null, isRequired: true, isCompleted: false },
      { id: "testneveles-1", name: "Testnevelés I.", code: null, isRequired: true, isCompleted: false },
      { id: "patronalas", name: "Patronálás", code: null, isRequired: true, isCompleted: false },
      { id: "projekt-1", name: "Projektfeladat", code: null, isRequired: true, isCompleted: false },
    ],
  },
  {
    semesterNumber: 2,
    name: "2. félév",
    isCurrent: true,
    subjects: [
      { id: "btxmak2blf", name: "Matematika I.", code: "BTXMAK2BLF", isRequired: true, isCompleted: false },
      { id: "bbxin2kblf", name: "Informatika II. (laborgyak)", code: "BBXIN2KBLF", isRequired: true, isCompleted: false },
      { id: "bbxpr12blf", name: "Programozás", code: "BBXPR12BLF", isRequired: true, isCompleted: false },
      { id: "bbxvd12blf", name: "Adatvédelem, adatbiztonság", code: "BBXVD12BLF", isRequired: true, isCompleted: false },
      { id: "bbxdv12blf", name: "Dokumentumvédelem és adminisztratív biztonság", code: "BBXDV12BLF", isRequired: true, isCompleted: false },
      { id: "bbxvn12blf", name: "Vezetékes és vezeték nélküli hálózatok", code: "BBXVN12BLF", isRequired: true, isCompleted: false },
      { id: "ottesi2blf", name: "Testnevelés II.", code: "OTTESI2BLF", isRequired: true, isCompleted: false },
    ],
  },
  {
    semesterNumber: 3,
    name: "3. félév",
    subjects: [
      { id: "matek-2", name: "Matematika II.", code: null, isRequired: true, isCompleted: false },
      { id: "kiber-alap", name: "Kiberbiztonság alapjai, szabványai", code: null, isRequired: true, isCompleted: false },
      { id: "elek-info", name: "Elektronikus információbiztonsági ismeretek", code: null, isRequired: true, isCompleted: false },
      { id: "kockazat", name: "Információbiztonsági kockázatok kezelése", code: null, isRequired: true, isCompleted: false },
      { id: "projekt-2", name: "Projektfeladat II.", code: null, isRequired: true, isCompleted: false },
      { id: "kiber-epit", name: "Kiberbiztonság kiépítése", code: null, isRequired: true, isCompleted: false },
      { id: "ik-mobil", name: "Infokommunikációs rendszerek, mobil kommunikáció", code: null, isRequired: true, isCompleted: false },
      { id: "testneveles-3", name: "Testnevelés III.", code: null, isRequired: true, isCompleted: false },
    ],
  },
  {
    semesterNumber: 4,
    name: "4. félév",
    subjects: [
      { id: "projekt-mgmt", name: "Projektmunka és menedzsment alapjai", code: null, isRequired: true, isCompleted: false },
      { id: "ik-halo", name: "Infokommunikációs technológiák, hálózatbiztonság", code: null, isRequired: true, isCompleted: false },
      { id: "os-db", name: "Operációs rendszerek és adatbázis tervezés", code: null, isRequired: true, isCompleted: false },
      { id: "arch- alap", name: "Számítógépes architektúrák alapjai", code: null, isRequired: true, isCompleted: false },
      { id: "szabad-1", name: "Szabadon választható I.", code: null, isRequired: false, isCompleted: false },
      { id: "kiber-meres", name: "Kiberbiztonsági mérések", code: null, isRequired: true, isCompleted: false },
      { id: "tavkozlo", name: "Távközlési informatika", code: null, isRequired: true, isCompleted: false },
      { id: "testneveles-4", name: "Testnevelés IV.", code: null, isRequired: true, isCompleted: false },
    ],
  },
  {
    semesterNumber: 5,
    name: "5. félév",
    subjects: [
      { id: "ibir", name: "Információbiztonsági irányítási rendszerek / IBIR", code: null, isRequired: true, isCompleted: false },
      { id: "uzemelt", name: "Informatikai rendszerek üzemeltetése", code: null, isRequired: true, isCompleted: false },
      { id: "info-proj", name: "Információbiztonsági projektmenedzsment", code: null, isRequired: true, isCompleted: false },
      { id: "vagyon", name: "Vagyonvédelmi rendszerek", code: null, isRequired: true, isCompleted: false },
      { id: "web-wifi", name: "Web, WiFi biztonság, sérülékenységvizsgálat, töréstesztek", code: null, isRequired: true, isCompleted: false },
      { id: "szabad-2", name: "Szabadon választható II.", code: null, isRequired: false, isCompleted: false },
    ],
  },
  {
    semesterNumber: 6,
    name: "6. félév",
    subjects: [
      { id: "okmany", name: "Kiberbiztonság okmányrendszere", code: null, isRequired: true, isCompleted: false },
      { id: "halo-felh", name: "Számítógéphálózati és felhőbiztonság", code: null, isRequired: true, isCompleted: false },
      { id: "etikus-1", name: "Kiberbiztonság / etikus hacking I.", code: null, isRequired: true, isCompleted: false },
      { id: "kiber-proj-1", name: "Kiberbiztonsági projektfeladat I.", code: null, isRequired: true, isCompleted: false },
      { id: "audit", name: "Információbiztonsági auditor felkészítés és auditálás", code: null, isRequired: true, isCompleted: false },
      { id: "szabad-3", name: "Szabadon választható III.", code: null, isRequired: false, isCompleted: false },
      { id: "virus", name: "Vírustámadási és adathalász technikák", code: null, isRequired: true, isCompleted: false },
    ],
  },
  {
    semesterNumber: 7,
    name: "7. félév",
    subjects: [
      { id: "szakdolgozat", name: "Szakdolgozat", code: null, isRequired: true, isCompleted: false },
      { id: "etikus-2", name: "Kiberbiztonság / etikus hacking II.", code: null, isRequired: true, isCompleted: false },
      { id: "kozszfer", name: "Információbiztonság követelményei a közszférában", code: null, isRequired: true, isCompleted: false },
      { id: "kiber-proj-2", name: "Kiberbiztonsági projektfeladat II.", code: null, isRequired: true, isCompleted: false },
    ],
  },
];

export const curriculumDependencies = [
  { from: "inf-1", to: "bbxin2kblf", confidence: "estimated" as const },
  { from: "bbxin2kblf", to: "uzemelt", confidence: "estimated" as const },
  { from: "btxmak2blf", to: "matek-2", confidence: "estimated" as const },
  { from: "testneveles-1", to: "ottesi2blf", confidence: "estimated" as const },
  { from: "ottesi2blf", to: "testneveles-3", confidence: "estimated" as const },
  { from: "testneveles-3", to: "testneveles-4", confidence: "estimated" as const },
  { from: "projekt-1", to: "projekt-2", confidence: "estimated" as const },
  { from: "projekt-2", to: "kiber-proj-1", confidence: "estimated" as const },
  { from: "kiber-proj-1", to: "kiber-proj-2", confidence: "estimated" as const },
  { from: "etikus-1", to: "etikus-2", confidence: "estimated" as const },
  { from: "bbxvn12blf", to: "ik-halo", confidence: "estimated" as const },
  { from: "ik-halo", to: "halo-felh", confidence: "estimated" as const },
  { from: "bbxvd12blf", to: "ibir", confidence: "estimated" as const },
  { from: "bbxdv12blf", to: "kockazat", confidence: "estimated" as const },
  { from: "kiber-alap", to: "kiber-meres", confidence: "estimated" as const },
  { from: "kiber-meres", to: "web-wifi", confidence: "estimated" as const },
  { from: "web-wifi", to: "etikus-1", confidence: "estimated" as const },
];

export type CurriculumDependencyConfidence = "official" | "estimated" | "unknown";
