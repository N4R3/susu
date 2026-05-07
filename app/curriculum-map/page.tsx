"use client";

import { useState, useMemo, useEffect } from "react";
import CurriculumHeaderStats from "@/components/curriculum/CurriculumHeaderStats";
import CurriculumControlsBar from "@/components/curriculum/CurriculumControlsBar";
import CurriculumLegend from "@/components/curriculum/CurriculumLegend";
import { curriculumSemesters, curriculumDependencies, subjectVisualCategories, visualCategoryColors } from "@/lib/mock-data/curriculum";
import { subjects } from "@/lib/mock-data";
import {
  getAllUserSubjectStates,
  getSubjectVisualState,
  getBlockingDependencies,
  isSubjectCompleted,
  initializeDefaultUserState,
  setUserSubjectStatus,
  setUserSubjectGrade,
  resetSubjectState,
  type SubjectVisualState,
  type SubjectUserStatus,
} from "@/lib/utils/user-subject-state";
import { Link, CheckCircle2, Clock, AlertTriangle, XCircle, Ban } from "lucide-react";

type FamilyFilter = "all" | "programming" | "cybersecurity" | "networks" | "math" | "project" | "elective" | "pe" | "thesis";
type StatusFilter = "all" | "completed" | "in_progress" | "not_started" | "blocked";
type DependencyMode = "none" | "selected_chain" | "all_official" | "all_estimated";

