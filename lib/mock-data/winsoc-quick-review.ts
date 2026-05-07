// Informatika II. Quick Review Data for Exam Preparation
// This is a compressed exam-facing summary for last-minute review

export type WinsocQuickReviewCard = {
  id: string;
  moduleId: string;
  title: string;
  oneSentence: string;
  explainLikeExamAnswer: string[];
  keyCodeConcepts: string[];
  likelyExamPrompts: string[];
  commonMistakes: string[];
  lastMinuteChecklist: string[];
};

export type WinsocCheatSheetSection = {
  id: string;
  title: string;
  priority: "critical" | "high" | "medium";
  content: string[];
};

export type WinsocReviewPlan = {
  duration: string;
  sections: { time: string; topics: string[] }[];
};

export type WinsocSurvivalPath = {
  duration: string;
  steps: { time: string; action: string }[];
};

// Quick review cards for each SOC module
export const winsocQuickReviewCards: WinsocQuickReviewCard[] = [
  {
    id: "qr-template-engine",
    moduleId: "template-engine",
    title: "Template Engine",
    oneSentence: "HTML sablon feldolgozó, ami változókat behelyettesít a riportba.",
    explainLikeExamAnswer: [
      "A Template Engine HTML sablonokat dolgoz fel, ahol {{ változó }} helyére behelyettesíti az értékeket.",
      "Használja a string formázást vagy a Jinja2-szerű sablonozást a dinamikus tartalom generáláshoz.",
      "A riportgenerátor hívja meg, amikor HTML kimenetet kell készíteni az elemzés eredményeiről."
    ],
    keyCodeConcepts: [
      "String template formázás (f-string vagy str.format())",
      "Változó behelyettesítés sablonokban",
      "HTML alapú riport struktúra",
      "Dinamikus tartalom generálás"
    ],
    likelyExamPrompts: [
      "Hogyan működik a Template Engine?",
      "Mi a célja a sablon feldolgozásnak?",
      "Hogyan kerülnek be az adatok a HTML riportba?"
    ],
    commonMistakes: [
      "Sablon szintaxis hiba (hiányzó zárójelek)",
      "Változónév eltérés a sablonban és az adatok között",
      "Nem kezelt hiányzó adatok (None vagy üres értékek)"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan működik a változó behelyettesítés",
      "Ismerem a sablon szintaxist",
      "Tudom, hova kerülnek a riport adatai"
    ]
  },
  {
    id: "qr-mock-log-generator",
    moduleId: "mock-log-generator",
    title: "Mock Log Generator",
    oneSentence: "Teszt logokat generál véletlenszerű eseményekkel a parser teszteléséhez.",
    explainLikeExamAnswer: [
      "A Mock Log Generator Windows eseménylogokat szimulál véletlenszerű felhasználónevekkel, IP címekkel és időbélyegekkel.",
      "Generál LOGIN_SUCCESS, LOGIN_FAILED, FILE_CHANGED eseményeket a tesztadatokhoz.",
      "A random és datetime modulokat használja a realisztikus tesztadatokhoz."
    ],
    keyCodeConcepts: [
      "Random modul használata (random.choice, random.randint)",
      "Datetime modul (datetime.now, strftime)",
      "Esemény típusok enumerációja",
      "Fájl írás és log formátum"
    ],
    likelyExamPrompts: [
      "Hogyan generál teszt logokat?",
      "Milyen eseménytípusokat tud generálni?",
      "Hogyan használja a random és datetime modulokat?"
    ],
    commonMistakes: [
      "Nem megfelelő log formátum (hiányzó mezők)",
      "Dátum formátum hiba",
      "Nem realisztikus tesztadatok (pl. túl kevés failed login)"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan generál véletlenszerű logokat",
      "Ismerem az eseménytípusokat",
      "Tudom, hogyan formázom a dátumokat"
    ]
  },
  {
    id: "qr-windows-log-parser",
    moduleId: "windows-log-parser",
    title: "Windows Log Parser",
    oneSentence: "Windows eseménylogokat parszolja strukturált esemény objektumokká.",
    explainLikeExamAnswer: [
      "A Parser nyers Windows eseménylogokat olvas be és soronként feldarabolja.",
      "Reguláris kifejezésekkel (regex) kinyeri a timestamp, event ID, user, IP mezőket.",
      "Hibát dob, ha a log sor nem megfelelő formátumú vagy hiányoznak a kötelező mezők."
    ],
    keyCodeConcepts: [
      "Regex minták és csoportok (re.match, re.groups)",
      "String feldarabolás és mező kinyerés",
      "Esemény objektum struktúra",
      "Hibakezelés és validáció"
    ],
    likelyExamPrompts: [
      "Hogyan parszolja a logokat?",
      "Milyen mezőket nyer ki a log sorokból?",
      "Hogyan kezeli a hibás log formátumokat?"
    ],
    commonMistakes: [
      "Regex minta hiba (nem megfelelő csoportok)",
      "Nem kezelt üres vagy hibás log sorok",
      "Mezőnév eltérés a regex és az objektum között"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan működik a regex parszolás",
      "Ismerem a kinyert mezőket",
      "Tudom, hogyan kezeli a hibákat"
    ]
  },
  {
    id: "qr-anomaly-detector",
    moduleId: "anomaly-detector",
    title: "Anomaly Detector",
    oneSentence: "Gyanús tevékenységeket detektál: brute force, IP figyelés, sok failed login.",
    explainLikeExamAnswer: [
      "Az Anomaly Detector számlálja az eseményeket felhasználónként és IP cím szerint.",
      "Brute force detektálás: sok failed login ugyanattól a felhasználótól rövid idő alatt.",
      "Gyanús IP figyelés: sok esemény ugyanarról az IP címről.",
      "Küszöbértékek alapján jelzi az anomáliákat."
    ],
    keyCodeConcepts: [
      "Counter használata (collections.Counter)",
      "Számlálás és aggregálás",
      "Küszöbérték alapú detektálás",
      "Anomália jelzése és naplózása"
    ],
    likelyExamPrompts: [
      "Hogyan detektálja a brute force támadást?",
      "Milyen anomáliákat képes felismerni?",
      "Hogyan használja a Counter-t a számláláshoz?"
    ],
    commonMistakes: [
      "Túl alacsony vagy túl magas küszöbérték",
      "Nem megfelelő számlálás (pl. nem figyeli az időintervallumot)",
      "Nem kezelt üres esemény lista"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan működik a brute force detektálás",
      "Ismerem a küszöbértékeket",
      "Tudom, hogyan használom a Counter-t"
    ]
  },
  {
    id: "qr-integrity-checker",
    moduleId: "integrity-checker",
    title: "Integrity Checker",
    oneSentence: "Fájl integritás ellenőrzés SHA256 hash alapján, változás detektálás.",
    explainLikeExamAnswer: [
      "Az Integrity Checker fájl hash-eket számít (SHA256) és összehasonlítja az előző állapottal.",
      "Ha a hash változott, a fájl módosult – ez integritás sérülést jelez.",
      "A hashlib és pathlib modulokat használja a hash számításhoz és fájlok bejárásához.",
      "HIDS (Host-based Intrusion Detection) alapja."
    ],
    keyCodeConcepts: [
      "Hash számítás (hashlib.sha256)",
      "Fájl bejárás (pathlib.Path)",
      "Hash összehasonlítás és változás detektálás",
      "Integritás naplózás"
    ],
    likelyExamPrompts: [
      "Hogyan működik az integritás ellenőrzés?",
      "Milyen hash algoritmust használ?",
      "Hogyan detektálja a fájl változásokat?"
    ],
    commonMistakes: [
      "Nem megfelelő hash algoritmus",
      "Nem kezelt nem létező fájlok",
      "Hash ütközés nem megfelelő kezelése"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan számítok SHA256 hash-t",
      "Ismerem a fájl bejárást",
      "Tudom, hogyan hasonlítom össze a hash-eket"
    ]
  },
  {
    id: "qr-report-generator",
    moduleId: "report-generator",
    title: "Report Generator",
    oneSentence: "HTML és JSON riportokat generál az elemzés eredményeiből.",
    explainLikeExamAnswer: [
      "A Report Generator az Anomaly Detector és Integrity Checker eredményeit fogadja.",
      "HTML riportot készít a Template Engine segítségével, JSON riportot a json modullal.",
      "Az HTML riport emberileg olvasható, a JSON gépi feldolgozásra.",
      "Riport tartalma: összes esemény, anomáliák, integritás változások, összefoglaló."
    ],
    keyCodeConcepts: [
      "JSON serializáció (json.dump, json.dumps)",
      "Template Engine használata HTML-hez",
      "Riport struktúra és adatok",
      "Fájl írás (HTML, JSON)"
    ],
    likelyExamPrompts: [
      "Hogyan generálja a riportokat?",
      "Milyen formátumokat támogat?",
      "Mi a különbség az HTML és JSON riport között?"
    ],
    commonMistakes: [
      "Nem megfelelő JSON serializáció",
      "Template hiba HTML generálásnál",
      "Hiányzó adatok a riportban"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan generálok JSON riportot",
      "Tudom, hogyan generálok HTML riportot",
      "Ismerem a riport struktúrát"
    ]
  },
  {
    id: "qr-main-application",
    moduleId: "main-application",
    title: "Main Application",
    oneSentence: "Orchestrálja a teljes pipeline-t: log generálástól riportig.",
    explainLikeExamAnswer: [
      "A Main Application koordinálja az összes modult a megfelelő sorrendben.",
      "Először mock logokat generál, majd parszolja, detektál anomáliákat, ellenőrzi integritást, végül riportot generál.",
      "Parancssori argumentumokat fogad (bemeneti fájl, kimeneti fájl, stb.).",
      "Hibakezelést végez, ha bármely modul hibára fut."
    ],
    keyCodeConcepts: [
      "Modul integráció és orchestration",
      "Parancssori argumentumok (argparse vagy sys.argv)",
      "Pipeline sorrend és függőségek",
      "Hibakezelés és naplózás"
    ],
    likelyExamPrompts: [
      "Hogyan működik a teljes pipeline?",
      "Milyen modulokat koordinál?",
      "Hogyan kezeli a parancssori argumentumokat?"
    ],
    commonMistakes: [
      "Hibás sorrend (pl. riport generálás előtt detektálás)",
      "Nem kezelt modul hibák",
      "Hiányzó argumentumok"
    ],
    lastMinuteChecklist: [
      "Tudom, a sorrend: Mock → Parser → Detector → Integrity → Report",
      "Ismerem a parancssori argumentumokat",
      "Tudom, hogyan kezeli a hibákat"
    ]
  },
  {
    id: "qr-cli",
    moduleId: "cli",
    title: "Command Line Interface",
    oneSentence: "CLI a program futtatásához argumentumokkal és kapcsolókkal.",
    explainLikeExamAnswer: [
      "A CLI parancssori argumentumokat fogad (pl. --input, --output, --format).",
      "Lehetővé teszi a program futtatását különböző konfigurációkkal.",
      "Az argparse vagy sys.argv modulokat használja az argumentumok kezeléséhez.",
      "Súgó üzenetet nyújt a felhasználónak (--help)."
    ],
    keyCodeConcepts: [
      "Argparse használata (ArgumentParser, add_argument)",
      "Parancssori argumentumok és kapcsolók",
      "Súgó üzenetek (--help)",
      "Argumentum validáció"
    ],
    likelyExamPrompts: [
      "Hogyan használja a CLI-t?",
      "Milyen argumentumokat fogad?",
      "Hogyan jeleníti meg a súgót?"
    ],
    commonMistakes: [
      "Nem megfelelő argumentum név",
      "Hiányzó kötelező argumentumok",
      "Nem kezelt hiányzó argumentumok"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan használom a CLI-t",
      "Ismerem a fő argumentumokat",
      "Tudom, hogyan kapok segítséget (--help)"
    ]
  },
  {
    id: "qr-unit-tests",
    moduleId: "unit-tests",
    title: "Unit Tests",
    oneSentence: "Egyes modulokat teszteli izolációban (pytest).",
    explainLikeExamAnswer: [
      "A unit tesztek minden modult külön-külön tesztelnek.",
      "A pytest keretrendszert használja az assert utasításokkal.",
      "Tesztelik a parser, detector, integrity checker, report generator működését.",
      "Mock adatokat használnak a tesztekhez."
    ],
    keyCodeConcepts: [
      "Pytest alapok (assert, fixture)",
      "Unit teszt írása",
      "Mock adatok használata",
      "Teszt lefedettség"
    ],
    likelyExamPrompts: [
      "Hogyan teszteli a modulokat?",
      "Milyen keretrendszert használ?",
      "Hogyan futtatja a teszteket?"
    ],
    commonMistakes: [
      "Nem megfelelő assert utasítások",
      "Nem izolált tesztek (függőség más moduloktól)",
      "Hiányzó edge case tesztek"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan írok unit tesztet",
      "Ismerem a pytest alapokat",
      "Tudom, hogyan futtatom a teszteket"
    ]
  },
  {
    id: "qr-integration-test",
    moduleId: "integration-test",
    title: "Integration Test",
    oneSentence: "A teljes pipeline-t teszteli végpontól végpontig.",
    explainLikeExamAnswer: [
      "Az integrációs teszt a teljes pipeline-t futtatja: mock log → parser → detector → integrity → report.",
      "Ellenőrzi, hogy a modulok együtt megfelelően működnek-e.",
      "Ellenőrzi a riport kimenetet és az adatok helyességét.",
      "End-to-end validációt biztosít."
    ],
    keyCodeConcepts: [
      "End-to-end tesztelés",
      "Pipeline tesztelés",
      "Kimenet validáció",
      "Integrációs teszt írása"
    ],
    likelyExamPrompts: [
      "Hogyan teszteli a teljes pipeline-t?",
      "Mi a különbség a unit és integrációs teszt között?",
      "Hogyan validálja a kimenetet?"
    ],
    commonMistakes: [
      "Nem teljes pipeline tesztelés",
      "Nem megfelelő kimenet validáció",
      "Hiányzó integrációs tesztek"
    ],
    lastMinuteChecklist: [
      "Tudom, hogyan írok integrációs tesztet",
      "Ismerem a teljes pipeline tesztelését",
      "Tudom, hogyan validálom a kimenetet"
    ]
  }
];

