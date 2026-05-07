"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  Filter,
  Layers,
  Shield,
  Code,
  GraduationCap,
  Check,
  Network,
  Calculator,
  Briefcase,
  Sparkles,
  Heart,
  FileText,
} from "lucide-react";

type FamilyFilter = "all" | "programming" | "cybersecurity" | "networks" | "math" | "project" | "elective" | "pe" | "thesis";
type StatusFilter = "all" | "completed" | "in_progress" | "not_started" | "blocked";
type DependencyMode = "none" | "selected_chain" | "all_official" | "all_estimated";

interface CurriculumControlsBarProps {
  showDependencies: boolean;
  onToggleDependencies: (show: boolean) => void;
  showEstimated: boolean;
  onToggleEstimated: (show: boolean) => void;
  highlightCurrent: boolean;
  onToggleHighlightCurrent: (show: boolean) => void;
  familyFilter: FamilyFilter;
  onFamilyFilterChange: (filter: FamilyFilter) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
  dependencyMode: DependencyMode;
  onDependencyModeChange: (mode: DependencyMode) => void;
}

const familyFilterOptions: { value: FamilyFilter; label: string; icon: any; color: string }[] = [
  { value: "all", label: "Mind", icon: null, color: "bg-slate-800" },
  { value: "programming", label: "Prog", icon: Code, color: "bg-blue-600" },
  { value: "cybersecurity", label: "Kiber", icon: Shield, color: "bg-rose-600" },
  { value: "networks", label: "Háló", icon: Network, color: "bg-cyan-600" },
  { value: "math", label: "Matek", icon: Calculator, color: "bg-violet-600" },
  { value: "project", label: "Proj", icon: Briefcase, color: "bg-amber-600" },
  { value: "elective", label: "Szabad", icon: Sparkles, color: "bg-purple-600" },
  { value: "pe", label: "Testnevelés", icon: Heart, color: "bg-emerald-600" },
  { value: "thesis", label: "Szakdolgozat", icon: FileText, color: "bg-slate-600" },
];

const statusFilterOptions: { value: StatusFilter; label: string; color: string }[] = [
  { value: "all", label: "Mind", color: "bg-slate-800" },
  { value: "completed", label: "Teljesítve", color: "bg-emerald-600" },
  { value: "in_progress", label: "Folyamatban", color: "bg-sky-600" },
  { value: "not_started", label: "Nem kezdett", color: "bg-slate-600" },
  { value: "blocked", label: "Blokkolva", color: "bg-amber-600" },
];

const dependencyModeOptions: { value: DependencyMode; label: string }[] = [
  { value: "none", label: "Nincs" },
  { value: "selected_chain", label: "Kiválasztott lánc" },
  { value: "all_official", label: "Hivatalos" },
  { value: "all_estimated", label: "Becsült" },
];

export default function CurriculumControlsBar({
  showDependencies,
  onToggleDependencies,
  showEstimated,
  onToggleEstimated,
  highlightCurrent,
  onToggleHighlightCurrent,
  familyFilter,
  onFamilyFilterChange,
  statusFilter,
  onStatusFilterChange,
  dependencyMode,
  onDependencyModeChange,
}: CurriculumControlsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm mb-6">
      <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
        <GitBranch className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Kapcsolatok</span>
        <Button
          size="sm"
          variant={showDependencies ? "default" : "outline"}
          onClick={() => onToggleDependencies(!showDependencies)}
          className="h-7 px-2"
        >
          {showDependencies && <Check className="w-3 h-3" />}
        </Button>
      </div>

      <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
        <Layers className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Becsült</span>
        <Button
          size="sm"
          variant={showEstimated ? "default" : "outline"}
          onClick={() => onToggleEstimated(!showEstimated)}
          className="h-7 px-2"
        >
          {showEstimated && <Check className="w-3 h-3" />}
        </Button>
      </div>

      <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
        <GraduationCap className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Aktuális félév</span>
        <Button
          size="sm"
          variant={highlightCurrent ? "default" : "outline"}
          onClick={() => onToggleHighlightCurrent(!highlightCurrent)}
          className="h-7 px-2"
        >
          {highlightCurrent && <Check className="w-3 h-3" />}
        </Button>
      </div>

      <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
        <Filter className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Család:</span>
        {familyFilterOptions.map((option) => (
          <Badge
            key={option.value}
            variant={familyFilter === option.value ? "default" : "outline"}
            className={`cursor-pointer text-xs ${
              familyFilter === option.value
                ? `${option.color} text-white`
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => onFamilyFilterChange(option.value)}
          >
            {option.icon && <option.icon className="w-3 h-3 mr-1" />}
            {option.label}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
        <Filter className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Állapot:</span>
        {statusFilterOptions.map((option) => (
          <Badge
            key={option.value}
            variant={statusFilter === option.value ? "default" : "outline"}
            className={`cursor-pointer text-xs ${
              statusFilter === option.value
                ? `${option.color} text-white`
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => onStatusFilterChange(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Függőség mód:</span>
        <select
          value={dependencyMode}
          onChange={(e) => onDependencyModeChange(e.target.value as DependencyMode)}
          className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
        >
          {dependencyModeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
