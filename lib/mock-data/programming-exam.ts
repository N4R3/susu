// Programozás Exam Data Model based on ady_demo_zh.zip inspection
// This is the secondary May 9 exam - easier than Informatika II. SOC project
// AI is allowed for this exam

export type ProgrammingExamTopic = {
  id: string;
  title: string;
  priority: "critical" | "high" | "medium";
  summary: string;
  sourceFiles: string[];
  relatedLessonIds: string[];
  likelyTasks: string[];
  commonMistakes: string[];
  checkQuestions?: string[];
  sourceNotes?: string[];
};

export type ProgrammingExamExercise = {
  id: string;
  title: string;
  topicId: string;
  difficulty: "easy" | "medium" | "exam";
  prompt: string;
  starterCode?: string;
  expectedOutput?: string;
  solution?: string;
  sourceFile?: string;
  aiAllowed: boolean;
};

export type ProgrammingExamRequirement = {
  id: string;
  title: string;
  status: "known" | "unknown" | "partiallyKnown";
  description: string;
};

export type ProgrammingAiStrategy = {
  title: string;
  useFor: string[];
  avoidFor: string[];
  verificationSteps: string[];
};

export type ProgrammingReviewPlan = {
  duration: string;
  sections: { time: string; topics: string[] }[];
};

export type ProgrammingSourceNotes = {
  topic: string;
  summary: string;
  sources: string[];
};

