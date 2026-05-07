import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programmingProjects } from "@/lib/mock-data/programming";
import { getProgrammingLessonById } from "@/lib/utils/programming";
import { ArrowRight, FlaskConical, Clock, Lock } from "lucide-react";

export default function ProjektekPage() {
  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-100 text-amber-700 border-amber-200",
    advanced: "bg-violet-100 text-violet-700 border-violet-200",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/programozas">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Projektek</h1>
              <p className="text-xs text-slate-400">Projektalapú tanulás</p>
            </div>
          </div>
          <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs">Aktív</Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Projektalapú tanulás</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Alkalmazd a tanult tudást gyakorlati projektekben. A projektek segítenek összekapcsolni a különböző témákat, és valódi problémák megoldására készítenek fel.
            </p>
          </CardContent>
        </Card>

        {/* Project List */}
        <div className="space-y-4">
          {programmingProjects.map((project) => {
            const isPlanned = project.status === "planned";
            const requiredLessons = project.requiredLessonIds
              .map((id) => getProgrammingLessonById(id))
              .filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== undefined);
            
            return (
              <Card
                key={project.id}
                className={`border shadow-sm ${
                  isPlanned
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base text-slate-800">{project.title}</CardTitle>
                      <p className="text-sm text-slate-500 mt-1">{project.description}</p>
                    </div>
                    {isPlanned && (
                      <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">
                        Tervezett
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {project.estimatedHours} óra
                      </span>
                      <Badge
                        className={`text-[10px] border ${levelColors[project.level]}`}
                      >
                        {project.level}
                      </Badge>
                    </div>
                    {requiredLessons.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 mb-2">Szükséges leckék:</p>
                        <div className="flex flex-wrap gap-2">
                          {requiredLessons.map((lesson) => (
                            <Badge key={lesson.id} className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                              {lesson.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {isPlanned ? (
                      <div className="flex items-center gap-2 text-xs text-amber-700">
                        <Lock className="w-3 h-3" />
                        Hamarosan elérhető
                      </div>
                    ) : (
                      <Button variant="outline" className="border-slate-300 text-slate-700 text-xs">
                        Projekt indítása
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-700 text-base flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Hogyan kezdj hozzá?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              A projektekhez először végezd el a szükséges leckéket. Ha már ismered az alapokat, kezdj a kezdő projektekkel. A bonyolultabb projektekhez először végezd el a Python alapok útvonalat.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
