/**
 * Programozás HUB - Primary source of truth for programming learning content.
 * 
 * This data is independent and useful even outside the university context.
 * School subject pages (Tanuló HUB) surface relevant lessons from here via metadata.
 */

export type ProgrammingTrack = {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "active" | "planned";
  level: "beginner" | "intermediate" | "advanced";
  color: string;
};

export type SchoolSubjectRelevance = {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  relevance: "direct" | "related" | "background";
  reason: string;
  examPriority?: "high" | "medium" | "low";
};

export type ProgrammingContentBlock =
  | { type: "explanation"; title: string; markdown: string }
  | { type: "code"; title?: string; language: "python" | "bash" | "typescript" | "text"; code: string; explanation?: string }
  | { type: "example"; title: string; markdown: string; code?: string }
  | { type: "commonMistake"; title: string; markdown: string }
  | { type: "cybersecurityContext"; title: string; markdown: string }
  | { type: "aiContext"; title: string; markdown: string };

export type ProgrammingExercise = {
  id: string;
  lessonId: string;
  title: string;
  difficulty: "easy" | "medium" | "exam" | "hard";
  prompt: string;
  starterCode?: string;
  expectedOutput?: string;
  solution?: string;
  checkerType: "manual" | "exactOutput" | "futureAi" | "futurePyodide";
  tags: string[];
};

export type ProgrammingLesson = {
  id: string;
  slug: string;
  title: string;
  trackId: "python" | "ai-programozas" | "kiberbiztonsag" | "automatizalas" | "projektek" | "winsoc";
  order: number;
  level: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  summary: string;
  learningGoals: string[];
  tags: string[];
  schoolRelevance: SchoolSubjectRelevance[];
  contentBlocks: ProgrammingContentBlock[];
  exercises: ProgrammingExercise[];
  nextLessonIds: string[];
  previousLessonIds: string[];
};

// Tracks
export const programmingTracks: ProgrammingTrack[] = [
  {
    id: "python",
    title: "Python alapok",
    slug: "python",
    description: "Python programozás alapjaitól a gyakorlati feladatokig. Kezdőknek, vizsgára készülőknek.",
    status: "active",
    level: "beginner",
    color: "#3B82F6",
  },
  {
    id: "automatizalas",
    title: "Automatizálás",
    slug: "automatizalas",
    description: "Fájlkezelés, automatizált scriptek, API-k használata. Gyakorlati eszközök.",
    status: "active",
    level: "intermediate",
    color: "#8B5CF6",
  },
  {
    id: "ai-programozas",
    title: "AI programozás",
    slug: "ai-programozas",
    description: "Python + LLM API-k, prompt engineering, adatfeldolgozás. Hamarosan.",
    status: "planned",
    level: "advanced",
    color: "#10B981",
  },
  {
    id: "kiberbiztonsag",
    title: "Kiberbiztonsági Python",
    slug: "kiberbiztonsag",
    description: "Log elemzés, hálózati automatizálás, biztonsági scriptek. Hamarosan.",
    status: "planned",
    level: "advanced",
    color: "#EF4444",
  },
  {
    id: "winsoc",
    title: "Windows SOC Analyst Tool",
    slug: "winsoc",
    description: "Informatika II. vizsgafelkészülés: Windows SOC elemző rendszer, logfeldolgozás, anomáliadetektálás, integritásellenőrzés, riportgenerálás.",
    status: "active",
    level: "intermediate",
    color: "#0891B2",
  },
  {
    id: "gyakorlas",
    title: "Gyakorlás",
    slug: "gyakorlas",
    description: "Gyakorlófeladatok, vizsgafeladatok, projektötletek.",
    status: "active",
    level: "beginner",
    color: "#F59E0B",
  },
  {
    id: "projektek",
    title: "Projektek",
    slug: "projektek",
    description: "Projektalapú tanulás: kezdő projekt, AI projekt, kiberbiztonsági projekt.",
    status: "active",
    level: "intermediate",
    color: "#6366F1",
  },
];

// Helper function to create lessons
function createLesson(
  id: string,
  slug: string,
  title: string,
  trackId: ProgrammingLesson["trackId"],
  order: number,
  level: ProgrammingLesson["level"],
  estimatedMinutes: number,
  summary: string,
  learningGoals: string[],
  tags: string[],
  schoolRelevance: SchoolSubjectRelevance[],
  contentBlocks: ProgrammingContentBlock[],
  exercises: ProgrammingExercise[],
  nextLessonIds: string[],
  previousLessonIds: string[]
): ProgrammingLesson {
  return {
    id,
    slug,
    title,
    trackId,
    order,
    level,
    estimatedMinutes,
    summary,
    learningGoals,
    tags,
    schoolRelevance,
    contentBlocks,
    exercises,
    nextLessonIds,
    previousLessonIds,
  };
}

