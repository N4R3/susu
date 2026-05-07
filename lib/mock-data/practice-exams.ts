// Practice Exam Data for Private Study Support
// This is NOT a cheating tool - it's for self-check, quick review, and practice exam simulation

export type PracticeExamQuestionType = "coding" | "explanation" | "debugging" | "multipleChoice" | "shortAnswer";

export type PracticeExamQuestion = {
  id: string;
  type: PracticeExamQuestionType;
  title: string;
  prompt: string;
  starterCode?: string;
  options?: string[];
  expectedAnswer?: string;
  points: number;
  relatedTopicIds: string[];
};

export type PracticeExamSolution = {
  questionId: string;
  solution: string;
  explanation: string;
  gradingCriteria: string[];
};

export type PracticeExam = {
  id: string;
  title: string;
  subjectId: string;
  durationMinutes: number;
  difficulty: "easy" | "medium" | "exam";
  description: string;
  questions: PracticeExamQuestion[];
  solutionKey: PracticeExamSolution[];
};

// Informatika II. próbavizsga
export const informatika2PracticeExam: PracticeExam = {
  id: "practice-informatika2",
  title: "Informatika II. próbavizsga",
  subjectId: "bbxin2kblf",
  durationMinutes: 60,
  difficulty: "exam",
  description: "Windows SOC Analyst Tool alapú próbavizsga önellenőrzéshez. A feladatok a parser, anomaly detector, integrity checker, report generator és unit tesztek köré épülnek.",
  questions: [
    {
      id: "inf2-q1",
      type: "explanation",
      title: "Windows SOC pipeline magyarázata",
      prompt: "Magyarázd el a Windows SOC Analyst Tool teljes pipeline-jét a mock log generálástól a riport generálásig. Milyen modulok vannak és milyen sorrendben futnak?",
      points: 10,
      relatedTopicIds: ["main-application", "mock-log-generator", "windows-log-parser", "anomaly-detector", "integrity-checker", "report-generator"]
    },
    {
      id: "inf2-q2",
      type: "coding",
      title: "Log sor parszolása",
      prompt: "Írj egy parse_log_line() függvényt, ami beolvas egy Windows eseménylog sort és kinyeri a timestamp, event_type, user, ip és details mezőket. A log formátum: \"[2024-01-15 10:30:00] LOGIN_SUCCESS user=admin ip=192.168.1.100 details=successful\"",
      starterCode: `import re

def parse_log_line(line: str) -> dict:
    # TODO: Implement parsing logic
    pass`,
      points: 15,
      relatedTopicIds: ["windows-log-parser"]
    },
    {
      id: "inf2-q3",
      type: "coding",
      title: "Sikertelen bejelentkezés számlálása IP szerint",
      prompt: "Írj egy count_failed_logins_by_ip() függvényt, ami kap egy listát a parszolt log eseményekből és visszaad egy dictionary-t, ami IP cím szerint számlálja a sikertelen bejelentkezéseket.",
      starterCode: `from collections import Counter

def count_failed_logins_by_ip(events: list) -> dict:
    # TODO: Implement counting logic
    pass`,
      points: 15,
      relatedTopicIds: ["anomaly-detector"]
    },
    {
      id: "inf2-q4",
      type: "explanation",
      title: "Brute force detektálás logikája",
      prompt: "Magyarázd el, hogyan detektáljuk a brute force támadást az események alapján. Mi a küszöbérték szerepe és miért kell IP szerint csoportosítani?",
      points: 10,
      relatedTopicIds: ["anomaly-detector"]
    },
    {
      id: "inf2-q5",
      type: "coding",
      title: "Fájl integritás ellenőrzése",
      prompt: "Írj egy calculate_file_hash() függvényt, ami SHA256 hash-t számít egy fájl tartalmáról. A függvény a hash hexadecimális stringét adja vissza.",
      starterCode: `import hashlib

def calculate_file_hash(file_path: str) -> str:
    # TODO: Implement hash calculation
    pass`,
      points: 15,
      relatedTopicIds: ["integrity-checker"]
    },
    {
      id: "inf2-q6",
      type: "explanation",
      title: "Report generator működése",
      prompt: "Magyarázd el a Report Generator működését. Milyen formátumokat generál és hogyan kerülnek az adatok a Template Engine-be?",
      points: 10,
      relatedTopicIds: ["report-generator", "template-engine"]
    },
    {
      id: "inf2-q7",
      type: "coding",
      title: "Unit test írása",
      prompt: "Írj egy pytest unit tesztet a parse_log_line() függvényhez. A teszt ellenőrzi, hogy a függvény helyesen parszol egy LOGIN_SUCCESS eseményt.",
      starterCode: `import pytest

def test_parse_log_line_success():
    # TODO: Implement test
    pass`,
      points: 15,
      relatedTopicIds: ["unit-tests"]
    }
  ],
  solutionKey: [
    {
      questionId: "inf2-q1",
      solution: "A pipeline: Mock Log Generator → Windows Log Parser → Anomaly Detector → Integrity Checker → Report Generator. A mock generator teszt logokat készít, a parser strukturált adattá alakítja, az anomaly detector brute force és gyanús IP-ket detektál, az integrity checker fájl változásokat észlel hash alapján, a report generator HTML és JSON riportot készít.",
      explanation: "A modulok sorrendje kritikus a helyes működéshez. Minden modul a előző kimenetét használja bemenetként.",
      gradingCriteria: ["Pipeline sorrend helyes", "Minden modul megnevezve", "Modulok szerepe megmagyarázva"]
    },
    {
      questionId: "inf2-q2",
      solution: `import re

def parse_log_line(line: str) -> dict:
    pattern = r"\\[([^\\]]+)\\] (\\w+) user=(\\w+) ip=([\\d.]+) details=(.+)"
    match = re.match(pattern, line)
    if match:
        return {
            "timestamp": match.group(1),
            "event_type": match.group(2),
            "user": match.group(3),
            "ip": match.group(4),
            "details": match.group(5)
        }
    return None`,
      explanation: "A regex minta kinyeri a mezőket a log sorból. A re.match() ellenőrzi a mintát, a csoportok (groups) tartalmazzák az értékeket.",
      gradingCriteria: ["Regex minta helyes", "Mezők helyesen kinyerve", "Hibakezelés van"]
    },
    {
      questionId: "inf2-q3",
      solution: `from collections import Counter

def count_failed_logins_by_ip(events: list) -> dict:
    failed_logins = [event["ip"] for event in events if event["event_type"] == "LOGIN_FAILED"]
    return dict(Counter(failed_logins))`,
      explanation: "A Counter osztály egyszerűsíti a számlálást. Csak a LOGIN_FAILED eseményeket vesszük figyelembe IP szerint csoportosítva.",
      gradingCriteria: ["Counter használata", "LOGIN_FAILED szűrése", "IP szerint csoportosítás"]
    },
    {
      questionId: "inf2-q4",
      solution: "Brute force detektálás: számláljuk a sikertelen bejelentkezéseket IP cím szerint egy időablakon belül. Ha egy IP-nél a sikertelen kísérletek száma meghaladja a küszöbértéket (pl. 5), akkor brute force támadást jelzünk. IP szerinti csoportosítás kritikus, mert egy IP-től érkező sok sikertelen kísérlet támadást jelez, nem pedig véletlen hibát.",
      explanation: "A küszöbérték meghatározza a detektálás érzékenységét. IP szerinti csoportosítás nélkül a teljes rendszer sikertelen kísérleteit számolnánk, ami nem jelezne konkrét támadót.",
      gradingCriteria: ["Küszöbérték szerepe megmagyarázva", "IP szerinti csoportosítás indoklása", "Időablak említve"]
    },
    {
      questionId: "inf2-q5",
      solution: `import hashlib

def calculate_file_hash(file_path: str) -> str:
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256_hash.update(chunk)
    return sha256_hash.hexdigest()`,
      explanation: "A fájl olvasása chunkokonként (4096 byte) nagy fájloknál is működik. A hashlib.sha256() létrehoz egy hash objektumot, amit folyamatosan frissítünk a tartalommal.",
      gradingCriteria: ["hashlib használata", "Chunk-olás nagy fájlokhoz", "hexdigest() visszatérési érték"]
    },
    {
      questionId: "inf2-q6",
      solution: "A Report Generator HTML és JSON riportokat készít. Az HTML riport emberileg olvasható, a JSON riport gépi feldolgozásra. A Template Engine kapja az elemzési adatokat (anomáliák, integritás változások) és behelyettesíti a sablon változókat. A json modul serializálja az adatokat JSON formátumba.",
      explanation: "Két formátumra van szükség: HTML a vizuális megjelenítéshez, JSON a programozott feldolgozáshoz. A Template Engine különíti a megjelenítést a logikától.",
      gradingCriteria: ["HTML vs JSON különbség", "Template Engine szerepe", "Adatfolyam megmagyarázva"]
    },
    {
      questionId: "inf2-q7",
      solution: `import pytest

def test_parse_log_line_success():
    line = "[2024-01-15 10:30:00] LOGIN_SUCCESS user=admin ip=192.168.1.100 details=successful"
    result = parse_log_line(line)
    assert result is not None
    assert result["event_type"] == "LOGIN_SUCCESS"
    assert result["user"] == "admin"
    assert result["ip"] == "192.168.1.100"`,
      explanation: "A teszt egy valós log sort használ és ellenőrzi, hogy minden mező helyesen van-e kinyerve. Az assert utasítások validálják az eredményt.",
      gradingCriteria: ["Teszt adat megadva", "Assert utasítások vannak", "Minden mező ellenőrizve"]
    }
  ]
};