// Exam topics extracted from sentinel.py and test_sentinel.py
export const programmingExamTopics: ProgrammingExamTopic[] = [
  {
    id: "prog-string-normalization",
    title: "String Normalization",
    priority: "critical",
    summary: "Convert strings to canonical form: lowercase and keep only [a-z0-9] characters using regex.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-string-operations", "python-regex"],
    likelyTasks: [
      "Írj egy normalize_string függvényt, ami kisbetűssé alakít és eltávolítja a nem alfanumerikus karaktereket.",
      "Használj reguláris kifejezést a string tisztításhoz.",
      "Kezeld a None és üres string eseteket."
    ],
    commonMistakes: [
      "Nem kezeli a None értéket (TypeError)",
      "Rossz regex minta (nem távolítja el minden speciális karaktert)",
      "Elfelejt kisbetűsíteni a stringet"
    ]
  },
  {
    id: "prog-sets-lookup",
    title: "Sets for O(1) Lookup",
    priority: "critical",
    summary: "Use Python sets for fast O(1) membership testing when checking if a normalized string exists in a database.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-collections", "python-data-structures"],
    likelyTasks: [
      "Tölts be egy adatbázist egy set-be O(1) kereséshez.",
      "Ellenőrizd, hogy egy string benne van-e a setben.",
      "Kérdezz le többször is a setből a hatékonyság miatt."
    ],
    commonMistakes: [
      "Listát használ helyett (O(n) keresés)",
      "Nem normalizálja a set elemeit is",
      "Üres sorokat nem szűri ki megfelelően"
    ]
  },
  {
    id: "prog-file-io",
    title: "File I/O and Streaming",
    priority: "critical",
    summary: "Read files line-by-line for memory efficiency, write output to files, handle encoding (utf-8).",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-file-io", "python-text-processing"],
    likelyTasks: [
      "Olvass be egy fájlt soronként.",
      "Írj kimenetet egy fájlba vagy stdout-ra.",
      "Kezeld a fájl bezárását (finally blokk)."
    ],
    commonMistakes: [
      "Nem használja a with blokkot (fájl nem záródik)",
      "Rossz karakterkódolás (utf-8 helyett más)",
      "Nem kezeli a fájl olvasási hibákat"
    ]
  },
  {
    id: "prog-argparse",
    title: "Command-line Argument Parsing",
    priority: "high",
    summary: "Parse CLI arguments using argparse module: required arguments, optional arguments, choices, help text.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-cli", "python-argparse"],
    likelyTasks: [
      "Készíts argparse parser-t --database és --input kötelező argumentumokkal.",
      "Adj hozzá választási lehetőséget (--mode: normalized, bcrypt, peppered).",
      "Adj hozzá opcionális --output és --verbose kapcsolókat."
    ],
    commonMistakes: [
      "Nem jelöli kötelezőnek az argumentumokat (required=True)",
      "Rossz választék megadása (choices)",
      "Nem kezeli a hiányzó argumentumokat"
    ]
  },
  {
    id: "prog-bcrypt",
    title: "Bcrypt Password Hashing",
    priority: "critical",
    summary: "Verify bcrypt hashes, extract cost factor, handle bcrypt package installation errors.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-security", "python-hash"],
    likelyTasks: [
      "Ellenőrizd egy string bcrypt hash-ét.",
      "Nyerd ki a bcrypt cost faktort a hash-ből.",
      "Kezeld a bcrypt csomag hiányát (ImportError)."
    ],
    commonMistakes: [
      "Nem kezeli a bcrypt hiányát (ImportError)",
      "Nem ellenőrzi a cost faktort (túl magas cost lassú)",
      "Nem kezeli a hibás hash formátumot"
    ]
  },
  {
    id: "prog-environment-variables",
    title: "Environment Variables",
    priority: "high",
    summary: "Read environment variables (PEPPER) for peppered bcrypt mode, handle missing variables.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-os", "python-environment"],
    likelyTasks: [
      "Olvass be egy környezeti változót (PEPPER).",
      "Kezeld a hiányzó környezeti változót.",
      "Használd a pepper-t a bcrypt ellenőrzéshez."
    ],
    commonMistakes: [
      "Nem ellenőrzi, hogy a PEPPER be van-e állítva",
      "Nem kezeli a hiányzó környezeti változót",
      "Nem használja a pepper-t a hash ellenőrzéshez"
    ]
  },
  {
    id: "prog-unit-testing",
    title: "Unit Testing with unittest",
    priority: "critical",
    summary: "Write unit tests using unittest module: test cases, assertions, mocking, fixtures.",
    sourceFiles: ["tests/test_sentinel.py"],
    relatedLessonIds: ["python-testing", "python-unittest"],
    likelyTasks: [
      "Írj tesztesetet a normalize_string függvényhez.",
      "Használj StringIO-t a teszteléshez fájl helyett.",
      "Mockold a környezeti változókat a teszteléshez."
    ],
    commonMistakes: [
      "Nem használja a TestCase osztályt",
      "Rossz assert metódus használata (assertEqual helyett assert)",
      "Nem mockolja a függőségeket"
    ]
  },
  {
    id: "prog-error-handling",
    title: "Error Handling and Exceptions",
    priority: "high",
    summary: "Define custom exceptions, handle errors gracefully, return appropriate exit codes.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-exceptions", "python-error-handling"],
    likelyTasks: [
      "Definiálj egy egyedi kivételt (SentinelError).",
      "Kezeld a hibákat try-except blokkal.",
      "Adj vissza megfelelő exit kódot (0: sikeres, 1: hiba)."
    ],
    commonMistakes: [
      "Nem definiál egyedi kivételt",
      "Nem kezeli a hibákat megfelelően",
      "Rossz exit kód visszaadása"
    ]
  },
  {
    id: "prog-regex",
    title: "Regular Expressions",
    priority: "high",
    summary: "Use regex patterns for string matching and substitution, compile patterns for efficiency.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-regex"],
    likelyTasks: [
      "Készíts regex mintát a nem alfanumerikus karakterek eltávolításához.",
      "Használd a re.sub() metódust.",
      "Fordítsd le a mintát a hatékonyság érdekében."
    ],
    commonMistakes: [
      "Rossz regex minta (nem távolítja el minden speciális karaktert)",
      "Nem fordítja le a mintát (hatékonyság)",
      "Nem kezeli a speciális karaktereket"
    ]
  },
  {
    id: "prog-stdout-stderr",
    title: "Output Separation (stdout/stderr)",
    priority: "medium",
    summary: "Separate clean output (stdout) from verbose messages (stderr), use TextIO for file-like objects.",
    sourceFiles: ["sentinel.py"],
    relatedLessonIds: ["python-io", "python-cli"],
    likelyTasks: [
      "Írj kimenetet stdout-ra és stderr-re.",
      "Használj TextIO objektumokat a teszteléshez.",
      "Tartsd szét a tiszta kimenetet és a status üzeneteket."
    ],
    commonMistakes: [
      "Nem választja szét a stdout és stderr kimenetet",
      "Nem használja a TextIO-t a teszteléshez",
      "Status üzenetek kerülnek a stdout-ra"
    ]
  }
];