// Python track lessons - initial set (simplified markdown to avoid parsing issues)
export const programmingLessons: ProgrammingLesson[] = [
  createLesson(
    "p-001",
    "mi-az-a-programozas",
    "Mi az a programozás?",
    "python",
    1,
    "beginner",
    15,
    "Bevezetes a programozas világába: miért fontos, hogyan működik, alapfogalmak.",
    [
      "Megérteni, mi a programozás alapvető célja",
      "Ismeri a programozási nyelvek fogalmát",
      "Képes példákat mondani a programozás hétköznapi használatára",
    ],
    ["alapok", "bevezetés"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga alapfogalmakat kérdezhet a programozás szerepéről és céljairól.",
        examPriority: "low",
      },
    ],
    [
      {
        type: "explanation",
        title: "Mi a programozás?",
        markdown: "A programozás utasítások megírása a számítógép számára, hogy elvégezzen feladatokat. Gondolj rá úgy, mint egy receptre: lépésről lépésre leírjuk, mit kell tenni, hogy elkészüljön az eredmény.",
      },
      {
        type: "example",
        title: "Hétköznapi példa",
        markdown: "Egy kávéfőző automatizálás: víz töltés, kávé tétel, gomb megnyomás, melegítés, átfolyás. A programozás hasonló lépések sorozata, de számítógépen.",
      },
    ],
    [
      {
        id: "ex-001",
        lessonId: "p-001",
        title: "Programozási példák",
        difficulty: "easy",
        prompt: "Gondolj 3 hétköznapi eszközt vagy folyamatot, ami automatizált. Írd le, milyen lépésekből áll.",
        checkerType: "manual",
        tags: ["gondolkodás", "alapok"],
      },
      {
        id: "ex-013",
        lessonId: "p-001",
        title: "Algoritmus tervezés",
        difficulty: "easy",
        prompt: "Írd le lépésről lépésre, hogyan készítenél el egy teát: víz forralása, tea filter elhelyezése, víz öntése, várakozás.",
        starterCode: "# 1. lépés: víz forralása\n# 2. lépés: tea filter elhelyezése\n# 3. lépés: víz öntése\n# 4. lépés: várakozás",
        solution: "# 1. lépés: víz forralása\n# 2. lépés: tea filter elhelyezése\n# 3. lépés: víz öntése\n# 4. lépés: várakozás\n# 5. lépés: tea elfogyasztása",
        expectedOutput: "Lépésről lépésre leírva a tea elkészítése",
        checkerType: "manual",
        tags: ["algoritmus", "lépés", "gondolkodás"],
      },
    ],
    ["p-002"],
    []
  ),
  createLesson(
    "p-002",
    "python-kornyezet",
    "Python környezet és első program",
    "python",
    2,
    "beginner",
    20,
    "Python telepítése, alapvető eszközök, első Python program futtatása.",
    [
      "Ismeri a Python telepítési lehetőségeket",
      "Képes futtatni Python kódot parancssorból vagy online editorban",
      "Megérti a print() függvény alapvető működését",
    ],
    ["környezet", "bevezetés", "print"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga gyakorlati része Python környezet használata.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga során scripteket kell futtatni.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Python telepítése",
        markdown: "Online editor (gyors kezdéshez): Replit, Google Colab, Python.org online. Helyi telepítés: python.org/downloads, Add Python to PATH opció, ellenőrzés: python --version.",
      },
      {
        type: "code",
        title: "Első program",
        language: "python",
        code: 'print("Hello, Világ!")\nprint("Ez az első Python programom.")',
        explanation: "A print() függvény kiírja a szöveget a képernyőre.",
      },
      {
        type: "commonMistake",
        title: "Gyakori hiba: idézőjelek",
        markdown: "Hibás: print(Hello, Világ!) - Helyes: print('Hello, Világ!') vagy print('Hello, Világ!')",
      },
    ],
    [
      {
        id: "ex-002",
        lessonId: "p-002",
        title: "Köszönés",
        difficulty: "easy",
        prompt: "Írj egy programot, ami kiírja a nevedet és egy köszönést.",
        starterCode: 'print("Szia, a nevem: ")',
        expectedOutput: "Szia, a nevem: [neved]",
        checkerType: "manual",
        tags: ["print", "szöveg"],
      },
      {
        id: "ex-014",
        lessonId: "p-002",
        title: "Számítási műveletek",
        difficulty: "easy",
        prompt: "Írj programot, ami kiszámolja a (10 + 5) * 2 eredményét és kiírja.",
        starterCode: 'eredmeny = (10 + 5) * 2\nprint("Az eredmény:", eredmeny)',
        solution: 'eredmeny = (10 + 5) * 2\nprint("Az eredmény:", eredmeny)',
        expectedOutput: "Az eredmény: 30",
        checkerType: "manual",
        tags: ["print", "műveletek", "vizsga"],
      },
    ],
    ["p-003"],
    ["p-001"]
  ),
  createLesson(
    "p-003",
    "valtozok-es-adattipusok",
    "Változók és adattípusok",
    "python",
    3,
    "beginner",
    25,
    "Változók létrehozása, alapvető adattípusok: int, float, str, bool. Típuskonverzió.",
    [
      "Képes változókat létrehozni és értéket adni nekik",
      "Ismeri az alapvető adattípusokat (int, float, str, bool)",
      "Képes típuskonverziót végezni",
    ],
    ["változók", "adattípusok", "int", "float", "str", "bool"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga alapvető kérdéseket tartalmaz a változókról és adattípusokról.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga gyakorlati feladatai változókat használnak.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Mi a változó?",
        markdown: "A változó egy tároló a memóriában, amibe adatot helyezhetünk el. Adattípusok: int (egész szám), float (törtszám), str (szöveg), bool (igaz/hamis).",
      },
      {
        type: "code",
        title: "Változók példák",
        language: "python",
        code: "kor = 20\nmagassag = 1.75\nnev = 'Anna'\nvizsgazott = True\nprint(kor)\nprint(nev)",
        explanation: "A = jel értékadást jelent.",
      },
      {
        type: "code",
        title: "Típuskonverzió",
        language: "python",
        code: 'szam_szoveg = "42"\nszam = int(szam_szoveg)\negesz = 10\nszoveg = str(egesz)',
        explanation: "Az int(), str(), float() függvényekkel konvertálhatunk típusokat.",
      },
    ],
    [
      {
        id: "ex-003",
        lessonId: "p-003",
        title: "Páros vagy páratlan",
        difficulty: "easy",
        prompt: "Kérj be egy számot a felhasználótól, és írd ki, hogy páros vagy páratlan.",
        starterCode: 'szam = int(input("Adj meg egy számot: "))',
        solution: 'szam = int(input("Adj meg egy számot: "))\nif szam % 2 == 0:\n    print("Páros")\nelse:\n    print("Páratlan")',
        checkerType: "manual",
        tags: ["input", "feltétel", "páros/páratlan"],
      },
      {
        id: "ex-015",
        lessonId: "p-003",
        title: "Korcsoport meghatározás",
        difficulty: "medium",
        prompt: "Kérj be egy életkort, és írd ki a korcsoportot: 0-12: gyermek, 13-17: tinédzser, 18-64: felnőtt, 65+: nyugdíjas.",
        starterCode: 'kor = int(input("Életkor: "))',
        solution: 'kor = int(input("Életkor: "))\nif kor <= 12:\n    print("Gyermek")\nelif kor <= 17:\n    print("Tinédzser")\nelif kor <= 64:\n    print("Felnőtt")\nelse:\n    print("Nyugdíjas")',
        expectedOutput: "Korcsoport a megadott életkor alapján",
        checkerType: "manual",
        tags: ["input", "változó", "feltétel", "vizsga"],
      },
    ],
    ["p-004"],
    ["p-002"]
  ),
  createLesson(
    "p-004",
    "input-es-output",
    "Input és output",
    "python",
    4,
    "beginner",
    20,
    "Adatbekérés input() függvénnyel, formázott kimenet, f-stringek.",
    [
      "Képes adatot bekérni a felhasználótól",
      "Képes formázott szöveget kiírni",
      "Ismeri az f-string használatát",
    ],
    ["input", "output", "f-string"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga gyakorlati feladatai inputot várnak és outputot várnak.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga scriptjei gyakran inputot és outputot használnak.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Input bekérése",
        markdown: "Az input() függvény megállítja a programot és várja a felhasználó bevitelét. Mindig stringet ad vissza. Szám bekérésekor int(input(...)).",
      },
      {
        type: "code",
        title: "f-string használata",
        language: "python",
        code: 'nev = "Gábor"\nkor = 22\nprint(f"A nevem {nev} és {kor} éves vagyok.")',
        explanation: "Az f-string egyszerűsíti a szöveg és változók egyesítését.",
      },
    ],
    [
      {
        id: "ex-004",
        lessonId: "p-004",
        title: "Jegy kalkulátor",
        difficulty: "easy",
        prompt: "Kérj be 3 jegyet, számold ki az átlagukat, és írd ki f-stringgel.",
        starterCode: 'jegy1 = int(input("Első jegy: "))',
        solution: 'jegy1 = int(input("Első jegy: "))\njegy2 = int(input("Második jegy: "))\njegy3 = int(input("Harmadik jegy: "))\natlag = (jegy1 + jegy2 + jegy3) / 3\nprint(f"A jegyek átlaga: {atlag:.2f}")',
        checkerType: "manual",
        tags: ["input", "átlag", "f-string"],
      },
      {
        id: "ex-016",
        lessonId: "p-004",
        title: "Név és kor kimenet",
        difficulty: "easy",
        prompt: "Kérj be egy nevet és egy életkort, majd írd ki: \"X, aki Y éves\" f-stringgel.",
        starterCode: 'nev = input("Név: ")\nkor = int(input("Életkor: "))',
        solution: 'nev = input("Név: ")\nkor = int(input("Életkor: "))\nprint(f"{nev}, aki {kor} éves")',
        expectedOutput: "Név, aki X éves",
        checkerType: "manual",
        tags: ["input", "f-string", "vizsga"],
      },
    ],
    ["p-005"],
    ["p-003"]
  ),
  createLesson(
    "p-005",
    "feltetelek",
    "Feltételek",
    "python",
    5,
    "beginner",
    25,
    "if, elif, else feltételek, összehasonlító operátorok, logikai operátorok.",
    [
      "Képes feltételes elágazást használni",
      "Ismeri az összehasonlító operátorokat (==, !=, <, >, <=, >=)",
      "Ismeri a logikai operátorokat (and, or, not)",
    ],
    ["feltételek", "if", "elif", "else", "logikai"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga szinte minden feladata feltételeket használ.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga scriptjei gyakran tartalmaznak feltételes logikát.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "if, elif, else",
        markdown: "A feltételek lehetővé teszik a program számára, hogy döntéseket hozzon. Szerkezet: if feltétel, elif másik, else minden hamis.",
      },
      {
        type: "code",
        title: "Összehasonlító operátorok",
        language: "python",
        code: "x = 10\nif x == 10:\n    print('Egyenlő')\nelif x > 10:\n    print('Nagyobb')\nelse:\n    print('Kisebb')",
        explanation: "A == az egyenlőség vizsgálat, a = értékadás.",
      },
      {
        type: "code",
        title: "Logikai operátorok",
        language: "python",
        code: "kor = 25\nvizsgazott = True\nif kor >= 18 and vizsgazott:\n    print('Felnőtt és vizsgázott')",
        explanation: "and: mindkettő igaz; or: legalább egyik igaz; not: megfordít.",
      },
    ],
    [
      {
        id: "ex-005",
        lessonId: "p-005",
        title: "Jegy osztályozás",
        difficulty: "medium",
        prompt: "Kérj be egy pontszámot 0-100 között, és írd ki az osztályzatot (5: 90-100, 4: 70-89, 3: 50-69, 2: 30-49, 1: 0-29).",
        starterCode: 'pont = int(input("Pontszám (0-100): "))',
        solution: 'pont = int(input("Pontszám (0-100): "))\nif pont >= 90:\n    print("5")\nelif pont >= 70:\n    print("4")\nelif pont >= 50:\n    print("3")\nelif pont >= 30:\n    print("2")\nelse:\n    print("1")',
        checkerType: "manual",
        tags: ["feltétel", "elif", "osztályozás"],
      },
      {
        id: "ex-017",
        lessonId: "p-005",
        title: "Számhármas ellenőrzés",
        difficulty: "medium",
        prompt: "Kérj be 3 számot, és írd ki, hogy hányuk pozitív, hányuk negatív, és hányuk nulla.",
        starterCode: 'a = int(input("Első szám: "))\nb = int(input("Második szám: "))\nc = int(input("Harmadik szám: "))',
        solution: 'a = int(input("Első szám: "))\nb = int(input("Második szám: "))\nc = int(input("Harmadik szám: "))\npos = neg = nulla = 0\nif a > 0: pos += 1\nelif a < 0: neg += 1\nelse: nulla += 1\nif b > 0: pos += 1\nelif b < 0: neg += 1\nelse: nulla += 1\nif c > 0: pos += 1\nelif c < 0: neg += 1\nelse: nulla += 1\nprint(f"Pozitív: {pos}, Negatív: {neg}, Nulla: {nulla}")',
        expectedOutput: "Pozitív: X, Negatív: Y, Nulla: Z",
        checkerType: "manual",
        tags: ["feltétel", "logikai", "vizsga"],
      },
    ],
    ["p-006"],
    ["p-004"]
  ),
  createLesson(
    "p-006",
    "ciklusok",
    "Ciklusok",
    "python",
    6,
    "beginner",
    30,
    "for ciklus, while ciklus, range(), ciklusvezérlés (break, continue).",
    [
      "Képes for ciklust használni listán és range()-en",
      "Képes while ciklust használni",
      "Ismeri a break és continue utasításokat",
    ],
    ["ciklusok", "for", "while", "range", "break", "continue"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga gyakorlati feladataiban gyakran kell ciklust használni.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga scriptjei gyakran használnak ciklusokat feldolgozáshoz.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "for ciklus",
        markdown: "A for ciklus végigmegy egy sorozaton. range(5): 0,1,2,3,4. range(1,6): 1,2,3,4,5.",
      },
      {
        type: "code",
        title: "for ciklus példák",
        language: "python",
        code: "for i in range(5):\n    print(i)\nnevek = ['Anna', 'Béla']\nfor nev in nevek:\n    print(f'Szia, {nev}!')",
        explanation: "A for ciklus változója minden lépésben felveszi a következő értéket.",
      },
      {
        type: "code",
        title: "while ciklus",
        language: "python",
        code: "szamlalo = 0\nwhile szamlalo < 5:\n    print(szamlalo)\n    szamlalo += 1",
        explanation: "A while ciklus addig fut, amíg a feltétel igaz.",
      },
    ],
    [
      {
        id: "ex-006",
        lessonId: "p-006",
        title: "Számok összege",
        difficulty: "medium",
        prompt: "Kérj be egy N számot, és számold ki az 1-től N-ig terjedő számok összegét for ciklussal.",
        starterCode: 'n = int(input("Adj meg egy számot: "))\nosszeg = 0',
        solution: 'n = int(input("Adj meg egy számot: "))\nosszeg = 0\nfor i in range(1, n + 1):\n    osszeg += i\nprint(f"Az összeg: {osszeg}")',
        checkerType: "manual",
        tags: ["for", "range", "összegzés"],
      },
      {
        id: "ex-018",
        lessonId: "p-006",
        title: "Szorzótábla",
        difficulty: "medium",
        prompt: "Írj programot, ami kiírja a 7-es szorzótáblát 1-től 10-ig.",
        starterCode: 'szam = 7',
        solution: 'szam = 7\nfor i in range(1, 11):\n    print(f"{szam} x {i} = {szam * i}")',
        expectedOutput: "7 x 1 = 7, 7 x 2 = 14, ...",
        checkerType: "manual",
        tags: ["for", "range", "szorzótábla", "vizsga"],
      },
    ],
    ["p-007"],
    ["p-005"]
  ),
  createLesson(
    "p-007",
    "fuggvenyek",
    "Függvények",
    "python",
    7,
    "beginner",
    25,
    "Függvények definiálása (def), paraméterek, visszatérési érték (return).",
    [
      "Képes saját függvényt definiálni",
      "Képes paramétereket adni a függvénynek",
      "Képes értéket visszaadni a függvényből",
    ],
    ["függvények", "def", "paraméter", "return"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga gyakorlati része függvények írását várhatja.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga scriptjei gyakran használnak függvényeket.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Függvény alapjai",
        markdown: "A függvény egy újrafelhasználható kódrészlet. Szerkezet: def nev(parameterek), return ertek.",
      },
      {
        type: "code",
        title: "Függvény példák",
        language: "python",
        code: "def koszones(nev):\n    return f'Szia, {nev}!'\nuzenet = koszones('Gábor')\nprint(uzenet)",
        explanation: "A def kulcsszóval definiálunk, a return-nel adunk vissza értéket.",
      },
    ],
    [
      {
        id: "ex-007",
        lessonId: "p-007",
        title: "Legnagyobb szám",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy listát, és visszaadja a legnagyobb számot.",
        starterCode: 'def legnagyobb(lista):\n    pass\nszamok = [3, 7, 2, 9, 1]\nprint(legnagyobb(szamok))',
        solution: 'def legnagyobb(lista):\n    max_szam = lista[0]\n    for szam in lista:\n        if szam > max_szam:\n            max_szam = szam\n    return max_szam',
        expectedOutput: "9",
        checkerType: "manual",
        tags: ["függvény", "lista", "maximum"],
      },
      {
        id: "ex-019",
        lessonId: "p-007",
        title: "Faktoriális függvény",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kiszámolja egy szám faktoriálisát (n! = 1*2*3*...*n).",
        starterCode: 'def faktorialis(n):\n    pass\nprint(faktorialis(5))',
        solution: 'def faktorialis(n):\n    eredmeny = 1\n    for i in range(1, n + 1):\n        eredmeny *= i\n    return eredmeny',
        expectedOutput: "120",
        checkerType: "manual",
        tags: ["függvény", "for", "faktoriális", "vizsga"],
      },
    ],
    ["p-008"],
    ["p-006"]
  ),
  createLesson(
    "p-008",
    "listak",
    "Listák",
    "python",
    8,
    "beginner",
    30,
    "Listák létrehozása, indexelés, szeletelés, metódusok (append, remove, sort).",
    [
      "Képes listát létrehozni és módosítani",
      "Képes indexelni és szeletelni a listát",
      "Ismeri a legfontosabb listametódusokat",
    ],
    ["listák", "indexelés", "szeletelés", "metódusok"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga gyakorlati feladataiban gyakran kell listát kezelni.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga scriptjei gyakran használnak listákat adattároláshoz.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Lista alapjai",
        markdown: "A lista egy rendezett, módosítható adatszerkezet. Indexelés 0-tól kezdődik. Negatív index hátulról számol.",
      },
      {
        type: "code",
        title: "Listametódusok",
        language: "python",
        code: "szamok = [3, 1, 4, 1, 5]\nszamok.append(9)\nszamok.remove(1)\nszamok.sort()\nprint(len(szamok))",
        explanation: "append: hozzáad, remove: töröl, sort: rendez, len: hossz.",
      },
    ],
    [
      {
        id: "ex-008",
        lessonId: "p-008",
        title: "Páros számok",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy listát, és visszaadja egy új listában a páros számokat.",
        starterCode: 'def paros_szamok(lista):\n    pass\nszamok = [1, 2, 3, 4, 5, 6, 7, 8]\nprint(paros_szamok(szamok))',
        solution: 'def paros_szamok(lista):\n    parosok = []\n    for szam in lista:\n        if szam % 2 == 0:\n            parosok.append(szam)\n    return parosok',
        checkerType: "manual",
        tags: ["lista", "feltétel", "páros"],
      },
      {
        id: "ex-020",
        lessonId: "p-008",
        title: "Lista fordítás",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy listát, és visszaadja a fordítottját.",
        starterCode: 'def forditott(lista):\n    pass\nnevek = ["Anna", "Béla", "Cecil"]\nprint(forditott(nevek))',
        solution: 'def forditott(lista):\n    return lista[::-1]',
        expectedOutput: '["Cecil", "Béla", "Anna"]',
        checkerType: "manual",
        tags: ["lista", "szeletelés", "vizsga"],
      },
    ],
    ["p-009"],
    ["p-007"]
  ),
  createLesson(
    "p-009",
    "stringkezeles",
    "Stringkezelés",
    "python",
    9,
    "beginner",
    25,
    "String metódusok, szeletelés, keresés, cserélés, felosztás.",
    [
      "Képes string metódusokat használni",
      "Képes stringet szeletelni és keresni",
      "Képes stringet felosztani és összefűzni",
    ],
    ["string", "metódusok", "szeletelés", "split", "join"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "A vizsga gyakorlati feladatai gyakran tartalmaznak string feldolgozást.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga scriptjei gyakran használnak stringkezelést.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "String metódusok",
        markdown: "Gyakori metódusok: upper/lower (nagybetű/kisbetű), strip (szóközök eltávolítása), replace (csere), split (felosztás), join (összefűzés).",
      },
      {
        type: "code",
        title: "String műveletek",
        language: "python",
        code: 'szoveg = "  Hello Világ  "\nprint(szoveg.strip())\nprint(szoveg.upper())\nprint(szoveg.replace("Hello", "Szia"))',
        explanation: "A string metódusok új stringet adnak vissza.",
      },
    ],
    [
      {
        id: "ex-009",
        lessonId: "p-009",
        title: "Email ellenőrzés",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy email címet, és visszaadja True, ha tartalmaz @-ot és .-ot, különben False.",
        starterCode: 'def email_ellenorzes(email):\n    pass\nprint(email_ellenorzes("teszt@example.com"))',
        solution: 'def email_ellenorzes(email):\n    return "@" in email and "." in email',
        expectedOutput: "True",
        checkerType: "manual",
        tags: ["string", "ellenőrzés", "email"],
      },
      {
        id: "ex-021",
        lessonId: "p-009",
        title: "Szóközök eltávolítása",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy stringet, és eltávolítja a felesleges szóközöket az elejéről és a végéről.",
        starterCode: 'def tisztit(szoveg):\n    pass\nprint(tisztit("  Hello Világ  "))',
        solution: 'def tisztit(szoveg):\n    return szoveg.strip()',
        expectedOutput: "Hello Világ",
        checkerType: "manual",
        tags: ["string", "strip", "vizsga"],
      },
    ],
    ["p-010"],
    ["p-008"]
  ),
  createLesson(
    "p-010",
    "fajlkezeles",
    "Fájlkezelés",
    "python",
    10,
    "intermediate",
    30,
    "Fájlok megnyitása, olvasása, írása, with blokk.",
    [
      "Képes fájlt megnyitni és olvasni",
      "Képes fájlt írni",
      "Képes a with blokkot használni",
    ],
    ["fájlkezelés", "with", "olvasás", "írás"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "related",
        reason: "A vizsga gyakorlati része tartalmazhat fájlkezelést.",
        examPriority: "medium",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "direct",
        reason: "A laborvizsga során gyakran kell fájlokkal dolgozni.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Fájl megnyitása",
        markdown: "Az open() függvénnyel nyitunk fájlokat. A with blokk biztosítja, hogy a fájl bezáródjon. Módok: r (olvasás), w (írás, felülír), a (hozzáfűzés).",
      },
      {
        type: "code",
        title: "Fájl olvasása és írása",
        language: "python",
        code: "# Olvasás\nwith open('szoveg.txt', 'r', encoding='utf-8') as f:\n    tartalom = f.read()\n    print(tartalom)\n\n# Írás\nwith open('kimenet.txt', 'w', encoding='utf-8') as f:\n    f.write('Hello, fájl!')",
        explanation: "Az encoding=utf-8 biztosítja a magyar karakterek helyes kezelését.",
      },
    ],
    [
      {
        id: "ex-010",
        lessonId: "p-010",
        title: "Fájl sorainak megszámolása",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy fájlnevet, és visszaadja a sorok számát.",
        starterCode: 'def sorok_szama(fajlnev):\n    pass\nprint(sorok_szama("szoveg.txt"))',
        solution: 'def sorok_szama(fajlnev):\n    with open(fajlnev, "r", encoding="utf-8") as f:\n        sorok = f.readlines()\n        return len(sorok)',
        checkerType: "manual",
        tags: ["fájl", "olvasás", "sorok"],
      },
      {
        id: "ex-022",
        lessonId: "p-010",
        title: "Szavak megszámolása",
        difficulty: "medium",
        prompt: "Írj egy függvényt, ami kap egy fájlnevet, és visszaadja a szavak számát a fájlban.",
        starterCode: 'def szavak_szama(fajlnev):\n    pass\nprint(szavak_szama("szoveg.txt"))',
        solution: 'def szavak_szama(fajlnev):\n    with open(fajlnev, "r", encoding="utf-8") as f:\n        tartalom = f.read()\n        szavak = tartalom.split()\n        return len(szavak)',
        expectedOutput: "Szavak száma a fájlban",
        checkerType: "manual",
        tags: ["fájl", "olvasás", "split", "vizsga"],
      },
    ],
    ["p-011"],
    ["p-009"]
  ),
  createLesson(
    "p-011",
    "egyszeru-vizsgafeladatok",
    "Egyszerű vizsgafeladatok",
    "python",
    11,
    "intermediate",
    40,
    "Gyakorlati vizsgafeladatok megoldása, tipikus hibák, megoldási stratégiák.",
    [
      "Képes egyszerű vizsgafeladatokat megoldani",
      "Ismeri a tipikus vizsgahibákat",
      "Képes megoldási stratégiát alkalmazni",
    ],
    ["vizsgafeladatok", "gyakorlat", "hibák"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "direct",
        reason: "Ez a lecke közvetlenül a vizsgára készít fel.",
        examPriority: "high",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A laborvizsga gyakorlati feladatai hasonlóak a vizsgafeladatokhoz.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Vizsgafeladatok típusai",
        markdown: "Gyakorlati vizsgafeladatok jellemzői: input bekérése, feldolgozás, output kiírása. Időlimit általában 15-20 perc.",
      },
      {
        type: "commonMistake",
        title: "Gyakori vizsgahibák",
        markdown: "1. Nem tesztel: rossz eredmény. 2. Típushiba: input() stringet ad. 3. Végtelen ciklus. 4. Fájl bezárás hiánya. 5. Magyar karakterek: encoding=utf-8 hiánya.",
      },
    ],
    [
      {
        id: "ex-011",
        lessonId: "p-011",
        title: "Jelszó hossz ellenőrzés",
        difficulty: "exam",
        prompt: "Kérj be egy jelszót. Ha legalább 8 karakter, írj ki Erős, különben Gyenge.",
        starterCode: 'jelszo = input("Jelszó: ")',
        solution: 'jelszo = input("Jelszó: ")\nif len(jelszo) >= 8:\n    print("Erős")\nelse:\n    print("Gyenge")',
        checkerType: "manual",
        tags: ["vizsga", "feltétel", "string"],
      },
      {
        id: "ex-023",
        lessonId: "p-011",
        title: "Összetett vizsgafeladat",
        difficulty: "exam",
        prompt: "Kérj be 5 jegyet, számold ki az átlagukat, és írd ki az osztályzatot (5: 90+, 4: 70+, 3: 50+, 2: 30+, 1: egyébként).",
        starterCode: 'jegyek = []\nfor i in range(5):\n    jegy = int(input(f"{i+1}. jegy: "))\n    jegyek.append(jegy)',
        solution: 'jegyek = []\nfor i in range(5):\n    jegy = int(input(f"{i+1}. jegy: "))\n    jegyek.append(jegy)\natlag = sum(jegyek) / len(jegyek)\nif atlag >= 90:\n    print("5")\nelif atlag >= 70:\n    print("4")\nelif atlag >= 50:\n    print("3")\nelif atlag >= 30:\n    print("2")\nelse:\n    print("1")',
        expectedOutput: "Osztályzat az átlag alapján",
        checkerType: "manual",
        tags: ["vizsga", "input", "ciklus", "feltétel", "összetett"],
      },
      {
        id: "ex-024",
        lessonId: "p-011",
        title: "Hibakeresés gyakorlat",
        difficulty: "exam",
        prompt: "Találd meg és javítsd ki a hibát: a kódnak össze kell adnia 1-től 5-ig a számokat.",
        starterCode: 'sum = 0\nfor i in range(5):\n    sum = sum + i\nprint(sum)',
        solution: 'sum = 0\nfor i in range(1, 6):  # range(1, 6) helyett range(5)\n    sum = sum + i\nprint(sum)',
        expectedOutput: "15",
        checkerType: "manual",
        tags: ["vizsga", "hibakeresés", "ciklus", "range"],
      },
    ],
    ["p-012"],
    ["p-010"]
  ),
  createLesson(
    "p-012",
    "mini-projekt-jelszoerosseg",
    "Mini projekt: Jelszóerősség-ellenőrző",
    "python",
    12,
    "intermediate",
    45,
    "Komplexabb projekt: jelszóerősség ellenőrzése hossz, kis/nagybetű, szám, speciális karakter alapján.",
    [
      "Képes komplexabb feltételrendszert építeni",
      "Képes függvényeket kombinálni",
      "Képes felhasználói élményt javítani",
    ],
    ["projekt", "jelszó", "feltételek", "függvények"],
    [
      {
        subjectId: "bbxpr12blf",
        subjectCode: "BBXPR12BLF",
        subjectName: "Programozás",
        relevance: "related",
        reason: "A projekt összefoglalja az alapvető tudást, hasonló a vizsgafeladatokhoz.",
        examPriority: "medium",
      },
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II.",
        relevance: "related",
        reason: "A jelszóerősség-ellenőrzés gyakorlati biztonsági eszköz.",
        examPriority: "low",
      },
    ],
    [
      {
        type: "explanation",
        title: "Projekt leírás",
        markdown: "Cél: program ami értékeli a jelszó erősségét. Szempontok: hossz >= 8, kisbetű, nagybetű, szám, speciális karakter. Eredmény: 0-2 Gyenge, 3-4 Közepes, 5 Erős.",
      },
      {
        type: "code",
        title: "Megoldás vázlata",
        language: "python",
        code: 'def jelszo_erosseg(jelszo):\n    szempontok = 0\n    if len(jelszo) >= 8:\n        szempontok += 1\n    if any(c.islower() for c in jelszo):\n        szempontok += 1\n    if any(c.isupper() for c in jelszo):\n        szempontok += 1\n    if any(c.isdigit() for c in jelszo):\n        szempontok += 1\n    if any(c in "!@#$%^&*" for c in jelszo):\n        szempontok += 1\n    if szempontok <= 2:\n        return "Gyenge"\n    elif szempontok <= 4:\n        return "Közepes"\n    else:\n        return "Erős"',
        explanation: "Az any() függvény ellenőrzi, hogy van-e legalább egy elem, ami megfelel a feltételnek.",
      },
      {
        type: "cybersecurityContext",
        title: "Biztonsági kontextus",
        markdown: "A jelszóerősség-ellenőrzés a kiberbiztonság alapvető eszköze. Gyenge jelszavak: brute force, dictionary attack, social engineering. Javaslatok: jelszókezelő, két faktoros hitelesítés.",
      },
    ],
    [
      {
        id: "ex-012",
        lessonId: "p-012",
        title: "Jelszóerősség-ellenőrző",
        difficulty: "hard",
        prompt: "Implementáld a jelszóerősség-ellenőrző programot a fenti leírás alapján.",
        starterCode: 'def jelszo_erosseg(jelszo):\n    pass\njelszo = input("Jelszó: ")\nprint(jelszo_erosseg(jelszo))',
        solution: 'def jelszo_erosseg(jelszo):\n    szempontok = 0\n    if len(jelszo) >= 8:\n        szempontok += 1\n    if any(c.islower() for c in jelszo):\n        szempontok += 1\n    if any(c.isupper() for c in jelszo):\n        szempontok += 1\n    if any(c.isdigit() for c in jelszo):\n        szempontok += 1\n    if any(c in "!@#$%^&*" for c in jelszo):\n        szempontok += 1\n    if szempontok <= 2:\n        return "Gyenge"\n    elif szempontok <= 4:\n        return "Közepes"\n    else:\n        return "Erős"\njelszo = input("Jelszó: ")\nprint(jelszo_erosseg(jelszo))',
        checkerType: "manual",
        tags: ["projekt", "jelszó", "feltételek", "biztonság"],
      },
    ],
    [],
    ["p-011"]
  ),
  // WinSOC track lessons - Informatika II. SOC project preparation
  createLesson(
    "w-001",
    "soc-projekt-attekintes",
    "SOC projekt áttekintése",
    "winsoc",
    1,
    "intermediate",
    20,
    "A Windows SOC Analyst Tool projekt áttekintése: SOC alapok, SIEM log elemzés, projektstruktúra, modulok szerepe.",
    [
      "Megérteni a SOC (Security Operations Center) alapfogalmait",
      "Ismeri a Windows SOC elemző rendszer projekt céljait",
      "Átlátja a projekt moduljainak szerepét és kapcsolatát",
    ],
    ["soc", "siem", "log-elemzés", "projekt"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A vizsga fő témája a Windows SOC Analyst Tool projekt megértése.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Mi a SOC?",
        markdown: "A SOC (Security Operations Center) egy biztonsági műveleti központ, amely valós idejű biztonsági eseményeket figyel, elemz és reagál rájuk. A SIEM (Security Information and Event Management) rendszerek összegyűjtik és korrelálják a logokat különböző forrásokból.",
      },
      {
        type: "explanation",
        title: "Projekt áttekintés",
        markdown: "A Windows SOC Analyst Tool Python projekt célja, hogy automatizálja a Windows rendszer logok elemzését, anomáliákat detektáljon, és riportokat generáljon. A projekt moduláris felépítésű: Template Engine, Mock Log Generator, Windows Log Parser, Anomaly Detector, Integrity Checker, Report Generator, Main Application, CLI.",
      },
    ],
    [],
    ["w-002"],
    []
  ),
  createLesson(
    "w-002",
    "python-modulok-projektstruktura",
    "Python modulok és projektstruktúra",
    "winsoc",
    2,
    "intermediate",
    25,
    "Python modulok, csomagok, projektstruktúra, pyproject.toml, PyCharm setup. Hogyan szervezzük a SOC projektet.",
    [
      "Megérteni a Python modulok és csomagok működését",
      "Képes PyCharm projektet létrehozni és konfigurálni",
      "Ismeri a pyproject.toml szerepét",
    ],
    ["modulok", "projekt", "pyproject", "pycharm"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A vizsgán a projektstruktúra és modulok megértése elengedhetetlen.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Python modulok",
        markdown: "A Python modulok .py fájlok, amelyek függvényeket, osztályokat és változókat tartalmaznak. A csomagok (packages) modulok gyűjteményei, amelyek __init__.py fájllal vannak jelölve.",
      },
      {
        type: "code",
        title: "pyproject.toml példa",
        language: "text",
        code: "[project]\nname = \"winsoc\"\nversion = \"1.0.0\"\ndependencies = [\"pytest\"]",
      },
    ],
    [],
    ["w-003"],
    ["w-001"]
  ),
  createLesson(
    "w-003",
    "template-engine-alapok",
    "Template Engine alapok",
    "winsoc",
    3,
    "intermediate",
    20,
    "Template Engine modul: hogyan generálunk dinamikus tartalmat sablonokból. String formázás, f-strings, egyszerű sablonok.",
    [
      "Megérteni a template engine alapvető működését",
      "Képes egyszerű string sablonokat létrehozni",
      "Ismeri a Python string formázási lehetőségeit",
    ],
    ["template", "string-formázás", "f-strings"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A Template Engine a projekt egyik kulcsmodulja, a riportgenerálás alapja.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Template Engine",
        markdown: "A Template Engine modul a dinamikus tartalom generálását végzi sablonok alapján. A projektben HTML és JSON riportok generálására használjuk. Pythonban f-strings és a string formázás a leggyakrabban használt eszközök.",
      },
      {
        type: "code",
        title: "String formázás példa",
        language: "python",
        code: "nev = \"János\"\nkor = 25\nuzenet = f\"Szia {nev}, te {kor} éves vagy.\"\nprint(uzenet)",
      },
    ],
    [
      {
        id: "ex-025",
        lessonId: "w-003",
        title: "Egyszerű string sablon",
        difficulty: "easy",
        prompt: "Készíts egy függvényt, ami egy nevet és egy kort vár paraméterként, és visszaad egy formázott stringet.",
        starterCode: "def udvoslo(nev, kor):\n    pass\nprint(udvoslo('Anna', 20))",
        solution: "def udvoslo(nev, kor):\n    return f\"Szia {nev}, te {kor} éves vagy.\"\nprint(udvoslo('Anna', 20))",
        checkerType: "manual",
        tags: ["string", "f-strings", "template"],
      },
    ],
    ["w-004"],
    ["w-002"]
  ),
  createLesson(
    "w-004",
    "mock-log-generator",
    "Mock log generátor",
    "winsoc",
    4,
    "intermediate",
    25,
    "Mock Log Generator modul: hogyan generálunk teszt logokat. Random, datetime, string manipuláció.",
    [
      "Megérteni a mock log generátor szerepét a tesztelésben",
      "Képes véletlenszerű log sorokat generálni",
      "Ismeri a Python random és datetime modulokat",
    ],
    ["mock-log", "random", "datetime", "generálás"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A Mock Log Generator tesztadatokat szolgáltat a parser és anomália detektor teszteléséhez.",
        examPriority: "medium",
      },
    ],
    [
      {
        type: "explanation",
        title: "Mock Log Generator",
        markdown: "A Mock Log Generator modul teszt logokat generál különböző eseménytípusokkal (sikeres bejelentkezés, sikertelen bejelentkezés, fájl hozzáférés, stb.). Ezek a logok a parser és anomália detektor teszteléséhez kellenek.",
      },
      {
        type: "code",
        title: "Random log sor generálás",
        language: "python",
        code: "import random\nfrom datetime import datetime\n\nevents = ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'FILE_ACCESS']\nevent = random.choice(events)\ntimestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')\nprint(f'{timestamp} {event}'",
      },
    ],
    [
      {
        id: "ex-026",
        lessonId: "w-004",
        title: "Véletlenszerű esemény generálás",
        difficulty: "easy",
        prompt: "Készíts egy függvényt, ami véletlenszerűen választ egy eseményt egy listából és visszaadja.",
        starterCode: "import random\nevents = ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'FILE_ACCESS']\ndef random_event():\n    pass\nprint(random_event())",
        solution: "import random\nevents = ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'FILE_ACCESS']\ndef random_event():\n    return random.choice(events)\nprint(random_event())",
        checkerType: "manual",
        tags: ["random", "generálás"],
      },
    ],
    ["w-005"],
    ["w-003"]
  ),
  createLesson(
    "w-005",
    "windows-log-parser",
    "Windows log parser",
    "winsoc",
    5,
    "intermediate",
    30,
    "Windows Log Parser modul: log sorok feldarabolása, mezők kinyerése, regex alapú elemzés. Ez a projekt egyik legfontosabb modulja.",
    [
      "Megérteni a Windows log formátumát",
      "Képes log sorokat feldarabolni mezőkre",
      "Ismeri a regex alapú string egyeztetést",
    ],
    ["parser", "log-elemzés", "regex", "string"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A Windows Log Parser a projekt legfontosabb modulja, a vizsga kulcstémája.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Windows Log Parser",
        markdown: "A Windows Log Parser modul felelős a log sorok feldarabolásáért és a mezők kinyeréséért. A Windows logok általában timestamp, event ID, source computer, user, és egyéb mezőket tartalmaznak. Regex segítségével ezeket a mezőket kinyerhetjük.",
      },
      {
        type: "code",
        title: "Log sor feldarabolása regex-szel",
        language: "python",
        code: "import re\n\nlog_line = '2026-05-09 10:15:23 LOGIN_SUCCESS user=john workstation=PC001'\npattern = r'(?P<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (?P<event>\\w+) (?P<user>user=\\w+)'\nmatch = re.search(pattern, log_line)\nif match:\n    print(match.group('event'))",
      },
    ],
    [
      {
        id: "ex-027",
        lessonId: "w-005",
        title: "Log sor feldarabolása",
        difficulty: "medium",
        prompt: "Készíts egy függvényt, ami feldarabol egy log sort és kinyeri az esemény típusát és a felhasználót.",
        starterCode: "import re\n\ndef parse_log(log_line):\n    pass\n\nlog = '2026-05-09 10:15:23 LOGIN_SUCCESS user=john'\nprint(parse_log(log))",
        solution: "import re\n\ndef parse_log(log_line):\n    pattern = r'(?P<event>\\w+) user=(?P<user>\\w+)'\n    match = re.search(pattern, log_line)\n    if match:\n        return {'event': match.group('event'), 'user': match.group('user')}\n    return None\n\nlog = '2026-05-09 10:15:23 LOGIN_SUCCESS user=john'\nprint(parse_log(log))",
        checkerType: "manual",
        tags: ["regex", "parser", "log"],
      },
    ],
    ["w-006"],
    ["w-004"]
  ),
  createLesson(
    "w-006",
    "anomalia-detektor",
    "Anomália detektor",
    "winsoc",
    6,
    "intermediate",
    25,
    "Anomaly Detector modul: gyanús tevékenységek felismerése. IP címek figyelése, brute force küszöb, Counter használata.",
    [
      "Megérteni az anomáliadetektálás alapelveit",
      "Képes brute force kísérleteket felismerni",
      "Ismeri a Counter osztály használatát statisztikához",
    ],
    ["anomália", "detektálás", "brute-force", "counter"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "Az Anomaly Detector a projekt egyik legfontosabb modulja, a vizsga kulcstémája.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Anomaly Detector",
        markdown: "Az Anomaly Detector modul gyanús tevékenységeket keres a logokban. Például: brute force kísérletek (sok sikertelen bejelentkezés ugyanarról az IP-ről), furcsa fájl hozzáférések, szokatlan időpontokban történő események.",
      },
      {
        type: "code",
        title: "Brute force felismerés",
        language: "python",
        code: "from collections import Counter\n\nfailed_logins = ['192.168.1.10', '192.168.1.10', '192.168.1.10', '10.0.0.5']\ncounts = Counter(failed_logins)\nfor ip, count in counts.items():\n    if count >= 3:\n        print(f'Brute force detected from {ip}: {count} attempts')",
      },
    ],
    [
      {
        id: "ex-028",
        lessonId: "w-006",
        title: "Sikertelen belépések számolása",
        difficulty: "medium",
        prompt: "Készíts egy függvényt, ami megszámolja a sikertelen bejelentkezéseket IP cím szerint.",
        starterCode: "from collections import Counter\n\ndef count_failed_logins(logs):\n    pass\n\nlogs = ['192.168.1.10', '192.168.1.10', '10.0.0.5']\nprint(count_failed_logins(logs))",
        solution: "from collections import Counter\n\ndef count_failed_logins(logs):\n    return Counter(logs)\n\nlogs = ['192.168.1.10', '192.168.1.10', '10.0.0.5']\nprint(count_failed_logins(logs))",
        checkerType: "manual",
        tags: ["counter", "brute-force", "statiszika"],
      },
    ],
    ["w-007"],
    ["w-005"]
  ),
  createLesson(
    "w-007",
    "fajlintegritas-ellenorzes",
    "Fájlintegritás-ellenőrzés",
    "winsoc",
    7,
    "intermediate",
    20,
    "Integrity Checker modul: fájl hash számítása, integritás változás felismerése. hashlib, pathlib használata.",
    [
      "Megérteni a fájlintegritás-ellenőrzés alapjait",
      "Képes hash értéket számolni fájloknak",
      "Ismeri a hashlib és pathlib modulokat",
    ],
    ["integritás", "hash", "hashlib", "pathlib"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "Az Integrity Checker modul a HIDS (Host-based Intrusion Detection System) része.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Integrity Checker",
        markdown: "Az Integrity Checker modul fájlok hash értékeit számolja és figyeli a változásokat. Ha egy fájl hash értéke megváltozik, az azt jelzi, hogy a fájlt módosították - ez lehet jogosult módosítás vagy támadás.",
      },
      {
        type: "code",
        title: "Fájl hash számítása",
        language: "python",
        code: "import hashlib\n\ndef calculate_hash(filepath):\n    sha256_hash = hashlib.sha256()\n    with open(filepath, 'rb') as f:\n        for chunk in iter(lambda: f.read(4096), b\"\"):\n            sha256_hash.update(chunk)\n    return sha256_hash.hexdigest()",
      },
    ],
    [
      {
        id: "ex-029",
        lessonId: "w-007",
        title: "Fájl hash számítása",
        difficulty: "medium",
        prompt: "Készíts egy függvényt, ami SHA256 hash-t számít egy fájlnak.",
        starterCode: "import hashlib\n\ndef calculate_hash(filepath):\n    pass\n\nprint(calculate_hash('test.txt'))",
        solution: "import hashlib\n\ndef calculate_hash(filepath):\n    sha256_hash = hashlib.sha256()\n    with open(filepath, 'rb') as f:\n        for chunk in iter(lambda: f.read(4096), b\"\"):\n            sha256_hash.update(chunk)\n    return sha256_hash.hexdigest()\n\nprint(calculate_hash('test.txt'))",
        checkerType: "manual",
        tags: ["hash", "hashlib", "fájl"],
      },
    ],
    ["w-008"],
    ["w-006"]
  ),
  createLesson(
    "w-008",
    "html-json-riportgenerator",
    "HTML/JSON riportgenerálás",
    "winsoc",
    8,
    "intermediate",
    25,
    "Report Generator modul: HTML és JSON riportok generálása. Template engine használata, JSON serializáció.",
    [
      "Megérteni a riportgenerálás célját",
      "Képes egyszerű HTML riportot generálni",
      "Ismeri a JSON serializációt",
    ],
    ["riport", "html", "json", "generálás"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A Report Generator modul a vizsga kulcstémája, a végeredmény megjelenítése.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Report Generator",
        markdown: "A Report Generator modul HTML és JSON riportokat generál az elemzett logok alapján. A HTML riport emberileg olvasható, a JSON riport gépi feldolgozásra alkalmas.",
      },
      {
        type: "code",
        title: "JSON riport generálás",
        language: "python",
        code: "import json\n\nevents = [{'event': 'LOGIN_SUCCESS', 'count': 5}, {'event': 'LOGIN_FAILED', 'count': 3}]\nreport = {'timestamp': '2026-05-09', 'summary': events}\nprint(json.dumps(report, indent=2))",
      },
    ],
    [
      {
        id: "ex-030",
        lessonId: "w-008",
        title: "JSON riport generálás",
        difficulty: "medium",
        prompt: "Készíts egy függvényt, ami JSON riportot generál eseményekből.",
        starterCode: "import json\n\ndef generate_report(events):\n    pass\n\nevents = [{'event': 'LOGIN_SUCCESS', 'count': 5}]\nprint(generate_report(events))",
        solution: "import json\n\ndef generate_report(events):\n    return json.dumps({'events': events}, indent=2)\n\nevents = [{'event': 'LOGIN_SUCCESS', 'count': 5}]\nprint(generate_report(events))",
        checkerType: "manual",
        tags: ["json", "riport", "generálás"],
      },
    ],
    ["w-009"],
    ["w-007"]
  ),
  createLesson(
    "w-009",
    "unit-test-alapok",
    "Unit test alapok",
    "winsoc",
    9,
    "intermediate",
    20,
    "Unit test alapok: pytest használata, tesztek írása, assert utasítások. A projekt tesztelése.",
    [
      "Megérteni a unit tesztelés célját",
      "Képes egyszerű pytest tesztet írni",
      "Ismeri az assert utasításokat",
    ],
    ["unit-test", "pytest", "tesztelés"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A vizsgán a tesztek megértése és futtatása elengedhetetlen.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Unit Test",
        markdown: "A unit tesztelés a kód egyes részeinek (függvények, osztályok) tesztelése. A projektben pytest-et használunk. A tesztek ellenőrzik, hogy a kód helyesen működik-e.",
      },
      {
        type: "code",
        title: "Egyszerű pytest teszt",
        language: "python",
        code: "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0",
      },
    ],
    [
      {
        id: "ex-031",
        lessonId: "w-009",
        title: "Unit test írása",
        difficulty: "easy",
        prompt: "Írj egy unit tesztet egy egyszerű függvényhez.",
        starterCode: "def add(a, b):\n    return a + b\n\ndef test_add():\n    pass",
        solution: "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0",
        checkerType: "manual",
        tags: ["unit-test", "pytest", "assert"],
      },
    ],
    ["w-010"],
    ["w-008"]
  ),
  createLesson(
    "w-010",
    "teljes-pipeline-megertese",
    "Teljes pipeline megértése",
    "winsoc",
    10,
    "intermediate",
    30,
    "A teljes SOC pipeline megértése: hogyan áramlik az adat a modulok között. Mock log → Parser → Anomaly Detector → Integrity Checker → Report Generator.",
    [
      "Megérteni a teljes SOC pipeline adatáramlását",
      "Képes magyarázni a modulok közötti kapcsolatokat",
      "Ismeri a projekt fő alkalmazását és CLI-jét",
    ],
    ["pipeline", "adatáramlás", "integráció"],
    [
      {
        subjectId: "bbxin2kblf",
        subjectCode: "BBXIN2KBLF",
        subjectName: "Informatika II. (laborgyak)",
        relevance: "direct",
        reason: "A vizsga fő kérdése a teljes pipeline megértése és működése.",
        examPriority: "high",
      },
    ],
    [
      {
        type: "explanation",
        title: "Teljes Pipeline",
        markdown: "A SOC pipeline a következő lépésekből áll: 1) Mock Log Generator generál teszt logokat. 2) Windows Log Parser feldarabolja a logokat. 3) Anomaly Detector keres gyanús tevékenységeket. 4) Integrity Checker figyeli a fájl integritást. 5) Report Generator HTML/JSON riportot készít. A Main Application koordinálja a modulokat, a CLI parancssori interfészt biztosítja.",
      },
      {
        type: "explanation",
        title: "Vizsga előtti minimum",
        markdown: "A vizsgához minimálisan szükséges: megérteni a TemplateEngine-t, a mock logokat, a parsert, az anomaly detectort, a report generátort, tudni futtatni a teszteket, és tudni értelmezni a generált riportot.",
      },
    ],
    [],
    ["w-009"],
    []
  ),
];

