"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { examSprintSubjects } from "@/lib/mock-data";
import { programmingLessons } from "@/lib/mock-data/programming";
import { examFocusSubjects } from "@/lib/mock-data/exam-materials";
import { getPrimaryExamSubject, getSecondaryExamSubject } from "@/lib/utils/exam-materials";
import { ExamSprintSubject } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, CheckCircle2, AlertCircle, ArrowLeft, Zap, Target, ChevronDown, ArrowRight, BookOpen, AlertTriangle, Shield, Cpu, HelpCircle } from "lucide-react";
import Link from "next/link";
import { getDaysUntilDeadline } from "@/lib/utils/deadlines";
import { getLessonsForExamSprint, getEmergencyStudyPathLessons, getQuickExercisesForEmergencyPath } from "@/lib/utils/programming";
import { getCriticalWinsocModules, getMinimumWinsocExamPath, getWinsocUnknownRequirements } from "@/lib/utils/winsoc-readiness";
import { getCriticalProgrammingExamTopics, getProgrammingExamExercises, getProgrammingExamMinimumPath } from "@/lib/utils/programming-exam";
import { ExamNavigationStrip } from "@/components/exam-navigation-strip";

export default function ExamSprintPage() {
  const primarySubject = getPrimaryExamSubject();
  const secondarySubject = getSecondaryExamSubject();
  const criticalWinsocModules = getCriticalWinsocModules();
  const minimumWinsocExamPath = getMinimumWinsocExamPath();
  const winsocUnknownRequirements = getWinsocUnknownRequirements();
  const criticalProgrammingTopics = getCriticalProgrammingExamTopics();
  const programmingExamExercises = getProgrammingExamExercises();
  const programmingMinimumPath = getProgrammingExamMinimumPath();
  
  const [selectedSubject, setSelectedSubject] = useState<ExamSprintSubject>(
    JSON.parse(JSON.stringify(examSprintSubjects[0]))
  );
  const [subjectStates, setSubjectStates] = useState<Record<string, ExamSprintSubject>>(
    Object.fromEntries(examSprintSubjects.map((s) => [s.subjectId, JSON.parse(JSON.stringify(s))]))
  );
  const [notes, setNotes] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([examSprintSubjects[0]?.studySections[0]?.id]));

  const emergencyLessons = getEmergencyStudyPathLessons();
  const quickExercises = getQuickExercisesForEmergencyPath();

  const handleSelectSubject = (subject: ExamSprintSubject) => {
    // Save current state
    setSubjectStates((prev) => ({ ...prev, [selectedSubject.subjectId]: selectedSubject }));
    // Load saved state for new subject
    const saved = subjectStates[subject.subjectId];
    setSelectedSubject(saved || JSON.parse(JSON.stringify(subject)));
    setExpandedSections(new Set([subject.studySections[0]?.id]));
  };

  const toggleTopic = (sectionId: string, topicId: string) => {
    setSelectedSubject((prev) => ({
      ...prev,
      studySections: prev.studySections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              topics: section.topics.map((topic) =>
                topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
              ),
            }
          : section
      ),
    }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  const completedTopics = selectedSubject.studySections.reduce(
    (acc, section) => acc + section.topics.filter((t) => t.completed).length,
    0
  );
  const totalTopics = selectedSubject.studySections.reduce(
    (acc, section) => acc + section.topics.length,
    0
  );
  const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const daysLeft = getDaysUntilDeadline(selectedSubject.examDate);

  // Get relevant Programozás HUB lessons for exam sprint
  const examSubjectIds = examSprintSubjects.map((s) => s.subjectId);
  const relevantProgrammingLessons = getLessonsForExamSprint(examSubjectIds);
  const subjectProgrammingLessons = relevantProgrammingLessons.filter((lesson) =>
    lesson.schoolRelevance.some((rel) => rel.subjectId === selectedSubject.subjectId)
  );

  const getSubjectProgress = (subjectId: string) => {
    const state = subjectId === selectedSubject.subjectId ? selectedSubject : subjectStates[subjectId];
    if (!state) return 0;
    const done = state.studySections.reduce((a, s) => a + s.topics.filter((t) => t.completed).length, 0);
    const total = state.studySections.reduce((a, s) => a + s.topics.length, 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <h1 className="text-base font-bold text-slate-800">Informatika vizsgafókusz – 2026.05.09</h1>
              <Badge className="font-mono text-[10px] bg-amber-100 text-amber-700 border border-amber-200">
                AKTÍV
              </Badge>
            </div>
          </div>
          <div className="font-mono text-xs text-slate-500">
            Vizsga: <span className={daysLeft <= 3 ? "text-red-600 font-bold" : "text-amber-600 font-bold"}>{selectedSubject.examDate}</span>
            <span className="ml-2 text-slate-400">({daysLeft} nap)</span>
          </div>
        </div>
      </header>

      <ExamNavigationStrip />

      <main className="max-w-[1800px] mx-auto px-4 py-6">
        {/* May 9 Strategy CTA */}
        <Card className="border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-amber-600" />
                <div>
                  <CardTitle className="text-lg text-slate-800">Május 9. vizsgastratégia</CardTitle>
                  <p className="text-xs text-slate-600 mt-1">Informatika II. 70% fókusz, Programozás 30% ismétlés</p>
                </div>
              </div>
              <Link href="/exam-sprint/maj9">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Stratégia megnyitása
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

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

        {/* Informatika Exam Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Informatika II. - Primary Focus */}
          {primarySubject && (
            <Card className={`border-2 shadow-md ${primarySubject.priority === "primary" ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white"}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-cyan-600" />
                      <CardTitle className="text-base font-bold text-slate-800">{primarySubject.subjectName}</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge className="text-[10px] bg-cyan-600 text-white border-cyan-700">FŐ FÓKUSZ</Badge>
                      <Badge className="text-[10px] bg-red-100 text-red-700 border-red-200">NEHEZEBB</Badge>
                      <Badge className="text-[10px] bg-slate-800 text-white border-slate-900">SOC projekt</Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      {primarySubject.examType} · {primarySubject.topic}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-mono text-lg font-bold ${daysLeft <= 3 ? "text-red-600" : "text-amber-600"}`}>
                      {primarySubject.examDate}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-3">
                  <p className="text-xs text-slate-600">
                    Forrás: kiber_levelező_pótjegyzet + winsoc repo + sulipy
                  </p>
                </div>
                <Link href="/programozas/winsoc">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    SOC felkészülés indítása
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Programozás - Secondary Focus */}
          {secondarySubject && (
            <Card className="border-2 border-slate-200 bg-white shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-5 h-5 text-sky-600" />
                      <CardTitle className="text-base font-bold text-slate-800">{secondarySubject.subjectName}</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge className="text-[10px] bg-sky-100 text-sky-700 border-sky-200">ALAPOZÓ / KÖNNYEBB</Badge>
                      {secondarySubject.aiAllowed && (
                        <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">AI HASZNÁLHATÓ</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      {secondarySubject.examType} · {secondarySubject.topic}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-mono text-lg font-bold ${daysLeft <= 3 ? "text-red-600" : "text-amber-600"}`}>
                      {secondarySubject.examDate}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-3">
                  <p className="text-xs text-slate-600">
                    Forrás: ady_demo_zh.zip + Programozás HUB Python leckék
                  </p>
                </div>
                <Link href="/programozas/python">
                  <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white">
                    Programozás ismétlés
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mai Informatika II. minimum - only show if primary subject is Informatika II. */}
        {primarySubject?.subjectId === "bbxin2kblf" && (
          <Card className="border-cyan-200 bg-cyan-50 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                <Zap className="w-4 h-4 text-cyan-600" />
                Mai Informatika II. minimum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* 3 critical modules */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    3 kritikus modul
                  </p>
                  <div className="space-y-1.5">
                    {criticalWinsocModules.slice(0, 3).map((module) => (
                      <div key={module.id} className="p-2 bg-white rounded border border-cyan-100">
                        <p className="text-[10px] font-semibold text-slate-700">{module.title}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{module.shortDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 practice tasks */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-sky-500" />
                    3 gyakorlati feladat
                  </p>
                  <div className="space-y-1.5">
                    {minimumWinsocExamPath.slice(0, 3).map((item, index) => (
                      <div key={item.id} className="p-2 bg-white rounded border border-cyan-100">
                        <p className="text-[10px] font-semibold text-slate-700">{index + 1}. {item.title}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 unknown requirements */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-amber-500" />
                    3 tisztázandó kérdés
                  </p>
                  <div className="space-y-1.5">
                    {winsocUnknownRequirements.slice(0, 3).map((req) => (
                      <div key={req.id} className="p-2 bg-white rounded border border-cyan-100">
                        <p className="text-[10px] font-semibold text-slate-700">{req.question}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{req.whyItMatters}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/programozas/winsoc">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                  Részletes SOC felkészülés megnyitása
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Informatika II. gyorsismétlő compact card - only show if primary subject is Informatika II. */}
        {primarySubject?.subjectId === "bbxin2kblf" && (
          <Card className="border-amber-300 bg-amber-50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                <Zap className="w-4 h-4 text-amber-600" />
                Informatika II. gyorsismétlő
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-3">
                Ha kevés időd van, innen indulj – a teljes SOC projekt egy oldalon.
              </p>
              <Link href="/programozas/winsoc/gyorsismetlo">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  Gyorsismétlő megnyitása
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Programozás minimum ismétlés - only show if secondary subject is Programozás */}
        {secondarySubject?.subjectId === "bbxpr12blf" && (
          <Card className="border-sky-200 bg-sky-50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                <Cpu className="w-4 h-4 text-sky-600" />
                Programozás minimum ismétlés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* 3-5 critical topics */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-sky-500" />
                    Kritikus témák ({criticalProgrammingTopics.length})
                  </p>
                  <div className="space-y-1.5">
                    {criticalProgrammingTopics.slice(0, 5).map((topic) => (
                      <div key={topic.id} className="p-2 bg-white rounded border border-sky-100">
                        <p className="text-[10px] font-semibold text-slate-700">{topic.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 quick exercises */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-sky-500" />
                    Gyakorlati feladatok ({programmingExamExercises.length})
                  </p>
                  <div className="space-y-1.5">
                    {programmingExamExercises.slice(0, 3).map((exercise) => (
                      <div key={exercise.id} className="p-2 bg-white rounded border border-sky-100">
                        <p className="text-[10px] font-semibold text-slate-700">{exercise.title}</p>
                        <p className="text-[9px] text-slate-500">{exercise.difficulty}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Minimum path */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-sky-500" />
                    Minimum útvonal ({programmingMinimumPath.length} lépés)
                  </p>
                  <div className="space-y-1.5">
                    {programmingMinimumPath.slice(0, 3).map((item, index) => (
                      <div key={index} className="p-2 bg-white rounded border border-sky-100">
                        <p className="text-[10px] font-semibold text-slate-700">{index + 1}. {item.substring(0, 40)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">AI HASZNÁLHATÓ</Badge>
                <Badge className="text-[10px] bg-sky-100 text-sky-700 border-sky-200">Forrás: ady_demo_zh.zip</Badge>
              </div>
              <Link href="/programozas/python">
                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                  Programozás Python leckék megnyitása
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-5 items-start">

          {/* LEFT: Subject Switcher */}
          <div className="lg:sticky lg:top-[57px] space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Fókusz tárgyak</p>
            {examSprintSubjects.map((subject) => {
              const isActive = selectedSubject.subjectId === subject.subjectId;
              const pct = getSubjectProgress(subject.subjectId);
              const days = getDaysUntilDeadline(subject.examDate);
              return (
                <motion.div
                  key={subject.subjectId}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => handleSelectSubject(subject)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all shadow-sm ${
                    isActive
                      ? "border-amber-200 bg-amber-50 ring-1 ring-amber-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold text-sm leading-tight ${isActive ? "text-amber-800" : "text-slate-700"}`}>
                      {subject.subjectName}
                    </h3>
                    {isActive && <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-mono text-xs ${days <= 3 ? "text-red-600" : "text-amber-600"}`}>
                      {subject.examDate}
                    </span>
                    <span className="text-xs text-slate-400">{days}n</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{pct}% kész</span>
                    <div className="flex gap-1">
                      <Badge className="text-[10px] bg-red-100 text-red-600 border border-red-200">Vizsga</Badge>
                      <Badge className="text-[10px] bg-amber-100 text-amber-700 border border-amber-200">Fókusz</Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER: Sprint Checklist */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubject.subjectId}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg text-slate-800">{selectedSubject.subjectName}</CardTitle>
                      <p className="text-xs text-slate-400 mt-1">
                        {completedTopics}/{totalTopics} téma teljesítve
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`font-mono text-3xl font-bold ${progress >= 70 ? "text-emerald-600" : progress >= 40 ? "text-sky-600" : "text-amber-600"}`}>
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-slate-100">
                    <motion.div
                      className={`h-2.5 rounded-full transition-all ${
                        progress >= 70 ? "bg-emerald-500" : progress >= 40 ? "bg-sky-500" : "bg-amber-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedSubject.studySections.map((section) => {
                    const isOpen = expandedSections.has(section.id);
                    const sectionDone = section.topics.filter((t) => t.completed).length;
                    const sectionTotal = section.topics.length;
                    return (
                      <div key={section.id} className="rounded-lg border border-slate-100 overflow-hidden">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {sectionDone === sectionTotal ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Target className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <span className="font-medium text-sm text-slate-700">{section.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-xs text-slate-400">
                              {sectionDone}/{sectionTotal}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3 space-y-2 border-t border-slate-100 pt-2">
                                {section.topics.map((topic) => (
                                  <div key={topic.id} className="flex items-center gap-3 py-0.5">
                                    <Checkbox
                                      id={topic.id}
                                      checked={topic.completed}
                                      onCheckedChange={() => toggleTopic(section.id, topic.id)}
                                      className="border-slate-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                    />
                                    <label
                                      htmlFor={topic.id}
                                      className={`flex-1 text-sm cursor-pointer transition-colors ${
                                        topic.completed
                                          ? "line-through text-slate-400"
                                          : "text-slate-700 hover:text-slate-900"
                                      }`}
                                    >
                                      {topic.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Notes + Mistakes */}
          <div className="lg:sticky lg:top-[57px] space-y-4">
            {/* Programozás HUB Lessons */}
            {subjectProgrammingLessons.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                        <BookOpen className="w-4 h-4 text-sky-500" />
                        Ajánlott Programozás HUB leckék a vizsgához
                      </CardTitle>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Programozás és Informatika II. vizsgához
                      </p>
                    </div>
                    <Link href="/programozas">
                      <Button size="sm" variant="ghost" className="text-xs text-slate-500 hover:text-slate-700">
                        Összes
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {subjectProgrammingLessons.slice(0, 5).map((lesson) => {
                    const relevance = lesson.schoolRelevance.find((r) => r.subjectId === selectedSubject.subjectId);
                    const isHighPriority = relevance?.examPriority === "high";
                    return (
                      <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                        <div className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-0.5">
                                <h4 className="text-xs font-semibold text-slate-700 truncate">{lesson.title}</h4>
                                {isHighPriority && (
                                  <Badge className="text-[9px] bg-red-100 text-red-700 border-red-200">Vizsga</Badge>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{lesson.summary}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {lesson.estimatedMinutes}p
                                </span>
                                {relevance && (
                                  <span className="text-[9px] text-slate-300">{relevance.relevance}</span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-slate-300 shrink-0 mt-0.5" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* Emergency Study Path */}
            <Card className="border-amber-200 bg-amber-50 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <CardTitle className="text-sm font-semibold text-slate-700">Vizsga előtti minimum útvonal</CardTitle>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  5-6 must-study lessons + quick exercises
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {emergencyLessons.slice(0, 5).map((lesson, index) => (
                    <Link key={lesson.id} href={`/programozas/python/${lesson.slug}`}>
                      <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-amber-100 transition-all">
                        <Badge className="text-[9px] bg-slate-200 text-slate-700 border-slate-300 shrink-0 mt-0.5">
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="text-xs font-semibold text-slate-700">{lesson.title}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{lesson.summary}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0 mt-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
                {quickExercises.length > 0 && (
                  <div className="pt-3 border-t border-amber-200">
                    <p className="text-[10px] font-semibold text-slate-600 mb-2">Gyors gyakorlófeladatok ({quickExercises.length})</p>
                    <div className="space-y-1">
                      {quickExercises.slice(0, 5).map((exercise) => {
                        const lesson = programmingLessons.find((l) => l.id === exercise.lessonId);
                        return (
                          <Link key={exercise.id} href={`/programozas/python/${lesson?.slug}`}>
                            <div className="flex items-start gap-2 p-1.5 rounded hover:bg-amber-100 transition-all">
                              <Badge
                                className={`text-[8px] border shrink-0 mt-0.5 ${
                                  exercise.difficulty === "exam"
                                    ? "bg-red-100 text-red-700 border-red-200"
                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                }`}
                              >
                                {exercise.difficulty === "exam" ? "V" : "G"}
                              </Badge>
                              <span className="text-[10px] text-slate-600 line-clamp-1">{exercise.title}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-sky-500" />
                  Gyors Jegyzet
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Textarea
                  placeholder="Legfontosabb dolgok, amiket meg kell jegyezni..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[160px] resize-none border-slate-200 bg-white text-slate-700 text-sm placeholder:text-slate-300 focus:border-sky-400"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  Hibáim Listája
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Textarea
                  placeholder="Hibák és buktattók, amikre figyelni kell..."
                  value={mistakes}
                  onChange={(e) => setMistakes(e.target.value)}
                  className="min-h-[140px] resize-none border-slate-200 bg-white text-slate-700 text-sm placeholder:text-slate-300 focus:border-red-400"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-slate-600">
                  Vizsgaellenőrzőlista
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {[
                  "Minden témakört átnéztem",
                  "Hibalistám frissítve",
                  "Egy vizsgaszimulációt csináltam",
                  "Aludtál rendesen?",
                  "Tudod, mikor és hol van a vizsga?",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Checkbox
                      id={`preflight-${i}`}
                      className="border-slate-300 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                    />
                    <label htmlFor={`preflight-${i}`} className="text-xs text-slate-500 cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
