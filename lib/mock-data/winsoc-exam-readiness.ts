// Informatika II. SOC Exam Readiness Model
// This data model focuses on exam-specific readiness for the Windows SOC Analyst Tool project

export type WinsocModule = {
  id: string;
  title: string;
  shortDescription: string;
  roleInPipeline: string;
  mustUnderstand: string[];
  mustExplain: string[];
  likelyTasks: string[];
  commonMistakes: string[];
  relatedProgrammingLessonIds: string[];
  exercises: string[];
  examPriority: "critical" | "high" | "medium";
  examExplanation: string;
  howItWorks: string[];
  codeExample?: string;
  miniExercise?: {
    title: string;
    prompt: string;
    starterCode?: string;
    solution?: string;
  };
  examAnswerTemplate?: string;
};

export type WinsocReadinessChecklistItem = {
  id: string;
  title: string;
  category: "setup" | "concept" | "code" | "test" | "report" | "exam";
  priority: "critical" | "high" | "medium";
  description: string;
  done: boolean;
};

export type WinsocUnknownRequirement = {
  id: string;
  question: string;
  whyItMatters: string;
  status: "unknown" | "partiallyKnown" | "known";
};

export type WinsocReviewPlan = {
  duration: string;
  sections: { time: string; topics: string[] }[];
};

export type WinsocSurvivalPath = {
  duration: string;
  steps: { time: string; action: string }[];
};

export type WinsocSourceBasedExtension = {
  id: string;
  title: string;
  category: "soc" | "siem" | "hids" | "parsing" | "regex" | "brute-force" | "hashing";
  summary: string;
  keyConcepts: string[];
};

