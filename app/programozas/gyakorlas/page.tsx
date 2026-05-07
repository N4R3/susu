import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programmingLessons } from "@/lib/mock-data/programming";
import { ArrowRight, BookOpen, Filter, CheckCircle } from "lucide-react";

export default function GyakorlasPage() {
  // Collect all exercises from all lessons
  const allExercises = programmingLessons.flatMap((lesson) =>
    lesson.exercises.map((exercise) => ({
      ...exercise,
      lessonTitle: lesson.title,
      lessonSlug: lesson.slug,
      lessonId: lesson.id,
    }))
  );

  const difficultyColors: Record<string, string> = {
    easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    exam: "bg-red-100 text-red-700 border-red-200",
    hard: "bg-violet-100 text-violet-700 border-violet-200",
  };

  const difficultyLabels: Record<string, string> = {
    easy: "Könnyű",
    medium: "Közepes",
    exam: "Vizsga",
    hard: "Nehéz",
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
              <h1 className="text-xl font-bold text-slate-800">Gyakorlás</h1>
              <p className="text-xs text-slate-400">{allExercises.length} feladat</p>
            </div>
          </div>
          <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs">Aktív</Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Gyakorlófeladatok</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Gyakorold a programozást ezekkel a feladatokkal. A feladatok a tanulási utakból származnak, és nehézségi szint szerint vannak csoportosítva.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Szűrés:</span>
              <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200 cursor-pointer hover:bg-slate-200">
                Összes ({allExercises.length})
              </Badge>
              <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200 cursor-pointer hover:bg-emerald-200">
                Könnyű ({allExercises.filter((e) => e.difficulty === "easy").length})
              </Badge>
              <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 cursor-pointer hover:bg-amber-200">
                Közepes ({allExercises.filter((e) => e.difficulty === "medium").length})
              </Badge>
              <Badge className="text-[10px] bg-red-100 text-red-700 border-red-200 cursor-pointer hover:bg-red-200">
                Vizsga ({allExercises.filter((e) => e.difficulty === "exam").length})
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <div className="space-y-4">
          {allExercises.map((exercise) => (
            <Link key={exercise.id} href={`/programozas/python/${exercise.lessonSlug}`}>
              <Card className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`text-[10px] border ${difficultyColors[exercise.difficulty]}`}
                        >
                          {difficultyLabels[exercise.difficulty]}
                        </Badge>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{exercise.lessonTitle}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800">{exercise.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{exercise.prompt}</p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {exercise.tags.map((tag) => (
                          <Badge key={tag} className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                            {tag}
                          </Badge>
                        ))}
                        {exercise.checkerType.startsWith("future") && (
                          <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">
                            Hamarosan
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-slate-300 shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-700 text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Tipp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              A gyakorlófeladatok megoldásához nyisd meg a hozzá tartozó leckét, ahol találsz magyarázatokat és példakódokat. A vizsgafeladatok különösen fontosak a Programozás tantárgy vizsgájára való felkészüléshez.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
