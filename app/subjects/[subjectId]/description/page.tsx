import { subjects } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, Link2, ArrowRight } from "lucide-react";

function row(label: string, value: React.ReactNode) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-slate-50 last:border-0 gap-4">
      <span className="text-sm text-slate-500 shrink-0">{label}</span>
      <span className="text-sm text-slate-700 text-right font-medium">{value}</span>
    </div>
  );
}

export default async function DescriptionPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Leírás – {subject.name}</h2>
        <p className="text-sm text-slate-400 mt-0.5 font-mono">{subject.code}</p>
      </div>

      {/* Core info */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-slate-700">Tárgy adatok</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {row("Kód", <span className="font-mono text-slate-600">{subject.code}</span>)}
          {row("Teljes név", subject.name)}
          {row("Rövid név", subject.shortName)}
          {row("Kategória", subject.category)}
          {row("Kredit", <span className="font-mono font-bold text-sky-600">{subject.credits}</span>)}
          {row("Ajánlott félév", `${subject.recommendedSemester}. félév`)}
          {row("Teljesítési feltétel",
            <Badge className="text-xs border bg-blue-100 text-blue-700 border-blue-200">{subject.requirementType}</Badge>
          )}
          {row("Értékelés típusa",
            subject.gradeType === "grade" ? "Érdemjegy (1–5)" : "Megfelelt / Nem megfelelt"
          )}
          {row("Állapot",
            <Badge className={`text-xs border ${
              subject.completionStatus === "completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
              subject.completionStatus === "in_progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
              "bg-slate-100 text-slate-500 border-slate-200"
            }`}>
              {subject.completionStatus === "completed" ? "Teljesített" :
               subject.completionStatus === "in_progress" ? "Folyamatban" :
               "Nem teljesített"}
            </Badge>
          )}
          {subject.grade && row("Kapott jegy", <span className="font-bold text-emerald-600">{subject.grade}</span>)}
          {subject.passFail && row("Megfelelt/Nem megfelelt", subject.passFail)}
        </CardContent>
      </Card>

      {/* Dependencies */}
      {(subject.prerequisiteSubjectIds.length > 0 || subject.unlocksSubjectIds.length > 0) && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Network className="w-4 h-4 text-slate-400" /> Függőségek
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {subject.prerequisiteSubjectIds.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Előkövetelmények</p>
                <div className="flex flex-wrap gap-1.5">
                  {subject.prerequisiteSubjectIds.map((id) => (
                    <Badge key={id} className="text-xs font-mono bg-slate-100 text-slate-600 border border-slate-200">{id}</Badge>
                  ))}
                </div>
              </div>
            )}
            {subject.unlocksSubjectIds.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Feloldott tárgyak</p>
                <div className="flex flex-wrap gap-1.5">
                  {subject.unlocksSubjectIds.map((id) => (
                    <Badge key={id} className="text-xs font-mono bg-sky-100 text-sky-700 border border-sky-200">{id}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick links */}
      {subject.quickLinks && subject.quickLinks.length > 0 && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-slate-400" /> Linkek
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-1">
            {subject.quickLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-800 hover:underline py-1">
                <ArrowRight className="w-3.5 h-3.5" />{link.label}
              </a>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
