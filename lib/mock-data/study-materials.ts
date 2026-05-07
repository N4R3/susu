// Study materials data model
// Global shared records - subject Notes pages filter by subjectId

export type StudyMaterial = {
  id: string;
  title: string;
  fileName?: string;
  type: "pdf" | "docx" | "pptx" | "txt" | "zip" | "repo" | "link";
  subjectIds: string[];
  subjectNames?: string[];
  status: "uploaded" | "processed" | "linked" | "generated" | "missing";
  source: "uploaded" | "external" | "generated" | "repo";
  publicPath?: string;
  externalUrl?: string;
  usedIn: string[];
  description?: string;
  previewMode:
    | "pdf"
    | "docx"
    | "txt"
    | "pptx-fallback"
    | "download"
    | "external-link"
    | "none";
};

export const studyMaterials: StudyMaterial[] = [
  // INFORMATIKA II — subjectId: bbxin2kblf
  {
    id: "inf2-potjegyzet-pdf",
    title: "Kiber levelező pótnotesz",
    fileName: "kiber_levelezo-potjegyzet.pdf",
    type: "pdf",
    subjectIds: ["bbxin2kblf"],
    subjectNames: ["Informatika II."],
    status: "uploaded",
    source: "uploaded",
    publicPath: "/materials/informatika-ii/kiber_levelezo-potjegyzet.pdf",
    usedIn: ["Winsoc track"],
    description: "Kiber levelező tantárgy pótnotesz PDF",
    previewMode: "pdf",
  },
  {
    id: "inf2-potjegyzet-docx",
    title: "Kiber levelező pótnotesz",
    fileName: "kiber_levelezo-potjegyzet.docx",
    type: "docx",
    subjectIds: ["bbxin2kblf"],
    subjectNames: ["Informatika II."],
    status: "uploaded",
    source: "uploaded",
    publicPath: "/materials/informatika-ii/kiber_levelezo-potjegyzet.docx",
    usedIn: ["Winsoc track"],
    description: "Kiber levelező tantárgy pótnotesz DOCX",
    previewMode: "docx",
  },
  {
    id: "inf2-kiber-levelezo-docx",
    title: "2026_02_21_Kiber levelező",
    fileName: "2026_02_21_Kiber_levelezo.docx",
    type: "docx",
    subjectIds: ["bbxin2kblf"],
    subjectNames: ["Informatika II."],
    status: "uploaded",
    source: "uploaded",
    publicPath: "/materials/informatika-ii/2026_02_21_Kiber_levelezo.docx",
    usedIn: ["Winsoc track"],
    description: "Kiber levelező tantárgy jegyzék 2026.02.21",
    previewMode: "docx",
  },
  {
    id: "inf2-winsoc-repo",
    title: "Winsoc Git repo",
    type: "repo",
    subjectIds: ["bbxin2kblf"],
    subjectNames: ["Informatika II."],
    status: "linked",
    source: "external",
    externalUrl: "https://github.com/winsoc/winsoc",
    usedIn: ["Winsoc track"],
    description: "Winsoc projekt Git repository",
    previewMode: "external-link",
  },

  // PROGRAMOZÁS — subjectId: bbxpr12blf
  {
    id: "prog-ady-demo-zh",
    title: "Ady demo ZH",
    fileName: "ady_demo_zh.zip",
    type: "zip",
    subjectIds: ["bbxpr12blf"],
    subjectNames: ["Programozás"],
    status: "uploaded",
    source: "uploaded",
    publicPath: "/materials/programozas/ady_demo_zh.zip",
    usedIn: ["Programozás exam", "Project Sentinel"],
    description: "Ady demonstrációs ZH feladatok",
    previewMode: "download",
  },
  {
    id: "prog-vizsgafelkészito",
    title: "Programozás vizsgafelkészítő (Grok + Perplexity)",
    fileName: "programozas-vizsgafelkészito.txt",
    type: "txt",
    subjectIds: ["bbxpr12blf"],
    subjectNames: ["Programozás"],
    status: "generated",
    source: "generated",
    publicPath: "/materials/programozas/programozas-vizsgafelkészito.txt",
    usedIn: ["Programozás exam"],
    description: "Programozás vizsgafelkészítő anyag Grok és Perplexity alapján",
    previewMode: "txt",
  },

  // VEZETÉKES HÁLÓZATOK — subjectId: bbxvn12blf
  {
    id: "halo-network1-1",
    title: "W_WL_Network1.1",
    fileName: "W_WL_Network1.1.pptx",
    type: "pptx",
    subjectIds: ["bbxvn12blf"],
    subjectNames: ["Vezetékes és vezeték nélküli hálózatok"],
    status: "uploaded",
    source: "uploaded",
    publicPath: "/materials/vezetekes-halozatok/W_WL_Network1.1.pptx",
    usedIn: ["Network later focus"],
    description: "Vezetékes és vezeték nélküli hálózatok 1.1",
    previewMode: "pptx-fallback",
  },
  {
    id: "halo-network1-2",
    title: "W_WL_Network1.2",
    fileName: "W_WL_Network1.2.pptx",
    type: "pptx",
    subjectIds: ["bbxvn12blf"],
    subjectNames: ["Vezetékes és vezeték nélküli hálózatok"],
    status: "uploaded",
    source: "uploaded",
    publicPath: "/materials/vezetekes-halozatok/W_WL_Network1.2.pptx",
    usedIn: ["Network later focus"],
    description: "Vezetékes és vezeték nélküli hálózatok 1.2",
    previewMode: "pptx-fallback",
  },
];