// Exam exercises based on the test file and sentinel.py
export const programmingExamExercises: ProgrammingExamExercise[] = [
  {
    id: "prog-ex-normalize",
    title: "String Normalization Exercise",
    topicId: "prog-string-normalization",
    difficulty: "easy",
    prompt: "Írj egy normalize_string függvényt, ami kisbetűssé alakítja a stringet és eltávolít minden nem alfanumerikus karaktert. A None értéket üres stringként kezeli.",
    starterCode: `def normalize_string(value):\n    # TODO: Implement normalization\n    pass`,
    expectedOutput: "normalize_string('AbC') == 'abc'\\nnormalize_string('a.b c-d') == 'abcd'\\nnormalize_string(None) == ''",
    solution: `import re

NORMALIZED_PATTERN = re.compile(r"[^a-z0-9]")

def normalize_string(value):
    if value is None:
        return ""
    return NORMALIZED_PATTERN.sub("", value.lower())`,
    aiAllowed: true
  },
  {
    id: "prog-ex-set-lookup",
    title: "Set Lookup Exercise",
    topicId: "prog-sets-lookup",
    difficulty: "medium",
    prompt: "Készíts egy load_normalized_database függvényt, ami beolvassa a fájlt soronként, normalizálja a sorokat, és egy set-be helyezi őket O(1) kereséshez.",
    starterCode: `def load_normalized_database(database_stream):\n    entries = set()\n    # TODO: Load and normalize\n    return entries`,
    expectedOutput: "A set tartalmazza a normalizált stringeket",
    solution: `def load_normalized_database(database_stream):
    entries = set()
    for line in database_stream:
        normalized = normalize_string(line.strip())
        if normalized:
            entries.add(normalized)
    return entries`,
    aiAllowed: true
  },
  {
    id: "prog-ex-bcrypt-verify",
    title: "Bcrypt Verification Exercise",
    topicId: "prog-bcrypt",
    difficulty: "exam",
    prompt: "Írj egy verify_bcrypt függvényt, ami ellenőrzi egy string bcrypt hash-ét. A függvénynek kezelnie kell a bcrypt csomag hiányát és a túl magas cost faktort.",
    starterCode: `def verify_bcrypt(candidate, hash_value, max_cost=14):\n    # TODO: Implement verification\n    pass`,
    expectedOutput: "True/False a hash egyezés alapján",
    solution: `try:
    import bcrypt
except ImportError:
    bcrypt = None

def get_bcrypt_cost(hash_value):
    try:
        parts = hash_value.decode("utf-8").split("$")
        if len(parts) >= 3 and parts[1] in {"2a", "2b", "2y"}:
            return int(parts[2])
    except (UnicodeDecodeError, ValueError):
        return None
    return None

def verify_bcrypt(candidate, hash_value, max_cost=14):
    if bcrypt is None:
        raise Exception("bcrypt package is required")
    
    cost = get_bcrypt_cost(hash_value)
    if cost and cost > max_cost:
        raise Exception(f"bcrypt cost {cost} exceeds maximum {max_cost}")
    
    try:
        return bcrypt.checkpw(candidate.encode("utf-8"), hash_value)
    except ValueError:
        return False`,
    aiAllowed: true,
    sourceFile: "sentinel.py"
  },
  {
    id: "prog-ex-argparse",
    title: "CLI Argument Parsing Exercise",
    topicId: "prog-argparse",
    difficulty: "medium",
    prompt: "Készíts egy argparse parser-t kötelező --database és --input argumentumokkal, választási --mode argumentummal (normalized, bcrypt, peppered), és opcionális --output és --verbose kapcsolókkal.",
    starterCode: `import argparse\n\ndef build_parser():\n    parser = argparse.ArgumentParser(description="Secret Database CLI Tool")\n    # TODO: Add arguments\n    return parser`,
    expectedOutput: "Parser a megfelelő argumentumokkal",
    solution: `import argparse

def build_parser():
    parser = argparse.ArgumentParser(description="Secret Database CLI Tool")
    parser.add_argument("-d", "--database", required=True, help="Path to database file")
    parser.add_argument("-i", "--input", required=True, help="Path to input file")
    parser.add_argument("--mode", choices=("normalized", "bcrypt", "peppered"), default="normalized")
    parser.add_argument("-o", "--output", help="Output file")
    parser.add_argument("--verbose", action="store_true")
    return parser`,
    aiAllowed: true
  },
  {
    id: "prog-ex-unit-test",
    title: "Unit Test Exercise",
    topicId: "prog-unit-testing",
    difficulty: "medium",
    prompt: "Írj egy unittest TestCase osztályt a normalize_string függvény tesztelésére. Teszteld a kisbetűsítést, a speciális karakterek eltávolítását, és a None kezelését.",
    starterCode: `import unittest\n\nclass TestNormalization(unittest.TestCase):\n    # TODO: Add test methods\n    pass\n\nif __name__ == "__main__":\n    unittest.main()`,
    expectedOutput: "Mind a tesztek átmennek",
    solution: `import unittest

def normalize_string(value):
    if value is None:
        return ""
    import re
    return re.sub(r"[^a-z0-9]", "", value.lower())

class TestNormalization(unittest.TestCase):
    def test_mixed_case(self):
        self.assertEqual(normalize_string("AbC"), "abc")
    
    def test_punctuation(self):
        self.assertEqual(normalize_string("a.b c-d"), "abcd")
    
    def test_none(self):
        self.assertEqual(normalize_string(None), "")

if __name__ == "__main__":
    unittest.main()`,
    aiAllowed: true
  }
];

