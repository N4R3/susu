export type CodingTestCase = {
  id: string;
  questionId: string;
  label: string;
  functionName?: string;
  args?: unknown[];
  expectedReturn?: unknown;
  stdin?: string;
  expectedStdout?: string;
  expectedStderr?: string;
  hidden?: boolean;
  explanation?: string;
};

export type CodingQuestionTestSuite = {
  questionId: string;
  title: string;
  mode: "function-return" | "stdout" | "conceptual-manual";
  testCases: CodingTestCase[];
};

// Programozás test cases
export const programozasStringNormalization: CodingQuestionTestSuite = {
  questionId: "prog-string-normalization",
  title: "String normalizáció",
  mode: "function-return",
  testCases: [
    {
      id: "tc-001",
      questionId: "prog-string-normalization",
      label: "Alap teszt: szóközök és nagybetűk",
      functionName: "normalize_string",
      args: [" Kovács János "],
      expectedReturn: "kovacsjanos",
      hidden: false,
      explanation: "A szöveg elejéről és végéről a szóközöket el kell távolítani, majd minden nagybetűt kisbetűre alakítani, és az ékezetes karaktereket is le kell cserélni."
    },
    {
      id: "tc-002",
      questionId: "prog-string-normalization",
      label: "Csak nagybetűk",
      functionName: "normalize_string",
      args: ["ADMIN"],
      expectedReturn: "admin",
      hidden: false,
      explanation: "A teljes szöveget kisbetűre kell alakítani."
    },
    {
      id: "tc-003",
      questionId: "prog-string-normalization",
      label: "Üres string",
      functionName: "normalize_string",
      args: [""],
      expectedReturn: "",
      hidden: false,
      explanation: "Az üres string üres string marad."
    },
    {
      id: "tc-004",
      questionId: "prog-string-normalization",
      label: "Ékezetes karakterek",
      functionName: "normalize_string",
      args: ["Éva Ádám"],
      expectedReturn: "evaadam",
      hidden: false,
      explanation: "Az ékezetes karaktereket (É, Á) le kell cserélni a megfelelő nem ékezetes karakterekre (e, a)."
    },
    {
      id: "tc-005",
      questionId: "prog-string-normalization",
      label: "Rejtett teszt: komplexabb szöveg",
      functionName: "normalize_string",
      args: ["  KÖZÉP-iskola 123  "],
      expectedReturn: "kozepiskola123",
      hidden: true,
      explanation: "Többszörös szóközök, nagybetűk és ékezetek együtt."
    }
  ]
};

