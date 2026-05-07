"use client";

import { Badge } from "@/components/ui/badge";
import { visualCategoryColors, subjectVisualCategories, type VisualCategory } from "@/lib/mock-data/curriculum";
import { GraduationCap, CheckCircle, CircleDashed, GitBranch } from "lucide-react";

export default function CurriculumLegend() {
  const categories: VisualCategory[] = ["programming", "cybersecurity", "networks", "math", "project", "elective", "pe", "thesis"];

  const categoryNames: Record<VisualCategory, string> = {
    programming: "Programozás",
    cybersecurity: "Kiberbiztonság",
    networks: "Hálózatok",
    math: "Matematika",
    project: "Projektek",
    elective: "Választható",
    pe: "Testnevelés",
    thesis: "Szakdolgozat",
  };

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm mb-6">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">Jelmagyarázat</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Subject Family Colors */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tantárgycsaládok</p>
          {categories.map((cat) => {
            const colors = visualCategoryColors[cat as keyof typeof visualCategoryColors];
            return (
              <div key={cat} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors.bg} border ${colors.border}`} style={{ backgroundColor: colors.accent }} />
                <span className={`text-xs ${colors.text}`}>{categoryNames[cat]}</span>
              </div>
            );
          })}
        </div>

        {/* Subject Status */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tantárgy státusz</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <span className="text-xs text-slate-600">Aktuális félév</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-600">Kötelező</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs text-slate-600">Választható</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-600">Kész</span>
          </div>
        </div>

        {/* Dependency Lines */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Függőségek</p>
          <div className="flex items-center gap-2">
            <GitBranch className="w-3 h-3 text-slate-600" />
            <span className="text-xs text-slate-600">Hivatalos</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleDashed className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-600">Becsült</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-amber-500" />
            <span className="text-xs text-slate-600">Kiemelt lánc</span>
          </div>
        </div>

        {/* View Modes */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Nézet mód</p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-slate-600" />
            <span className="text-xs text-slate-600">Kijelölt lánc</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3 h-3 text-slate-600" />
            <span className="text-xs text-slate-600">Aktuális félév kiemelés</span>
          </div>
        </div>
      </div>
    </div>
  );
}