// Exam requirements based on the zip content
export const programmingExamRequirements: ProgrammingExamRequirement[] = [
  {
    id: "prog-req-ai-allowed",
    title: "AI használható",
    status: "known",
    description: "A vizsgán AI használható (ChatGPT, GitHub Copilot, stb.)."
  },
  {
    id: "prog-req-python-version",
    title: "Python verzió",
    status: "known",
    description: "Python 3.8+ szükséges a type hinting és egyéb funkciók miatt."
  },
  {
    id: "prog-req-dependencies",
    title: "Függőségek",
    status: "known",
    description: "bcrypt csomag szükséges a bcrypt és peppered módokhoz."
  },
  {
    id: "prog-req-exam-format",
    title: "Vizsga formátum",
    status: "partiallyKnown",
    description: "Gyakorlati vizsga, valószínűleg egy hasonló CLI eszköz megírása vagy módosítása."
  },
  {
    id: "prog-req-time-allocation",
    title: "Időkeret",
    status: "unknown",
    description: "Nem ismert a pontos időkeret a vizsgán."
  },
  {
    id: "prog-req-grading",
    title: "Értékelési szempontok",
    status: "unknown",
    description: "Nem ismertek a pontos értékelési szempontok (pontozás)."
  },
  {
    id: "prog-req-submission",
    title: "Beadás módja",
    status: "unknown",
    description: "Nem ismert a beadás módja (fájl feltöltés, Git repo, stb.)."
  }
];

