import { subjects } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import SubjectNavbar from "@/components/subject/SubjectNavbar";
import SubjectSidebar from "@/components/subject/SubjectSidebar";

export default async function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SubjectNavbar subject={subject} />
      <div className="flex">
        <SubjectSidebar subjectId={subject.id} />
        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
