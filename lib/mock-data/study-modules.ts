import { StudyModule } from "../types";

export const studyModules: StudyModule[] = [
  {
    id: "study-1",
    subjectId: "sub-3",
    title: "Bináris fák alapjai",
    generatedByAi: false,
    contentBlocks: [
      { type: "explanation", markdown: "A bináris fa minden csomópontjának legfeljebb két gyermeke van." },
      { type: "example", markdown: "```javascript\nclass Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n```" },
    ],
  },
];