// Winsoc Modules
export const winsocModules: WinsocModule[] = [
  {
    id: "template-engine",
    title: "Template Engine",
    shortDescription: "HTML template rendering with variable substitution and loops",
    roleInPipeline: "Converts analysis data into human-readable HTML reports",
    mustUnderstand: [
      "Variable substitution syntax ({{ variable }})",
      "Loops and conditionals in templates",
      "Context data structure passed to templates",
      "Template inheritance or composition patterns",
      "HTML escaping for security"
    ],
    mustExplain: [
      "How context data becomes HTML output",
      "Why templates separate presentation from logic",
      "How to modify report layout without changing detection code",
      "The difference between template variables and code execution"
    ],
    likelyTasks: [
      "Modify report layout to add new sections",
      "Add new fields to report from detection output",
      "Change styling or formatting of specific report elements",
      "Debug why a variable doesn't appear in output"
    ],
    commonMistakes: [
      "Putting code execution logic into template instead of data rendering",
      "Forgetting to pass context data to template",
      "Using Python code syntax instead of template syntax",
      "Not escaping user input leading to XSS vulnerabilities"
    ],
    relatedProgrammingLessonIds: ["w-004", "w-009"],
    exercises: ["ex-winsoc-001"],
    examPriority: "critical",
    examExplanation: "A Template Engine elválasztja a logikát a megjelenítéstől. A vizsgán valószínűleg HTML sablonokat kell módosítani, vagy új változókat kell hozzáadni a kontextushoz.",
    howItWorks: [
      "A detektálás eredményeit egy Python dict kontextusba gyűjti",
      "A sablon fájlt (HTML) betölti és a kontextussal rendereli",
      "A {{ változó }} szintaxissal helyettesíti a változókat",
      "Ciklusokkal (for) listákat lehet végigiterálni a sablonban",
      "A végeredmény egy HTML fájl, amit a böngésző megjelenít"
    ]
  },
  {
    id: "mock-log-generator",
    title: "Mock Log Generator",
    shortDescription: "Generates fake Windows event logs for testing",
    roleInPipeline: "Provides reproducible test data for parser and detector development",
    mustUnderstand: [
      "Event types (LOGIN_SUCCESS, LOGIN_FAILED, FILE_ACCESS, etc.)",
      "Timestamp generation and formatting",
      "Random vs deterministic data generation",
      "Log file format (one event per line, structured text)",
      "Seed for reproducibility"
    ],
    mustExplain: [
      "Why mock data matters for testing",
      "How to generate reproducible test scenarios",
      "The structure of Windows event log entries",
      "How mock logs differ from real logs"
    ],
    likelyTasks: [
      "Generate a specific number of failed login events",
      "Create logs with specific IP addresses",
      "Generate logs for testing brute force detection",
      "Debug why generated logs don't match expected format"
    ],
    commonMistakes: [
      "Random data without predictable structure",
      "Not following real log format exactly",
      "Forgetting to include required fields",
      "Generating logs that are too simple to test edge cases"
    ],
    relatedProgrammingLessonIds: ["w-002"],
    exercises: ["ex-winsoc-002"],
    examPriority: "high",
    examExplanation: "A Mock Log Generator tesztadatot generál a detektor és parser fejlesztéshez. A vizsgán valószínűleg mock logokat kell generálni, vagy meg kell érteni a log formátumot.",
    howItWorks: [
      "Megadja az esemény típusokat (LOGIN_SUCCESS, LOGIN_FAILED, stb.)",
      "Generál időbélyegeket ISO formátumban",
      "Véletlenszerű vagy determinisztikus adatokat generál seed alapján",
      "Egy eseményt soronként ír a logfájlba",
      "Reprodukálható teszteseteket biztosít"
    ]
  },
  {
    id: "windows-log-parser",
    title: "Windows Log Parser",
    shortDescription: "Parses raw Windows event logs into structured event objects",
    roleInPipeline: "Transforms raw log text into structured data for analysis",
    mustUnderstand: [
      "Log line structure and field delimiters",
      "Timestamp parsing and conversion",
      "Event type identification",
      "Field extraction (timestamp, event ID, user, IP, details)",
      "Error handling for malformed log lines"
    ],
    mustExplain: [
      "How raw text becomes structured event objects",
      "The parsing strategy (regex vs string split vs parser library)",
      "How to handle missing or malformed fields",
      "Why structured parsing matters for downstream analysis"
    ],
    likelyTasks: [
      "Parse a log line and extract all fields",
      "Handle log lines with missing fields",
      "Debug why a log line isn't parsing correctly",
      "Add support for a new event type"
    ],
    commonMistakes: [
      "Brittle string splitting without validation",
      "Not handling edge cases (empty lines, malformed data)",
      "Hardcoding field positions instead of using flexible parsing",
      "Forgetting to convert timestamp strings to datetime objects"
    ],
    relatedProgrammingLessonIds: ["w-003"],
    exercises: ["ex-winsoc-003"],
    examPriority: "critical",
    examExplanation: "A Windows Log Parser nyers logszöveget strukturált objektumokká alakít. A vizsgán valószínűleg log sorokat kell parsolni regex vagy string split használatával.",
    howItWorks: [
      "Beolvassa a logfájlt soronként",
      "Minden soron regex vagy string split használatával kinyeri a mezőket",
      "Konvertálja az időbélyegeket datetime objektummá",
      "Strukturált dict-et vagy objektumot hoz létre minden eseményből",
      "Kezeli a hibás sorokat (try-except vagy validáció)"
    ],
    codeExample: `import re
from datetime import datetime

def parse_log_line(line: str) -> dict:
    pattern = r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\w+) (\S+) (\S+) (.+)"
    match = re.match(pattern, line)
    if match:
        timestamp_str, event_type, user, ip, details = match.groups()
        timestamp = datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S")
        return {
            "timestamp": timestamp,
            "event_type": event_type,
            "user": user,
            "ip": ip,
            "details": details
        }
    return None`,
    examAnswerTemplate: "A parser regex mintát használ a log sorok mezőinek kinyerésére. A minta meghatározza az időbélyeg, esemény típus, felhasználó, IP és részletek pozícióit. A parse_log_line függvény visszaad egy dict-et a kinyert mezőkkel datetime konvertált időbélyeggel."
  },
  {
    id: "anomaly-detector",
    title: "Anomaly Detector",
    shortDescription: "Detects suspicious patterns in parsed logs (brute force, suspicious IPs)",
    roleInPipeline: "Identifies security anomalies from parsed log events",
    mustUnderstand: [
      "Brute force attack patterns (repeated failed logins)",
      "IP address grouping and counting",
      "Threshold logic for anomaly detection",
      "Time windowing for rate limiting",
      "Suspicious activity indicators"
    ],
    mustExplain: [
      "How brute force is detected (failed login count per IP)",
      "Why grouping by IP matters",
      "How threshold values affect detection sensitivity",
      "The difference between detection and prevention"
    ],
    likelyTasks: [
      "Detect IPs with more than N failed logins",
      "Implement time-windowed rate limiting",
      "Debug why an attack isn't being detected",
      "Adjust threshold values for better detection"
    ],
    commonMistakes: [
      "Threshold logic wrong (e.g., using total count instead of per-IP count)",
      "Not grouping by IP, leading to false positives",
      "Forgetting to reset counters in time windows",
      "Hardcoding thresholds instead of making them configurable"
    ],
    relatedProgrammingLessonIds: ["w-005"],
    exercises: ["ex-winsoc-004"],
    examPriority: "critical",
    examExplanation: "Az Anomaly Detector gyanús mintákat észlel a parsolt logokban (pl. brute force támadás). A vizsgán valószínűleg IP-alapú számlálást kell implementálni threshold-al.",
    howItWorks: [
      "Végigiterál a parsolt eseményeken",
      "Szűri a LOGIN_FAILED eseményeket",
      "Csoportosítja IP cím szerint és megszámolja a hibás bejelentkezéseket",
      "Összehasonlítja a számlálást a threshold értékkel",
      "Ha az IP meghaladja a threshold-t, jelzi gyanús tevékenységként"
    ],
    codeExample: `from collections import Counter

def detect_brute_force(events: list, threshold: int = 5) -> dict:
    failed_logins = [
        event["ip"] for event in events
        if event["event_type"] == "LOGIN_FAILED"
    ]
    ip_counts = Counter(failed_logins)
    suspicious_ips = {
        ip: count for ip, count in ip_counts.items()
        if count >= threshold
    }
    return suspicious_ips`,
    miniExercise: {
      title: "Brute force detektor",
      prompt: "Írj egy függvényt, ami megkapja a parsolt események listáját, és visszaadja azokat az IP címeket, amelyeknél több mint 3 sikertelen bejelentkezés történt.",
      starterCode: `from collections import Counter

def detect_suspicious_ips(events: list) -> dict:
    # TODO: Implementálj IP-alapú számlálást
    pass`,
      solution: `from collections import Counter

def detect_suspicious_ips(events: list) -> dict:
    failed_logins = [
        event["ip"] for event in events
        if event["event_type"] == "LOGIN_FAILED"
    ]
    ip_counts = Counter(failed_logins)
    suspicious_ips = {
        ip: count for ip, count in ip_counts.items()
        if count > 3
    }
    return suspicious_ips`
    },
    examAnswerTemplate: "A detektor Counter-t használ az IP címek számlálásához. Csak a LOGIN_FAILED eseményeket veszi figyelembe, csoportosít IP szerint, és azokat az IP-ket adja vissza, amelyek meghaladják a threshold értéket. Ez lehetővé teszi a brute force támadások azonosítását."
  },
  {
    id: "integrity-checker",
    title: "Integrity Checker",
    shortDescription: "Detects file changes using hash-based integrity checking",
    roleInPipeline: "Identifies modified, added, or deleted files (HIDS)",
    mustUnderstand: [
      "Hash functions (SHA256) for file integrity",
      "Hashlib module usage",
      "Pathlib for file system traversal",
      "Before/after state comparison",
      "Change detection (added, modified, deleted)"
    ],
    mustExplain: [
      "How hash-based integrity checking works",
      "Why hash comparison is more reliable than comparing file metadata",
      "The difference between file name changes and content changes",
      "How the checker detects added, modified, and deleted files"
    ],
    likelyTasks: [
      "Calculate hash for a single file",
      "Compare two file states and detect changes",
      "Traverse a directory and hash all files",
      "Debug why a file change isn't being detected"
    ],
    commonMistakes: [
      "Comparing file names instead of content hashes",
      "Not handling file permissions or access errors",
      "Forgetting to hash file content (only hashing metadata)",
      "Not updating the baseline state after checking"
    ],
    relatedProgrammingLessonIds: ["w-006"],
    exercises: ["ex-winsoc-005"],
    examPriority: "critical",
    examExplanation: "Az Integrity Checker hash-alapú integritás ellenőrzést végez (HIDS). A vizsgán valószínűleg fájlok hash-ét kell számolni és összehasonlítani baseline állapottal.",
    howItWorks: [
      "Bejárja a könyvtárat és minden fájlt hash-el (SHA256)",
      "Elmenti a baseline állapotot (fájl útvonal → hash)",
      "Később újra hash-eli a fájlokat",
      "Összehasonlítja a baseline-lal",
      "Azonosítja a hozzáadott, módosított és törölt fájlokat"
    ],
    codeExample: `import hashlib
from pathlib import Path

def calculate_file_hash(file_path: Path) -> str:
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256.update(chunk)
    return sha256.hexdigest()

def detect_changes(baseline: dict, current: dict) -> dict:
    added = set(current.keys()) - set(baseline.keys())
    deleted = set(baseline.keys()) - set(current.keys())
    modified = [
        path for path in current.keys()
        if path in baseline and baseline[path] != current[path]
    ]
    return {"added": list(added), "deleted": list(deleted), "modified": modified}`,
    examAnswerTemplate: "Az integritás ellenőrző SHA256 hash-t használ minden fájl tartalmához. A baseline állapotot elmenti, majd később összehasonlítja az aktuális hash-ekkel. A különbségek alapján azonosítja a hozzáadott, módosított és törölt fájlokat."
  },
  {
    id: "report-generator",
    title: "Report Generator",
    shortDescription: "Generates HTML and JSON reports from analysis results",
    roleInPipeline: "Creates human-readable and machine-readable reports",
    mustUnderstand: [
      "Template Engine integration",
      "JSON serialization",
      "Report structure and sections",
      "Connecting analysis output with template context",
      "HTML vs JSON output formats"
    ],
    mustExplain: [
      "How analysis data flows into the report",
      "The difference between HTML and JSON report formats",
      "Why both formats are needed (human vs machine readable)",
      "How to add new sections to the report"
    ],
    likelyTasks: [
      "Generate an HTML report from detection results",
      "Generate a JSON report for machine processing",
      "Add a new section to the report",
      "Debug why data isn't appearing in the report"
    ],
    commonMistakes: [
      "Mixing presentation logic with detection logic",
      "Not passing all required context data to template",
      "Forgetting to serialize complex objects to JSON",
      "Hardcoding report structure instead of using templates"
    ],
    relatedProgrammingLessonIds: ["w-007"],
    exercises: ["ex-winsoc-006"],
    examPriority: "high",
    examExplanation: "A Report Generator HTML és JSON riportokat generál az elemzési eredményekből. A vizsgán valószínűleg kontextus adatot kell átadni a Template Engine-nek.",
    howItWorks: [
      "Összegyűjti az elemzési eredményeket (anomaly, integrity, parser)",
      "Kontextus dict-et épít a sablon számára",
      "HTML sablont rendereli a kontextussal",
      "JSON formátumba is szerializálja az adatokat",
      "Két kimeneti fájlt generál (report.html, report.json)"
    ]
  },
  {
    id: "main-application",
    title: "Main Application",
    shortDescription: "Orchestrates the full SOC pipeline (mock → parse → detect → check → report)",
    roleInPipeline: "Coordinates all modules and manages the data flow",
    mustUnderstand: [
      "Pipeline orchestration (module order and dependencies)",
      "Data flow between modules",
      "Error handling and recovery",
      "Configuration management",
      "Logging and debugging"
    ],
    mustExplain: [
      "How data flows through the pipeline",
      "Why module order matters",
      "How the application handles errors in individual modules",
      "The role of configuration in controlling pipeline behavior"
    ],
    likelyTasks: [
      "Run the full pipeline from mock logs to report",
      "Configure which modules are enabled",
      "Debug why the pipeline is failing at a specific stage",
      "Add a new module to the pipeline"
    ],
    commonMistakes: [
      "Hardcoding module order instead of using a configurable pipeline",
      "Not handling errors gracefully (one module failure stops everything)",
      "Passing data incorrectly between modules",
      "Not validating intermediate data"
    ],
    relatedProgrammingLessonIds: ["w-008"],
    exercises: [],
    examPriority: "high",
    examExplanation: "A Main Application koordinálja a teljes SOC pipeline-t. A vizsgán valószínűleg a main() függvényt kell érteni és a modulok sorrendjét.",
    howItWorks: [
      "Beolvassa a konfigurációt (CLI argumentok)",
      "Meghívja a Mock Log Generatort",
      "Meghívja a Parser-t a nyers logokon",
      "Meghívja az Anomaly Detectort a parsolt adatokon",
      "Meghívja az Integrity Checkert",
      "Meghívja a Report Generatort",
      "Kezeli a hibákat és logol a folyamatot"
    ],
    codeExample: `def main():
    config = parse_args()
    logs = generate_mock_logs(config.count)
    events = parse_logs(logs)
    anomalies = detect_anomalies(events)
    integrity = check_integrity(config.baseline, config.target)
    context = {
        "anomalies": anomalies,
        "integrity": integrity,
        "events": events
    }
    generate_report(context, config.output)

if __name__ == "__main__":
    main()`,
    examAnswerTemplate: "A main() függvény a pipeline belépési pontja. Sorban meghívja a modulokat: generate → parse → detect → check → report. A modulok kimenete a következő modul bemenete. Hiba esetén try-except blokkokkal kezeli a hibákat."
  },
  {
    id: "cli",
    title: "Command Line Interface",
    shortDescription: "CLI for running the SOC tool with arguments",
    roleInPipeline: "Provides user interface for running the tool",
    mustUnderstand: [
      "Argument parsing (argparse or click)",
      "Command structure and subcommands",
      "Help text and usage documentation",
      "Exit codes and error handling",
      "Input/output file handling"
    ],
    mustExplain: [
      "How CLI arguments control pipeline behavior",
      "The difference between required and optional arguments",
      "How the CLI integrates with the main application",
      "Why CLI is important for automation"
    ],
    likelyTasks: [
      "Run the tool with specific input files",
      "Specify output file paths",
      "Enable/disable specific modules via CLI",
      "Debug why CLI arguments aren't being parsed correctly"
    ],
    commonMistakes: [
      "Not validating CLI arguments before use",
      "Poor error messages when arguments are invalid",
      "Hardcoding file paths instead of allowing user input",
      "Not providing helpful help text"
    ],
    relatedProgrammingLessonIds: [],
    exercises: [],
    examPriority: "medium",
    examExplanation: "A CLI (Command Line Interface) argumentumokkal vezérli az eszközt. A vizsgán valószínűleg argparse használatát kell érteni.",
    howItWorks: [
      "Argparse ArgumentParser-t használ",
      "Definiálja az argumentumokat (input, output, generate, analyze)",
      "Validálja az argumentumokat",
      "Átadja a konfigurációt a main() függvénynek",
      "Segítség szöveget generál (--help)"
    ],
    codeExample: `import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Windows SOC Analyst Tool")
    parser.add_argument("--generate", type=int, help="Generate N mock log events")
    parser.add_argument("--analyze", type=str, help="Analyze log file")
    parser.add_argument("--output", type=str, help="Output report file")
    parser.add_argument("--baseline", type=str, help="Baseline hash file")
    return parser.parse_args()`,
    examAnswerTemplate: "Az argparse ArgumentParser-rel definiáljuk a parancssori argumentumokat. A --generate flag mock logokat generál, az --analyze logfájlt elemez. Az argumentumokat a parser.parse_args() olvassa be és adja vissza dict-ként a main() függvénynek."
  },
  {
    id: "unit-tests",
    title: "Unit Tests",
    shortDescription: "Tests individual modules in isolation",
    roleInPipeline: "Ensures each module works correctly before integration",
    mustUnderstand: [
      "Unit testing concepts (test isolation, fixtures, assertions)",
      "Pytest framework basics",
      "Assert statements and test structure",
      "What to test vs what not to test",
      "Test naming conventions"
    ],
    mustExplain: [
      "Why unit tests matter for code quality",
      "The difference between unit and integration tests",
      "How to write a test for a specific function",
      "What makes a good test (clear, isolated, fast)"
    ],
    likelyTasks: [
      "Write a test for the parser function",
      "Write a test for the anomaly detector",
      "Debug why a test is failing",
      "Add test coverage for a new feature"
    ],
    commonMistakes: [
      "Testing implementation details instead of expected behavior",
      "Tests that depend on external state (not isolated)",
      "Writing tests that are too complex or unclear",
      "Not running tests before submitting code"
    ],
    relatedProgrammingLessonIds: ["w-010"],
    exercises: ["ex-winsoc-007"],
    examPriority: "high",
    examExplanation: "A Unit Tests egyes modulokat teszteli izolációban. A vizsgán valószínűleg unittest vagy pytest használatát kell érteni és assert utasításokat kell írni.",
    howItWorks: [
      "Minden függvényhez külön tesztet ír",
      "Bemeneti adatokat ad a függvénynek",
      "Assert-tal ellenőrzi a kimenetet",
      "A pytest felfedezi és futtatja a teszteket",
      "Teszt eredmény: passed/failed"
    ],
    codeExample: `import unittest
from parser import parse_log_line

class TestParser(unittest.TestCase):
    def test_parse_log_line(self):
        line = "2024-01-15 10:30:00 LOGIN_SUCCESS admin 192.168.1.1 User logged in"
        result = parse_log_line(line)
        self.assertEqual(result["event_type"], "LOGIN_SUCCESS")
        self.assertEqual(result["ip"], "192.168.1.1")

if __name__ == "__main__":
    unittest.main()`,
    examAnswerTemplate: "A unit test egy függvényt tesztel izoláltan. A TestCase osztályban teszt metódusokat definiálunk (test_ prefix). Az assertEqual, assertTrue, stb. utasításokkal ellenőrizzük a kimenetet. A pytest automatikusan felfedezi és futtatja a teszteket."
  },
  {
    id: "integration-test",
    title: "Integration Test",
    shortDescription: "Tests the full pipeline end-to-end",
    roleInPipeline: "Ensures all modules work together correctly",
    mustUnderstand: [
      "Integration testing concepts",
      "End-to-end pipeline testing",
      "Test data setup and teardown",
      "Expected output validation",
      "Difference from unit tests"
    ],
    mustExplain: [
      "Why integration tests are needed beyond unit tests",
      "How to set up test data for the full pipeline",
      "What to validate in an integration test",
      "The relationship between integration and unit tests"
    ],
    likelyTasks: [
      "Run the full pipeline test",
      "Validate the final report output",
      "Debug why the integration test is failing",
      "Add a new scenario to the integration test"
    ],
    commonMistakes: [
      "Integration tests that are too slow or complex",
      "Not cleaning up test data after running",
      "Testing too many things in one test",
      "Not having clear expected output"
    ],
    relatedProgrammingLessonIds: [],
    exercises: [],
    examPriority: "medium",
    examExplanation: "Az Integration Test a teljes pipeline-t teszteli végig. A vizsgán valószínűleg a teljes folyamatot kell érteni (mock → parse → detect → check → report).",
    howItWorks: [
      "Mock logokat generál teszthez",
      "Végigfuttatja a teljes pipeline-t",
      "Ellenőrzi a végeredményt (report fájl)",
      "Validálja, hogy az eredmény tartalmazza az elvárt adatokat",
      "Teszteli a modulok integrációját"
    ],
    examAnswerTemplate: "Az integrációs teszt a teljes pipeline-t teszteli végig mock adatokkal. Ellenőrzi, hogy a parser, detector, integrity checker és report generator együtt működnek. A végeredmény validálásával biztosítja, hogy a rendszer helyesen működik."
  }
];

