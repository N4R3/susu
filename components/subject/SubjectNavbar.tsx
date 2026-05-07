import { Subject } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

interface SubjectNavbarProps {
  subject: Subject;
}

export default function SubjectNavbar({ subject }: SubjectNavbarProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
      <div className="w-full px-6 py-3 flex items-center gap-4">
        {/* SUSU logo — links to homepage */}
        <Link href="/" className="flex items-center gap-2 mr-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="font-bold text-sm text-slate-800 hidden sm:inline">SUSU</span>
        </Link>

        <span className="text-slate-300">/</span>

        <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Subject info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: subject.color }}
          />
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-800 leading-tight truncate">{subject.name}</h1>
            <p className="text-xs font-mono text-slate-400">{subject.code}</p>
          </div>
        </div>

        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
            <Home className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
