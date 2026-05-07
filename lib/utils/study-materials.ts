import { studyMaterials, type StudyMaterial } from "@/lib/mock-data/study-materials";

/**
 * Get all study materials
 */
export function getAllStudyMaterials(): StudyMaterial[] {
  return studyMaterials;
}

/**
 * Get materials by subject ID
 */
export function getMaterialsBySubjectId(subjectId: string): StudyMaterial[] {
  return studyMaterials.filter((material) =>
    material.subjectIds.includes(subjectId)
  );
}

/**
 * Get material by ID
 */
export function getMaterialById(id: string): StudyMaterial | undefined {
  return studyMaterials.find((material) => material.id === id);
}

/**
 * Get materials by type
 */
export function getMaterialsByType(type: StudyMaterial["type"]): StudyMaterial[] {
  return studyMaterials.filter((material) => material.type === type);
}

/**
 * Get preview URL for a material
 */
export function getPreviewUrl(material: StudyMaterial): string | null {
  if (material.previewMode === "external-link" && material.externalUrl) {
    return material.externalUrl;
  }
  if (material.publicPath) {
    return material.publicPath;
  }
  return null;
}

/**
 * Check if a material is previewable in browser
 */
export function isPreviewable(material: StudyMaterial): boolean {
  return [
    "pdf",
    "docx",
    "txt",
    "pptx-fallback",
    "external-link",
  ].includes(material.previewMode);
}

/**
 * Get material open action type
 */
export function getMaterialOpenAction(material: StudyMaterial): {
  action: "preview" | "download" | "external" | "none";
  url: string | null;
} {
  if (material.previewMode === "external-link" && material.externalUrl) {
    return { action: "external", url: material.externalUrl };
  }
  if (material.publicPath) {
    if (isPreviewable(material)) {
      return { action: "preview", url: material.publicPath };
    }
    return { action: "download", url: material.publicPath };
  }
  return { action: "none", url: null };
}

/**
 * Group materials by subject
 */
export function groupMaterialsBySubject(): Record<string, StudyMaterial[]> {
  const grouped: Record<string, StudyMaterial[]> = {};
  
  studyMaterials.forEach((material) => {
    material.subjectIds.forEach((subjectId) => {
      if (!grouped[subjectId]) {
        grouped[subjectId] = [];
      }
      grouped[subjectId].push(material);
    });
  });
  
  return grouped;
}