// Readiness Checklist
export const winsocReadinessChecklist: WinsocReadinessChecklistItem[] = [
  {
    id: "setup-1",
    title: "PyCharm project setup",
    category: "setup",
    priority: "critical",
    description: "Open the winsoc project in PyCharm, understand pyproject.toml structure, verify dependencies",
    done: false
  },
  {
    id: "setup-2",
    title: "Run the project",
    category: "setup",
    priority: "critical",
    description: "Execute winsoc.py from command line, verify it produces output without errors",
    done: false
  },
  {
    id: "concept-1",
    title: "Understand Template Engine",
    category: "concept",
    priority: "critical",
    description: "Explain how variable substitution works, why templates separate presentation from logic",
    done: false
  },
  {
    id: "concept-2",
    title: "Understand SOC pipeline data flow",
    category: "concept",
    priority: "critical",
    description: "Explain how data flows from mock logs through parser, detector, integrity checker to report",
    done: false
  },
  {
    id: "code-1",
    title: "Parse Windows logs",
    category: "code",
    priority: "critical",
    description: "Write code to parse a log line and extract timestamp, event type, IP, and details",
    done: false
  },
  {
    id: "code-2",
    title: "Detect brute force attacks",
    category: "code",
    priority: "critical",
    description: "Implement IP-based counting to detect IPs with more than N failed logins",
    done: false
  },
  {
    id: "code-3",
    title: "Generate reports",
    category: "code",
    priority: "critical",
    description: "Generate HTML and JSON reports from analysis results using the Template Engine",
    done: false
  },
  {
    id: "test-1",
    title: "Run unit tests",
    category: "test",
    priority: "high",
    description: "Execute test_winsoc.py, understand what each test checks, verify all tests pass",
    done: false
  },
  {
    id: "test-2",
    title: "Write a unit test",
    category: "test",
    priority: "high",
    description: "Write a test for the parser function or anomaly detector",
    done: false
  },
  {
    id: "report-1",
    title: "Explain report output",
    category: "report",
    priority: "high",
    description: "Read and explain the HTML report output, identify what each section shows",
    done: false
  },
  {
    id: "report-2",
    title: "Modify report layout",
    category: "report",
    priority: "medium",
    description: "Change the template to add a new section or modify existing formatting",
    done: false
  },
  {
    id: "exam-1",
    title: "Debug common mistakes",
    category: "exam",
    priority: "high",
    description: "Practice debugging: brittle parsing, wrong threshold logic, missing context data",
    done: false
  }
];