// Cheat sheet sections for exam preparation
export const winsocCheatSheetSections: WinsocCheatSheetSection[] = [
  {
    id: "cs-5-minute-overview",
    title: "5 perces áttekintés",
    priority: "critical",
    content: [
      "SOC cél: Windows eseménylogok elemzése, gyanús tevékenységek detektálása, riport generálás.",
      "Input: Mock logok (Windows események: LOGIN_SUCCESS, LOGIN_FAILED, FILE_CHANGED).",
      "Pipeline: Mock Log Generator → Windows Log Parser → Anomaly Detector → Integrity Checker → Report Generator.",
      "Output: HTML riport (emberileg olvasható) és JSON riport (gépi feldolgozás).",
      "Riport tartalma: Összes esemény, anomáliák (brute force, gyanús IP-k), integritás változások, összefoglaló.",
      "Tesztek: Unit tesztek (modulok izolációban) és integrációs teszt (teljes pipeline)."
    ]
  },
  {
    id: "cs-key-concepts",
    title: "Kulcs fogalmak",
    priority: "critical",
    content: [
      "Template Engine: HTML sablonok, változó behelyettesítés.",
      "Mock Log Generator: Véletlenszerű teszt logok generálása.",
      "Windows Log Parser: Regex alapú log feldolgozás.",
      "Anomaly Detector: Brute force és gyanús IP detektálás (Counter).",
      "Integrity Checker: SHA256 hash alapú fájl integritás ellenőrzés.",
      "Report Generator: HTML és JSON riport generálás.",
      "Main Application: Pipeline orchestration.",
      "CLI: Parancssori argumentumok kezelése.",
      "Unit Tests: Modulok izolált tesztelése (pytest).",
      "Integration Test: Teljes pipeline tesztelése."
    ]
  },
  {
    id: "cs-likely-exam-tasks",
    title: "Valószínű vizsgafeladatok",
    priority: "critical",
    content: [
      "Magyarázd el a Template Engine működését.",
      "Hogyan parszolja a Windows logokat?",
      "Hogyan detektálja a brute force támadást?",
      "Hogyan működik az integritás ellenőrzés?",
      "Hogyan generálja a HTML riportot?",
      "Futtasd le a teszteket és értelmezd az eredményt.",
      "Írj egy egyszerű mock log generátort.",
      "Parszolj egy log sort és nyerd ki a mezőket."
    ]
  },
  {
    id: "cs-common-mistakes",
    title: "Gyakori hibák",
    priority: "high",
    content: [
      "Regex minta hiba a parserben.",
      "Túl alacsony vagy túl magas küszöbérték a detectorban.",
      "Nem megfelelő hash algoritmus az integrity checkerben.",
      "Template szintaxis hiba a riport generátorban.",
      "Hibás sorrend a pipeline-ban.",
      "Nem kezelt üres vagy hiányzó adatok."
    ]
  },
  {
    id: "cs-last-minute-checklist",
    title: "Utolsó pillanati ellenőrzőlista",
    priority: "critical",
    content: [
      "Setup: Python környezet, winsoc projekt klónozása.",
      "Futtatás: Tudom, hogyan futtatom a programot CLI-vel.",
      "Pipeline: Átlátom a teljes adatáramlást.",
      "Parser: Tudom, hogyan működik a regex parszolás.",
      "Detector: Tudom, hogyan működik a brute force detektálás.",
      "Integrity: Tudom, hogyan működik a hash alapú ellenőrzés.",
      "Report: Tudom, hogyan generálom a riportokat.",
      "Tesztek: Tudom, hogyan futtatom a pytest teszteket.",
      "Ismerem a még tisztázandó vizsga követelményeket."
    ]
  }
];

