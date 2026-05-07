"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExamNavigationStrip } from "@/components/exam-navigation-strip";
import { PythonRunner } from "@/components/python/python-runner";
import { getAllPracticeExams, getPracticeExamById, type PracticeExam, type PracticeExamQuestion, type PracticeExamSolution } from "@/lib/mock-data/practice-exams";
import { Clock, CheckCircle2, ChevronDown, ChevronUp, BookOpen, Target, RotateCcw, PlayCircle, AlertCircle } from "lucide-react";
import { markPracticeQuestionDone, unmarkPracticeQuestionDone, isPracticeQuestionDone, resetProgressForScope, getProgressState, type StudyProgressState } from "@/lib/utils/progress-storage";
import { getTestSuiteForQuestion, type CodingGradeResult, getGradeStatus } from "@/lib/utils/code-grading";
import { runPythonWithTests, type TestExecutionResult } from "@/lib/utils/pyodide-runner";

type QuestionSelfScore = "nem-tudom" | "reszben" | "tudom";

export default function ProbavizsgaPage() {
  const [selectedExam, setSelectedExam] = useState<PracticeExam | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [showSolutions, setShowSolutions] = useState<Set<string>>(new Set());
  const [selfCheckItems, setSelfCheckItems] = useState({
    canExplain: false,
    canCode: false,
    understandsMistakes: false,
    canJustify: false
  });
  const [questionSelfScores, setQuestionSelfScores] = useState<Record<string, QuestionSelfScore>>({});
  const [progress, setProgress] = useState<StudyProgressState | null>(null);
  const [autoCheckResults, setAutoCheckResults] = useState<Record<string, CodingGradeResult>>({});
  const [isRunningTests, setIsRunningTests] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getProgressState());
  }, []);

  const exams = getAllPracticeExams();

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleSolution = (questionId: string) => {
    setShowSolutions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleQuestionComplete = (questionId: string) => {
    if (isPracticeQuestionDone(questionId)) {
      unmarkPracticeQuestionDone(questionId);
    } else {
      markPracticeQuestionDone(questionId);
    }
    setProgress(getProgressState());
  };

  const setQuestionSelfScore = (questionId: string, score: QuestionSelfScore) => {
    setQuestionSelfScores(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateEstimatedScore = () => {
    if (!selectedExam) return { total: 0, achieved: 0, percentage: 0, status: "" };

    const total = selectedExam.questions.reduce((sum, q) => sum + q.points, 0);
    let achieved = 0;

    selectedExam.questions.forEach(q => {
      const score = questionSelfScores[q.id];
      if (score === "nem-tudom") achieved += 0;
      else if (score === "reszben") achieved += q.points * 0.5;
      else if (score === "tudom") achieved += q.points;
    });

    const percentage = total > 0 ? Math.round((achieved / total) * 100) : 0;

    let status = "";
    if (percentage < 50) status = "Gyenge";
    else if (percentage < 65) status = "Átmenő közelében";
    else if (percentage < 80) status = "Rendben";
    else status = "Erős";

    return { total, achieved, percentage, status };
  };

  const handleResetProgress = () => {
    if (confirm("Biztosan törlöd a haladást ennél a próbavizsgánál?")) {
      resetProgressForScope("practice");
      setProgress(getProgressState());
      setAutoCheckResults({});
    }
  };

  const handleAutoCheck = async (questionId: string, code: string) => {
    const testSuite = getTestSuiteForQuestion(questionId);
    if (!testSuite) {
      alert("Erre a kérdésre nincs automatikus ellenőrzés konfigurálva.");
      return;
    }

    setIsRunningTests(prev => ({ ...prev, [questionId]: true }));

    try {
      const result = await runPythonWithTests(code, testSuite);
      
      if (result.success && result.testResults) {
        const gradeResult: CodingGradeResult = {
          questionId,
          passed: result.testResults.filter((r: any) => r.passed).length,
          total: result.testResults.length,
          percent: Math.round((result.testResults.filter((r: any) => r.passed).length / result.testResults.length) * 100),
          results: result.testResults.map((r: any) => ({
            testCaseId: r.testCaseId,
            label: r.testCaseId, // Will be filled from test suite
            passed: r.passed,
            message: r.message,
            visible: true,
          })),
        };

        // Fill in labels from test suite
        gradeResult.results.forEach(result => {
          const testCase = testSuite.testCases.find(tc => tc.id === result.testCaseId);
          if (testCase) {
            result.label = testCase.label;
            result.visible = !testCase.hidden;
          }
        });

        setAutoCheckResults(prev => ({ ...prev, [questionId]: gradeResult }));
      }
    } catch (error) {
      console.error("Auto-check error:", error);
      alert("Hiba történt az automatikus ellenőrzés során: " + (error instanceof Error ? error.message : "Ismeretlen hiba"));
    } finally {
      setIsRunningTests(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      coding: "Kódolás",
      explanation: "Magyarázat",
      debugging: "Hibakeresés",
      multipleChoice: "Többválasztós",
      shortAnswer: "Rövid válasz"
    };
    return labels[type] || type;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-100 text-green-800 border-green-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      exam: "bg-red-100 text-red-800 border-red-300"
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ExamNavigationStrip />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Próbavizsga</h1>
          <p className="text-lg text-slate-600">
            Május 9. önellenőrző próbavizsga
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Nem éles vizsga, hanem saját tanulási ellenőrzés.
          </p>
        </div>

        {!selectedExam ? (
          /* Exam Selector */
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Válassz próbavizsgát</h2>
            {exams.map(exam => (
              <Card key={exam.id} className="border-slate-200 hover:border-slate-300 cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{exam.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{exam.durationMinutes} perc</span>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty === "exam" ? "Vizsga szint" : exam.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{exam.description}</p>
                  <Button onClick={() => setSelectedExam(exam)} className="w-full">
                    Próbavizsga indítása
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Exam Questions */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" onClick={() => setSelectedExam(null)} className="mb-2">
                  ← Vissza a próbavizsgákhoz
                </Button>
                <h2 className="text-2xl font-bold text-slate-900">{selectedExam.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedExam.durationMinutes} perc</span>
                  </div>
                  <Badge className={getDifficultyColor(selectedExam.difficulty)}>
                    {selectedExam.difficulty === "exam" ? "Vizsga szint" : selectedExam.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-slate-600">{selectedExam.description}</p>

            {/* Self-scoring Summary */}
            <Card className="border-sky-200 bg-sky-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                  <Target className="w-4 h-4 text-sky-600" />
                  Önértékelés, nem hivatalos pontszám
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">{calculateEstimatedScore().achieved}</p>
                    <p className="text-xs text-slate-500">/{calculateEstimatedScore().total} pont</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${
                      calculateEstimatedScore().percentage < 50 ? "text-red-600" :
                      calculateEstimatedScore().percentage < 65 ? "text-amber-600" :
                      calculateEstimatedScore().percentage < 80 ? "text-sky-600" : "text-emerald-600"
                    }`}>
                      {calculateEstimatedScore().percentage}%
                    </p>
                    <p className="text-xs text-slate-500">Becslés</p>
                  </div>
                  <div className="text-center">
                    <Badge className={`${
                      calculateEstimatedScore().percentage < 50 ? "bg-red-100 text-red-700 border-red-200" :
                      calculateEstimatedScore().percentage < 65 ? "bg-amber-100 text-amber-700 border-amber-200" :
                      calculateEstimatedScore().percentage < 80 ? "bg-sky-100 text-sky-700 border-sky-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}>
                      {calculateEstimatedScore().status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Kérdések ({selectedExam.questions.length})</h3>
              {selectedExam.questions.map((question, index) => {
                const isExpanded = expandedQuestions.has(question.id);
                const solution = selectedExam.solutionKey.find(s => s.questionId === question.id);
                const isSolutionShown = showSolutions.has(question.id);

                return (
                  <Card key={question.id} className="border-slate-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{index + 1}. kérdés</Badge>
                            <Badge variant="secondary">{getQuestionTypeLabel(question.type)}</Badge>
                            <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                              {question.points} pont
                            </Badge>
                            {isPracticeQuestionDone(question.id) && (
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Kész
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{question.title}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-slate-700 whitespace-pre-wrap">{question.prompt}</p>
                        </div>
                        {question.starterCode && (
                          <>
                            <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                              <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                                <code>{question.starterCode}</code>
                              </pre>
                            </div>
                            {question.type === "coding" && (
                              <div className="space-y-3">
                                <PythonRunner
                                  starterCode={question.starterCode}
                                  questionId={question.id}
                                  maxHeight="300px"
                                />
                                {getTestSuiteForQuestion(question.id) && (
                                  <>
                                    <Button
                                      onClick={() => {
                                        const codeElement = document.querySelector(`[data-question-id="${question.id}"] textarea`) as HTMLTextAreaElement;
                                        const code = codeElement?.value || question.starterCode || "";
                                        handleAutoCheck(question.id, code);
                                      }}
                                      disabled={isRunningTests[question.id]}
                                      className="w-full"
                                    >
                                      <PlayCircle className="w-4 h-4 mr-2" />
                                      {isRunningTests[question.id] ? "Futás..." : "Automatikus önellenőrzés"}
                                    </Button>
                                    {autoCheckResults[question.id] && (
                                      <Card className="border-sky-200 bg-sky-50">
                                        <CardHeader className="pb-3">
                                          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                                            <Target className="w-4 h-4 text-sky-600" />
                                            Automatikus ellenőrzés eredménye
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div className="flex items-center gap-4">
                                            <div className="text-center">
                                              <p className="text-2xl font-bold text-slate-800">{autoCheckResults[question.id].passed}</p>
                                              <p className="text-xs text-slate-500">/{autoCheckResults[question.id].total} teszt</p>
                                            </div>
                                            <div className="text-center">
                                              <p className={`text-2xl font-bold ${
                                                autoCheckResults[question.id].percent < 50 ? "text-red-600" :
                                                autoCheckResults[question.id].percent < 65 ? "text-amber-600" :
                                                autoCheckResults[question.id].percent < 80 ? "text-sky-600" : "text-emerald-600"
                                              }`}>
                                                {autoCheckResults[question.id].percent}%
                                              </p>
                                              <p className="text-xs text-slate-500">Siker</p>
                                            </div>
                                            <div className="text-center">
                                              <Badge className={`${
                                                autoCheckResults[question.id].percent < 50 ? "bg-red-100 text-red-700 border-red-200" :
                                                autoCheckResults[question.id].percent < 65 ? "bg-amber-100 text-amber-700 border-amber-200" :
                                                autoCheckResults[question.id].percent < 80 ? "bg-sky-100 text-sky-700 border-sky-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
                                              }`}>
                                                {getGradeStatus(autoCheckResults[question.id].percent)}
                                              </Badge>
                                            </div>
                                          </div>
                                          <p className="text-xs text-slate-500 italic">
                                            Az automatikus ellenőrzés csak gyakorlási segítség, nem hivatalos értékelés.
                                          </p>
                                          <div className="space-y-2">
                                            {autoCheckResults[question.id].results.filter(r => r.visible).map(result => (
                                              <div key={result.testCaseId} className={`p-2 rounded border ${result.passed ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                                                <div className="flex items-center gap-2">
                                                  {result.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                                                  <span className="text-sm font-medium">{result.label}</span>
                                                </div>
                                                <p className="text-xs text-slate-600 mt-1 ml-6">{result.message}</p>
                                              </div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </>
                        )}
                        {question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, i) => (
                              <div key={i} className="bg-slate-50 p-3 rounded-lg">
                                <span className="text-slate-700">{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {solution && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleSolution(question.id)}
                              >
                                {isSolutionShown ? "Megoldás elrejtése" : "Megoldás mutatása"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleQuestionComplete(question.id)}
                                className={isPracticeQuestionDone(question.id) ? "text-emerald-600" : "text-slate-500"}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                {isPracticeQuestionDone(question.id) ? "Késznek jelölve" : "Késznek jelölöm"}
                              </Button>
                            </div>
                            {isSolutionShown && (
                              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg space-y-3">
                                <div>
                                  <h4 className="font-semibold text-emerald-900 mb-2">Megoldás:</h4>
                                  <pre className="text-sm text-emerald-800 whitespace-pre-wrap bg-emerald-100 p-3 rounded">
                                    {solution.solution}
                                  </pre>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-emerald-900 mb-2">Magyarázat:</h4>
                                  <p className="text-sm text-emerald-800">{solution.explanation}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-emerald-900 mb-2">Értékelési szempontok:</h4>
                                  <ul className="text-sm text-emerald-800 list-disc list-inside space-y-1">
                                    {solution.gradingCriteria.map((criteria, i) => (
                                      <li key={i}>{criteria}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-sm font-semibold text-slate-700 mb-2">Önértékelés:</p>
                          <div className="flex items-center gap-2">
                            {[("nem-tudom" as const), ("reszben" as const), ("tudom" as const)].map((score) => (
                              <button
                                key={score}
                                onClick={() => setQuestionSelfScore(question.id, score)}
                                className={`px-3 py-1 rounded text-sm border transition-colors ${
                                  questionSelfScores[question.id] === score
                                    ? score === "nem-tudom" ? "bg-red-100 text-red-700 border-red-300"
                                    : score === "reszben" ? "bg-amber-100 text-amber-700 border-amber-300"
                                    : "bg-emerald-100 text-emerald-700 border-emerald-300"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {score === "nem-tudom" ? "Nem tudom" : score === "reszben" ? "Részben" : "Tudom"}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Progress Reset */}
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetProgress}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Haladás törlése ennél a résznél
                </Button>
              </CardContent>
            </Card>

            {/* Self-check */}
            <Card className="border-slate-200 bg-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Önellenőrző lista
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: "canExplain", label: "Tudom magyarázni a koncepciókat?" },
                  { key: "canCode", label: "Le tudom kódolni a feladatokat?" },
                  { key: "understandsMistakes", label: "Értem a gyakori hibákat?" },
                  { key: "canJustify", label: "Meg tudom indokolni a döntéseimet?" }
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selfCheckItems[item.key as keyof typeof selfCheckItems]}
                      onChange={(e) => setSelfCheckItems(prev => ({
                        ...prev,
                        [item.key]: e.target.checked
                      }))}
                      className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                    />
                    <span className="text-slate-700">{item.label}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* CTA Links */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  További tanulási források
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/programozas/winsoc/gyorsismetlo">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Informatika II. gyorsismétlő
                  </Button>
                </Link>
                <Link href="/exam-sprint/maj9">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    May 9 stratégia
                  </Button>
                </Link>
                <Link href="/programozas">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Programozás HUB
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
