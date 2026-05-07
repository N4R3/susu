import { subjects } from "@/lib/mock-data";
import { deadlines } from "@/lib/mock-data/deadlines";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, FileText, Calendar, ArrowRight, Clock, Star, Link2 } from "lucide-react";

function statusLabel(s: string) {
  switch (s) {
    case "completed": return { text: "Teljesített", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    case "in_progress": return { text: "Folyamatban", cls: "bg-amber-100 text-amber-700 border-amber-200" };
    case "failed": return { text: "Nem sikerült", cls: "bg-red-100 text-red-700 border-red-200" };
    default: return { text: "Nem teljesített", cls: "bg-slate-100 text-slate-500 border-slate-200" };
  }
}

function reqLabel(r: string) {
  switch (r) {
    case "Vizsga": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Beadandó": return "bg-violet-100 text-violet-700 border-violet-200";
    case "Full online": return "bg-sky-100 text-sky-700 border-sky-200";
    case "Megfelelt / Nem megfelelt": return "bg-slate-100 text-slate-600 border-slate-200";
    default: return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const status = statusLabel(subject.completionStatus);
  const subjectDeadline = deadlines.find((d) => d.subjectName === subject.name);
  const isUrgent = subjectDeadline?.priority === "urgent" && !subjectDeadline.isDone;

  return (
    <div className="max-w-3xl space-y-5">
      {/* Hero card */}
      <Card className={`border shadow-sm ${isUrgent ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-4">
            <div className="w-4 h-16 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{subject.name}</h2>
                  <p className="font-mono text-xs text-slate-400 mt-0.5">{subject.code}</p>
                </div>
                <Badge className={`border text-xs shrink-0 ${status.cls}`}>{status.text}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className={`border text-xs ${reqLabel(subject.requirementType)}`}>{subject.requirementType}</Badge>
                <Badge className="border text-xs bg-slate-100 text-slate-600 border-slate-200 font-mono">{subject.credits} kredit</Badge>
                <Badge className="border text-xs bg-slate-100 text-slate-500 border-slate-200">{subject.category}</Badge>
                {isUrgent && (
                  <Badge className="border text-xs bg-red-100 text-red-700 border-red-200">⚡ Vizsga: {subjectDeadline?.firstDeadline}</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href={`/subjects/${subject.id}/study`}>
          <Card className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-4 pb-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-sky-500 group-hover:text-sky-600" />
              <p className="text-sm font-semibold text-slate-700">Tanulás</p>
              <p className="text-xs text-slate-400 mt-0.5">Tananyag, gyakorlás</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/subjects/${subject.id}/notes`}>
          <Card className="border-slate-200 bg-white shadow-sm hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-4 pb-4 text-center">
              <FileText className="w-6 h-6 mx-auto mb-2 text-violet-500 group-hover:text-violet-600" />
              <p className="text-sm font-semibold text-slate-700">Jegyzetek</p>
              <p className="text-xs text-slate-400 mt-0.5">Feltöltés, előnézet</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/subjects/${subject.id}/classes`}>
          <Card className="border-slate-200 bg-white shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-4 pb-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-emerald-500 group-hover:text-emerald-600" />
              <p className="text-sm font-semibold text-slate-700">Órák</p>
              <p className="text-xs text-slate-400 mt-0.5">Menetrend, naplók</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Progress / Status */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" /> Állapot
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Teljesítés</span>
              <Badge className={`border text-xs ${status.cls}`}>{status.text}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Kredit</span>
              <span className="font-mono font-semibold text-slate-700">{subject.credits}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Ajánlott félév</span>
              <span className="font-mono text-slate-600">{subject.recommendedSemester}.</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Jegy típus</span>
              <span className="text-slate-600">{subject.gradeType === "grade" ? "Jegy (1–5)" : "Megfelelt/Nem megfelelt"}</span>
            </div>
            {subject.grade && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Jegy</span>
                <span className="font-bold text-emerald-600">{subject.grade}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deadline / Exam */}
        <Card className={`shadow-sm ${isUrgent ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" /> Határidők
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {subjectDeadline ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Típus</span>
                  <span className="text-slate-700 font-medium capitalize">{subjectDeadline.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Dátum</span>
                  <span className="font-mono font-semibold text-slate-700">{subjectDeadline.firstDeadline}</span>
                </div>
                {subjectDeadline.secondDeadline && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">2. lehetőség</span>
                    <span className="font-mono text-slate-600">{subjectDeadline.secondDeadline}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Leadva</span>
                  <Badge className={`border text-xs ${subjectDeadline.isDone ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {subjectDeadline.isDone ? "Igen" : "Nem"}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">Nincs rögzített határidő.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Prerequisites */}
      {(subject.prerequisiteSubjectIds.length > 0 || subject.unlocksSubjectIds.length > 0) && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-slate-700">Kapcsolódó tárgyak</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {subject.prerequisiteSubjectIds.length > 0 && (
              <div className="text-sm text-slate-500">
                <span className="font-medium text-slate-600">Előkövetelmény:</span>{" "}
                {subject.prerequisiteSubjectIds.join(", ")}
              </div>
            )}
            {subject.unlocksSubjectIds.length > 0 && (
              <div className="text-sm text-slate-500">
                <span className="font-medium text-slate-600">Következő tárgyak:</span>{" "}
                {subject.unlocksSubjectIds.join(", ")}
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
              <Link2 className="w-4 h-4 text-slate-400" /> Gyors linkek
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-1">
            {subject.quickLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-800 hover:underline py-1">
                <ArrowRight className="w-3.5 h-3.5" />
                {link.label}
              </a>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