// Unknown Exam Requirements
export const winsocUnknownRequirements: WinsocUnknownRequirement[] = [
  {
    id: "unknown-1",
    question: "Can AI be used during the exam?",
    whyItMatters: "Determines whether you can use AI assistants for code generation and debugging",
    status: "unknown"
  },
  {
    id: "unknown-2",
    question: "Can internet be used during the exam?",
    whyItMatters: "Affects whether you can access documentation, Stack Overflow, or online resources",
    status: "unknown"
  },
  {
    id: "unknown-3",
    question: "Can own code be used during the exam?",
    whyItMatters: "Determines whether you can bring prepared code snippets or templates",
    status: "unknown"
  },
  {
    id: "unknown-4",
    question: "Can Git repo be accessed during the exam?",
    whyItMatters: "Affects whether you can reference the original winsoc project code",
    status: "unknown"
  },
  {
    id: "unknown-5",
    question: "Do we need to write code from scratch or modify existing code?",
    whyItMatters: "Changes preparation strategy (understand existing code vs implement from scratch)",
    status: "unknown"
  },
  {
    id: "unknown-6",
    question: "What is the grading rubric?",
    whyItMatters: "Determines what aspects are weighted (correctness, code quality, documentation, etc.)",
    status: "unknown"
  },
  {
    id: "unknown-7",
    question: "What exactly must be submitted?",
    whyItMatters: "Clarifies whether you submit code, reports, test results, or all of the above",
    status: "unknown"
  },
  {
    id: "unknown-8",
    question: "How much time is allocated for the exam?",
    whyItMatters: "Affects time management and prioritization during the exam",
    status: "unknown"
  },
  {
    id: "unknown-9",
    question: "Are there specific test cases that must pass?",
    whyItMatters: "Determines whether you need to ensure certain tests pass or if you write your own tests",
    status: "unknown"
  }
];

