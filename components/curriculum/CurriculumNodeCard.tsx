"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Badge } from "@/components/ui/badge";
import { subjectVisualCategories, visualCategoryColors, type VisualCategory } from "@/lib/mock-data/curriculum";
import { subjects } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";

interface CurriculumNodeData {
  id: string;
  name: string;
  code: string | null;
  isRequired: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  semesterNumber: number;
}

export default function CurriculumNodeCard({ data, selected }: NodeProps<CurriculumNodeData>) {
  const subject = subjects.find((s) => s.id === data.id);
  const visualCategory = subjectVisualCategories[data.id] || "elective";
  const colors = visualCategoryColors[visualCategory as keyof typeof visualCategoryColors] || visualCategoryColors.elective;
  
  return (
    <div
      className={`relative rounded-xl border-2 p-3 transition-all shadow-sm hover:shadow-md ${
        selected
          ? "border-slate-800 ring-2 ring-slate-300"
          : data.isCurrent
          ? "border-sky-500 bg-sky-50"
          : data.isRequired
          ? `${colors.border} ${colors.bg}`
          : "border-purple-200 bg-purple-50"
      }`}
      style={{
        minWidth: "200px",
        maxWidth: "220px",
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
        style={{ backgroundColor: colors.accent }}
      />

      {/* Handles for React Flow */}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-slate-400 !border-slate-300" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-slate-400 !border-slate-300" />

      <div className="pl-3">
        {/* Top row: name + status */}
        <div className="mb-2">
          <h4 className={`text-sm font-semibold leading-tight ${data.isCurrent ? "text-sky-800" : colors.text}`}>
            {data.name}
          </h4>
          {data.code && (
            <span className="font-mono text-[10px] text-slate-500">
              {data.code}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {data.isCurrent && (
            <Badge className="text-[9px] bg-sky-500 text-white border-sky-600">
              Aktuális
            </Badge>
          )}
          {data.isRequired ? (
            <Badge className={`text-[9px] ${data.isCurrent ? "bg-sky-100 text-sky-700 border-sky-200" : colors.bg + " " + colors.text + " " + colors.border}`}>
              Kötelező
            </Badge>
          ) : (
            <Badge className="text-[9px] bg-purple-100 text-purple-700 border-purple-200">
              Választható
            </Badge>
          )}
          {data.isCompleted && (
            <Badge className="text-[9px] bg-emerald-100 text-emerald-700 border-emerald-200">
              Kész
            </Badge>
          )}
        </div>

        {/* Semester indicator */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            {data.semesterNumber}. félév
          </span>
          {subject && (
            <ChevronRight className="w-3 h-3 text-slate-300" />
          )}
        </div>
      </div>
    </div>
  );
}

export const MemoizedCurriculumNodeCard = memo(CurriculumNodeCard);