// Minimum study path for Programozás exam
export const programmingExamMinimumPath: string[] = [
  "Python alapok: változók, típusok, műveletek",
  "String műveletek: lower(), strip(), regex",
  "Adatszerkezetek: list, set, dict",
  "Fájl I/O: olvasás, írás, encoding",
  "Függvények: paraméterek, visszatérési érték, type hints",
  "CLI: argparse, argumentumok",
  "Hibakezelés: try-except, egyedi kivételek",
  "Bcrypt: hash ellenőrzés, cost faktor",
  "Környezeti változók: os.environ",
  "Unit tesztelés: unittest, TestCase, assert"
];

// AI usage strategy for Programozás exam (AI is allowed)
export const programmingAiStrategy: ProgrammingAiStrategy = {
  title: "AI-használati stratégia (vizsgán is használható!)",
  useFor: [
    "Gyors kódvázlat generálása (argparse sablon, bcrypt példa)",
    "Hibakeresés („miért nem működik ez a regex?”)",
    "Unit test generálás",
    "Gyors magyarázat („magyarázd el miért kell streaming file I/O”)"
  ],
  avoidFor: [
    "Biztonsági kódra (bcrypt, env var kezelésre) – mindig ellenőrizd!",
    "Teljes programra – az AI gyakran globális változókat használ vagy rossz CLI-t ír"
  ],
  verificationSteps: [
    "Futtasd le saját gépen",
    "Írj hozzá unit tesztet (ha nem passzol → rossz)",
    "Nézd meg a PEP8 szabályokat (black, flake8)",
    "Kérdezd meg: „mi történik, ha a fájl üres / nem létezik?”",
    "Olvasd el a kódot hangosan – érthető-e?"
  ]
};

// Review plans for Programozás exam
export const programmingReviewPlans: ProgrammingReviewPlan[] = [
  {
    duration: "30 perc",
    sections: [
      { time: "0-10 perc", topics: ["normalize + set + file streaming"] },
      { time: "10-20 perc", topics: ["argparse + bcrypt + env var"] },
      { time: "20-30 perc", topics: ["2 unit test + error handling + stdout/stderr"] }
    ]
  },
  {
    duration: "60 perc",
    sections: [
      { time: "0-25 perc", topics: ["1-6. témák (alapok + CLI + biztonság)"] },
      { time: "25-40 perc", topics: ["regex + error handling + unittest"] },
      { time: "40-60 perc", topics: ["4 gyakorlófeladat megoldása + AI ellenőrzés"] }
    ]
  },
  {
    duration: "120 perc",
    sections: [
      { time: "0-60 perc", topics: ["minden téma végigolvasása + kódok bemásolása és futtatása"] },
      { time: "60-100 perc", topics: ["összes gyakorlófeladat saját kézzel"] },
      { time: "100-120 perc", topics: ["teljes CLI Tool összerakása + unit tesztek futtatása"] }
    ]
  }
];

