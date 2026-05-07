import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Exam Sprint", href: "/exam-sprint" },
  { label: "Május 9 stratégia", href: "/exam-sprint/maj9" },
  { label: "Próbavizsga", href: "/exam-sprint/probavizsga" },
  { label: "Informatika II SOC", href: "/programozas/winsoc" },
  { label: "Informatika II gyorsismétlő", href: "/programozas/winsoc/gyorsismetlo" },
  { label: "Programozás ismétlés", href: "/subjects/bbxpr12blf/study" },
];

export function ExamNavigationStrip() {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-200 bg-white sticky top-16 z-10">
      <div className="max-w-[1800px] mx-auto px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mr-2">
            Május 9 vizsga:
          </span>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Badge
                  variant={isActive ? "default" : "outline"}
                  className={`whitespace-nowrap text-xs ${
                    isActive
                      ? "bg-amber-600 text-white border-amber-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
