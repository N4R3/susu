import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProgrammingLessonsByTrack, getProgrammingExercisesForLesson, getEmergencyStudyPathLessons, getProgrammingTrackBySlug } from "@/lib/utils/programming";
import { ArrowRight, Clock, BookOpen, ChevronRight, AlertTriangle } from "lucide-react";

export default function PythonTrackPage() {
  const track = getProgrammingTrackBySlug("python");
  const lessons = getProgrammingLessonsByTrack("python");
  const emergencyLessons = getEmergencyStudyPathLessons();

  if (!track) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">A tanulási útvonal nem található.</p>
      </div>
    );
  }

  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-100 text-amber-700 border-amber-200",
    advanced: "bg-violet-100 text-violet-700 border-violet-200",
  };

  const relevanceColors: Record<string, string> = {
    direct: "bg-sky-100 text-sky-700 border-sky-200",
    related: "bg-violet-100 text-violet-700 border-violet-200",
    background: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/programozas">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{track.title}</h1>
              <p className="text-xs text-slate-400">{lessons.length} lecke</p>
            </div>
          </div>
          <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs">Aktív</Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Track Hero */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">{track.title}</CardTitle>
            <p className="text-slate-600 mt-2">{track.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="capitalize">{track.level}</span>
              <span>•</span>
              <span>{lessons.length} lecke</span>
            </div>
          </CardContent>
        </Card>

        {/* Lesson List */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Leckék</h2>
          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const exercises = getProgrammingExercisesForLesson(lesson.id);
              return (
                <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                  <Card className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="text-sm font-semibold text-slate-800">{lesson.title}</h3>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{lesson.summary}</p>
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            <Badge
                              className={`text-[10px] border ${levelColors[lesson.level]}`}
                            >
                              {lesson.level}
                            </Badge>
                            <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.estimatedMinutes} perc
                            </Badge>
                            <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {exercises.length} feladat
                            </Badge>
                            {lesson.schoolRelevance.map((rel) => (
                              <Badge
                                key={`${rel.subjectId}-${rel.relevance}`}
                                className={`text-[10px] border ${relevanceColors[rel.relevance]}`}
                              >
                                {rel.subjectCode}: {rel.relevance}
                              </Badge>
                            ))}
                            {lesson.schoolRelevance.some((rel) => rel.examPriority === "high") && (
                              <Badge className="text-[10px] bg-red-100 text-red-700 border-red-200">
                                Vizsga
                              </Badge>
                            )}
                          </div>
                          <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 text-xs">
                            Lecke megnyitása
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Emergency Study Path */}
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-slate-800">Ha kevés időd van - Vizsga előtti minimum útvonal</CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Csak a legfontosabb alapok: Input/output, Feltételek, Ciklusok, Függvények, Listák, Tipikus vizsgafeladatok
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {emergencyLessons.map((lesson, index) => (
                <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-amber-100 transition-all">
                    <Badge className="text-[10px] bg-slate-200 text-slate-700 border-slate-300 shrink-0 mt-0.5">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">{lesson.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{lesson.summary}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals Summary */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-700 text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Tanulási célok
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              {lessons.flatMap((l) => l.learningGoals).slice(0, 8).map((goal, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  {goal}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
