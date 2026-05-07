import { Subject, Deadline } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubjectCard from "./SubjectCard";

interface SubjectListProps {
  subjects: Subject[];
  urgentDeadlines?: Deadline[];
}

export default function SubjectList({ subjects, urgentDeadlines = [] }: SubjectListProps) {
  return (
    <Card className="h-full border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800">
          Tárgyak
          <span className="ml-2 font-mono text-sm font-normal text-slate-400">
            ({subjects.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {subjects.map((subject, index) => {
          const urgentDeadline = urgentDeadlines.find(
            (d) => d.subjectName === subject.name
          );
          return (
            <SubjectCard
              key={subject.id}
              subject={subject}
              urgentDeadline={urgentDeadline}
              index={index}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
