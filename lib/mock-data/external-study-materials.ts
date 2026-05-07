export type ExternalStudySection = {
  id: string;
  title: string;
  category:
    | "topic"
    | "codeExample"
    | "exercise"
    | "commonMistake"
    | "reviewPlan"
    | "aiStrategy"
    | "survivalPath"
    | "sourceBasedExtension";
  priority: "critical" | "high" | "medium";
  summary: string;
  relatedTopicIds: string[];
  relatedLessonIds: string[];
  source: "grok" | "perplexity" | "combined";
};

export type ExternalStudyMaterial = {
  id: string;
  title: string;
  subjectId: string;
  sourceType: "grok" | "perplexity" | "combined";
  fileName: string;
  priority: "primary" | "secondary";
  summary: string;
  extractedSections: ExternalStudySection[];
  integrationTargets: string[];
};

export const externalStudyMaterials: ExternalStudyMaterial[] = [
  {
    id: "prog-grok-perplexity",
    title: "Programozás – Vizsgafelkészítő tananyag",
    subjectId: "bbxpr12blf",
    sourceType: "combined",
    fileName: "Programozás – Vizsgafelkészítő tana.txt",
    priority: "secondary",
    summary: "Project Sentinel / Secret Database CLI Tool vizsgafelkészítő anyag Grok és Perplexity alapján. Tartalmazza: string normalization, set használat, file I/O streaming, argparse, bcrypt, environment variables, unittest, error handling, regex, stdout/stderr szeparáció, AI-használati stratégia, 30/60/120 perces ismétlési tervek, gyakorlófeladatok megoldással, common mistakes.",
    extractedSections: [
      {
        id: "prog-topic-string-normalization",
        title: "String normalization",
        category: "topic",
        priority: "high",
        summary: "Eltávolítja a felesleges szóközöket, kisbetűsíti, ékezetes karaktereket lecseréli. Így a keresés pontos lesz (pl. \"Kovács\" == \"kovacs\"). Unicode normalizálás (NFKD/NFC) a keresési logikához.",
        relatedTopicIds: ["string-normalization"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-set-lookup",
        title: "Set használat O(1) lookuphoz",
        category: "topic",
        priority: "high",
        summary: "A lista keresés O(n), a set keresés O(1) → nagyon gyors duplikátum-ellenőrzés és lookup Secret Database-ben. Hash-tábla alapú implementáció.",
        relatedTopicIds: ["set-usage"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-file-streaming",
        title: "File I/O és streaming",
        category: "topic",
        priority: "high",
        summary: "Nagy fájlokat ne olvass be egyszerre (read()), hanem soronként (for line in file) → memória-kímélő (streaming). 1 GB+ fájlokhoz kötelező.",
        relatedTopicIds: ["file-io"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-argparse",
        title: "argparse CLI argumentumkezelés",
        category: "topic",
        priority: "high",
        summary: "CLI parancsok kezelése (--file, --hash, --add stb.). Ez a Secret Database Tool \"felülete\". choices=, required=, action=store_true használata.",
        relatedTopicIds: ["argparse"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-bcrypt",
        title: "bcrypt password hashing",
        category: "topic",
        priority: "critical",
        summary: "Biztonságos jelszó-tárolás. Soha ne tárold plain text-ben! Bcrypt automatikusan sóz és lassú (brute-force ellen). Min. 10-12 rounds.",
        relatedTopicIds: ["bcrypt"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-env-vars",
        title: "Environment variables",
        category: "topic",
        priority: "critical",
        summary: "Soha ne hardcode-old a titkos kulcsokat! .env fájlból olvasd be os.getenv-vel. Nincs default jelszó a kódban.",
        relatedTopicIds: ["environment-variables"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-unittest",
        title: "unittest",
        category: "topic",
        priority: "high",
        summary: "Automatikus tesztek. Vizsgán mindig várják, hogy mutasd be a unit tesztet. TestCase, assertEqual, assertTrue, setUp fixture.",
        relatedTopicIds: ["unittest"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-error-handling",
        title: "Error handling",
        category: "topic",
        priority: "high",
        summary: "try-except + specifikus hibák. Soha ne hagyd összeomlani a CLI-t. FileNotFoundError, Exception kezelése stderr-re.",
        relatedTopicIds: ["error-handling"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-regex",
        title: "regex",
        category: "topic",
        priority: "high",
        summary: "Mintaillesztés (pl. e-mail, erős jelszó ellenőrzés). re.match(), re.search(), capturing groups, named groups (?P<name>).",
        relatedTopicIds: ["regex"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-topic-stdout-stderr",
        title: "stdout/stderr szeparáció",
        category: "topic",
        priority: "high",
        summary: "Normál kimenet → stdout (print()), hibák és logok → stderr (print(..., file=sys.stderr)). Pipe-olható CLI-khoz kötelező.",
        relatedTopicIds: ["stdout-stderr"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-ai-strategy",
        title: "AI-használati stratégia (vizsgán is használható!)",
        category: "aiStrategy",
        priority: "critical",
        summary: "Mire használd: gyors kódvázlat, hibakeresés, unit test generálás, gyors magyarázat. Mire NE bízz vakon: biztonsági kódra (bcrypt, env var), teljes programra. Hogyan ellenőrizd: futtasd le, írj unit tesztet, nézd meg PEP8, kérd: mi történik ha fájl üres/hiányzik?",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-review-30min",
        title: "30 perces ismétlés",
        category: "reviewPlan",
        priority: "high",
        summary: "0-10 perc: normalize + set + file streaming. 10-20 perc: argparse + bcrypt + env var. 20-30 perc: 2 unit test + error handling + stdout/stderr.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-review-60min",
        title: "60 perces ismétlés",
        category: "reviewPlan",
        priority: "high",
        summary: "0-25 perc: 1-6. témák (alapok + CLI + biztonság). 25-40 perc: regex + error handling + unittest. 40-60 perc: 4 gyakorlófeladat megoldása + AI ellenőrzés.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-review-120min",
        title: "120 perces ismétlés",
        category: "reviewPlan",
        priority: "medium",
        summary: "0-60 perc: minden téma végigolvasása + kódok bemásolása és futtatása. 60-100 perc: összes gyakorlófeladat saját kézzel. 100-120 perc: teljes CLI Tool összerakása + unit tesztek futtatása.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "prog-common-mistakes",
        title: "Common mistakes (ne kövesd el!)",
        category: "commonMistake",
        priority: "critical",
        summary: "read() helyett for line in f (memória probléma), plain text jelszó mentése, print() stderr helyett, argparse nélkül globális változó, nincs if __name__ == '__main__':, unit testben nincs assert.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
    ],
    integrationTargets: [
      "/programozas",
      "/subjects/bbxpr12blf/study",
      "/exam-sprint/maj9",
    ],
  },
  {
    id: "info2-grok-perplexity",
    title: "Informatika II. – Vizsgafelkészítő tananyag",
    subjectId: "bbxin2kblf",
    sourceType: "combined",
    fileName: "Informatika II. – Vizsgafelkészítő.txt",
    priority: "primary",
    summary: "Python-alapú Windows SOC Analyst Tool (SIEM + HIDS) vizsgafelkészítő anyag Grok és Perplexity alapján. 10 modul: Template Engine, Mock Log Generator, Windows Log Parser, Anomaly Detector, Integrity Checker, Report Generator, Main Application, CLI, Unit Tests, Integration Test. Tartalmazza: modul magyarázatok, kódpéldák, vizsgán el kell tudni magyarázni, mit kérdezhetnek/mit kellhet módosítani, gyakorlófeladatok, 30/60/120 perces tervek, 1 órás túlélő útvonal, common mistakes, SOC/SIEM/HIDS alapfogalmak, forrásalapú kiegészítések.",
    extractedSections: [
      {
        id: "info2-module-template",
        title: "Template Engine",
        category: "topic",
        priority: "high",
        summary: "Dinamikusan tölti fel a riport-sablonokat (HTML/JSON). Jinja2-vel dolgozik, hogy a kód és a megjelenítés teljesen szétváljon. SOC elemzőnek olvasható, formázott riportot ad ki.",
        relatedTopicIds: ["template-engine"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-mock-log",
        title: "Mock Log Generator",
        category: "topic",
        priority: "high",
        summary: "Teszteléshez generál fake Windows-szerű logokat (sikeres/sikertelen belépés, IP, timestamp). Lehetővé teszi a SIEM működésének tesztelését valós logok nélkül is. Paraméterezhetőség, brute force szimuláció.",
        relatedTopicIds: ["mock-log-generator"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-parser",
        title: "Windows Log Parser",
        category: "topic",
        priority: "critical",
        summary: "Beolvassa és strukturálja a log sorokat (timestamp, IP, event type, user). Regex vagy csv.DictReader-rel dolgozik. Kinyeri a SOC szempontból fontos mezőket. Hibakezelés rossz soroknál.",
        relatedTopicIds: ["windows-log-parser"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-anomaly",
        title: "Anomaly Detector",
        category: "topic",
        priority: "critical",
        summary: "Egyszerű szabályalapú detektor: számolja a sikertelen belépéseket IP-nként időablakban és jelzi a brute force-t. Threshold + időablak logika, SIEM szabályok.",
        relatedTopicIds: ["anomaly-detector"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-integrity",
        title: "Integrity Checker (HIDS)",
        category: "topic",
        priority: "critical",
        summary: "Fájlok SHA256 hash-ét számítja, baseline JSON-nal összehasonlítja → változás = riasztás (klasszikus HIDS). Hash funkció, baseline vs. current összehasonlítás.",
        relatedTopicIds: ["integrity-checker"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-report",
        title: "Report Generator",
        category: "topic",
        priority: "high",
        summary: "Összegyűjti az összes modul eredményét és Template Engine-n keresztül HTML/JSON riportot készít. Két formátum: HTML embernek, JSON automatizálásnak.",
        relatedTopicIds: ["report-generator"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-main",
        title: "Main Application",
        category: "topic",
        priority: "high",
        summary: "A \"főnök\" modul: CLI-ból kap parancsot, sorban futtatja a többi modult (generate → parse → detect → check → report). Pipeline logika, orchestration, error handling.",
        relatedTopicIds: ["main-application"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-cli",
        title: "Command Line Interface",
        category: "topic",
        priority: "high",
        summary: "argparse (vagy click) segítségével parancssori paraméterek: --generate-logs, --analyze, --report, --integrity. Action + store_true használata.",
        relatedTopicIds: ["command-line-interface"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-unit-tests",
        title: "Unit Tests",
        category: "topic",
        priority: "high",
        summary: "pytest-tel teszteli az egyes függvényeket (pl. parse_log_line, calculate_hash). assert és pytest fixture-ek. Unit vs. integration test különbség.",
        relatedTopicIds: ["unit-tests"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-module-integration-test",
        title: "Integration Test",
        category: "topic",
        priority: "high",
        summary: "Teljes flow teszt: mock log → parse → anomaly detect → integrity → report fájl létezik-e és tartalmazza-e a várt adatokat. Temporary fájlok használata.",
        relatedTopicIds: ["integration-test"],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-survival-1hour",
        title: "Ha csak 1 órám van – túlélő útvonal",
        category: "survivalPath",
        priority: "critical",
        summary: "0-15 perc: Modul 3,4,5 (Parser + Anomaly + Integrity) + példakódok bemagolása. 15-35 perc: Gyakorlófeladatok 2,3,5,6. 35-50 perc: Common mistakes lista + saját leggyengébb modul gyors átolvasása. 50-60 perc: CLI + Main Application összefoglaló + \"mi a pipeline\" magyarázat gyakorlása hangosan.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-review-30min",
        title: "30 perces ismétlés",
        category: "reviewPlan",
        priority: "high",
        summary: "Modulok 3-4-5 (Parser, Anomaly, Integrity) + 3 gyakorlófeladat (2,3,5) + common mistakes átolvasás.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-review-60min",
        title: "60 perces ismétlés",
        category: "reviewPlan",
        priority: "high",
        summary: "1-6 modul + 5 gyakorlófeladat (1-5) + 1 óra túlélő összefoglaló.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-review-120min",
        title: "120 perces ismétlés",
        category: "reviewPlan",
        priority: "medium",
        summary: "Minden modul végigolvasása + összes gyakorlófeladat megírása + CLI + Main + tesztek + common mistakes.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-common-mistakes",
        title: "Common mistakes lista (ne kövesd el!)",
        category: "commonMistake",
        priority: "critical",
        summary: "Regex nem kezeli az összes log formátumot → mindig adj hozzá fallbacket. Hash fájl nem záródik be (with open hiánya). Timestamp string marad → nem lehet vele számolni. Globális változókat használsz a modulok között. Unit testben nincs assert. Report generálás előtt nem hívod az anomaly/integrity modult. CLI argumentumot nem kezeled. Nincs error handling rossz fájl esetén.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "combined",
      },
      {
        id: "info2-soc-concept",
        title: "SOC alapfogalom",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "SOC (Security Operations Center) egy központosított csapat/eszközrendszert jelent, amely folyamatosan figyeli a hálózati és rendszereseményeket, észleli a támadásokat, és koordinálja a reakciót. Kulcsfogalmak: folyamatos monitorozás (24/7), incident response, esemény (log) gyűjtés és korráláció, log-gyűjtő (SIEM), threat hunting.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
      {
        id: "info2-siem-log-analysis",
        title: "SIEM logelemzés",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "SIEM (Security Information and Event Management) gyűjti, tárolja és elemzi a különböző rendszerek logjait, hogy korrelált, strukturált eseményekként mutassa a biztonsági eseményeket. Log ingest, normalizálás, korrelációs szabály, esemény súlyozás.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
      {
        id: "info2-hids-integrity",
        title: "HIDS / fájlintegritás-ellenőrzés",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "HIDS (Host-based Intrusion Detection System) a gépen belül figyeli a fájlok, regiszterek, folyamatok változásait. Fájlintegritás-ellenőrzés: egy \"baseline\" hash alapján vizsgáljuk, módosult-e a fájl. Hash (SHA-256), baseline, fájlváltozás, signature detection.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
      {
        id: "info2-log-parsing",
        title: "Python log parsing",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "Log parsing az a folyamat, amikor nyers logszövegből kinyerjük a mezőket (időpont, IP, hiba szint, stb.) és strukturált adat (pl. dict) lesz belőle. Log formátum, strukturált adat, regex minta, fájl iteráció, kivételkezelés.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
      {
        id: "info2-regex-logs",
        title: "Python regex alapok loghoz",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "Python re modul segítségével regex segítségével keresünk, illetve kinyerünk részstringeket logokból. re.match() / re.search(), capturing group, \\S+, \\d+, .*, named group, greedy/non-greedy.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
      {
        id: "info2-brute-force-detection",
        title: "Brute force detection egyszerű szabályokkal",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "Brute force (pl. SSH/Windows-bejelentkezés) számlálásához adott IP címről számoljuk a sikertelen kísérleteket egy időablakon belül. Sikertelen bejelentkezés, IP-alapú számlálás, időablak, threshold, alert.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
      {
        id: "info2-file-hashing",
        title: "File hashing Pythonban",
        category: "sourceBasedExtension",
        priority: "high",
        summary: "hashlib modul segítségével fájl tartalmát hash-eljük (pl. sha256), amit integritás-ellenőrzésre használhatunk. hashlib.sha256, chunk-olás, hexdigest(), checksum/hash comparison.",
        relatedTopicIds: [],
        relatedLessonIds: [],
        source: "perplexity",
      },
    ],
    integrationTargets: [
      "/programozas/winsoc",
      "/programozas/winsoc/gyorsismetlo",
      "/subjects/bbxin2kblf/study",
      "/exam-sprint/maj9",
    ],
  },
];

export function getExternalMaterialById(id: string): ExternalStudyMaterial | undefined {
  return externalStudyMaterials.find((m) => m.id === id);
}

export function getExternalMaterialsBySubject(subjectId: string): ExternalStudyMaterial[] {
  return externalStudyMaterials.filter((m) => m.subjectId === subjectId);
}

export function getExternalMaterialSections(materialId: string): ExternalStudySection[] {
  const material = getExternalMaterialById(materialId);
  return material?.extractedSections || [];
}

export function getSectionsByCategory(materialId: string, category: ExternalStudySection["category"]): ExternalStudySection[] {
  const sections = getExternalMaterialSections(materialId);
  return sections.filter((s) => s.category === category);
}
