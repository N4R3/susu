"use client";

import { useState, useMemo } from "react";
import { semesters, subjects, deadlines, events } from "@/lib/mock-data";
import { groupDeadlines } from "@/lib/utils/deadlines";
import { getLatestSemester } from "@/lib/utils/semester-results";
import SemesterSelector from "@/components/dashboard/SemesterSelector";
import SubjectList from "@/components/dashboard/SubjectList";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import GlobalNotes from "@/components/dashboard/GlobalNotes";
import ExamCommandHero from "@/components/dashboard/ExamCommandHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  const [selectedSemester, setSelectedSemester] = useState("2025-26-2");

  const currentSemester = semesters.find((s) => s.id === selectedSemester);
  const semesterSubjects = subjects.filter((s) => s.semesterId === selectedSemester);
  const semesterEvents = events.filter((e: any) => e.semesterId === selectedSemester);

  const deadlineGroups = useMemo(() => groupDeadlines(deadlines), []);
  const latestSemesterResult = getLatestSemester();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <div>
              <span className="font-bold text-sm text-slate-800">SUSU</span>
              <span className="ml-2 font-mono text-xs text-slate-400">BBLFKM</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/programozas"
              className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-md hover:bg-sky-100 transition-colors"
            >
              Programozás
            </Link>
            <Link
              href="/exam-sprint"
              className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors"
            >
              Exam Sprint
            </Link>
            <Link
              href="/materials"
              className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
            >
              Anyagok
            </Link>
            <Link
              href="/results"
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors"
            >
              Eredmények
            </Link>
            <Link
              href="/curriculum-map"
              className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors"
            >
              Tanterv
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <SemesterSelector
              semesters={semesters}
              selectedId={selectedSemester}
              onSelect={(id) => id && setSelectedSemester(id)}
            />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-6 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            2025/26/2. félév · Kiberbiztonsági mérnöki
          </p>
        </div>

        {/* Exam Hero */}
        {deadlineGroups.urgent.length > 0 && (
          <ExamCommandHero urgentDeadlines={deadlineGroups.urgent} />
        )}

        {/* Previous Semester Results Card */}
        {latestSemesterResult && (
          <Card className="border-emerald-300 bg-emerald-50 shadow-sm">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-emerald-700">
                <Award className="w-4 h-4" />
                Előző félév
                <Badge className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200">
                  {latestSemesterResult.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Kredit</p>
                    <p className="text-lg font-bold text-slate-800">
                      {latestSemesterResult.completedCredits}/{latestSemesterResult.credits}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Átlag</p>
                    <p className="text-lg font-bold text-emerald-600">{latestSemesterResult.weightedAverage}</p>
                  </div>
                </div>
                <Link href="/results">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Eredmények megnyitása
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deadlineGroups.completedAwaitingGrade.length > 0 && (
            <Card className="border-amber-200 bg-white shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-700">
                  <Clock className="w-4 h-4" />
                  Kész – osztályzatra vár
                  <Badge className="ml-auto text-[10px] bg-amber-100 text-amber-700 border border-amber-200">
                    {deadlineGroups.completedAwaitingGrade.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-1.5">
                {deadlineGroups.completedAwaitingGrade.map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-amber-50 border border-amber-100">
                    <span className="text-sm text-slate-700">{d.subjectName}</span>
                    <Badge className="text-[10px] bg-amber-100 text-amber-700 border border-amber-200">Beadva</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {deadlineGroups.closed.length > 0 && (
            <Card className="border-emerald-200 bg-white shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  Teljesen lezárt
                  <Badge className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200">
                    {deadlineGroups.closed.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-1.5">
                {deadlineGroups.closed.map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-100 opacity-70">
                    <span className="text-sm text-slate-500 line-through">{d.subjectName}</span>
                    <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200">Lezárva</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main grid: subjects / calendar / notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <SubjectList subjects={semesterSubjects} urgentDeadlines={deadlineGroups.urgent} />
          {currentSemester && (
            <DashboardCalendar semester={currentSemester} events={semesterEvents} />
          )}
          <GlobalNotes />
        </div>
      </main>
    </div>
  );
}
