"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, File, Presentation, Folder, ExternalLink, BookOpen, Eye } from "lucide-react";
import Link from "next/link";
import { getAllStudyMaterials, groupMaterialsBySubject, getMaterialOpenAction } from "@/lib/utils/study-materials";
import MaterialPreview from "@/components/materials/material-preview";
import { type StudyMaterial } from "@/lib/mock-data/study-materials";
import { subjects } from "@/lib/mock-data";

function getMaterialIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-500" />;
    case "docx":
      return <File className="w-5 h-5 text-blue-500" />;
    case "pptx":
      return <Presentation className="w-5 h-5 text-orange-500" />;
    case "txt":
      return <FileText className="w-5 h-5 text-slate-500" />;
    case "zip":
      return <File className="w-5 h-5 text-amber-500" />;
    case "repo":
      return <Folder className="w-5 h-5 text-slate-600" />;
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
    case "missing":
      return <Badge className="text-xs bg-red-100 text-red-700 border-red-200">Hiányzik</Badge>;
    default:
      return <Badge className="text-xs bg-slate-100 text-slate-700 border-slate-200">{status}</Badge>;
  }
}

function getSubjectName(subjectId: string): string {
  const subject = subjects.find((s) => s.id === subjectId);
  return subject?.name || subjectId;
}

export default function MaterialsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const allMaterials = getAllStudyMaterials();
  const groupedMaterials = groupMaterialsBySubject();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Anyagok</h1>
          <p className="text-lg text-slate-600">
            Privát tanulási anyagok könyvtára
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Minden anyag csak böngészőben kerül megnyitásra, nem töltődik fel szerverre.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba.
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedMaterials).map(([subjectId, materials]) => (
            <div key={subjectId}>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Folder className="w-5 h-5 text-slate-500" />
                {getSubjectName(subjectId)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((material) => (
                  <Card key={material.id} className="border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getMaterialIcon(material.type)}
                            <Badge variant="outline" className="text-xs">
                              {material.type.toUpperCase()}
                            </Badge>
                            {getStatusBadge(material.status)}
                          </div>
                          <CardTitle className="text-base text-slate-800">{material.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Használatban:</p>
                        <div className="flex flex-wrap gap-1">
                          {material.usedIn.map((usage: string) => (
                            <Badge key={usage} className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                              {usage}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedMaterial(material)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Előnézet
                        </Button>
                        <Link href={`/subjects/${subjectId}/study`} className="flex-1">
                          <Button variant="ghost" size="sm" className="w-full">
                            <BookOpen className="w-3 h-3 mr-1" />
                            Tanulási oldal
                          </Button>
                        </Link>
                        {material.externalUrl && (
                          <a href={material.externalUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Külső link
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {selectedMaterial && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <MaterialPreview
                  material={selectedMaterial}
                  onClose={() => setSelectedMaterial(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
