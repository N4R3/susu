"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWinsocModules, getCriticalWinsocModules, getWinsocChecklist, getMinimumWinsocExamPath, getWinsocUnknownRequirements, getWinsocModuleCountByPriority } from "@/lib/utils/winsoc-readiness";
import { Shield, Target, BookOpen, Clock, Zap, ChevronRight, ArrowRight, ArrowLeft, AlertTriangle, FlaskRound, Database, FileText, Cpu, Lock, BarChart3, CheckCircle2, HelpCircle } from "lucide-react";
import { ExamNavigationStrip } from "@/components/exam-navigation-strip";
import { programmingLessons } from "@/lib/mock-data/programming";

export default function WinSocPage() {
  const winsocModules = getWinsocModules();
  const criticalModules = getCriticalWinsocModules();
  const minimumExamPath = getMinimumWinsocExamPath();
  const unknownRequirements = getWinsocUnknownRequirements();
  const moduleCount = getWinsocModuleCountByPriority();
  const winsocLessons = programmingLessons.filter((l) => l.trackId === "winsoc");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/programozas">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-600" />
              <h1 className="text-lg font-bold text-slate-800">Windows SOC Analyst Tool – Vizsgafelkészülés</h1>
            </div>
          </div>
          <Badge className="font-mono text-xs bg-cyan-100 text-cyan-700 border-cyan-200">
            Informatika II. (laborgyak)
          </Badge>
        </div>
      </header>

      <ExamNavigationStrip />

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Hero Section */}
        <Card className="border-cyan-300 bg-cyan-50 shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-cyan-600" />
                  <CardTitle className="text-2xl text-slate-800">Windows SOC Analyst Tool</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="text-xs bg-cyan-600 text-white border-cyan-700">Informatika II. fő fókusz</Badge>
                  <Badge className="text-xs bg-red-100 text-red-700 border-red-200">Nehezebb gyakorlati vizsga</Badge>
                  <Badge className="text-xs bg-slate-800 text-white border-slate-900">2026.05.09</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Python alapú biztonsági elemző rendszer: logfeldolgozás, anomáliadetektálás, integritásellenőrzés, riportgenerálás.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-semibold text-slate-700">{moduleCount.critical} kritikus modul</span>
                </div>
                <p className="text-[10px] text-slate-500">Template Engine, Parser, Detector, Integrity Checker</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-semibold text-slate-700">{winsocLessons.length} lecke</span>
                </div>
                <p className="text-[10px] text-slate-500">~4-5 óra átfogó elmélet és gyakorlat</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <FlaskRound className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-semibold text-slate-700">{minimumExamPath.length} lépés minimum útvonal</span>
                </div>
                <p className="text-[10px] text-slate-500">Setup → Code → Test → Report</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Link href="/programozas/winsoc/gyorsismetlo">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Gyorsismétlő megnyitása
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Mit kell tudnod 3 mondatban? */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <Zap className="w-4 h-4 text-amber-500" />
              Mit kell tudnod 3 mondatban?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>SOC projekt célja:</strong> Windows eseménylogok elemzése, gyanús tevékenységek detektálása (brute force, fájl változások), és emberileg olvasható riportok generálása.</p>
              <p><strong>Adatáramlás:</strong> Mock logok → Parser (strukturált események) → Anomaly Detector (brute force, gyanús IP-k) → Integrity Checker (fájl hash változások) → Report Generator (HTML/JSON).</p>
              <p><strong>Vizsga célja:</strong> Megérteni a modulokat, tudni futtatni a pipeline-t, írni/értelmezni teszteket, és magyarázni a kimenetet és a döntéseket.</p>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline visual */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <Database className="w-4 h-4 text-slate-500" />
              SOC Pipeline áttekintés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-slate-700">Mock Log Generator</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 rounded-lg border border-sky-200">
                <Cpu className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-semibold text-slate-700">Windows Log Parser</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-slate-700">Anomaly Detector</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                <Lock className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-slate-700">Integrity Checker</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-700">Report Generator</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">HTML/JSON output</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module readiness grid */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-500" />
            Modulok – vizsga felkészültség
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {criticalModules.map((module) => (
              <Card key={module.id} className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={`text-[10px] ${
                      module.examPriority === "critical" ? "bg-red-100 text-red-700 border-red-200" :
                      module.examPriority === "high" ? "bg-amber-100 text-amber-700 border-amber-200" :
                      "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {module.examPriority === "critical" ? "KRITIKUS" : module.examPriority === "high" ? "FONTOS" : "KÖZEPES"}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-800">{module.title}</CardTitle>
                  <p className="text-xs text-slate-500 mt-1">{module.shortDescription}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-3">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-600 mb-1">Fontos tudnivalók:</p>
                      <ul className="text-[10px] text-slate-500 space-y-0.5">
                        {module.mustUnderstand.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-slate-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-600 mb-1">Vizsgafeladatok:</p>
                      <ul className="text-[10px] text-slate-500 space-y-0.5">
                        {module.likelyTasks.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-slate-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-600 mb-1">Gyakori hiba:</p>
                      <p className="text-[10px] text-slate-500 italic">{module.commonMistakes[0]}</p>
                    </div>
                  </div>
                  <Link href={`/programozas/winsoc/modul/${module.id}`}>
                    <Button size="sm" variant="outline" className="w-full border-slate-300 text-slate-700 text-xs">
                      Részletek
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Minimum exam path */}
        <Card className="border-red-200 bg-red-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              Minimum vizsga útvonal
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Ezek a lépések a vizsga előtti minimum – sorrend fontos!</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {minimumExamPath.map((item, index) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-100">
                  <Badge className="text-[10px] bg-red-100 text-red-700 border-red-200 shrink-0 mt-0.5">
                    {index + 1}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">{item.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unknown requirements */}
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              Még tisztázandó vizsga követelmények
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Ezeket a kérdéseket még tisztázni kell a tanárral vagy a vizsga kiírásból.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unknownRequirements.map((req) => (
                <div key={req.id} className="p-3 bg-white rounded-lg border border-amber-100">
                  <p className="text-xs font-semibold text-slate-700 mb-1">{req.question}</p>
                  <p className="text-[10px] text-slate-500">{req.whyItMatters}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exam materials */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <FileText className="w-4 h-4 text-slate-500" />
              Vizsga forrásanyagok
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">kiber_levelező_pótjegyzet.pdf / .docx</p>
                <p className="text-[10px] text-slate-500">A teljes SOC projekt dokumentációja</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">2026_02_21_Kiber_levelező.docx</p>
                <p className="text-[10px] text-slate-500">Frissített projekt leírás</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">winsoc Git repository</p>
                <p className="text-[10px] text-slate-500">A hivatalos projekt kódja és tesztjei</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">Sulipy preparation page</p>
                <p className="text-[10px] text-slate-500">Online felkészítő anyagok</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
