// Exam materials data for tracking uploaded study materials
// Supports Informatika II. SOC project, Programozás, and Network subjects

export type ExamMaterialType = "pptx" | "pdf" | "docx" | "zip" | "externalLink" | "webPage" | "gitRepo";
export type ExamMaterialPriority = "primary" | "secondary" | "later";
export type ExamMaterialDifficulty = "easy" | "medium" | "hard";
export type ExamMaterialStatus = "uploaded" | "linked" | "needsInspection" | "processed";

export interface ExamMaterial {
  id: string;
  subjectId: string;
  subjectName: string;
  priority: ExamMaterialPriority;
  difficulty: ExamMaterialDifficulty;
  examDate: string;
  materialType: ExamMaterialType;
  title: string;
  fileName?: string;
  url?: string;
  notes: string;
  status: ExamMaterialStatus;
  allowedTools?: string[];
  extractedTopics?: string[];
}

export const examMaterials: ExamMaterial[] = [
  // Programozás - easier block, AI allowed
  {
    id: "prog-ady-zip",
    subjectId: "bbxpr12blf",
    subjectName: "Programozás",
    priority: "secondary",
    difficulty: "easy",
    examDate: "2026-05-09",
    materialType: "zip",
    title: "ady_demo_zh.zip",
    fileName: "ady_demo_zh.zip",
    notes: "Contains Python code examples: functions, list processing, divisibility filtering, averaging, closures, prime number check, generators, unit tests. AI allowed in exam. Needs inspection to extract structured exercises.",
    status: "needsInspection",
    allowedTools: ["AI"],
    extractedTopics: ["Python basics", "Functions", "Lists", "Closures", "Generators", "Unit tests"],
  },
  // Informatika II. - primary focus, SOC project
  {
    id: "info2-pdf",
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    priority: "primary",
    difficulty: "hard",
    examDate: "2026-05-09",
    materialType: "pdf",
    title: "kiber_levelező_pótjegyzet.pdf",
    fileName: "kiber_levelező_pótjegyzet.pdf",
    notes: "Windows SOC Analyst Tool project documentation. Covers template engine, mock log generator, Windows log parser, anomaly detector, integrity checker, report generator, main application, CLI, unit/integration tests.",
    status: "uploaded",
    extractedTopics: [
      "SOC",
      "SIEM log analysis",
      "Template Engine",
      "Mock Log Generator",
      "Windows Log Parser",
      "Anomaly Detector",
      "Integrity Checker",
      "Report Generator",
      "Unit testing",
      "Integration testing",
    ],
  },
  {
    id: "info2-docx",
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    priority: "primary",
    difficulty: "hard",
    examDate: "2026-05-09",
    materialType: "docx",
    title: "kiber_levelező_pótjegyzet.docx",
    fileName: "kiber_levelező_pótjegyzet.docx",
    notes: "Windows SOC Analyst Tool project documentation (DOCX version).",
    status: "uploaded",
  },
  {
    id: "info2-2026-docx",
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    priority: "primary",
    difficulty: "hard",
    examDate: "2026-05-09",
    materialType: "docx",
    title: "2026_02_21_Kiber_levelező.docx",
    fileName: "2026_02_21_Kiber_levelező.docx",
    notes: "Updated Windows SOC Analyst Tool project documentation from February 2026.",
    status: "uploaded",
  },
  {
    id: "info2-git-repo",
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    priority: "primary",
    difficulty: "hard",
    examDate: "2026-05-09",
    materialType: "gitRepo",
    title: "winsoc Git repository",
    url: "https://git.nexttechnologies.hu/education/info2/-/tree/master/winsoc",
    notes: "Official Git repository for Windows SOC Analyst Tool project. Contains winsoc.py, test_winsoc.py, pyproject.toml, README.md, and all project modules.",
    status: "linked",
    extractedTopics: [
      "winsoc.py",
      "test_winsoc.py",
      "PyCharm setup",
      "pyproject.toml",
      "Project structure",
    ],
  },
  {
    id: "info2-sulipy",
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    priority: "primary",
    difficulty: "hard",
    examDate: "2026-05-09",
    materialType: "webPage",
    title: "Sulipy preparation page",
    notes: "Sulipy page should be used for Informatika II. preparation if available. Needs link/content.",
    status: "needsInspection",
  },
  // Vezetékes hálózatok - later focus
  {
    id: "halo-pptx-1",
    subjectId: "bbxvn12blf",
    subjectName: "Vezetékes és vezeték nélküli hálózatok",
    priority: "later",
    difficulty: "medium",
    examDate: "2026-05-23",
    materialType: "pptx",
    title: "W_WL_Network1.1.pptx",
    fileName: "W_WL_Network1.1.pptx",
    notes: "Network basics, Packet Tracer, topologies, IPv4/IPv6, MAC, ARP, switching/routing decisions, loops, media, Ethernet, optical fiber, WiFi, DHCP/DNS. Later focus after May 9.",
    status: "uploaded",
    extractedTopics: [
      "Network basics",
      "Packet Tracer",
      "Topologies",
      "IPv4/IPv6",
      "MAC addressing",
      "ARP",
      "Switching/routing",
      "Loops",
      "Media types",
      "Ethernet",
      "Optical fiber",
      "WiFi",
      "DHCP",
      "DNS",
    ],
  },
  {
    id: "halo-pptx-2",
    subjectId: "bbxvn12blf",
    subjectName: "Vezetékes és vezeték nélküli hálózatok",
    priority: "later",
    difficulty: "medium",
    examDate: "2026-05-23",
    materialType: "pptx",
    title: "W_WL_Network1.2.pptx",
    fileName: "W_WL_Network1.2.pptx",
    notes: "Additional network topics. Later focus after May 9.",
    status: "uploaded",
  },
];

export const examFocusSubjects = [
  {
    subjectId: "bbxin2kblf",
    subjectName: "Informatika II. (laborgyak)",
    priority: "primary",
    difficulty: "hard",
    examDate: "2026-05-09",
    examType: "lab/practical",
    topic: "Windows SOC Analyst Tool",
    materials: ["info2-pdf", "info2-docx", "info2-2026-docx", "info2-git-repo", "info2-sulipy"],
    cta: "SOC felkészülés indítása",
  },
  {
    subjectId: "bbxpr12blf",
    subjectName: "Programozás",
    priority: "secondary",
    difficulty: "easy",
    examDate: "2026-05-09",
    examType: "programming",
    topic: "Python basics and problem solving",
    materials: ["prog-ady-zip"],
    cta: "Programozás ismétlés",
    aiAllowed: true,
  },
  {
    subjectId: "bbxvn12blf",
    subjectName: "Vezetékes és vezeték nélküli hálózatok",
    priority: "later",
    difficulty: "medium",
    examDate: "2026-05-23",
    examType: "theory/practical",
    topic: "Network fundamentals and Packet Tracer",
    materials: ["halo-pptx-1", "halo-pptx-2"],
    cta: "Hálózatok később",
  },
];
