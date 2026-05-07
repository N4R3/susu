"use client";

import { subjects } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, CheckSquare, Square, BookOpen, Sparkles, ArrowRight, Clock, AlertTriangle, Shield, Cpu, FileText, Database, BarChart3, Lock, HelpCircle, Zap, ChevronRight as ChevronRightIcon } from "lucide-react";
import { getLessonsRelevantToSubject, getHighPriorityExamLessons, getEmergencyStudyPathLessons, getProgrammingExercisesForLesson } from "@/lib/utils/programming";
import { getProgrammingLessonsByTrack } from "@/lib/utils/programming";
import { getCriticalWinsocModules, getMinimumWinsocExamPath, getWinsocUnknownRequirements, getWinsocModuleCountByPriority } from "@/lib/utils/winsoc-readiness";
import { getCriticalProgrammingExamTopics, getProgrammingExamExercises, getProgrammingExamMinimumPath, getProgrammingExamTopicCountByPriority } from "@/lib/utils/programming-exam";
import { getMaterialsBySubjectId } from "@/lib/utils/study-materials";
import { type StudyMaterial } from "@/lib/mock-data/study-materials";
import Link from "next/link";
import { ExamNavigationStrip } from "@/components/exam-navigation-strip";

type Section = { id: string; title: string; topics: string[] };

const PROGRAMOZAS_SECTIONS: Section[] = [
  { id: "p1", title: "Alapok", topics: ["Változók, típusok, műveletek", "Feltételek, elágazások", "Ciklusok (for, while, do-while)", "Tömbök és stringek"] },
  { id: "p2", title: "Függvények", topics: ["Függvény definíció és hívás", "Paraméterek és visszatérési értékek", "Rekurzió alapjai", "Hatókör (scope) és élettartam"] },
  { id: "p3", title: "Adatszerkezetek", topics: ["Láncolt lista", "Verem (stack) és sor (queue)", "Bináris fa alapjai", "Rendezési algoritmusok"] },
  { id: "p4", title: "Tipikus vizsgafeladatok", topics: ["Tömbök rendezése és keresése", "Karakterlánc feldolgozás", "Rekurzív problémák", "Struktúrák és pointerek"] },
  { id: "p5", title: "Vizsga ellenőrzőlista", topics: ["IDE beállítása, fordítás", "Alapszintaxis memorizálva", "Legalább 3 saját program megírva", "Mintafeladatok végigcsinálva"] },
];

const INFORMATIKA_SECTIONS: Section[] = [
  { id: "i1", title: "SOC projekt áttekintés", topics: ["SOC (Security Operations Center) alapok", "SIEM log elemzés koncepció", "Windows SOC Analyst Tool projekt célja", "Projekt moduljainak szerepe"] },
  { id: "i2", title: "Projektstruktúra és setup", topics: ["Python modulok és csomagok", "pyproject.toml konfiguráció", "PyCharm projekt beállítás", "Git repository (winsoc)"] },
  { id: "i3", title: "Mock Log Generator", topics: ["Teszt log generálás alapjai", "Random és datetime modulok", "Eseménytípusok (LOGIN_SUCCESS, LOGIN_FAILED)", "Tesztadatok a parserhez"] },
  { id: "i4", title: "Windows Log Parser", topics: ["Log sorok feldarabolása", "Regex alapú mező kinyerés", "Timestamp, event ID, user mezők", "Parsing hibakezelés"] },
  { id: "i5", title: "Anomaly Detector", topics: ["Brute force felismerés", "IP cím figyelés és Counter", "Küszöbértékek beállítása", "Gyanús tevékenységek detektálása"] },
  { id: "i6", title: "Integrity Checker", topics: ["Fájl hash számítás (SHA256)", "Hashlib és pathlib modulok", "Integritás változás felismerés", "HIDS (Host-based Intrusion Detection)"] },
  { id: "i7", title: "Report Generator", topics: ["Template Engine működése", "HTML riport generálás", "JSON serializáció", "Riport struktúra"] },
  { id: "i8", title: "Unit tesztelés", topics: ["Pytest alapok", "Assert utasítások", "Tesztek írása és futtatása", "test_winsoc.py"] },
  { id: "i9", title: "Teljes pipeline", topics: ["Adatáramlás: Mock → Parser → Anomaly → Integrity → Report", "Main Application és CLI", "Modulok integrációja", "Riport értelmezés"] },
  { id: "i10", title: "Vizsga előtti minimum", topics: ["TemplateEngine megértése", "Mock logok generálása", "Parser működése", "Anomaly detector logikája", "Report generator használata", "Tesztek futtatása", "Riport értelmezés"] },
];

