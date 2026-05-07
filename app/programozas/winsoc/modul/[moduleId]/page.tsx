import { notFound } from "next/navigation";
import Link from "next/link";
import { winsocModules } from "@/lib/mock-data/winsoc-exam-readiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Code, BookOpen, AlertTriangle, CheckCircle2 } from "lucide-react";

export default async function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const winsocModule = winsocModules.find((m) => m.id === moduleId);

  if (!winsocModule) {
    notFound();
  }

  const priorityColors = {
    critical: "bg-red-100 text-red-700 border-red-200",
    high: "bg-amber-100 text-amber-700 border-amber-200",
    medium: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/programozas/winsoc">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vissza a SOC-hez
              </Button>
            </Link>
            <Badge className={priorityColors[winsocModule.examPriority as keyof typeof priorityColors]}>
              {winsocModule.examPriority === "critical" && "Kritikus"}
              {winsocModule.examPriority === "high" && "Fontos"}
              {winsocModule.examPriority === "medium" && "Közepes"}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{winsocModule.title}</h1>
          <p className="text-slate-600">{winsocModule.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Exam Explanation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-600" />
              Mit csinál ez a modul?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{winsocModule.examExplanation}</p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-slate-600" />
              Hogyan működik?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {winsocModule.howItWorks.map((step: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Must Explain */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-600" />
              Vizsgán el kell tudni magyarázni
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {winsocModule.mustExplain.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Likely Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5 text-slate-600" />
              Mit kérhetnek módosításként?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {winsocModule.likelyTasks.map((task: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{task}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              Gyakori hibák
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {winsocModule.commonMistakes.map((mistake: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-red-900">{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Code Example */}
        {winsocModule.codeExample && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-600" />
                Kódpélda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{winsocModule.codeExample}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Mini Exercise */}
        {winsocModule.miniExercise && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                <Code className="w-5 h-5" />
                Mini gyakorlófeladat: {winsocModule.miniExercise.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-900">{winsocModule.miniExercise.prompt}</p>
              {winsocModule.miniExercise.starterCode && (
                <div>
                  <p className="text-sm font-semibold text-blue-700 mb-2">Kezdő kód:</p>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{winsocModule.miniExercise.starterCode}</code>
                  </pre>
                </div>
              )}
              {winsocModule.miniExercise.solution && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-blue-700 font-semibold hover:text-blue-800">
                    Megoldás megjelenítése
                  </summary>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                    <code>{winsocModule.miniExercise.solution}</code>
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        )}

        {/* Exam Answer Template */}
        {winsocModule.examAnswerTemplate && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-600" />
                Vizsgaválasz sablon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 italic">{winsocModule.examAnswerTemplate}</p>
            </CardContent>
          </Card>
        )}

        {/* Back Links */}
        <Card className="bg-slate-100">
          <CardContent className="py-4">
            <div className="flex flex-wrap gap-3">
              <Link href="/programozas/winsoc">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Informatika II SOC
                </Button>
              </Link>
              <Link href="/programozas/winsoc/gyorsismetlo">
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Gyorsismétlő
                </Button>
              </Link>
              <Link href="/exam-sprint/maj9">
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  Május 9 stratégia
                </Button>
              </Link>
              <Link href="/exam-sprint/probavizsga">
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Próbavizsga
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