export const programozasSetDuplicateDetection: CodingQuestionTestSuite = {
  questionId: "prog-set-duplicate",
  title: "Duplikátum detektálás",
  mode: "function-return",
  testCases: [
    {
      id: "tc-011",
      questionId: "prog-set-duplicate",
      label: "Van duplikátum",
      functionName: "has_duplicate_normalized",
      args: [["admin", "user", "admin", "guest"]],
      expectedReturn: true,
      hidden: false,
      explanation: "A lista tartalmazza az 'admin' elemet kétszer."
    },
    {
      id: "tc-012",
      questionId: "prog-set-duplicate",
      label: "Nincs duplikátum",
      functionName: "has_duplicate_normalized",
      args: [["admin", "user", "guest"]],
      expectedReturn: false,
      hidden: false,
      explanation: "Az összes elem egyedi."
    },
    {
      id: "tc-013",
      questionId: "prog-set-duplicate",
      label: "Üres lista",
      functionName: "has_duplicate_normalized",
      args: [[]],
      expectedReturn: false,
      hidden: false,
      explanation: "Az üres listában nincs duplikátum."
    },
    {
      id: "tc-014",
      questionId: "prog-set-duplicate",
      label: "Egy elem",
      functionName: "has_duplicate_normalized",
      args: [["admin"]],
      expectedReturn: false,
      hidden: false,
      explanation: "Egy elemnél nincs duplikátum."
    },
    {
      id: "tc-015",
      questionId: "prog-set-duplicate",
      label: "Rejtett teszt: nagy listában duplikátum",
      functionName: "has_duplicate_normalized",
      args: [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a"]],
      expectedReturn: true,
      hidden: true,
      explanation: "Az 'a' elem kétszer szerepel a végén."
    }
  ]
};

export const programozasFileIOSimulation: CodingQuestionTestSuite = {
  questionId: "prog-file-io-simulation",
  title: "Fájl I/O szimuláció",
  mode: "function-return",
  testCases: [
    {
      id: "tc-021",
      questionId: "prog-file-io-simulation",
      label: "Egyszerű titkok",
      functionName: "load_secrets_from_text",
      args: ["admin123\nguest456\nuser789"],
      expectedReturn: ["admin123", "guest456", "user789"],
      hidden: false,
      explanation: "A soronkénti titkokat listába kell gyűjteni."
    },
    {
      id: "tc-022",
      questionId: "prog-file-io-simulation",
      label: "Üres szöveg",
      functionName: "load_secrets_from_text",
      args: [""],
      expectedReturn: [],
      hidden: false,
      explanation: "Az üres szöveg esetén üres listát kell visszaadni."
    },
    {
      id: "tc-023",
      questionId: "prog-file-io-simulation",
      label: "Szóközök és üres sorok",
      functionName: "load_secrets_from_text",
      args: ["admin123\n\nguest456\n  \nuser789"],
      expectedReturn: ["admin123", "guest456", "user789"],
      hidden: false,
      explanation: "Az üres sorokat és a szóközöket tartalmazó sorokat ki kell szűrni."
    },
    {
      id: "tc-024",
      questionId: "prog-file-io-simulation",
      label: "Rejtett teszt: kommentek és szóközök",
      functionName: "load_secrets_from_text",
      args: ["# comment\nadmin123\n# another comment\nguest456"],
      expectedReturn: ["admin123", "guest456"],
      hidden: true,
      explanation: "A komment sorokat (amelyek #-tel kezdődnek) ki kell szűrni."
    }
  ]
};

// Informatika II test cases
export const informatika2ParseLogLine: CodingQuestionTestSuite = {
  questionId: "info2-parse-log",
  title: "Log sor elemzése",
  mode: "function-return",
  testCases: [
    {
      id: "tc-031",
      questionId: "info2-parse-log",
      label: "Sikeres bejelentkezés",
      functionName: "parse_log_line",
      args: ["[INFO] 192.168.1.100 login success event_id:12345"],
      expectedReturn: { status: "success", ip: "192.168.1.100", event_id: "12345" },
      hidden: false,
      explanation: "A log sorból ki kell nyerni az állapotot, IP címet és esemény azonosítót."
    },
    {
      id: "tc-032",
      questionId: "info2-parse-log",
      label: "Sikertelen bejelentkezés",
      functionName: "parse_log_line",
      args: ["[ERROR] 192.168.1.101 login failed event_id:12346"],
      expectedReturn: { status: "failed", ip: "192.168.1.101", event_id: "12346" },
      hidden: false,
      explanation: "A hiba státuszt is ki kell tudni olvasni."
    },
    {
      id: "tc-033",
      questionId: "info2-parse-log",
      label: "Figyelmeztetés",
      functionName: "parse_log_line",
      args: ["[WARN] 10.0.0.5 suspicious activity event_id:12347"],
      expectedReturn: { status: "warning", ip: "10.0.0.5", event_id: "12347" },
      hidden: false,
      explanation: "A figyelmeztetést (WARN) is kezelni kell."
    },
    {
      id: "tc-034",
      questionId: "info2-parse-log",
      label: "Rejtett teszt: különleges IP",
      functionName: "parse_log_line",
      args: ["[INFO] 255.255.255.255 broadcast event_id:99999"],
      expectedReturn: { status: "success", ip: "255.255.255.255", event_id: "99999" },
      hidden: true,
      explanation: "A broadcast IP cím is helyesen kell kezelni."
    }
  ]
};

export const informatika2FailedLoginCount: CodingQuestionTestSuite = {
  questionId: "info2-failed-login-count",
  title: "Sikertelen bejelentkezések száma IP szerint",
  mode: "function-return",
  testCases: [
    {
      id: "tc-041",
      questionId: "info2-failed-login-count",
      label: "Egy IP több sikertelen",
      functionName: "count_failed_logins_by_ip",
      args: [[
        { status: "failed", ip: "192.168.1.100", event_id: "12345" },
        { status: "failed", ip: "192.168.1.100", event_id: "12346" },
        { status: "success", ip: "192.168.1.100", event_id: "12347" },
        { status: "failed", ip: "192.168.1.101", event_id: "12348" }
      ]],
      expectedReturn: { "192.168.1.100": 2, "192.168.1.101": 1 },
      hidden: false,
      explanation: "Csak a sikertelen bejelentkezéseket kell számolni IP cím szerint csoportosítva."
    },
    {
      id: "tc-042",
      questionId: "info2-failed-login-count",
      label: "Nincs sikertelen",
      functionName: "count_failed_logins_by_ip",
      args: [[
        { status: "success", ip: "192.168.1.100", event_id: "12345" },
        { status: "success", ip: "192.168.1.101", event_id: "12346" }
      ]],
      expectedReturn: {},
      hidden: false,
      explanation: "Ha nincs sikertelen bejelentkezés, üres dict-ot kell visszaadni."
    },
    {
      id: "tc-043",
      questionId: "info2-failed-login-count",
      label: "Üres lista",
      functionName: "count_failed_logins_by_ip",
      args: [[]],
      expectedReturn: {},
      hidden: false,
      explanation: "Az üres lista esetén üres dict-ot kell visszaadni."
    },
    {
      id: "tc-044",
      questionId: "info2-failed-login-count",
      label: "Rejtett teszt: sok IP",
      functionName: "count_failed_logins_by_ip",
      args: [[
        { status: "failed", ip: "10.0.0.1", event_id: "1" },
        { status: "failed", ip: "10.0.0.2", event_id: "2" },
        { status: "failed", ip: "10.0.0.1", event_id: "3" },
        { status: "failed", ip: "10.0.0.3", event_id: "4" },
        { status: "failed", ip: "10.0.0.2", event_id: "5" }
      ]],
      expectedReturn: { "10.0.0.1": 2, "10.0.0.2": 2, "10.0.0.3": 1 },
      hidden: true,
      explanation: "Több különböző IP cím sikertelen bejelentkezéseit kell csoportosítani."
    }
  ]
};

export const informatika2DetectBruteForce: CodingQuestionTestSuite = {
  questionId: "info2-detect-brute-force",
  title: "Brute force detektálás",
  mode: "function-return",
  testCases: [
    {
      id: "tc-051",
      questionId: "info2-detect-brute-force",
      label: "Brute force detektálása",
      functionName: "detect_brute_force",
      args: [[
        { status: "failed", ip: "192.168.1.100", event_id: "12345" },
        { status: "failed", ip: "192.168.1.100", event_id: "12346" },
        { status: "failed", ip: "192.168.1.100", event_id: "12347" },
        { status: "failed", ip: "192.168.1.100", event_id: "12348" },
        { status: "failed", ip: "192.168.1.100", event_id: "12349" },
        { status: "success", ip: "192.168.1.101", event_id: "12350" }
      ], 3],
      expectedReturn: ["192.168.1.100"],
      hidden: false,
      explanation: "Az 192.168.1.100 IP cím 5 sikertelen bejelentkezést tett, ami meghaladja a 3-as küszöböt."
    },
    {
      id: "tc-052",
      questionId: "info2-detect-brute-force",
      label: "Nincs brute force",
      functionName: "detect_brute_force",
      args: [[
        { status: "failed", ip: "192.168.1.100", event_id: "12345" },
        { status: "failed", ip: "192.168.1.101", event_id: "12346" },
        { status: "success", ip: "192.168.1.102", event_id: "12347" }
      ], 3],
      expectedReturn: [],
      hidden: false,
      explanation: "Egyik IP sem haladja meg a 3-as küszöböt."
    },
    {
      id: "tc-053",
      questionId: "info2-detect-brute-force",
      label: "Több gyanús IP",
      functionName: "detect_brute_force",
      args: [[
        { status: "failed", ip: "192.168.1.100", event_id: "12345" },
        { status: "failed", ip: "192.168.1.100", event_id: "12346" },
        { status: "failed", ip: "192.168.1.100", event_id: "12347" },
        { status: "failed", ip: "10.0.0.5", event_id: "12348" },
        { status: "failed", ip: "10.0.0.5", event_id: "12349" },
        { status: "failed", ip: "10.0.0.5", event_id: "12350" }
      ], 2],
      expectedReturn: ["192.168.1.100", "10.0.0.5"],
      hidden: false,
      explanation: "Két IP is meghaladja a 2-es küszöböt."
    },
    {
      id: "tc-054",
      questionId: "info2-detect-brute-force",
      label: "Rejtett teszt: magas küszöb",
      functionName: "detect_brute_force",
      args: [[
        { status: "failed", ip: "192.168.1.100", event_id: "12345" },
        { status: "failed", ip: "192.168.1.100", event_id: "12346" },
        { status: "failed", ip: "192.168.1.100", event_id: "12347" }
      ], 10],
      expectedReturn: [],
      hidden: true,
      explanation: "A 3 sikertelen bejelentkezés nem éri el a 10-es küszöböt."
    }
  ]
};

// All test suites
export const codingTestSuites: CodingQuestionTestSuite[] = [
  programozasStringNormalization,
  programozasSetDuplicateDetection,
  programozasFileIOSimulation,
  informatika2ParseLogLine,
  informatika2FailedLoginCount,
  informatika2DetectBruteForce,
];

// Helper function to get test suite by question ID
export function getTestSuiteForQuestion(questionId: string): CodingQuestionTestSuite | undefined {
  return codingTestSuites.find(suite => suite.questionId === questionId);
}
