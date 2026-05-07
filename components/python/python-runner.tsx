"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Loader2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { executePythonCode, isPyodideLoaded, ExecutionResult } from "@/lib/utils/pyodide-runner";

interface PythonRunnerProps {
  initialCode?: string;
  starterCode?: string;
  questionId?: string;
  onRunComplete?: (result: ExecutionResult) => void;
  readOnly?: boolean;
  maxHeight?: string;
}

export function PythonRunner({
  initialCode = "",
  starterCode = "",
  questionId,
  onRunComplete,
  readOnly = false,
  maxHeight = "400px",
}: PythonRunnerProps) {
  const [code, setCode] = useState(initialCode || starterCode);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoadingPyodide, setIsLoadingPyodide] = useState(false);

  useEffect(() => {
    setCode(initialCode || starterCode);
  }, [initialCode, starterCode]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      if (!isPyodideLoaded()) {
        setIsLoadingPyodide(true);
      }

      const result = await executePythonCode(code);
      setOutput(result);
      onRunComplete?.(result);
    } catch (error) {
      setOutput({
        success: false,
        output: "",
        error: error instanceof Error ? error.message : "Ismeretlen hiba történt.",
        executionTime: 0,
      });
    } finally {
      setIsRunning(false);
      setIsLoadingPyodide(false);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    setOutput(null);
  };

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3 pt-4 px-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Python kód futtató
          </CardTitle>
          <Badge className="text-[10px] bg-sky-50 text-sky-600 border-sky-200">
            Önellenőrzés
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-4 space-y-4">
        {/* Code editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-slate-600">Kód:</label>
            {!readOnly && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleReset}
                className="h-6 text-xs text-slate-500 hover:text-slate-700"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Alaphelyzet
              </Button>
            )}
          </div>
          <textarea
            value={code}
            onChange={(e) => !readOnly && setCode(e.target.value)}
            readOnly={readOnly}
            data-question-id={questionId}
            className="w-full h-40 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
            placeholder="Írd be a Python kódot ide..."
            spellCheck={false}
          />
        </div>

        {/* Run button */}
        {!readOnly && (
          <Button
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
            className="w-full bg-sky-600 hover:bg-sky-700"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Futtatás...
              </>
            ) : isLoadingPyodide ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Pyodide betöltése...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Kód futtatása
              </>
            )}
          </Button>
        )}

        {/* Output */}
        {output && (
          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">
              Kimenet:
            </label>
            <div
              className={`w-full p-3 rounded-lg text-xs font-mono border ${
                output.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-red-50 border-red-200 text-red-900"
              }`}
              style={{ maxHeight, overflowY: "auto" }}
            >
              {output.success ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">Sikeres futtatás</span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600">
                      <Clock className="w-3 h-3" />
                      {output.executionTime}ms
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap">{output.output}</pre>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">Hiba</span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-red-600">
                      <Clock className="w-3 h-3" />
                      {output.executionTime}ms
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap">{output.error}</pre>
                </>
              )}
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-[10px] text-amber-700 flex items-start gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>
              Ez egy automatikus önellenőrzés, nem hivatalos értékelés. A kód
              böngészőben fut, időtúllépés 5 másodperc.
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
