"use client";

import { motion } from "framer-motion";
import { Deadline } from "@/lib/types";
import { getDaysUntilDeadline, formatDate } from "@/lib/utils/deadlines";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Target, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface ExamCommandHeroProps {
  urgentDeadlines: Deadline[];
}

export default function ExamCommandHero({ urgentDeadlines }: ExamCommandHeroProps) {
  if (urgentDeadlines.length === 0) return null;

  const nextExam = urgentDeadlines[0];
  const daysLeft = getDaysUntilDeadline(nextExam.firstDeadline);
  const isVeryUrgent = daysLeft <= 3;

  const subjectNames = urgentDeadlines.map((d) => d.subjectName).join(" + ");

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div
        className={`relative rounded-2xl border-2 p-5 overflow-hidden shadow-sm ${
          isVeryUrgent
            ? "border-orange-300 bg-orange-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          {/* Left: Title + badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
                Fókuszban
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-0.5">
              Következő vizsga
            </h2>
            <p className="text-sm text-slate-600 mb-3 font-medium">
              {subjectNames}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800 border border-amber-300 font-mono text-xs">
                {urgentDeadlines.length} tárgy
              </Badge>
              <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs">
                Nem teljesített
              </Badge>
              {urgentDeadlines.map((d) => (
                <Badge key={d.id} className="bg-white text-slate-600 border border-slate-200 text-xs">
                  {d.subjectName.split(" ")[0]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Center: Countdown */}
          <div className="flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-white border border-amber-200 shadow-sm min-w-[160px]">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">Vizsgáig</span>
            </div>
            <span className={`font-mono text-5xl font-bold tabular-nums ${isVeryUrgent ? "text-red-600" : "text-amber-600"}`}>
              {daysLeft}
            </span>
            <span className="text-sm text-slate-500 mt-0.5">nap</span>
            <span className="font-mono text-xs text-slate-400 mt-1.5">
              {formatDate(nextExam.firstDeadline)}
            </span>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col gap-2 min-w-[180px]">
            <Link href="/exam-sprint">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2 shadow-sm" size="lg">
                <Zap className="w-4 h-4" />
                Tanulás indítása
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>
            <Link href="/exam-sprint">
              <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 gap-2" size="sm">
                <Target className="w-4 h-4" />
                Mai terv
              </Button>
            </Link>
            <Link href="/curriculum-map">
              <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-700 hover:bg-white gap-2" size="sm">
                <BookOpen className="w-4 h-4" />
                Tantervi térkép
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