// Projects
export const programmingProjects = [
  {
    id: "proj-001",
    slug: "jelszoerosseg-ellenorzo",
    title: "Jelszóerősség-ellenőrző",
    trackId: "projektek",
    level: "beginner",
    description: "Egy egyszerű program, ami értékeli a jelszó erősségét több szempont alapján.",
    requiredLessonIds: ["p-005", "p-007", "p-009"],
    tags: ["jelszó", "feltételek", "string"],
    estimatedHours: 1,
  },
  {
    id: "proj-002",
    slug: "szamlalo-feladat",
    title: "Számláló feladat",
    trackId: "projektek",
    level: "beginner",
    description: "Szövegfájl beolvasása, szavak megszámolása, statisztika készítése.",
    requiredLessonIds: ["p-010"],
    tags: ["fájl", "szöveg", "statztika"],
    estimatedHours: 1.5,
  },
  {
    id: "proj-003",
    slug: "ai-api-kliens",
    title: "AI API kliens (tervezett)",
    trackId: "ai-programozas",
    level: "advanced",
    description: "Python program, ami OpenAI vagy más LLM API-t használ.",
    requiredLessonIds: [],
    tags: ["ai", "api", "python"],
    estimatedHours: 3,
    status: "planned",
  },
  {
    id: "proj-004",
    slug: "log-elemzo",
    title: "Log elemző (tervezett)",
    trackId: "kiberbiztonsag",
    level: "advanced",
    description: "Python script, ami rendszernaplókat elemez és gyanús tevékenységeket keres.",
    requiredLessonIds: [],
    tags: ["log", "biztonság", "elemzés"],
    estimatedHours: 4,
    status: "planned",
  },
];
