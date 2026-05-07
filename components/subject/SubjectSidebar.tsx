"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, BookOpen, Calendar, Info, Network } from "lucide-react";

interface SubjectSidebarProps {
  subjectId: string;
}

const menuItems = [
  { href: "", label: "Áttekintő", icon: Info },
  { href: "notes", label: "Jegyzetek", icon: FileText },
  { href: "study", label: "Tanulás", icon: BookOpen },
  { href: "classes", label: "Órák", icon: Calendar },
  { href: "description", label: "Leírás", icon: Network },
];

export default function SubjectSidebar({ subjectId }: SubjectSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r border-slate-200 min-h-[calc(100vh-56px)] p-3 shrink-0">
      <nav className="space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const href = `/subjects/${subjectId}${item.href ? `/${item.href}` : ""}`;
          const isActive = pathname === href || (item.href === "" && pathname.endsWith(subjectId));

          return (
            <Link key={item.href} href={href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sky-50 text-sky-700 border border-sky-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-sky-600" : "text-slate-400")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
