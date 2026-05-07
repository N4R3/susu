"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, PenTool, Type } from "lucide-react";

export default function GlobalNotes() {
  const [notes, setNotes] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("global-notes", notes);
  };

  return (
    <Card className="h-full border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-800">Gyors Jegyzetek</CardTitle>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 px-2 text-xs ${!isDrawing ? "bg-slate-100 text-slate-700" : "text-slate-400"}`}
              onClick={() => setIsDrawing(false)}
            >
              <Type className="w-3.5 h-3.5 mr-1" />
              Szöveg
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 px-2 text-xs ${isDrawing ? "bg-slate-100 text-slate-700" : "text-slate-400"}`}
              onClick={() => setIsDrawing(true)}
            >
              <PenTool className="w-3.5 h-3.5 mr-1" />
              Rajz
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs text-slate-400 hover:text-slate-700"
              onClick={handleSave}
            >
              <Save className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isDrawing ? (
          <div className="h-[460px] border border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <PenTool className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-medium text-slate-400">tldraw vászon</p>
              <p className="text-xs mt-1 text-slate-300">Rajz integráció hamarosan</p>
            </div>
          </div>
        ) : (
          <Textarea
            placeholder="Gyors jegyzetek ide..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[460px] resize-none border-slate-200 bg-white text-slate-700 text-sm placeholder:text-slate-300 focus:border-sky-400"
          />
        )}
      </CardContent>
    </Card>
  );
}