const GENERIC_SECTIONS: Section[] = [
  { id: "g1", title: "AI tananyag", topics: ["Automatikusan generált összefoglaló (hamarosan)", "Kulcsfogalmak és definíciók (hamarosan)", "Vizsgára vonatkozó tippek (hamarosan)"] },
  { id: "g2", title: "Példák", topics: ["Megoldott feladatok (hamarosan)", "Vizsgamintafeladatok (hamarosan)"] },
  { id: "g3", title: "Gyakorlófeladatok", topics: ["Interaktív feladatok (hamarosan)", "Önellenőrző tesztek (hamarosan)"] },
];

function getSections(subjectId: string): Section[] {
  if (subjectId === "bbxpr12blf") return PROGRAMOZAS_SECTIONS;
  if (subjectId === "bbxin2kblf") return INFORMATIKA_SECTIONS;
  return GENERIC_SECTIONS;
}

export default function StudyPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const sections = getSections(subject.id);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([sections[0]?.id]));
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const subjectMaterials = getMaterialsBySubjectId(subject.id);

  // Get relevant Programozás HUB lessons
  const relevantLessons = getLessonsRelevantToSubject(subject.id);
  const highPriorityLessons = getHighPriorityExamLessons(subject.id);
  const emergencyLessons = getEmergencyStudyPathLessons();
  const winsocLessons = getProgrammingLessonsByTrack("winsoc");
  const criticalWinsocModules = getCriticalWinsocModules();
  const minimumWinsocExamPath = getMinimumWinsocExamPath();
  const winsocUnknownRequirements = getWinsocUnknownRequirements();
  const winsocModuleCount = getWinsocModuleCountByPriority();
  
  // Get exercises for practice section
  const relevantExercises = relevantLessons.flatMap((lesson) => getProgrammingExercisesForLesson(lesson.id));

  const totalTopics = sections.reduce((a, s) => a + s.topics.length, 0);
  const doneTopics = checked.size;
  const progress = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
  const isExamSubject = subject.id === "bbxpr12blf" || subject.id === "bbxin2kblf";

  const toggleSection = (id: string) => {
    setExpanded((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };
  const toggleCheck = (key: string) => {
    setChecked((prev) => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });
  };
  const progressColor = progress >= 70 ? "bg-emerald-500" : progress >= 40 ? "bg-sky-500" : "bg-amber-500";

  return (
    <div className="min-h-screen bg-slate-50">
      {subject.id === "bbxin2kblf" || subject.id === "bbxpr12blf" && <ExamNavigationStrip />}
      
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Tanulás – {subject.name}</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {isExamSubject ? "Vizsgafelkészülő terv · 2026-05-09" : "Tananyag és gyakorlófeladatok"}
            </p>
          </div>
          {isExamSubject && (
            <div className="flex items-center gap-2">
              <Link href="/exam-sprint/probavizsga">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                  Próbavizsga indítása
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
              <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-xs shrink-0">
                ⚡ Vizsga: 2026-05-09
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Haladás</span>
            <span className="font-mono text-sm font-bold text-slate-700">{doneTopics}/{totalTopics} téma</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5 font-mono">{progress}% kész</p>
        </CardContent>
      </Card>

      {/* SOC Project Card - only for Informatika II. */}
      {subject.id === "bbxin2kblf" && (
        <Card className="border-cyan-300 bg-cyan-50 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <CardTitle className="text-base text-slate-800">Windows SOC Analyst Tool – Vizsgafelkészülés</CardTitle>
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
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-white rounded-lg border border-cyan-100">
                <p className="text-xs font-semibold text-slate-700 mb-1">Vizsga összefoglaló</p>
                <p className="text-[10px] text-slate-500">Python alapú biztonsági elemző rendszer: {winsocModuleCount.critical} kritikus modul, {minimumWinsocExamPath.length} lépés minimum útvonal</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-cyan-100">
                <p className="text-xs font-semibold text-slate-700 mb-1">Fő forrásanyagok</p>
                <p className="text-[10px] text-slate-500">kiber_levelező_pótjegyzet.pdf/docx, winsoc Git repo, Sulipy preparation page</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {winsocLessons.length} lecke</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~4-5 óra</span>
              </div>
              <div className="flex gap-2">
                <Link href="/programozas/winsoc/gyorsismetlo">
                  <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                    Gyorsismétlő
                    <ChevronRightIcon className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
                <Link href="/programozas/winsoc">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Részletes felkészülés
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Critical Modules Summary - only for Informatika II. */}
      {subject.id === "bbxin2kblf" && (
        <Card className="border-red-200 bg-red-50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Kritikus modulok ({criticalWinsocModules.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {criticalWinsocModules.map((module) => (
                <div key={module.id} className="p-2 bg-white rounded border border-red-100">
                  <p className="text-[10px] font-semibold text-slate-700">{module.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Minimum Exam Path Summary - only for Informatika II. */}
      {subject.id === "bbxin2kblf" && (
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <Zap className="w-4 h-4 text-amber-500" />
              Minimum vizsga útvonal ({minimumWinsocExamPath.length} lépés)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {minimumWinsocExamPath.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 p-2 bg-white rounded border border-amber-100">
                  <Badge className="text-[9px] bg-amber-100 text-amber-700 border-amber-200">{index + 1}</Badge>
                  <p className="text-[10px] text-slate-700">{item.title}</p>
                </div>
              ))}
              {minimumWinsocExamPath.length > 5 && (
                <p className="text-[10px] text-slate-500 text-center">+ {minimumWinsocExamPath.length - 5} további lépés a részletes felkészülésben</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Unknown Requirements Summary - only for Informatika II. */}
      {subject.id === "bbxin2kblf" && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              Még tisztázandó vizsga követelmények ({winsocUnknownRequirements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {winsocUnknownRequirements.slice(0, 4).map((req) => (
                <div key={req.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                  <p className="text-[10px] font-semibold text-slate-700">{req.question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Programozás AI Allowed Card - only for Programozás */}
      {subject.id === "bbxpr12blf" && (
        <>
          <Card className="border-emerald-300 bg-emerald-50 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-base text-slate-800">Programozás – AI Használható Vizsga</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="text-xs bg-emerald-600 text-white border-emerald-700">ALAPOZÓ / KÖNNYEBB</Badge>
                    <Badge className="text-xs bg-sky-100 text-sky-700 border-sky-200">AI HASZNÁLHATÓ</Badge>
                  </div>
                  <p className="text-sm text-slate-600">
                    Programozás vizsga – Python alapok, függvények, listák, ciklusok. A vizsgán AI használható.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <p className="text-xs font-semibold text-slate-700 mb-1">Forrásanyag: ady_demo_zh.zip (Project Sentinel)</p>
                  <p className="text-[10px] text-slate-500">Secret Database CLI Tool: string normalizálás, bcrypt ellenőrzés, CLI argumentumok, unit tesztek</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Programozás HUB leckék</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~2-3 óra alapok</span>
                </div>
                <Link href="/programozas/python">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Python alapok ismétlés
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Critical Exam Topics - only for Programozás */}
          {(() => {
            const criticalTopics = getCriticalProgrammingExamTopics();
            const topicCount = getProgrammingExamTopicCountByPriority();
            return (
              <Card className="border-sky-200 bg-sky-50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <AlertTriangle className="w-4 h-4 text-sky-500" />
                    Kritikus vizsga témák ({criticalTopics.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {criticalTopics.map((topic) => (
                      <div key={topic.id} className="p-2 bg-white rounded border border-sky-100">
                        <p className="text-[10px] font-semibold text-slate-700">{topic.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Minimum Exam Path - only for Programozás */}
          {(() => {
            const minimumPath = getProgrammingExamMinimumPath();
            return (
              <Card className="border-amber-200 bg-amber-50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Minimum vizsga útvonal ({minimumPath.length} lépés)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {minimumPath.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border border-amber-100">
                        <Badge className="text-[9px] bg-amber-100 text-amber-700 border-amber-200">{index + 1}</Badge>
                        <p className="text-[10px] text-slate-700">{item}</p>
                      </div>
                    ))}
                    {minimumPath.length > 5 && (
                      <p className="text-[10px] text-slate-500 text-center">+ {minimumPath.length - 5} további lépés</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Exam Exercises - only for Programozás */}
          {(() => {
            const exercises = getProgrammingExamExercises();
            return (
              <Card className="border-purple-200 bg-purple-50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    Vizsga gyakorlati feladatok ({exercises.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {exercises.slice(0, 3).map((exercise) => (
                      <div key={exercise.id} className="p-2 bg-white rounded border border-purple-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="text-[9px] bg-purple-100 text-purple-700 border-purple-200">{exercise.difficulty}</Badge>
                          <p className="text-[10px] font-semibold text-slate-700">{exercise.title}</p>
                        </div>
                        <p className="text-[9px] text-slate-500">{exercise.prompt.substring(0, 80)}...</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })()}
        </>
      )}

      {/* Network Later Exam Card - only for Network */}
      {subject.id === "bbxvn12blf" && (
        <Card className="border-slate-300 bg-slate-50 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                  <CardTitle className="text-base text-slate-800">Hálózatok – Későbbi Vizsga</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="text-xs bg-slate-600 text-white border-slate-700">KÉSŐBBI FÓKUSZ</Badge>
                  <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">2026-05-23</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Hálózatok vizsga – TCP/IP, routing, switching, hálózati protokollok. Ez a vizsga később van, mint az Informatika II. és Programozás.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">Vizsga dátum: 2026-05-23</p>
                <p className="text-[10px] text-slate-500">Először az Informatika II. és Programozás vizsgákra (2026-05-09) koncentrálj, majd térj át a hálózatokra.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~2 hét a május 9-i vizsgák után</span>
              </div>
              <Button disabled className="bg-slate-400 text-white cursor-not-allowed">
                Később
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Materials Section */}
      {subjectMaterials.length > 0 && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <CardTitle className="text-slate-700 text-sm">Kapcsolódó anyagok</CardTitle>
              </div>
              <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                {subjectMaterials.length} anyag
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {subjectMaterials.map((material) => (
                <Link key={material.id} href={`/subjects/${subject.id}/notes`} className="block">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px]">
                          {material.type.toUpperCase()}
                        </Badge>
                        <h4 className="text-xs font-semibold text-slate-700">{material.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {material.usedIn.slice(0, 2).map((usage) => (
                          <span key={usage} className="text-[10px] text-slate-500">
                            {usage}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study sections */}
      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = expanded.has(section.id);
          const sectionDone = section.topics.filter((_, i) => checked.has(`${section.id}-${i}`)).length;
          return (
            <Card key={section.id} className="border-slate-200 bg-white shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{section.title}</span>
                  <span className="font-mono text-xs text-slate-400">{sectionDone}/{section.topics.length}</span>
                </div>
                {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 px-4 pb-3 pt-2 space-y-2">
                  {section.topics.map((topic, i) => {
                    const key = `${section.id}-${i}`;
                    const isDone = checked.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleCheck(key)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                          isDone ? "bg-emerald-50 text-emerald-700" : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {isDone
                          ? <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                          : <Square className="w-4 h-4 text-slate-300 shrink-0" />
                        }
                        <span className={isDone ? "line-through opacity-70" : ""}>{topic}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* AI placeholder */}
      <Card className="border-dashed border-slate-200 bg-slate-50 shadow-sm">
        <CardContent className="pt-5 pb-5 text-center">
          <Sparkles className="w-7 h-7 mx-auto mb-2 text-sky-300" />
          <p className="text-sm font-semibold text-slate-500">AI-generált tananyag</p>
          <p className="text-xs text-slate-400 mt-1">Személyre szabott magyarázatok, példák és tesztek – hamarosan</p>
        </CardContent>
      </Card>

      {/* Programozás HUB Lessons */}
      {relevantLessons.length > 0 && (
        <div className="space-y-4">
          {/* Vizsgára kötelező minimum - only for Programozás subject */}
          {subject.id === "bbxpr12blf" && (
            <Card className="border-red-200 bg-red-50 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-slate-800">Vizsgára kötelező minimum</CardTitle>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Ezek a leckék vizsgakötelezettség alapján elengedhetetlenek.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {highPriorityLessons.slice(0, 6).map((lesson, index) => (
                    <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-red-100 transition-all">
                        <Badge className="text-[10px] bg-red-100 text-red-700 border-red-200 shrink-0 mt-0.5">
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
          )}

          {/* Gyakorlófeladatok - only for Programozas subject */}
          {subject.id === "bbxpr12blf" && relevantExercises.length > 0 && (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-500" />
                    <CardTitle className="text-slate-700 text-sm">Gyakorlófeladatok</CardTitle>
                  </div>
                  <Badge className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                    {relevantExercises.length} feladat
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relevantExercises.slice(0, 5).map((exercise) => {
                    const lesson = relevantLessons.find((l) => l.id === exercise.lessonId);
                    return (
                      <Link key={exercise.id} href={`/programozas/python/${lesson?.slug}`}>
                        <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 transition-all">
                          <Badge
                            className={`text-[9px] border shrink-0 mt-0.5 ${
                              exercise.difficulty === "exam"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : exercise.difficulty === "hard"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-emerald-100 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {exercise.difficulty === "exam" ? "V" : exercise.difficulty === "hard" ? "N" : "K"}
                          </Badge>
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-slate-700">{exercise.title}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{lesson?.title}</p>
                          </div>
                          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 mt-0.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {relevantExercises.length > 5 && (
                  <Link href="/programozas/gyakorlas">
                    <Button size="sm" variant="outline" className="w-full mt-3 border-slate-200 text-slate-600 text-xs">
                      Összes feladat megtekintése
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Kapcsolódó Programozás HUB tananyagok</h3>
              <p className="text-xs text-slate-500 mt-1">
                A Programozás HUB a fő programozási tudásbázis. Itt csak a vizsgához és a tárgyhoz leginkább kapcsolódó leckék jelennek meg.
              </p>
            </div>
            <Link href="/programozas">
              <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 text-xs">
                Programozás HUB
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          {highPriorityLessons.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Vizsga prioritású</p>
              {highPriorityLessons.map((lesson) => (
                <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                  <Card className="border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-slate-800">{lesson.title}</h4>
                            <Badge className="text-[10px] bg-red-100 text-red-700 border-red-200">Vizsga</Badge>
                          </div>
                          <p className="text-xs text-slate-500 mb-2 line-clamp-1">{lesson.summary}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.estimatedMinutes} perc
                            </span>
                            {lesson.schoolRelevance.map((rel) => (
                              <span key={rel.subjectId} className="text-[10px] text-slate-400">
                                {rel.reason}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {relevantLessons.filter((l) => !highPriorityLessons.includes(l)).length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Egyéb kapcsolódó leckék</p>
              {relevantLessons.filter((l) => !highPriorityLessons.includes(l)).map((lesson) => (
                <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                  <Card className="border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-800">{lesson.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{lesson.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {relevantLessons.length > 0 && (
            <Link href="/programozas/python">
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 text-xs">
                Összes Python lecke megtekintése
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Empty State for subjects with few relevant lessons */}
      {relevantLessons.length === 0 && (subject.id === "bbxin2kblf") && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-5 pb-5 text-center">
            <BookOpen className="w-7 h-7 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold text-slate-500">Kapcsolódó programozási és laborgyakorlati tananyagok</p>
            <p className="text-xs text-slate-400 mt-1">
              A pontos Informatika II. vizsgaanyag alapján ide később több célzott anyag kerül.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Emergency Study Path - only for Programozás subject */}
      {subject.id === "bbxpr12blf" && (
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
      )}
    </div>
  );
}
