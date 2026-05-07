"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getMay9StrategyBlocks, getMay9SurvivalPath, getMay9TimeBoxPlans, getMay9QuickLinks, getMay9UnknownRequirements, getMay9TopCriticalTopics, getMay9ProgrammingExercises } from "@/lib/utils/may9-exam-strategy";
import { markChecklistItemDone, unmarkChecklistItemDone, isChecklistItemDone, resetProgressForScope, getProgressState, getPracticeQuestionProgress, type StudyProgressState } from "@/lib/utils/progress-storage";
import { ArrowRight, Calendar, Target, Zap, BookOpen, AlertTriangle, Clock, Shield, Cpu, ChevronRight, CheckCircle2, RotateCcw, BarChart3 } from "lucide-react";
import { ExamNavigationStrip } from "@/components/exam-navigation-strip";

export default function May9StrategyPage() {
  const strategyBlocks = getMay9StrategyBlocks();
  const survivalPath = getMay9SurvivalPath();
  const timeBoxPlans = getMay9TimeBoxPlans();
  const quickLinks = getMay9QuickLinks();
  const unknownRequirements = getMay9UnknownRequirements();
  const topCriticalTopics = getMay9TopCriticalTopics();
  const programmingExercises = getMay9ProgrammingExercises();

  const primaryBlock = strategyBlocks.find((b) => b.priority === "primary");
  const secondaryBlock = strategyBlocks.find((b) => b.priority === "secondary");

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<StudyProgressState | null>(null);

  useEffect(() => {
    const completed = new Set<string>();
    survivalPath.forEach(item => {
      if (isChecklistItemDone(item.id)) {
        completed.add(item.id);
      }
    });
    setCheckedItems(completed);
    setProgress(getProgressState());
  }, [survivalPath]);

  const toggleCheck = (id: string) => {
    if (checkedItems.has(id)) {
      unmarkChecklistItemDone(id);
      setCheckedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } else {
      markChecklistItemDone(id);
      setCheckedItems(prev => new Set(prev).add(id));
    }
  };

  const handleResetProgress = () => {
    if (confirm("Biztosan törlöd a Május 9 haladást?")) {
      resetProgressForScope("checklist");
      setCheckedItems(new Set());
      setProgress(getProgressState());
    }
  };

  const quickReviewProgress = progress?.completedQuickReviewCards.length || 0;
  const quickReviewTotal = 7; // Approximate total from gyorsismetlo page
  const survivalProgress = checkedItems.size;
  const survivalTotal = survivalPath.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <ExamNavigationStrip />
      
      {/* Start Here Card */}
      <Card className="border-sky-300 bg-sky-50 shadow-md mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Zap className="w-4 h-4 text-sky-600" />
            Kezdés itt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Link href="/programozas/winsoc/gyorsismetlo">
              <div className="p-3 bg-white rounded border border-sky-100 hover:border-sky-300 transition-colors cursor-pointer">
                <p className="text-xs font-semibold text-slate-700 mb-1">Ha most kezded</p>
                <p className="text-[10px] text-slate-600">Gyorsismétlő megnyitása</p>
              </div>
            </Link>
            <Link href="/exam-sprint/maj9">
              <div className="p-3 bg-white rounded border border-sky-100 hover:border-sky-300 transition-colors cursor-pointer">
                <p className="text-xs font-semibold text-slate-700 mb-1">Ha 1 órád van</p>
                <p className="text-[10px] text-slate-600">60 perces terv használata</p>
              </div>
            </Link>
            <Link href="/exam-sprint/maj9">
              <div className="p-3 bg-white rounded border border-sky-100 hover:border-sky-300 transition-colors cursor-pointer">
                <p className="text-xs font-semibold text-slate-700 mb-1">Ha már csak ismétlesz</p>
                <p className="text-[10px] text-slate-600">Minimum túlélési útvonal</p>
              </div>
            </Link>
            <Link href="/exam-sprint/probavizsga">
              <div className="p-3 bg-white rounded border border-sky-100 hover:border-sky-300 transition-colors cursor-pointer">
                <p className="text-xs font-semibold text-slate-700 mb-1">Önellenőrzés</p>
                <p className="text-[10px] text-slate-600">Próbavizsga indítása</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6" />
            <span className="text-2xl font-bold">2026.05.09</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Május 9. vizsgastratégia</h1>
          <p className="text-xl text-amber-100 mb-4">Informatika II. fő fókusz, Programozás gyors ismétlés</p>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white text-amber-700 border-amber-300 text-sm px-3 py-1">Informatika II. — primary/harder</Badge>
            <Badge className="bg-white text-sky-700 border-sky-300 text-sm px-3 py-1">Programozás — secondary/AI allowed</Badge>
          </div>
          <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-lg font-semibold">Először Informatika II. SOC projekt, utána Programozás Project Sentinel ismétlés.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Strategy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informatika II. — 70% Focus */}
          {primaryBlock && (
            <Card className="border-amber-300 bg-amber-50 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-amber-600" />
                      <CardTitle className="text-xl text-slate-800">{primaryBlock.title} — FŐ FÓKUSZ / 70%</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {primaryBlock.badges.map((badge) => (
                        <Badge key={badge} className="text-xs bg-amber-600 text-white border-amber-700">{badge}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 mb-4">{primaryBlock.summary}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3 text-amber-500" />
                      Top 3 kritikus témák
                    </p>
                    <div className="space-y-1">
                      {primaryBlock.topTopics.slice(0, 3).map((topic) => (
                        <p key={topic} className="text-xs text-slate-600">• {topic}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-500" />
                      3 valószínű feladat
                    </p>
                    <div className="space-y-1">
                      {primaryBlock.likelyTasks.slice(0, 3).map((task) => (
                        <p key={task} className="text-xs text-slate-600">• {task}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      3 gyakori hiba
                    </p>
                    <div className="space-y-1">
                      {primaryBlock.commonMistakes.slice(0, 3).map((mistake) => (
                        <p key={mistake} className="text-xs text-slate-600">• {mistake}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {primaryBlock.quickLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        {link.label}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Programozás — 30% Focus */}
          {secondaryBlock && (
            <Card className="border-sky-300 bg-sky-50 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-5 h-5 text-sky-600" />
                      <CardTitle className="text-xl text-slate-800">{secondaryBlock.title} — MÁSODIK BLOKK / 30%</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {secondaryBlock.badges.map((badge) => (
                        <Badge key={badge} className="text-xs bg-sky-600 text-white border-sky-700">{badge}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 mb-4">{secondaryBlock.summary}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3 text-sky-500" />
                      Top 3 kritikus témák
                    </p>
                    <div className="space-y-1">
                      {secondaryBlock.topTopics.slice(0, 3).map((topic) => (
                        <p key={topic} className="text-xs text-slate-600">• {topic}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-sky-500" />
                      3 gyors gyakorlati feladat
                    </p>
                    <div className="space-y-1">
                      {programmingExercises.slice(0, 3).map((ex) => (
                        <p key={ex.title} className="text-xs text-slate-600">• {ex.title} ({ex.difficulty})</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-sky-500" />
                      3 gyakori hiba
                    </p>
                    <div className="space-y-1">
                      {secondaryBlock.commonMistakes.slice(0, 3).map((mistake) => (
                        <p key={mistake} className="text-xs text-slate-600">• {mistake}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {secondaryBlock.quickLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                        {link.label}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Progress Summary */}
        <Card className="border-slate-200 bg-slate-50 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                <BarChart3 className="w-5 h-5 text-sky-600" />
                Haladás összefoglaló
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetProgress}
                className="text-slate-500 hover:text-slate-700"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Haladás törlése
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Túlélő útvonal</p>
                <p className="text-2xl font-bold text-slate-800">
                  <span className="text-amber-600">{survivalProgress}</span>
                  <span className="text-slate-400">/</span>
                  <span>{survivalTotal}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">kész</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Gyorsismétlő</p>
                <p className="text-2xl font-bold text-slate-800">
                  <span className="text-sky-600">{quickReviewProgress}</span>
                  <span className="text-slate-400">/</span>
                  <span>{quickReviewTotal}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">átnézve</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Próbavizsga</p>
                <p className="text-2xl font-bold text-slate-800">
                  <span className="text-emerald-600">
                    {progress?.completedPracticeQuestions.length || 0}
                  </span>
                  <span className="text-slate-400">/</span>
                  <span>14</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">kész</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Minimum Survival Path */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <Zap className="w-5 h-5 text-amber-500" />
              Minimum túlélési útvonal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {survivalPath.map((item) => {
                const isInformatika2 = item.subjectId === "bbxin2kblf";
                return (
                  <div key={item.id} className={`p-3 rounded-lg border ${isInformatika2 ? "bg-amber-50 border-amber-200" : "bg-sky-50 border-sky-200"}`}>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={checkedItems.has(item.id)}
                        onCheckedChange={() => toggleCheck(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`text-[10px] ${isInformatika2 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-sky-100 text-sky-700 border-sky-200"}`}>
                            {item.order}
                          </Badge>
                          <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{item.why}</p>
                        {item.link && (
                          <Link href={item.link} className="text-xs text-sky-600 hover:underline">
                            Megnyitás →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Review Links */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <BookOpen className="w-5 h-5 text-slate-500" />
              Gyors áttekintő linkek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button variant="outline" className="w-full justify-start">
                    {link.label}
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unknown Requirements */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Még tisztázandó vizsga követelmények
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Még tisztázandó, de addig így készülj</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informatika II. Unknown */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  Informatika II. ({unknownRequirements.informatika2.length})
                </p>
                <div className="space-y-2">
                  {unknownRequirements.informatika2.map((req, index) => (
                    <div key={index} className="p-2 bg-amber-50 rounded border border-amber-100">
                      <p className="text-xs text-slate-700">{req.question}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programozás Unknown */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-500" />
                  Programozás ({unknownRequirements.programozas.length})
                </p>
                <div className="space-y-2">
                  {unknownRequirements.programozas.map((req, index) => (
                    <div key={index} className="p-2 bg-sky-50 rounded border border-sky-100">
                      <p className="text-xs font-semibold text-slate-700">{req.title}</p>
                      <p className="text-[10px] text-slate-600">{req.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Private Use Status Card */}
        <Card className="border-slate-200 bg-slate-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <Shield className="w-4 h-4 text-slate-500" />
              Privát tanulási rendszer állapota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Kész</span>
                </div>
                <p className="text-[9px] text-slate-600">Clerk privát belépés</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Kész</span>
                </div>
                <p className="text-[9px] text-slate-600">localStorage fallback</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Kész</span>
                </div>
                <p className="text-[9px] text-slate-600">Python futtatás</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Kész</span>
                </div>
                <p className="text-[9px] text-slate-600">Automatikus önellenőrzés</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Kész</span>
                </div>
                <p className="text-[9px] text-slate-600">DOCX előnézet</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Fallback</span>
                </div>
                <p className="text-[9px] text-slate-600">PPTX kezelés</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Kész</span>
                </div>
                <p className="text-[9px] text-slate-600">PDF/TXT/MD előnézet</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Opcionális</span>
                </div>
                <p className="text-[9px] text-slate-600">Supabase progress sync</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last-minute Plan */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <Clock className="w-5 h-5 text-slate-500" />
              Ha már nagyon kevés idő van
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeBoxPlans.map((plan) => (
                <div key={plan.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-slate-700 text-white">{plan.minutes} perc</Badge>
                    <p className="text-sm font-semibold text-slate-700">{plan.title}</p>
                  </div>
                  <div className="space-y-1">
                    {plan.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
