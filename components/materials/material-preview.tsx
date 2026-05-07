"use client";

import { useState, useEffect, useCallback } from "react";
import { type StudyMaterial } from "@/lib/mock-data/study-materials";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, FileText, AlertTriangle } from "lucide-react";

interface MaterialPreviewProps {
  material: StudyMaterial;
  onClose?: () => void;
}

export default function MaterialPreview({ material, onClose }: MaterialPreviewProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTextContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(material.publicPath!);
      if (!response.ok) throw new Error("Failed to load file");
      const text = await response.text();
      setContent(text);
    } catch (err) {
      setError("Fájl betöltése sikertelen");
    } finally {
      setLoading(false);
    }
  }, [material.publicPath]);

  useEffect(() => {
    if (material.previewMode === "txt" && material.publicPath) {
      loadTextContent();
    }
  }, [material.previewMode, material.publicPath, loadTextContent]);

  const renderPreview = () => {
    switch (material.previewMode) {
      case "pdf":
        return (
          <div className="w-full h-[600px] bg-slate-100 rounded-lg overflow-hidden">
            <iframe
              src={material.publicPath}
              className="w-full h-full border-0"
              title={material.title}
            />
          </div>
        );

      case "txt":
        if (loading) {
          return (
            <div className="flex items-center justify-center h-[400px] text-slate-500">
              Betöltés...
            </div>
          );
        }
        if (error) {
          return (
            <div className="flex items-center justify-center h-[400px] text-red-500">
              {error}
            </div>
          );
        }
        return (
          <div className="w-full h-[600px] bg-white border border-slate-200 rounded-lg overflow-auto p-4">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
              {content || "Nincs tartalom"}
            </pre>
          </div>
        );

      case "docx":
        return (
          <div className="w-full h-[400px] bg-amber-50 border border-amber-200 rounded-lg flex flex-col items-center justify-center p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-600 mb-4" />
            <p className="text-sm text-amber-800 mb-4">
              A DOCX előnézet egyszerűsített, nem pontos Word-megjelenítés.
            </p>
            <div className="flex gap-2">
              {material.publicPath && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(material.publicPath, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Megnyitás új lapon
                </Button>
              )}
              {material.publicPath && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = material.publicPath!;
                    link.download = material.fileName || material.title;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Letöltés
                </Button>
              )}
            </div>
          </div>
        );

      case "pptx-fallback":
        return (
          <div className="w-full h-[400px] bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center p-6 text-center">
            <FileText className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-sm text-slate-700 mb-2">
              A PPTX teljes böngészős előnézete később készül el.
            </p>
            <p className="text-sm text-slate-500 mb-4">Megnyitás / letöltés</p>
            <div className="flex gap-2">
              {material.publicPath && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(material.publicPath, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Megnyitás új lapon
                </Button>
              )}
              {material.publicPath && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = material.publicPath!;
                    link.download = material.fileName || material.title;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Letöltés
                </Button>
              )}
            </div>
          </div>
        );

      case "download":
        return (
          <div className="w-full h-[300px] bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center p-6 text-center">
            <FileText className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-sm text-slate-700 mb-2">ZIP fájl: letöltés / lokális megnyitás</p>
            {material.publicPath && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = material.publicPath!;
                  link.download = material.fileName || material.title;
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Letöltés
              </Button>
            )}
          </div>
        );

      case "external-link":
        return (
          <div className="w-full h-[300px] bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center p-6 text-center">
            <ExternalLink className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-sm text-slate-700 mb-2">Külső link</p>
            {material.externalUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(material.externalUrl, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Megnyitás
              </Button>
            )}
          </div>
        );

      default:
        return (
          <div className="w-full h-[300px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500">
            Előnézet nem elérhető
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Material info */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-1">{material.title}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Badge variant="outline" className="text-[10px]">
              {material.type.toUpperCase()}
            </Badge>
            {material.subjectNames?.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
        {onClose && (
          <Button size="sm" variant="ghost" onClick={onClose}>
            Bezárás
          </Button>
        )}
      </div>

      {/* Preview */}
      {renderPreview()}

      {/* Action buttons */}
      <div className="flex gap-2 pt-4 border-t border-slate-200">
        {material.previewMode === "pdf" && material.publicPath && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(material.publicPath, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Megnyitás új lapon
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const link = document.createElement("a");
                link.href = material.publicPath!;
                link.download = material.fileName || material.title;
                link.click();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Letöltés
            </Button>
          </>
        )}
        {material.previewMode === "external-link" && material.externalUrl && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(material.externalUrl, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Megnyitás
          </Button>
        )}
      </div>

      {/* Privacy note */}
      <p className="text-[10px] text-slate-400 mt-2">
        A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba.
      </p>
    </div>
  );
}
