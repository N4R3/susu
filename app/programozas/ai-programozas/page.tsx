import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Clock, Lock } from "lucide-react";

export default function AiProgramozasPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/programozas">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">AI programozás</h1>
              <p className="text-xs text-slate-400">Tervezett útvonal</p>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">Tervezett</Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">AI programozás útvonal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">
              Az AI programozás útvonal hamarosan elérhető lesz. Ez az útvonal a Python alapokon épít, és a következőket fogja tartalmazni:
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>Python + API-k használata (OpenAI, Anthropic, egyéb LLM szolgáltatások)</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>Prompt engineering alapok fejlesztőknek</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>Automatizált scriptek AI API-kkal</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>Adatfeldolgozás és elemzés AI segítségével</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>Egyszerű AI eszközök és alkalmazások építése</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-700 text-base">Előfeltételek</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-3">Az AI programozás útvonal elvégzéséhez először végezd el:</p>
            <Link href="/programozas/python">
              <Button variant="outline" className="border-slate-300 text-slate-700">
                Python alapok
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-amber-800 text-base flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Hamarosan elérhető
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700">
              Ez az útvonal fejlesztés alatt áll. Addig is, gyakorolj a Python alapokkal, és készülj fel az AI programozás alapjaira.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
