"use client";

import { useState } from "react";
import { Semester } from "@/lib/types";
import { subjects } from "@/lib/mock-data";
import { getAllUserSubjectStates, isSubjectCompleted } from "@/lib/utils/user-subject-state";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface SemesterSelectorProps {
  semesters: Semester[];
  selectedId: string;
  onSelect: (id: string | null) => void;
}

export default function SemesterSelector({ semesters, selectedId, onSelect }: SemesterSelectorProps) {
  const [open, setOpen] = useState(false);
  const userStates = getAllUserSubjectStates();

  const selectedSemester = semesters.find((s) => s.id === selectedId);

  // Calculate semester stats
  const getSemesterStats = (semester: Semester) => {
    const semesterSubjects = subjects.filter((s) => s.semesterId === semester.id);
    const totalCredits = semesterSubjects.reduce((sum, s) => sum + s.credits, 0);
    const completedCount = semesterSubjects.filter((s) => isSubjectCompleted(s.id)).length;
    const inProgressCount = semesterSubjects.filter((s) => {
      const state = userStates[s.id];
      return state?.status === "in_progress";
    }).length;

    return { totalCredits, completedCount, inProgressCount };
  };

  // Get semester status
  const getSemesterStatus = (semester: Semester) => {
    if (semester.isCurrent) return "Aktuális félév";
    
    // Compare dates to determine if previous or future
    const now = new Date();
    const semesterStart = new Date(semester.startDate);
    const semesterEnd = new Date(semester.endDate);
    
    if (semesterEnd < now) return "Előző félév";
    if (semesterStart > now) return "Későbbi félév";
    return "Előző félév";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] h-9 text-xs border-slate-200 bg-white text-slate-700 justify-between">
          <span className="truncate">{selectedSemester?.name || "Félév választása"}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="end">
        <div className="max-h-[300px] overflow-y-auto">
          {semesters.map((semester) => {
            const stats = getSemesterStats(semester);
            const status = getSemesterStatus(semester);
            const isSelected = semester.id === selectedId;

            return (
              <button
                key={semester.id}
                onClick={() => {
                  onSelect(semester.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                  isSelected ? "bg-slate-100" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-800">{semester.name}</span>
                  {semester.isCurrent && (
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  {!semester.isCurrent && <span>{status}</span>}
                  <span>·</span>
                  <span>{stats.totalCredits} kredit</span>
                  {stats.completedCount > 0 && stats.completedCount === stats.totalCredits && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-600">teljesítve</span>
                    </>
                  )}
                  {stats.inProgressCount > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-sky-600">folyamatban</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
