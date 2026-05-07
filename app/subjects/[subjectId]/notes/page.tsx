"use client";

import { subjects } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, File, Presentation, FileCode, ExternalLink, Eye, AlertCircle, FolderOpen } from "lucide-react";
import { getMaterialsBySubjectId } from "@/lib/utils/study-materials";
import MaterialPreview from "@/components/materials/material-preview";
import { type StudyMaterial } from "@/lib/mock-data/study-materials";

function getMaterialIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-500" />;
    case "docx":
      return <File className="w-5 h-5 text-blue-500" />;
    case "pptx":
      return <Presentation className="w-5 h-5 text-orange-500" />;
    case "txt":
      return <FileCode className="w-5 h-5 text-slate-500" />;
    case "zip":
      return <File className="w-5 h-5 text-amber-500" />;
    case "repo":
      return <FileCode className="w-5 h-5 text-slate-600" />;
    case "link":
      return <ExternalLink className="w-5 h-5 text-slate-600" />;
    default:
      return <FileText className="w-5 h-5 text-slate-400" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "uploaded":
      return <Badge className="text-xs bg-sky-100 text-sky-700 border-sky-200">Feltöltve</Badge>;
    case "processed":
      return <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">Feldolgozva</Badge>;
    case "linked":
      return <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200">Linkelt</Badge>;
    case "generated":
      return <Badge className="text-xs bg-violet-100 text-violet-700 border-violet-200">Generált</Badge>;
    default:
      return <Badge className="text-xs bg-slate-100 text-slate-700 border-slate-200">{status}</Badge>;
  }
}

export default function NotesPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const subjectMaterials = getMaterialsBySubjectId(subjectId);

  return (
    <div className="max-w-5xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Jegyzetek – {subject.name}</h2>
        <p className="text-sm text-slate-400 mt-0.5">Kapcsolódó tanulási anyagok</p>
        <p className="text-xs text-slate-400 mt-1">
          A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba.
        </p>
      </div>

      {subjectMaterials.length === 0 ? (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6 pb-6 text-center">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm text-slate-500">Ehhez a tárgyhoz még nincs feltöltött anyag.</p>
            <p className="text-xs text-slate-400 mt-1">Anyag hozzáadása később.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Material list */}
          <div className="lg:col-span-1 space-y-3">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Anyagok
                  <span className="ml-2 font-mono text-xs font-normal text-slate-400">({subjectMaterials.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-1.5">
                {subjectMaterials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${
                      selectedMaterial?.id === material.id
                        ? "border-sky-200 bg-sky-50"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {getMaterialIcon(material.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{material.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{material.type.toUpperCase()}</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 bg-white shadow-sm h-full">
              <CardHeader className="pb-2 pt-4 px-4 border-b border-slate-100">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Előnézet
                  {selectedMaterial && (
                    <span className="ml-2 font-normal text-slate-400 font-mono text-xs">{selectedMaterial.title}</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-4">
                <div className="h-[480px] flex flex-col rounded-xl bg-slate-50 border border-dashed border-slate-200">
                  {selectedMaterial ? (
                    <div className="flex-1 overflow-auto">
                      <div className="p-4">
                        <MaterialPreview
                          material={selectedMaterial}
                          onClose={() => setSelectedMaterial(null)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                      <p className="text-sm text-slate-400">Válassz ki egy anyagot az előnézethez</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