// Source-based notes for Programozás exam
export const programmingSourceNotes: ProgrammingSourceNotes[] = [
  {
    topic: "String normalization",
    summary: "String normalization (pl. Unicode-normalizálás) segít egységesített formába hozni a szöveget: pl. é és é különböző kanonikus formái egyforma normállá válnak, így biztonságosabb összehasonlítás / keresés.",
    sources: ["docs.python: unicodedata.normalize", "theniraj: Unicode string normalization schemes in Python"]
  },
  {
    topic: "Set adattípus",
    summary: "A set olyan adatstruktúra, amely csakis egyedi elemeket tárol, és a tartalmazás-ellenőrzés gyakorlatilag konstans idejű, mert hash-táblán alapszik.",
    sources: ["stackoverflow: How is set() implemented?", "dev: How Dictionary Lookup Operations Are O(1)"]
  },
  {
    topic: "Fájlbeolvasás streaming",
    summary: "Nagy fájloknál nem érdemes egyszerre beolvasni az egész tartalmat, hanem soronként, „streaming” módon dolgozunk, így a memória-igény nem nő a fájl méretével arányosan.",
    sources: ["richardkorom: Fájlkezelés", "info9.edemmester: Fájlok olvasása és feldolgozása"]
  },
  {
    topic: "argparse",
    summary: "Az argparse modul segítségével egyszerűen, „szép” help-szövegekkel és validációval lehet kezelni a CLI argumentumokat; ideális a Secret-DB / Sentinel-stílusú CLI eszközökhöz.",
    sources: ["docs.python: argparse tutorial", "realpython: Build Command-Line Interfaces With Python's argparse"]
  },
  {
    topic: "bcrypt",
    summary: "A bcrypt erősen ajánlott jelszóhash-elési algoritmus, lassú, iterációkon alapszik, így a brute-force támadásokat jelentősen nehezíti.",
    sources: ["geeksforgeeks: Hashing Passwords with Bcrypt", "dev: Password hashing using Bcrypt in Python"]
  },
  {
    topic: "Environment variables",
    summary: "A környezeti változók (pl. DATABASE_SECRET, DEBUG) a os.environ vagy os.getenv() segítségével érhetők el; ideálisak titkos adatok (kulcsok, jelszavak) konfigurálására anélkül, hogy a kódban lennének.",
    sources: ["docs.python: os.environ", "psprog: Mélyebben a Python eszközeiről"]
  },
  {
    topic: "unittest",
    summary: "A unittest modul célja, hogy egyszerű, reprodukálható egység-teszteket írhass kódodra; a TestCase osztályt tervezd úgy, hogy minden tesztmetódus önállóan futtatható legyen.",
    sources: ["realpython: Python's unittest", "richardkorom: Unittest"]
  },
  {
    topic: "Kivételkezelés",
    summary: "A try/except/finally szerkezettel le tudod kezelni a kivételeket, így a CLI-programod nem zuhan össze titkos adatokat kezelő hibák esetén.",
    sources: ["sulipython: Adatbeolvasás"]
  }
];

// Extended common mistakes from Grok + Perplexity material
export const programmingCommonMistakesExtended: string[] = [
  "read() helyett for line in f (memória probléma)",
  "plain text jelszó mentése",
  "print() stderr helyett",
  "argparse nélkül globális változó",
  "nincs if __name__ == '__main__':",
  "unit testben nincs assert",
  "Nem normalizálni a szöveget, hanem csak a .lower()-et használni, így különböző Unicode-formák különkülönnek",
  "Nem kisbetűsíteni (lower() nélkül), így User és user különbőzőnek látszik",
  "Minden keresést a list-én végezni (for x in lst), így lineáris lesz a keresés, nem O(1)",
  "Olyan típusokat adni a set-be, amelyek nem hash-elhetők (pl. dict, list)",
  "readlines() használata óriási fájlokra, ami teljesen elfogyasztja a memóriát",
  "Nem utf-8-as kódolást használni, így ékezetes karakterek széteshetnek",
  "Nem choices=-t használni, így a felhasználó nem megengedett opciókat is adhat meg",
  "required=True hiánya olyan argumentumoknál, ahol a program működéséhez elengedhetetlen",
  "Egy „fix” sót (salt-ot) használni minden jelszóhoz, ami csökkenti a biztonságot",
  "A hasht b\"\" formában próbálják meg változtatni stringként (pl. str(hash) és visszanyerni), ami nem működik",
  "A jelszót a kódban „default”-ként megadni (os.getenv('X', 'hardcoded_pw')), ami biztonsági kockázat",
  "Nem kezelni a None-t, amikor nincs beállítva a környezti változó",
  "Fixture-t (pl. setUp) használni, de a tesztmetódusokat közvetlen futtatni",
  "A tesztek egymásra utalnak, így a sorrend befolyásolja az eredményt"
];
