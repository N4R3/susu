"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWinsocQuickReviewCards, getWinsocCheatSheetSections, getLastMinuteChecklist } from "@/lib/utils/winsoc-quick-review";
import { getWinsocUnknownRequirements } from "@/lib/utils/winsoc-readiness";
import { markQuickReviewCardDone, unmarkQuickReviewCardDone, isQuickReviewCardDone, resetProgressForScope } from "@/lib/utils/progress-storage";
import { Shield, Target, BookOpen, Clock, Zap, ChevronRight, ArrowRight, AlertTriangle, CheckCircle2, FileText, Database, BarChart3, ArrowLeft, Cpu, HelpCircle, RotateCcw, Check } from "lucide-react";
import { ExamNavigationStrip } from "@/components/exam-navigation-strip";

export default function WinsocGyorsismetloPage() {
  const quickReviewCards = getWinsocQuickReviewCards();
  const criticalCheatSheetSections = getWinsocCheatSheetSections();
  const lastMinuteChecklist = getLastMinuteChecklist();
  const unknownRequirements = getWinsocUnknownRequirements();
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const completed = new Set<string>();
    quickReviewCards.forEach(card => {
      if (isQuickReviewCardDone(card.id)) {
        completed.add(card.id);
      }
    });
    setCompletedCards(completed);
  }, [quickReviewCards]);

  const toggleCardComplete = (cardId: string) => {
    if (completedCards.has(cardId)) {
      unmarkQuickReviewCardDone(cardId);
      setCompletedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(cardId);
        return newSet;
      });
    } else {
      markQuickReviewCardDone(cardId);
      setCompletedCards(prev => new Set(prev).add(cardId));
    }
  };

  const handleResetProgress = () => {
    if (confirm("Biztosan törlöd a gyorsismétlő haladást?")) {
      resetProgressForScope("quickReview");
      setCompletedCards(new Set());
    }
  };

  const progressPercentage = quickReviewCards.length > 0 
    ? Math.round((completedCards.size / quickReviewCards.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/programozas/winsoc">
              <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-700">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-600" />
              <h1 className="text-lg font-bold text-slate-800">Informatika II. gyorsismétlő – Windows SOC Analyst Tool</h1>
            </div>
          </div>
          <Badge className="font-mono text-xs bg-red-100 text-red-700 border-red-200">
            Vizsga: 2026.05.09
          </Badge>
        </div>
      </header>

      <ExamNavigationStrip />

      {/* Practice Exam CTA */}
      <Card className="border-emerald-300 bg-emerald-50 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Önellenőrzés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-slate-600 mb-3">
            Teszteld a tudásod próbavizsgával – nem éles vizsga, hanem saját tanulási ellenőrzés.
          </p>
          <Link href="/exam-sprint/probavizsga">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Próbavizsga indítása
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Hero Section */}
        <Card className="border-cyan-300 bg-cyan-50 shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-6 h-6 text-cyan-600" />
                  <CardTitle className="text-2xl text-slate-800">Informatika II. gyorsismétlő</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="text-xs bg-cyan-600 text-white border-cyan-700">Informatika II. fő fókusz</Badge>
                  <Badge className="text-xs bg-red-100 text-red-700 border-red-200">Vizsga előtti összefoglaló</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  A teljes SOC projekt egy oldalon – modulok, pipeline, vizsga válaszok, gyakori hibák, utolsó pillanati ellenőrzőlista.
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 5-minute overview */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-slate-500" />
              5 perces áttekintés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>SOC cél:</strong> Windows eseménylogok elemzése, gyanús tevékenységek detektálása, riport generálás.</p>
              <p><strong>Input:</strong> Mock logok (Windows események: LOGIN_SUCCESS, LOGIN_FAILED, FILE_CHANGED).</p>
              <p><strong>Pipeline:</strong> Mock Log Generator → Windows Log Parser → Anomaly Detector → Integrity Checker → Report Generator.</p>
              <p><strong>Output:</strong> HTML riport (emberileg olvasható) és JSON riport (gépi feldolgozás).</p>
              <p><strong>Riport tartalma:</strong> Összes esemény, anomáliák (brute force, gyanús IP-k), integritás változások, összefoglaló.</p>
              <p><strong>Tesztek:</strong> Unit tesztek (modulok izolációban) és integrációs teszt (teljes pipeline).</p>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline strip */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <Database className="w-4 h-4 text-slate-500" />
              SOC Pipeline áttekintés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-slate-700">Mock Log Generator</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 rounded-lg border border-sky-200">
                <Cpu className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-semibold text-slate-700">Windows Log Parser</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-slate-700">Anomaly Detector</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-slate-700">Integrity Checker</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-700">Report Generator</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">HTML/JSON riport</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module quick cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-500" />
              Modulok – gyors áttekintés
            </h2>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-sky-600">{completedCards.size}</span>
                <span className="text-slate-400">/</span>
                <span>{quickReviewCards.length}</span>
                <span className="text-slate-400">átnézve</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetProgress}
                className="text-slate-500 hover:text-slate-700"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Haladás törlése
              </Button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mb-4 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sky-500 transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickReviewCards.map((card) => (
              <Card key={card.id} className={`border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-md transition-all ${
                completedCards.has(card.id) ? "border-emerald-300 bg-emerald-50" : ""
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-sm font-semibold text-slate-800">{card.title}</CardTitle>
                      <p className="text-xs text-slate-500 mt-1">{card.oneSentence}</p>
                    </div>
                    <button
                      onClick={() => toggleCardComplete(card.id)}
                      className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        completedCards.has(card.id)
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 hover:border-emerald-400 text-transparent hover:text-emerald-400"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1">Vizsga válasz:</p>
                    <ul className="text-[10px] text-slate-500 space-y-0.5">
                      {card.explainLikeExamAnswer.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-slate-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1">Kulcs fogalmak:</p>
                    <div className="flex flex-wrap gap-1">
                      {card.keyCodeConcepts.slice(0, 3).map((concept, i) => (
                        <Badge key={i} className="text-[9px] bg-slate-100 text-slate-600 border-slate-200">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1">Valószínű feladat:</p>
                    <p className="text-[10px] text-slate-500">{card.likelyExamPrompts[0]}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1">Gyakori hiba:</p>
                    <p className="text-[10px] text-slate-500">{card.commonMistakes[0]}</p>
                  </div>
                  {completedCards.has(card.id) && (
                    <div className="pt-2 border-t border-emerald-200">
                      <Badge className="text-[9px] bg-emerald-100 text-emerald-700 border-emerald-200">
                        Átnézve
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Last minute checklist */}
        <Card className="border-red-200 bg-red-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              Utolsó pillanati ellenőrzőlista
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lastMinuteChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-100">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unknown requirements block */}
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-700">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              Ezt még tisztázni kell ({unknownRequirements.length} kérdés)
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Ezeket a kérdéseket még tisztázni kell a tanárral vagy a vizsga kiírásból.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unknownRequirements.map((req) => (
                <div key={req.id} className="p-3 bg-white rounded-lg border border-amber-100">
                  <p className="text-xs font-semibold text-slate-700 mb-1">{req.question}</p>
                  <p className="text-[10px] text-slate-500">{req.whyItMatters}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back to winsoc */}
        <div className="flex justify-center">
          <Link href="/programozas/winsoc">
            <Button variant="outline" className="border-slate-300">
              Vissza a részletes SOC felkészüléshez
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
