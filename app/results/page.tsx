import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getSemesterResults,
  getLatestSemester,
  calculateWeightedAverage,
  getCompletedCredits,
  getGradeDistribution,
  getBestSubjects,
  getWeakestSubjects,
} from "@/lib/utils/semester-results";
import { Award, TrendingUp, AlertTriangle, BookOpen, CheckCircle2, ArrowRight, Star, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  const semesters = getSemesterResults();
  const latestSemester = getLatestSemester();

  if (!latestSemester) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Eredmények és statisztika</h1>
          <p className="text-slate-600">Nincsenek elérhető eredmények.</p>
        </div>
      </div>
    );
  }

  const gradeDistribution = getGradeDistribution(latestSemester.subjects);
  const bestSubjects = getBestSubjects(latestSemester.subjects);
  const weakestSubjects = getWeakestSubjects(latestSemester.subjects);
  const informatika1 = latestSemester.subjects.find((s) => s.code === "BBXIN1KBLF");
  const hirközlés = latestSemester.subjects.find((s) => s.code === "BBXHZ11BLF");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Eredmények és statisztika</h1>
            <p className="text-sm text-slate-500">Félévi teljesítmény és elemzés</p>
          </div>
        </div>

        {/* Semester Summary Card */}
        <Card className="border-sky-300 bg-sky-50 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-600" />
              {latestSemester.name} félév összefoglaló
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-sky-100">
                <p className="text-xs text-slate-500 mb-1">Kredit</p>
                <p className="text-2xl font-bold text-slate-800">{latestSemester.credits}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-sky-100">
                <p className="text-xs text-slate-500 mb-1">Teljesített kredit</p>
                <p className="text-2xl font-bold text-slate-800">{latestSemester.completedCredits}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-sky-100">
                <p className="text-xs text-slate-500 mb-1">Súlyozott átlag</p>
                <p className="text-2xl font-bold text-sky-600">{latestSemester.weightedAverage}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-sky-100">
                <p className="text-xs text-slate-500 mb-1">Halmozott átlag</p>
                <p className="text-2xl font-bold text-sky-600">{latestSemester.cumulativeWeightedAverage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="border-slate-200 bg-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-600" />
              Jegyeloszlás
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(gradeDistribution)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([grade, count]) => (
                  <div key={grade} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">{grade}</p>
                    <p className="text-xl font-bold text-slate-800">{count} db</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Best Subjects */}
          <Card className="border-emerald-300 bg-emerald-50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-slate-800 flex items-center gap-2">
                <Star className="w-4 h-4 text-emerald-600" />
                Legjobb tárgyak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bestSubjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between bg-white p-2 rounded border border-emerald-100">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{subject.name}</p>
                      <p className="text-[10px] text-slate-500">{subject.code}</p>
                    </div>
                    <Badge className="bg-emerald-600 text-white border-emerald-700">{subject.resultText}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weakest Subjects */}
          <Card className="border-amber-300 bg-amber-50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Fejlesztendő területek
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weakestSubjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between bg-white p-2 rounded border border-amber-100">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{subject.name}</p>
                      <p className="text-[10px] text-slate-500">{subject.code}</p>
                    </div>
                    <Badge className="bg-amber-600 text-white border-amber-700">{subject.resultText}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Insight */}
        <Card className="border-purple-300 bg-purple-50 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-base text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Mit jelent ez a mostani félévre?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">Jó összeteljesítés: <span className="font-semibold">4.13 súlyozott átlag</span></p>
              </div>
              {informatika1 && informatika1.numericGrade === 3 && (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Informatika I. volt 3</span>, ezért az Informatika II. most fókuszált felkészülést igényel.
                  </p>
                </div>
              )}
              {hirközlés && hirközlés.numericGrade === 4 && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Hírközléstechnika volt 4</span>, ez alapja a Vezetékes és vezeték nélküli hálózatoknak.
                  </p>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">
                  A sok jeles eredmény mutatja, hogy a tanulási rendszer működik.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Result Table */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-600" />
              Tárgyak eredményei
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Tárgy</th>
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Kód</th>
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Kredit</th>
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Eredmény</th>
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Számított jegy</th>
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Teljesítve</th>
                  </tr>
                </thead>
                <tbody>
                  {latestSemester.subjects.map((subject) => (
                    <tr key={subject.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <p className="font-medium text-slate-800">{subject.name}</p>
                        <p className="text-xs text-slate-500">{subject.type}</p>
                      </td>
                      <td className="py-3 px-2 font-mono text-xs text-slate-600">{subject.code}</td>
                      <td className="py-3 px-2 text-slate-700">{subject.credit}</td>
                      <td className="py-3 px-2">
                        <Badge
                          variant="outline"
                          className={
                            subject.resultText === "Jeles" || subject.resultText === "Kiválóan megfelelt"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : subject.resultText === "Jó"
                              ? "bg-sky-100 text-sky-700 border-sky-200"
                              : subject.resultText === "Közepes"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : subject.resultText === "Elégséges"
                              ? "bg-orange-100 text-orange-700 border-orange-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }
                        >
                          {subject.resultText}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 font-semibold text-slate-800">{subject.numericGrade ?? "-"}</td>
                      <td className="py-3 px-2">
                        {subject.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