// Minimum Exam Path (ordered by priority)
export const minimumWinsocExamPath: string[] = [
  "setup-1",
  "setup-2",
  "concept-1",
  "concept-2",
  "code-1",
  "code-2",
  "code-3",
  "test-1",
  "report-1"
];

// Review Plans from Grok + Perplexity material
export const winsocReviewPlans: WinsocReviewPlan[] = [
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
export const winsocSurvivalPath: WinsocSurvivalPath = {
  duration: "1 óra",
  steps: [
    { time: "0-15 perc", action: "Modul 3,4,5 (Parser + Anomaly + Integrity) + példakódok bemagolása" },
    { time: "15-35 perc", action: "Gyakorlófeladatok 2,3,5,6 (ezek a legvalószínűbb vizsgakérdések)" },
    { time: "35-50 perc", action: "Common mistakes lista + saját leggyengébb modul gyors átolvasása" },
    { time: "50-60 perc", action: "CLI + Main Application összefoglaló + „mi a pipeline” magyarázat gyakorlása hangosan" }
  ]
};

// Extended Common Mistakes from Grok + Perplexity material
export const winsocCommonMistakesExtended: string[] = [
  "Regex nem kezeli az összes log formátumot → mindig adj hozzá fallbacket",
  "Hash fájl nem záródik be (with open hiánya)",
  "Timestamp string marad → nem lehet vele számolni (konvertáld datetime-ra)",
  "Globális változókat használsz a modulok között → rossz tervezés",
  "Unit testben nincs assert → „működik\" helyett",
  "Report generálás előtt nem hívod az anomaly/integrity modult",
  "CLI argumentumot nem kezeled (if args.generate hiánya)",
  "Nincs error handling rossz fájl esetén → vizsgán rögtön levonás"
];

// Source-based Extensions from Grok + Perplexity material
export const winsocSourceBasedExtensions: WinsocSourceBasedExtension[] = [
  {
    id: "soc-concept",
    title: "SOC alapfogalom",
    category: "soc",
    summary: "SOC (Security Operations Center) egy központosított csapat/eszközrendszert jelent, amely folyamatosan figyeli a hálózati és rendszereseményeket, észleli a támadásokat, és koordinálja a reakciót.",
    keyConcepts: ["folyamatos monitorozás (24/7)", "incident response", "esemény (log) gyűjtés és korráláció", "log-gyűjtő (SIEM)", "threat hunting"]
  },
  {
    id: "siem-log-analysis",
    title: "SIEM logelemzés",
    category: "siem",
    summary: "SIEM (Security Information and Event Management) gyűjti, tárolja és elemzi a különböző rendszerek logjait, hogy korrelált, strukturált eseményekként mutassa a biztonsági eseményeket.",
    keyConcepts: ["log ingest", "normalizálás", "korrelációs szabály", "esemény súlyozás", "dashboards / alerting"]
  },
  {
    id: "hids-integrity",
    title: "HIDS / fájlintegritás-ellenőrzés",
    category: "hids",
    summary: "HIDS (Host-based Intrusion Detection System) a gépen belül figyeli a fájlok, regiszterek, folyamatok változásait. Fájlintegritás-ellenőrzés: egy „baseline\" hash alapján vizsgáljuk, módosult-e a fájl.",
    keyConcepts: ["Hash (SHA-256)", "baseline / referencia adatbázis", "fájlváltozás", "signature detection", "Wazuh / Open-source HIDS"]
  },
  {
    id: "log-parsing",
    title: "Python log parsing",
    category: "parsing",
    summary: "Log parsing az a folyamat, amikor nyers logszövegből kinyerjük a mezőket (időpont, IP, hiba szint, stb.) és strukturált adat (pl. dict) lesz belőle.",
    keyConcepts: ["log formátum", "strukturált adat", "regex minta", "fájl iteráció", "kivételkezelés"]
  },
  {
    id: "regex-logs",
    title: "Python regex alapok loghoz",
    category: "regex",
    summary: "Python re modul segítségével regex segítségével keresünk, illetve kinyerünk részstringeket logokból.",
    keyConcepts: ["re.match() / re.search()", "capturing group", "\\S+, \\d+, .*", "named group", "greedy / non-greedy"]
  },
  {
    id: "brute-force-detection",
    title: "Brute force detection egyszerű szabályokkal",
    category: "brute-force",
    summary: "Brute force (pl. SSH/Windows-bejelentkezés) számlálásához adott IP címről számoljuk a sikertelen kísérleteket egy időablakon belül.",
    keyConcepts: ["sikertelen bejelentkezés", "IP-alapú számlálás", "időablak", "threshold", "alert"]
  },
  {
    id: "file-hashing",
    title: "File hashing Pythonban",
    category: "hashing",
    summary: "hashlib modul segítségével fájl tartalmát hash-eljük (pl. sha256), amit integritás-ellenőrzésre használhatunk.",
    keyConcepts: ["hashlib.sha256", "chunk-olás", "hexdigest()", "checksum/hash comparison"]
  }
];
