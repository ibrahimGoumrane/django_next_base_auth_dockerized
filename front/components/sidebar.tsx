"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GraduationCap, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-card/50 md:block md:w-64">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            ExamGrade Pro
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-1 p-4">
        {sidebarLinks.map((link) => (
          <Button
            key={link.href}
            variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-2",
              pathname.startsWith(link.href) && "bg-primary/10 text-primary"
            )}
            asChild
          >
            <Link href={link.href}>
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