// Last minute checklist items
export const winsocLastMinuteChecklist: string[] = [
  "Setup: Python környezet készen van, winsoc projekt klónozva",
  "Tudom, hogyan futtatom a programot CLI-vel (--input, --output, --format)",
  "Átlátom a teljes pipeline-t: Mock → Parser → Detector → Integrity → Report",
  "Megértem a Template Engine működését (változó behelyettesítés)",
  "Tudom, hogyan generál mock logokat (random, datetime)",
  "Megértem a Windows Log Parser logikáját (regex parszolás)",
  "Tudom, hogyan detektálom anomáliákat (brute force, Counter)",
  "Megértem az Integrity Checker működését (SHA256 hash)",
  "Tudom, hogyan generálom HTML és JSON riportokat",
  "Tudom, hogyan futtatom a pytest teszteket",
  "Tudom, hogyan értelmezem a generált riportot",
  "Ismerem a még tisztázandó vizsga követelményeket"
];

// Review Plans from Grok + Perplexity material
export const winsocQuickReviewPlans: WinsocReviewPlan[] = [
  {
    duration: "30 perc",
    sections: [
      { time: "0-30 perc", topics: ["Modulok 3-4-5 (Parser, Anomaly, Integrity) + 3 gyakorlófeladat (2,3,5) + common mistakes átolvasás"] }
    ]
  },
  {
    duration: "60 perc",
    sections: [
      { time: "0-60 perc", topics: ["1-6 modul + 5 gyakorlófeladat (1-5) + 1 óra túlélő összefoglaló"] }
    ]
  },
  {
    duration: "120 perc",
    sections: [
      { time: "0-120 perc", topics: ["Minden modul végigolvasása + összes gyakorlófeladat megírása + CLI + Main + tesztek + common mistakes"] }
    ]
  }
];

// 1-hour Survival Path from Grok + Perplexity material
export const winsocQuickSurvivalPath: WinsocSurvivalPath = {
  duration: "1 óra",
  steps: [
    { time: "0-15 perc", action: "Modul 3,4,5 (Parser + Anomaly + Integrity) + példakódok bemagolása" },
    { time: "15-35 perc", action: "Gyakorlófeladatok 2,3,5,6 (ezek a legvalószínűbb vizsgakérdések)" },
    { time: "35-50 perc", action: "Common mistakes lista + saját leggyengébb modul gyors átolvasása" },
    { time: "50-60 perc", action: "CLI + Main Application összefoglaló + „mi a pipeline\" magyarázat gyakorlása hangosan" }
  ]
};

