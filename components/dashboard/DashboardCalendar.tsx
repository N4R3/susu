"use client";

import { useState } from "react";
import { Semester, CalendarEvent } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, MapPin, Clock } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, getDay } from "date-fns";
import { hu } from "date-fns/locale";

interface DashboardCalendarProps {
  semester: Semester;
  events: CalendarEvent[];
}

// Convert Sunday-first getDay() to Monday-first (Mon=0 ... Sun=6)
function toMondayFirst(sundayFirstDay: number): number {
  return sundayFirstDay === 0 ? 6 : sundayFirstDay - 1;
}

const EVENT_COLORS: Record<string, string> = {
  class: "bg-sky-100 text-sky-700 border-sky-200",
  exam: "bg-red-100 text-red-700 border-red-200 font-semibold",
  assignment_deadline: "bg-violet-100 text-violet-700 border-violet-200",
  admin_deadline: "bg-slate-100 text-slate-600 border-slate-200",
  study_block: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  class: "Óra",
  exam: "Vizsga",
  assignment_deadline: "Beadandó",
  admin_deadline: "Adminisztráció",
  study_block: "Tanulás",
};

export default function DashboardCalendar({ semester, events }: DashboardCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Leading padding: how many empty cells before the first day of the month
  // getDay() returns 0=Sun,1=Mon...6=Sat; toMondayFirst converts to Mon=0...Sun=6
  const leadingPadding = toMondayFirst(getDay(monthStart));

  const semesterStart = new Date(semester.startDate);
  const semesterEnd = new Date(semester.endDate);

  const goToPreviousMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    if (d >= semesterStart) { setCurrentDate(d); setSelectedDay(null); }
  };
  const goToNextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    if (d <= semesterEnd) { setCurrentDate(d); setSelectedDay(null); }
  };

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(new Date(e.start), date));

  const isUrgentExamDay = (date: Date) =>
    isSameDay(date, new Date("2026-05-09"));
  const isExamDay = (date: Date) =>
    events.some((e) => e.type === "exam" && isSameDay(new Date(e.start), date));

  const canGoPrevious = currentDate > semesterStart;
  const canGoNext = currentDate < semesterEnd;

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const WEEKDAY_LABELS = ["H", "K", "Sz", "Cs", "P", "Szo", "V"];

  return (
    <div className="space-y-3">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-800">
              {format(currentDate, "MMMM yyyy", { locale: hu })}
            </CardTitle>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-500" onClick={goToPreviousMonth} disabled={!canGoPrevious}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-500" onClick={goToNextMonth} disabled={!canGoNext}>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAY_LABELS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wide py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {/* Leading empty cells to align first day correctly */}
            {Array.from({ length: leadingPadding }).map((_, i) => (
              <div key={`pad-${i}`} />
            ))}

            {days.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isDayToday = isToday(day);
              const isUrgent = isUrgentExamDay(day);
              const isExam = isExamDay(day) && !isUrgent;
              const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(isSameDay(day, selectedDay ?? new Date(0)) ? null : day)}
                  className={`relative min-h-[56px] p-1 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-sky-400 bg-sky-50 ring-1 ring-sky-300"
                      : isUrgent
                      ? "border-amber-300 bg-amber-50 hover:border-amber-400"
                      : isExam
                      ? "border-red-200 bg-red-50 hover:border-red-300"
                      : isDayToday
                      ? "border-sky-300 bg-sky-50 hover:border-sky-400"
                      : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-center mb-0.5">
                    <span
                      className={`text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full ${
                        isDayToday
                          ? "bg-sky-500 text-white font-bold"
                          : isUrgent
                          ? "text-amber-700 font-bold"
                          : isExam
                          ? "text-red-600"
                          : "text-slate-600"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-[8px] px-1 py-0.5 rounded border truncate leading-tight ${EVENT_COLORS[event.type] ?? EVENT_COLORS.class}`}
                      >
                        {event.title.split("–")[0].trim()}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[8px] text-slate-400 text-center">+{dayEvents.length - 2}</div>
                    )}
                  </div>
                  {hasEvents && !isUrgent && !isExam && (
                    <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-slate-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-[10px] text-slate-500">Ma</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded bg-amber-100 border border-amber-300" />
              <span className="text-[10px] text-slate-500">Sürgős vizsga</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded bg-red-100 border border-red-200" />
              <span className="text-[10px] text-slate-500">Vizsga</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day detail panel */}
      {selectedDay && (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-800">
                  {format(selectedDay, "EEEE, yyyy. MMMM d.", { locale: hu })}
                </CardTitle>
                {isUrgentExamDay(selectedDay) && (
                  <Badge className="mt-1 text-[10px] bg-amber-100 text-amber-700 border border-amber-200">
                    Sürgős vizsganap
                  </Badge>
                )}
              </div>
              <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {selectedDayEvents.length === 0 ? (
              <p className="text-sm text-slate-400 italic">
                Ezen a napon nincs rögzített óra, vizsga vagy határidő.
              </p>
            ) : (
              <div className="space-y-2">
                {selectedDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-lg border p-3 ${EVENT_COLORS[event.type] ?? EVENT_COLORS.class}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight">{event.title}</p>
                        {event.subjectId && (
                          <p className="text-[10px] font-mono mt-0.5 opacity-70">{event.subjectId.toUpperCase()}</p>
                        )}
                      </div>
                      <Badge className={`text-[10px] shrink-0 ${EVENT_COLORS[event.type]}`}>
                        {EVENT_TYPE_LABELS[event.type] ?? event.type}
                      </Badge>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] opacity-80">
                      {event.start && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(event.start), "HH:mm")}
                          {event.end && ` – ${format(new Date(event.end), "HH:mm")}`}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      )}
                      {event.isOnline && (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          Online
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
