"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProgrammingLessonBySlug,
  getPreviousProgrammingLesson,
  getNextRecommendedProgrammingLesson,
  getProgrammingExercisesForLesson,
} from "@/lib/utils/programming";
import { markLessonComplete, unmarkLessonComplete, isLessonComplete } from "@/lib/utils/progress-storage";
import { ArrowRight, ArrowLeft, Clock, BookOpen, ChevronRight, CheckCircle, Code, AlertTriangle, Shield, Sparkles, Target, Check, RotateCcw } from "lucide-react";

export default function LessonPage({ params }: { params: Promise<{ lessonSlug: string }> }) {
  const { lessonSlug } = use(params);
  const lesson = getProgrammingLessonBySlug(lessonSlug);

  if (!lesson) notFound();

  const previousLesson = getPreviousProgrammingLesson(lesson.id);
  const nextLesson = getNextRecommendedProgrammingLesson(lesson.id);
  const exercises = getProgrammingExercisesForLesson(lesson.id);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(isLessonComplete(lesson.id));
  }, [lesson.id]);

  const toggleComplete = () => {
    if (isComplete) {
      unmarkLessonComplete(lesson.id);
    } else {
      markLessonComplete(lesson.id);
    }
    setIsComplete(!isComplete);
  };

  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-100 text-amber-700 border-amber-200",
    advanced: "bg-violet-100 text-violet-700 border-violet-200",
  };

  const blockIcons: Record<string, any> = {
    explanation: BookOpen,
    code: Code,
    example: CheckCircle,
    commonMistake: AlertTriangle,
    cybersecurityContext: Shield,
    aiContext: Sparkles,
  };

  const blockColors: Record<string, string> = {
    explanation: "text-slate-600",
    code: "text-sky-600",
    example: "text-emerald-600",
    commonMistake: "text-red-500",
    cybersecurityContext: "text-violet-600",
    aiContext: "text-amber-500",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/programozas/python">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{lesson.title}</h1>
              <p className="text-xs text-slate-400">Lecke {lesson.order}</p>
            </div>
          </div>
          <Badge className={`text-[10px] border ${levelColors[lesson.level]}`}>
            {lesson.level}
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Lesson Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-700">Navigáció</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {previousLesson ? (
                  <Link href={`/programozas/python/${previousLesson.slug}`}>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600">
                      <ArrowLeft className="w-3 h-3 mr-2" />
                      {previousLesson.title}
                    </Button>
                  </Link>
                ) : (
                  <div className="text-xs text-slate-400 italic">Ez az első lecke</div>
                )}
                {nextLesson ? (
                  <Link href={`/programozas/python/${nextLesson.slug}`}>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600">
                      {nextLesson.title}
                      <ChevronRight className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/programozas/projektek">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600">
                      Projektek
                      <ChevronRight className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-slate-700">{lesson.summary}</p>
                    <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.estimatedMinutes} perc
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={toggleComplete}
                    variant={isComplete ? "default" : "outline"}
                    className={isComplete ? "bg-emerald-600 hover:bg-emerald-700" : "text-slate-500 hover:text-slate-700"}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {isComplete ? "Lecke kész" : "Késznek jelölöm"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Content Blocks */}
            <div className="space-y-4">
              {lesson.contentBlocks.map((block, index) => {
                const BlockIcon = blockIcons[block.type] || BookOpen;
                return (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-base flex items-center gap-2 ${blockColors[block.type]}`}>
                        <BlockIcon className="w-5 h-5" />
                        {block.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {block.type === "code" ? (
                        <div className="space-y-3">
                          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{block.code}</code>
                          </pre>
                          {block.explanation && (
                            <p className="text-sm text-slate-600">{block.explanation}</p>
                          )}
                        </div>
                      ) : (
                        <div className="text-slate-700 text-sm whitespace-pre-line">{block.markdown}</div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Exercises */}
            {exercises.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-slate-800 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Gyakorlófeladatok ({exercises.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exercises.map((exercise) => (
                    <div key={exercise.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-sm font-semibold text-slate-800">{exercise.title}</h4>
                        <Badge
                          className={`text-[10px] border ${
                            exercise.difficulty === "easy"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : exercise.difficulty === "medium"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : exercise.difficulty === "exam"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-violet-100 text-violet-700 border-violet-200"
                          }`}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{exercise.prompt}</p>
                      {exercise.starterCode && (
                        <div className="mb-3">
                          <p className="text-xs text-slate-500 mb-1">Kezdőkód:</p>
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                            <code>{exercise.starterCode}</code>
                          </pre>
                        </div>
                      )}
                      {exercise.expectedOutput && (
                        <div className="mb-3">
                          <p className="text-xs text-slate-500 mb-1">Várt kimenet:</p>
                          <code className="text-xs bg-slate-200 px-2 py-1 rounded">{exercise.expectedOutput}</code>
                        </div>
                      )}
                      {exercise.solution && (
                        <details className="mt-3">
                          <summary className="text-xs text-slate-600 cursor-pointer hover:text-slate-800">Megoldás megjelenítése</summary>
                          <pre className="mt-2 bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                            <code>{exercise.solution}</code>
                          </pre>
                        </details>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                          ellenőrzés később
                        </Badge>
                        <Button size="sm" variant="outline" disabled className="text-xs border-slate-300 text-slate-400">
                          Késznek jelölöm
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Learning Goals */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Tanulási célok
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  {lesson.learningGoals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* School Relevance */}
            {lesson.schoolRelevance.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-700">Suli kapcsolat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lesson.schoolRelevance.map((rel) => (
                    <div key={rel.subjectId} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-800">{rel.subjectName}</span>
                        {rel.examPriority && (
                          <Badge
                            className={`text-[10px] border ${
                              rel.examPriority === "high"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : rel.examPriority === "medium"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {rel.examPriority}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">{rel.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-700">Címkék</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <Badge key={tag} className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