// Programozás próbavizsga
export const programozasPracticeExam: PracticeExam = {
  id: "practice-programozas",
  title: "Programozás próbavizsga",
  subjectId: "bbxpr12blf",
  durationMinutes: 45,
  difficulty: "exam",
  description: "Project Sentinel / Secret Database CLI Tool alapú próbavizsga önellenőrzéshez. A feladatok a string műveletek, fájl I/O, argparse, bcrypt és unittest köré épülnek.",
  questions: [
    {
      id: "prog-q1",
      type: "coding",
      title: "String normalizálás",
      prompt: "Írj egy normalize_string() függvényt, ami kisbetűsíti a stringet és csak [a-z0-9] karaktereket tartja meg. Használj regex-et.",
      starterCode: `import re

def normalize_string(s: str) -> str:
    # TODO: Implement normalization
    pass`,
      points: 10,
      relatedTopicIds: ["python-string-operations", "python-regex"]
    },
    {
      id: "prog-q2",
      type: "coding",
      title: "Set alapú duplikáció detektálás",
      prompt: "Írj egy find_duplicates() függvényt, ami kap egy string listát és visszaadja a duplikált elemeket set-ként. A set adatszerkezet O(1) tartalmazás ellenőrzést biztosít.",
      starterCode: `def find_duplicates(items: list) -> set:
    # TODO: Implement duplicate detection
    pass`,
      points: 10,
      relatedTopicIds: ["python-data-structures"]
    },
    {
      id: "prog-q3",
      type: "coding",
      title: "Fájl olvasás streaming módban",
      prompt: "Írj egy read_file_streaming() függvényt, ami soronként olvas egy fájlt és visszaadja a sorok listáját. Használj for line in f szerkezetet a memória hatékony olvasáshoz.",
      starterCode: `def read_file_streaming(file_path: str) -> list:
    # TODO: Implement streaming read
    pass`,
      points: 10,
      relatedTopicIds: ["python-file-io"]
    },
    {
      id: "prog-q4",
      type: "coding",
      title: "Argparse alapú CLI",
      prompt: "Írj egy egyszerű CLI-t argparse segítségével, ami --input és --output argumentumokat fogad. Az --input kötelező, az --output opcionális.",
      starterCode: `import argparse

def main():
    parser = argparse.ArgumentParser(description="CLI tool")
    # TODO: Add arguments
    args = parser.parse_args()
    print(args)

if __name__ == "__main__":
    main()`,
      points: 15,
      relatedTopicIds: ["python-cli"]
    },
    {
      id: "prog-q5",
      type: "explanation",
      title: "Bcrypt és környezeti változók",
      prompt: "Magyarázd el, miért használunk bcrypt jelszó hash-eléshez és miért tároljuk titkos adatokat környezeti változókban a kódban helyette.",
      points: 10,
      relatedTopicIds: ["python-security"]
    },
    {
      id: "prog-q6",
      type: "coding",
      title: "Unit test írása",
      prompt: "Írj egy unittest.TestCase osztályt a normalize_string() függvényhez. A teszt ellenőrzi, hogy a függvény helyesen normalizál egy stringet.",
      starterCode: `import unittest

class TestNormalizeString(unittest.TestCase):
    # TODO: Implement test methods
    pass

if __name__ == "__main__":
    unittest.main()`,
      points: 15,
      relatedTopicIds: ["python-testing"]
    },
    {
      id: "prog-q7",
      type: "explanation",
      title: "Stdout vs stderr",
      prompt: "Magyarázd el a különbséget stdout és stderr között. Mikor kell használni a stderr-t és miért?",
      points: 10,
      relatedTopicIds: ["python-io"]
    }
  ],
  solutionKey: [
    {
      questionId: "prog-q1",
      solution: `import re

def normalize_string(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]", "", s)
    return s`,
      explanation: "A lower() kisbetűsít, a re.sub() eltávolít minden nem [a-z0-9] karaktert. A regex minta [^a-z0-9] minden karaktert kivéve a betűket és számokat illeszt.",
      gradingCriteria: ["lower() használata", "regex minta helyes", "re.sub() használata"]
    },
    {
      questionId: "prog-q2",
      solution: `def find_duplicates(items: list) -> set:
    seen = set()
    duplicates = set()
    for item in items:
        if item in seen:
            duplicates.add(item)
        seen.add(item)
    return duplicates`,
      explanation: "A seen set tárolja az eddig látott elemeket. Ha egy elem már benne van a seen set-ben, akkor duplikált. A tartalmazás ellenőrzés set-ben O(1) idejű.",
      gradingCriteria: ["Set használata", "Duplikáció detektálás logika", "O(1) tartalmazás ellenőrzés"]
    },
    {
      questionId: "prog-q3",
      solution: `def read_file_streaming(file_path: str) -> list:
    lines = []
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            lines.append(line.strip())
    return lines`,
      explanation: "A for line in f szerkezet soronként olvassa a fájlt, így a memória használat nem nő a fájl méretével. A with open biztosítja a fájl lezárását.",
      gradingCriteria: ["for line in f használata", "with open használata", "Encoding beállítása"]
    },
    {
      questionId: "prog-q4",
      solution: `import argparse

def main():
    parser = argparse.ArgumentParser(description="CLI tool")
    parser.add_argument("--input", required=True, help="Input file path")
    parser.add_argument("--output", help="Output file path")
    args = parser.parse_args()
    print(args)

if __name__ == "__main__":
    main()`,
      explanation: "A required=True jelzi, hogy az --input kötelező. Az --output opcionális. A help szöveg megjelenik a --help kapcsolónál.",
      gradingCriteria: ["argparse használata", "required=True beállítása", "help szöveg megadása"]
    },
    {
      questionId: "prog-q5",
      solution: "A bcrypt egy lassú hash-elési algoritmus, ami erősen ajánlott jelszavakhoz. A lassúság (iterációk és cost faktor) miatt a brute-force támadások nehezebbek. A környezeti változók (os.environ, os.getenv()) ideálisak titkos adatok (jelszavak, API kulcsok) tárolására, mert nem jelennek meg a kódban és nem kerülnek verziókövetésbe.",
      explanation: "Biztonsági kód sosem tartalmazhat titkos adatokat közvetlenül. A környezeti változók és a bcrypt kombinációja biztonságos jelszókezelést biztosít.",
      gradingCriteria: ["Bcrypt lassúság indoklása", "Környezeti változók előnyei", "Biztonsági kockázatok említése"]
    },
    {
      questionId: "prog-q6",
      solution: `import unittest

class TestNormalizeString(unittest.TestCase):
    def test_basic(self):
        result = normalize_string("Hello World 123")
        self.assertEqual(result, "helloworld123")
    
    def test_special_chars(self):
        result = normalize_string("Hello@World!")
        self.assertEqual(result, "helloworld")

if __name__ == "__main__":
    unittest.main()`,
      explanation: "A TestCase osztály metódusai a tesztek. Az assertEqual ellenőrzi a várt eredményt. Minden tesztmetódus önállóan futtatható.",
      gradingCriteria: ["TestCase osztály használata", "assertEqual használata", "Több teszteset"]
    },
    {
      questionId: "prog-q7",
      solution: "A stdout (standard output) a normál program kimenet, a stderr (standard error) a hibaüzenetek kimenete. A stderr-t használjuk hibaüzenetekhez, mert: 1) A hibaüzenetek nem keverednek a normál kimenettel, 2) A stderr átirányítható külön fájlba, 3) A pipe és redirect műveletek általában csak a stdout-ot irányítják át.",
      explanation: "A különbség kritikus a CLI eszközöknél, ahol a normál kimenetet feldolgozzuk, de a hibaüzeneteket külön kezeljük.",
      gradingCriteria: ["Stdout vs stderr különbség", "Stderr előnyei", "Használati esetek"]
    }
  ]
};

// Helper functions
export function getPracticeExamById(id: string): PracticeExam | undefined {
  if (id === "practice-informatika2") return informatika2PracticeExam;
  if (id === "practice-programozas") return programozasPracticeExam;
  return undefined;
}

export function getPracticeExamsBySubject(subjectId: string): PracticeExam[] {
  const allExams = [informatika2PracticeExam, programozasPracticeExam];
  return allExams.filter(exam => exam.subjectId === subjectId);
}

export function getAllPracticeExams(): PracticeExam[] {
  return [informatika2PracticeExam, programozasPracticeExam];
}
