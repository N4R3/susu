import { subjects, classSessions } from "@/lib/mock-data";
import { events } from "@/lib/mock-data/events";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Monitor } from "lucide-react";

export default async function ClassesPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const subjectClasses = classSessions.filter((c) => c.subjectId === subjectId);
  const subjectEvents = events.filter((e) => e.subjectId === subjectId);

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Órák – {subject.name}</h2>
        <p className="text-sm text-slate-400 mt-0.5">Menetrend, helyszínek, vizsgaidőpontok</p>
      </div>

      {/* Calendar events (from events.ts) */}
      {subjectEvents.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Vizsgák és határidők</h3>
          <div className="space-y-2">
            {subjectEvents.map((evt) => {
              const isExam = evt.type === "exam";
              const startDate = new Date(evt.start);
              return (
                <Card
                  key={evt.id}
                  className={`border shadow-sm ${isExam ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"}`}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{evt.title}</p>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {startDate.toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" })}
                          </span>
                          {evt.end && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {startDate.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" })}
                              {" – "}
                              {new Date(evt.end).toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          )}
                          {evt.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {evt.location}
                            </span>
                          )}
                          {evt.isOnline && (
                            <span className="flex items-center gap-1 text-sky-600">
                              <Monitor className="w-3.5 h-3.5" />
                              Online
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className={`text-[10px] border shrink-0 ${
                        isExam ? "bg-red-100 text-red-700 border-red-200" : "bg-sky-100 text-sky-700 border-sky-200"
                      }`}>
                        {isExam ? "Vizsga" : "Óra"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Class sessions */}
      {subjectClasses.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Óráló ({subjectClasses.length} alkalom)</h3>
          <div className="space-y-2">
            {subjectClasses.map((cls) => (
              <Card key={cls.id} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{cls.title}</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {cls.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {cls.startTime} – {cls.endTime}
                        </span>
                        {cls.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {cls.location}
                          </span>
                        )}
                      </div>
                      {cls.topics && cls.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cls.topics.map((topic, i) => (
                            <Badge key={i} className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : subjectEvents.length === 0 ? (
        <Card className="border-dashed border-slate-200 bg-white shadow-sm">
          <CardContent className="py-8 text-center">
            <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-200" />
            <p className="text-sm font-medium text-slate-400">Nincs rögzített óra</p>
            <p className="text-xs text-slate-300 mt-1">Az órarendek automatikusan szinkronizálódnak</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