export default function CurriculumMapPage() {
  const [showDependencies, setShowDependencies] = useState(true);
  const [showEstimated, setShowEstimated] = useState(true);
  const [highlightCurrent, setHighlightCurrent] = useState(true);
  const [familyFilter, setFamilyFilter] = useState<FamilyFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dependencyMode, setDependencyMode] = useState<DependencyMode>("none");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const [userStates, setUserStates] = useState<Record<string, any>>({});
  const [isMounted, setIsMounted] = useState(false);

  // Load user states on mount and initialize defaults if empty
  useEffect(() => {
    setIsMounted(true);
    const states = getAllUserSubjectStates();
    setUserStates(states);
    initializeDefaultUserState();
  }, []);

  const currentSemester = curriculumSemesters.find((s) => s.isCurrent);
  const currentSemesterNumber = currentSemester?.semesterNumber;

  // Filter semesters and subjects
  const filteredSemesters = useMemo(() => {
    if (!isMounted) return [];
    
    return curriculumSemesters.map((semester) => {
      const filteredSubjects = semester.subjects.filter((subject) => {
        // Family filter
        if (familyFilter !== "all") {
          const category = subjectVisualCategories[subject.id];
          if (category !== familyFilter) return false;
        }

        // Status filter
        const visualState = getSubjectVisualState(
          subject.id,
          curriculumDependencies,
          userStates,
          currentSemesterNumber,
          semester.semesterNumber
        );

        if (statusFilter !== "all") {
          if (statusFilter === "blocked") {
            const blocking = getBlockingDependencies(subject.id, curriculumDependencies, userStates);
            if (blocking.length === 0) return false;
          } else if (visualState !== statusFilter) {
            return false;
          }
        }

        return true;
      });

      return {
        ...semester,
        subjects: filteredSubjects,
      };
    }).filter((semester) => semester.subjects.length > 0);
  }, [familyFilter, statusFilter, userStates, currentSemesterNumber, isMounted]);

  // Calculate semester stats
  const semesterStats = useMemo(() => {
    if (!isMounted) return [];
    
    return filteredSemesters.map((semester) => {
      const completed = semester.subjects.filter((s) =>
        isSubjectCompleted(s.id)
      ).length;
      const total = semester.subjects.length;
      return {
        semesterNumber: semester.semesterNumber,
        completed,
        total,
      };
    });
  }, [filteredSemesters, userStates, isMounted]);

  // Handle subject card click
  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
  };

  // Handle close detail panel
  const handleCloseDetail = () => {
    setSelectedSubjectId(null);
  };

  // Get selected subject data
  const selectedSubject = useMemo(() => {
    if (!selectedSubjectId || !isMounted) return null;
    for (const semester of curriculumSemesters) {
      const subject = semester.subjects.find((s) => s.id === selectedSubjectId);
      if (subject) {
        const fullSubject = subjects.find((s) => s.id === subject.id);
        const visualState = getSubjectVisualState(
          subject.id,
          curriculumDependencies,
          userStates,
          currentSemesterNumber,
          semester.semesterNumber
        );
        const blocking = getBlockingDependencies(subject.id, curriculumDependencies, userStates);
        const dependents = curriculumDependencies
          .filter((dep) => dep.from === subject.id)
          .map((dep) => dep.to);
        
        return {
          ...subject,
          semesterNumber: semester.semesterNumber,
          semesterName: semester.name,
          isCurrent: semester.isCurrent,
          credits: fullSubject?.credits || 0,
          visualState,
          blocking,
          dependents,
          userState: userStates[subject.id],
        };
      }
    }
    return null;
  }, [selectedSubjectId, userStates, currentSemesterNumber, isMounted]);

  // Handle status change
  const handleStatusChange = (subjectId: string, status: SubjectUserStatus) => {
    setUserSubjectStatus(subjectId, status);
    const updatedStates = getAllUserSubjectStates();
    setUserStates(updatedStates);
  };

  // Handle grade change
  const handleGradeChange = (subjectId: string, grade: number | null, resultText?: string) => {
    setUserSubjectGrade(subjectId, grade, resultText);
    const updatedStates = getAllUserSubjectStates();
    setUserStates(updatedStates);
  };

  // Handle reset subject
  const handleResetSubject = (subjectId: string) => {
    resetSubjectState(subjectId);
    const updatedStates = getAllUserSubjectStates();
    setUserStates(updatedStates);
    setSelectedSubjectId(null);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Betöltés...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="w-full px-6 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <Link className="w-4 h-4 rotate-180" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-300">/</span>
          <div>
            <h1 className="text-base font-bold text-slate-800">Tantervi Térkép</h1>
            <p className="text-xs text-slate-400 font-mono">BBLFKM · 7 félév</p>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-6 space-y-5">
        <CurriculumHeaderStats />
        <CurriculumControlsBar
          showDependencies={showDependencies}
          onToggleDependencies={setShowDependencies}
          showEstimated={showEstimated}
          onToggleEstimated={setShowEstimated}
          highlightCurrent={highlightCurrent}
          onToggleHighlightCurrent={setHighlightCurrent}
          familyFilter={familyFilter}
          onFamilyFilterChange={setFamilyFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dependencyMode={dependencyMode}
          onDependencyModeChange={setDependencyMode}
        />
        <CurriculumLegend />

        {/* Horizontal Scrollable Semester Board */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex gap-4 p-6 min-w-max">
              {filteredSemesters.map((semester) => {
                const stats = semesterStats.find((s) => s.semesterNumber === semester.semesterNumber);
                const visualCategory = semester.isCurrent ? "current" : "normal";
                
                return (
                  <div
                    key={semester.semesterNumber}
                    className={`flex-shrink-0 w-72 ${
                      highlightCurrent && semester.isCurrent
                        ? "ring-2 ring-sky-500 ring-offset-2 rounded-lg"
                        : ""
                    }`}
                  >
                    {/* Semester Header */}
                    <div className={`mb-4 p-4 rounded-lg ${
                      semester.isCurrent ? "bg-sky-50 border border-sky-200" : "bg-slate-50 border border-slate-200"
                    }`}>
                      <h3 className="text-lg font-bold text-slate-800">{semester.name}</h3>
                      {semester.isCurrent && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-sky-100 text-sky-700 rounded-full">
                          Jelenlegi félév
                        </span>
                      )}
                      <div className="mt-2 flex gap-4 text-sm text-slate-600">
                        <div>
                          <span className="font-semibold">{stats?.completed || 0}</span>
                          <span className="text-slate-400"> / {stats?.total || 0}</span>
                          <span className="text-xs text-slate-400 ml-1">kész</span>
                        </div>
                      </div>
                    </div>

                    {/* Subject Cards */}
                    <div className="space-y-3">
                      {semester.subjects.map((subject) => {
                        const visualState = getSubjectVisualState(
                          subject.id,
                          curriculumDependencies,
                          userStates,
                          currentSemesterNumber,
                          semester.semesterNumber
                        );
                        const blocking = getBlockingDependencies(subject.id, curriculumDependencies, userStates);
                        const category = subjectVisualCategories[subject.id] || "elective";
                        const colors = visualCategoryColors[category as keyof typeof visualCategoryColors] || visualCategoryColors.elective;
                        const fullSubject = subjects.find((s) => s.id === subject.id);
                        const userState = userStates[subject.id];

                        return (
                          <div
                            key={subject.id}
                            onClick={() => handleSubjectClick(subject.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                              visualState === "completed"
                                ? "bg-emerald-50 border-emerald-300"
                                : visualState === "in_progress"
                                ? "bg-sky-50 border-sky-300"
                                : visualState === "blocked"
                                ? "bg-amber-50 border-amber-300"
                                : visualState === "not_taken_failed"
                                ? "bg-slate-100 border-slate-300 opacity-60"
                                : "bg-white border-slate-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-slate-800 line-clamp-2">
                                  {subject.name}
                                </h4>
                                {subject.code && (
                                  <p className="text-xs text-slate-500 font-mono mt-1">{subject.code}</p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    subject.isRequired
                                      ? "bg-slate-200 text-slate-700"
                                      : "bg-purple-100 text-purple-700"
                                  }`}>
                                    {subject.isRequired ? "Kötelező" : "Választható"}
                                  </span>
                                  {fullSubject?.credits && (
                                    <span className="text-xs text-slate-500">
                                      {fullSubject.credits} kredit
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                {visualState === "completed" && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                )}
                                {visualState === "in_progress" && (
                                  <Clock className="w-5 h-5 text-sky-600" />
                                )}
                                {visualState === "blocked" && (
                                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                                )}
                                {visualState === "not_taken_failed" && (
                                  <XCircle className="w-5 h-5 text-slate-400" />
                                )}
                                {userState?.grade && (
                                  <span className="text-lg font-bold text-slate-800">
                                    {userState.grade}
                                  </span>
                                )}
                                {userState?.resultText && !userState.grade && (
                                  <span className="text-xs text-slate-600">
                                    {userState.resultText}
                                  </span>
                                )}
                              </div>
                            </div>
                            {blocking.length > 0 && showDependencies && (
                              <div className="mt-2 pt-2 border-t border-slate-200">
                                <div className="flex items-center gap-1 text-xs text-amber-700">
                                  <Ban className="w-3 h-3" />
                                  <span>Hiányzó előfeltétel: {blocking.length}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subject Detail Panel */}
        {selectedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{selectedSubject.name}</h2>
                    {selectedSubject.code && (
                      <p className="text-sm text-slate-500 font-mono">{selectedSubject.code}</p>
                    )}
                  </div>
                  <button
                    onClick={handleCloseDetail}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Félév:</span>
                      <span className="ml-2 font-semibold text-slate-800">{selectedSubject.semesterName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Kredit:</span>
                      <span className="ml-2 font-semibold text-slate-800">{selectedSubject.credits}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Típus:</span>
                      <span className="ml-2 font-semibold text-slate-800">
                        {selectedSubject.isRequired ? "Kötelező" : "Választható"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Állapot:</span>
                      <span className="ml-2 font-semibold text-slate-800">
                        {selectedSubject.visualState === "completed" && "Teljesítve"}
                        {selectedSubject.visualState === "in_progress" && "Folyamatban"}
                        {selectedSubject.visualState === "not_started" && "Nem kezdett"}
                        {selectedSubject.visualState === "blocked" && "Blokkolva"}
                        {selectedSubject.visualState === "not_taken_failed" && "Nincs meg / Nem vettem fel"}
                      </span>
                    </div>
                  </div>

                  {selectedSubject.userState?.grade && (
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm text-slate-600">Jegy:</span>
                      <span className="ml-2 text-2xl font-bold text-emerald-700">{selectedSubject.userState.grade}</span>
                    </div>
                  )}

                  {selectedSubject.blocking.length > 0 && (
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Hiányzó előfeltételek</span>
                      </div>
                      <ul className="text-sm text-amber-700 space-y-1">
                        {selectedSubject.blocking.map((depId) => {
                          const depSubject = curriculumSemesters
                            .flatMap((s) => s.subjects)
                            .find((s) => s.id === depId);
                          return (
                            <li key={depId}>• {depSubject?.name || depId}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {selectedSubject.dependents.length > 0 && (
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-800 mb-2">Ez tárgy feltétele:</div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {selectedSubject.dependents.map((depId) => {
                          const depSubject = curriculumSemesters
                            .flatMap((s) => s.subjects)
                            .find((s) => s.id === depId);
                          return (
                            <li key={depId}>• {depSubject?.name || depId}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Status Controls */}
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-3">Állapot beállítása</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedSubject.id, "not_started")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.status === "not_started"
                            ? "bg-slate-200 border-slate-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Nem kezdtem el
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubject.id, "in_progress")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.status === "in_progress"
                            ? "bg-sky-200 border-sky-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Folyamatban
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubject.id, "completed")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.status === "completed"
                            ? "bg-emerald-200 border-emerald-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Teljesítve
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubject.id, "failed")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.status === "failed"
                            ? "bg-red-200 border-red-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Nincs meg
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubject.id, "not_taken")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.status === "not_taken"
                            ? "bg-slate-200 border-slate-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Nem vettem fel
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubject.id, "waived")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.status === "waived"
                            ? "bg-purple-200 border-purple-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Felmentve
                      </button>
                    </div>
                  </div>

                  {/* Grade Controls */}
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-3">Jegy beállítása</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5].map((grade) => (
                        <button
                          key={grade}
                          onClick={() => handleGradeChange(selectedSubject.id, grade)}
                          className={`px-3 py-2 text-sm rounded-lg border ${
                            selectedSubject.userState?.grade === grade
                              ? "bg-emerald-200 border-emerald-400"
                              : "bg-white border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                      <button
                        onClick={() => handleGradeChange(selectedSubject.id, null, "Aláírva")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.resultText === "Aláírva" && !selectedSubject.userState.grade
                            ? "bg-emerald-200 border-emerald-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Aláírva
                      </button>
                      <button
                        onClick={() => handleGradeChange(selectedSubject.id, null, "Megfelelt")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.resultText === "Megfelelt" && !selectedSubject.userState.grade
                            ? "bg-emerald-200 border-emerald-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Megfelelt
                      </button>
                      <button
                        onClick={() => handleGradeChange(selectedSubject.id, null, "Kiválóan megfelelt")}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          selectedSubject.userState?.resultText === "Kiválóan megfelelt" && !selectedSubject.userState.grade
                            ? "bg-emerald-200 border-emerald-400"
                            : "bg-white border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Kiválóan
                      </button>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={() => handleResetSubject(selectedSubject.id)}
                      className="w-full px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Törlés / Visszaállítás
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
