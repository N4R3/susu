"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, AlertCircle, GitBranch, GraduationCap } from "lucide-react";
import { curriculumSemesters, curriculumDependencies } from "@/lib/mock-data/curriculum";

export default function CurriculumHeaderStats() {
  const totalSemesters = curriculumSemesters.length;
  const currentSemester = curriculumSemesters.find((s) => s.isCurrent);
  const totalSubjects = curriculumSemesters.reduce((acc, sem) => acc + sem.subjects.length, 0);
  const totalDependencies = curriculumDependencies.length;
  const requiredSubjects = curriculumSemesters.reduce(
    (acc, sem) => acc + sem.subjects.filter((s) => s.isRequired).length,
    0
  );
  const electiveSubjects = totalSubjects - requiredSubjects;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalSemesters}</p>
              <p className="text-xs text-slate-500">Félév</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {currentSemester ? currentSemester.semesterNumber : "-"}
              </p>
              <p className="text-xs text-slate-500">Jelenlegi félév</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalSubjects}</p>
              <p className="text-xs text-slate-500">Tantárgy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalDependencies}</p>
              <p className="text-xs text-slate-500">Függőség</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{requiredSubjects}</p>
              <p className="text-xs text-slate-500">Kötelező</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Badge className="text-xs bg-purple-200 text-purple-700 border-purple-300">Sz</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{electiveSubjects}</p>
              <p className="text-xs text-slate-500">Választható</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
