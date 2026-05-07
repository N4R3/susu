"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Subject } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap } from "lucide-react";
import { Deadline } from "@/lib/types";
import { getDaysUntilDeadline } from "@/lib/utils/deadlines";

interface SubjectCardProps {
  subject: Subject;
  urgentDeadline?: Deadline;
  index?: number;
}

function getStatusStyle(status: string) {
  switch (status) {
    case "completed":
      return { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Kész" };
    case "in_progress":
      return { badge: "bg-amber-100 text-amber-700 border-amber-200", label: "Vár jegyre" };
    case "failed":
      return { badge: "bg-red-100 text-red-700 border-red-200", label: "Nem sikerült" };
    default:
      return { badge: "bg-slate-100 text-slate-500 border-slate-200", label: "Nincs kész" };
  }
}

function getRequirementStyle(req: string) {
  switch (req) {
    case "Vizsga":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Beadandó":
      return "bg-violet-100 text-violet-700 border-violet-200";
    case "Full online":
      return "bg-sky-100 text-sky-700 border-sky-200";
    case "Megfelelt / Nem megfelelt":
      return "bg-slate-100 text-slate-600 border-slate-200";
    default:
      return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

export default function SubjectCard({ subject, urgentDeadline, index = 0 }: SubjectCardProps) {
  const router = useRouter();
  const isUrgent = !!urgentDeadline;
  const status = getStatusStyle(subject.completionStatus);
  const daysLeft = urgentDeadline ? getDaysUntilDeadline(urgentDeadline.firstDeadline) : null;
  
  // Check if subject has relevant Programozás HUB content
  const hasProgramozasHub = subject.id === "bbxpr12blf" || subject.id === "bbxin2kblf";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <Link href={`/subjects/${subject.id}`} className="block group">
        <div
          className={`relative rounded-xl border p-4 transition-all shadow-sm ${
            isUrgent
              ? "border-amber-200 bg-amber-50 hover:border-amber-300 hover:shadow-md"
              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
          }`}
        >
          {/* Colored left accent */}
          <div
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
            style={{ backgroundColor: subject.color }}
          />

          <div className="pl-3">
            {/* Top row: name + status */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-slate-800 leading-tight">
                  {subject.name}
                </h3>
                <span className="font-mono text-[10px] text-slate-400 tracking-wide">
                  {subject.code}
                </span>
              </div>
              <Badge className={`text-[10px] border shrink-0 ${status.badge}`}>
                {status.label}
              </Badge>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <Badge className={`text-[10px] border ${getRequirementStyle(subject.requirementType)}`}>
                {subject.requirementType}
              </Badge>
              <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                {subject.credits} kr
              </span>
              {subject.unlocksSubjectIds.length > 0 && (
                <span className="text-[10px] text-slate-400">
                  +{subject.unlocksSubjectIds.length} következő
                </span>
              )}
            </div>

            {/* Urgent exam row */}
            {isUrgent && urgentDeadline && (
              <div className="mb-3 p-2 rounded-lg bg-white border border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge className="text-[10px] bg-red-100 text-red-700 border border-red-200">Vizsga</Badge>
                    <Badge className="text-[10px] bg-amber-100 text-amber-700 border border-amber-200">Fókusz</Badge>
                  </div>
                  {daysLeft !== null && (
                    <span className={`font-mono text-xs font-bold ${daysLeft <= 3 ? "text-red-600" : "text-amber-600"}`}>
                      {daysLeft} nap
                    </span>
                  )}
                </div>
                <div className="mt-1 font-mono text-[10px] text-slate-400">
                  {urgentDeadline.firstDeadline}
                </div>
              </div>
            )}

            {!isUrgent && subject.nextDeadline && (
              <div className="mb-2">
                <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
                  {subject.nextDeadlineType}: {subject.nextDeadline}
                </span>
              </div>
            )}

            {/* CTA row */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                {isUrgent && (
                  <Button
                    size="sm"
                    className="h-7 px-3 text-xs bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-1.5 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/exam-sprint");
                    }}
                  >
                    <Zap className="w-3 h-3" />
                    Tanulás indítása
                  </Button>
                )}
                {hasProgramozasHub && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-3 text-xs border-sky-200 text-sky-700 hover:bg-sky-50 font-semibold gap-1.5 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/programozas");
                    }}
                  >
                    Programozás HUB
                  </Button>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
