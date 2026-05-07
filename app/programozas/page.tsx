import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProgrammingTracks, getProgrammingLessonsByTrack, getProgrammingExercisesForLesson, getEmergencyStudyPathLessons, getQuickExercisesForEmergencyPath } from "@/lib/utils/programming";
import { getCriticalProgrammingExamTopics, getProgrammingExamExercises, getProgrammingExamMinimumPath } from "@/lib/utils/programming-exam";
import { ArrowRight, BookOpen, Zap, Target, Code, Shield, FlaskConical, ChevronRight, Clock, AlertTriangle, Cpu, FileText, Database, BarChart3, Lock } from "lucide-react";

export default function ProgramozasHubPage() {
  const tracks = getProgrammingTracks();
  const pythonLessons = getProgrammingLessonsByTrack("python");
  const completedLessons = 0; // TODO: track progress
  const totalLessons = pythonLessons.length;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  // Get exam data
  const criticalProgrammingTopics = getCriticalProgrammingExamTopics();
  const programmingExamExercises = getProgrammingExamExercises();
  const programmingMinimumPath = getProgrammingExamMinimumPath();
  
  // Get first lesson for next recommended
  const firstLesson = pythonLessons[0];
  
  // Get exercises for featured section
  const allExercises = pythonLessons.flatMap((lesson) => getProgrammingExercisesForLesson(lesson.id));
  const beginnerExercises = allExercises.filter((ex) => ex.difficulty === "easy").slice(0, 3);
  
  // Get emergency study path
  const emergencyLessons = getEmergencyStudyPathLessons();
  const quickExercises = getQuickExercisesForEmergencyPath();

  const trackIcons: Record<string, any> = {
    python: Code,
    automatizalas: Zap,
    "ai-programozas": Target,
    kiberbiztonsag: Shield,
    gyakorlas: BookOpen,
    projektek: FlaskConical,
    winsoc: Shield,
  };

  const winsocLessons = getProgrammingLessonsByTrack("winsoc");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Programozás HUB</h1>
              <p className="text-xs text-slate-400">Python alapoktól AI-ig és kiberbiztonsági automatizálásig</p>
            </div>
          </div>
          <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs">Folyamatban</Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-3xl font-bold text-slate-800">Programozás HUB</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Python alapoktól AI-ig és kiberbiztonsági automatizálásig. Ez a fő programozási tudásbázis; a Tanuló HUB ebből emeli vissza a tárgyakhoz releváns részeket.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/programozas/python">
              <Button className="bg-sky-600 hover:bg-sky-700">Python út indítása</Button>
            </Link>
            <Link href="/programozas/gyakorlas">
              <Button variant="outline" className="border-slate-300 text-slate-700">Gyakorlás</Button>
            </Link>
          </div>
        </div>

        {/* SOC Project Section - Informatika II. Exam Focus */}
        <Card className="border-cyan-300 bg-cyan-50 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <CardTitle className="text-lg text-slate-800">Windows SOC Analyst Tool – Informatika II. Vizsgafelkészülés</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="text-xs bg-cyan-600 text-white border-cyan-700">FŐ FÓKUSZ</Badge>
                  <Badge className="text-xs bg-red-100 text-red-700 border-red-200">NEHEZEBB</Badge>
                  <Badge className="text-xs bg-slate-800 text-white border-slate-900">SOC projekt</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Informatika II. (laborgyak) vizsga – Windows SOC elemző rendszer, logfeldolgozás, anomáliadetektálás, integritásellenőrzés, riportgenerálás.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                <FileText className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Mock Log Generator</p>
                <p className="text-[10px] text-slate-500">Teszt logok</p>
              </div>
              <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-center">
                <Cpu className="w-5 h-5 text-sky-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Windows Log Parser</p>
                <p className="text-[10px] text-slate-500">Log parsing</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Anomaly Detector</p>
                <p className="text-[10px] text-slate-500">Brute force, IP figyelés</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                <Lock className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Integrity Checker</p>
                <p className="text-[10px] text-slate-500">Hash alapú integritás</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                <BarChart3 className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Report Generator</p>
                <p className="text-[10px] text-slate-500">HTML/JSON riportok</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {winsocLessons.length} lecke</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~4-5 óra</span>
                <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> 7 gyakorlófeladat</span>
              </div>
              <Link href="/programozas/winsoc">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  SOC felkészülés indítása
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Programozás Exam Focus - ady_demo_zh.zip alapján */}
        <Card className="border-sky-300 bg-sky-50 shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-sky-600" />
                  <CardTitle className="text-base text-slate-800">Programozás vizsgafókusz – ady_demo_zh.zip alapján</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="text-xs bg-sky-600 text-white border-sky-700">ALAPOZÓ / KÖNNYEBB</Badge>
                  <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">AI HASZNÁLHATÓ</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Project Sentinel: Secret Database CLI Tool – string normalizálás, bcrypt ellenőrzés, CLI argumentumok, unit tesztek.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-white rounded-lg border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-semibold text-slate-700">Kritikus témák ({criticalProgrammingTopics.length})</span>
                </div>
                <div className="space-y-1">
                  {criticalProgrammingTopics.slice(0, 3).map((topic) => (
                    <p key={topic.id} className="text-[10px] text-slate-600">• {topic.title}</p>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-semibold text-slate-700">Gyakorlati feladatok ({programmingExamExercises.length})</span>
                </div>
                <div className="space-y-1">
                  {programmingExamExercises.slice(0, 3).map((exercise) => (
                    <p key={exercise.id} className="text-[10px] text-slate-600">• {exercise.title}</p>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-semibold text-slate-700">Minimum útvonal ({programmingMinimumPath.length} lépés)</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-1">Python alapok → String műveletek → Fájl I/O → CLI → Unit tesztek</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/subjects/bbxpr12blf/study">
                <Button className="flex-1 bg-sky-600 hover:bg-sky-700 text-white">
                  Programozás vizsgafókusz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/exam-sprint/maj9">
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                  Május 9. stratégia
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Next Recommended Lesson */}
        {firstLesson && (
          <Card className="border-sky-200 bg-sky-50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-800">Következő lecke</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">{firstLesson.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{firstLesson.summary}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {firstLesson.estimatedMinutes} perc
                    </Badge>
                    <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">
                      {firstLesson.level}
                    </Badge>
                  </div>
                </div>
                <Link href={`/programozas/python/${firstLesson.slug}`}>
                  <Button className="bg-sky-600 hover:bg-sky-700">
                    Lecke indítása
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Overview */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-700">Haladás áttekintés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Python alapok</span>
              <span className="font-mono text-sm text-slate-700">{completedLessons}/{totalLessons} lecke</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">{progress}% kész</p>
          </CardContent>
        </Card>

        {/* Track Cards */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tanulási utak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => {
              const Icon = trackIcons[track.id] || Code;
              const isActive = track.status === "active";
              const trackLessons = getProgrammingLessonsByTrack(track.id);
              return (
                <Link
                  key={track.id}
                  href={`/programozas/${track.slug}`}
                  className={!isActive ? "pointer-events-none opacity-60" : ""}
                >
                  <Card
                    className={`border shadow-sm hover:shadow-md transition-all ${
                      isActive
                        ? "border-slate-200 bg-white hover:border-sky-300"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${track.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: track.color }} />
                        </div>
                        {!isActive && (
                          <Badge className="text-[10px] bg-slate-100 text-slate-500 border-slate-200">
                            Tervezett
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base mt-3 text-slate-800">{track.title}</CardTitle>
                      <p className="text-sm text-slate-500 mt-1">{track.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{trackLessons.length} lecke</span>
                        <span className="capitalize">{track.level}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Lessons */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Kiemelt leckék</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pythonLessons.slice(0, 4).map((lesson) => (
              <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                <Card className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-800">{lesson.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lesson.summary}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                            {lesson.estimatedMinutes} perc
                          </Badge>
                          <Badge
                            className={`text-[10px] border ${
                              lesson.level === "beginner"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : lesson.level === "intermediate"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-violet-100 text-violet-700 border-violet-200"
                            }`}
                          >
                            {lesson.level}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* School Connection */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-700">Kapcsolódás a sulival</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              A Programozás HUB tartalma közvetlenül támogatja a vizsgafelkészülést az alábbi tantárgyakhoz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <h4 className="font-semibold text-slate-800">Programozás (BBXPR12BLF)</h4>
                <p className="text-xs text-slate-500 mt-1">Vizsga: 2026-05-09</p>
                <p className="text-sm text-slate-600 mt-2">
                  Python alapok, ciklusok, függvények, stringkezelés - minden vizsgakövetelmény lefedve.
                </p>
                <Link href="/programozas/python">
                  <Button size="sm" variant="outline" className="mt-3 border-slate-300 text-slate-700">Programozás leckék</Button>
                </Link>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <h4 className="font-semibold text-slate-800">Informatika II. (BBXIN2KBLF)</h4>
                <p className="text-xs text-slate-500 mt-1">Vizsga: 2026-05-09</p>
                <p className="text-sm text-slate-600 mt-2">
                  Fájlkezelés, script futtatás, gyakorlati eszközök - laborvizsga támogatás.
                </p>
                <Link href="/subjects/bbxin2kblf/study">
                  <Button size="sm" variant="outline" className="mt-3 border-slate-300 text-slate-700">Informatika II. tanulás</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Exercises */}
        {beginnerExercises.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Kiemelt gyakorlófeladatok</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {beginnerExercises.map((exercise) => {
                const lesson = pythonLessons.find((l) => l.id === exercise.lessonId);
                return (
                  <Link key={exercise.id} href={`/programozas/python/${lesson?.slug}`}>
                    <Card className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                      <CardContent className="pt-4 pb-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">
                              Kezdő
                            </Badge>
                            <span className="text-[10px] text-slate-400">{lesson?.title}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-slate-800">{exercise.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{exercise.prompt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

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
            <div className="space-y-3">
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
            {quickExercises.length > 0 && (
              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-xs font-semibold text-slate-600 mb-2">Gyors gyakorlófeladatok ({quickExercises.length})</p>
                <div className="space-y-2">
                  {quickExercises.slice(0, 3).map((exercise) => {
                    const lesson = pythonLessons.find((l) => l.id === exercise.lessonId);
                    return (
                      <Link key={exercise.id} href={`/programozas/python/${lesson?.slug}`}>
                        <div className="flex items-start gap-2 p-2 rounded hover:bg-amber-100 transition-all">
                          <Badge
                            className={`text-[9px] border shrink-0 mt-0.5 ${
                              exercise.difficulty === "exam"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                            }`}
                          >
                            {exercise.difficulty === "exam" ? "Vizsga" : "Gyors"}
                          </Badge>
                          <span className="text-xs text-slate-600 line-clamp-1">{exercise.title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
