"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  MessageCircle,
  Settings,
  ShieldCheck,
  TableProperties,
  Users,
  UserRound,
  UserRoundCog
} from "lucide-react";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const coreItems = [
  { label: "Home", slug: "", icon: Home },
  { label: "Teachers", slug: "teachers", icon: GraduationCap, roles: ["admin", "teacher"] },
  { label: "Students", slug: "students", icon: Users, roles: ["admin", "teacher"] },
  { label: "Parents", slug: "parents", icon: UserRound, roles: ["admin", "teacher"] },
  { label: "Subjects", slug: "subjects", icon: BookOpen, roles: ["admin"] },
  { label: "Classes", slug: "classes", icon: TableProperties, roles: ["admin", "teacher"] },
  { label: "Lessons", slug: "lessons", icon: FileText, roles: ["admin", "teacher"] },
  { label: "Exams", slug: "exams", icon: ClipboardCheck },
  { label: "Assignments", slug: "assignments", icon: FileText },
  { label: "Results", slug: "results", icon: ShieldCheck },
  { label: "Attendance", slug: "attendance", icon: CalendarDays },
  { label: "Events", slug: "events", icon: CalendarDays },
  { label: "Messages", slug: "messages", icon: MessageCircle },
  { label: "Announcements", slug: "announcements", icon: Bell }
];

const otherItems = [
  { label: "Profile", slug: "profile", icon: UserRound },
  { label: "Settings", slug: "settings", icon: Settings }
];

export function AppSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r bg-card lg:block">
      <div className="flex h-full flex-col">
        <Link href={`/${role}`} className="flex h-16 items-center gap-3 px-5">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-[#dff7ff]">
            <span className="absolute -right-1 top-1 h-3 w-3 rounded-full bg-[#ffe575]" />
            <GraduationCap className="size-5 text-[#23798b]" />
          </span>
          <span className="text-sm font-bold">SchoolDash</span>
        </Link>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">Menu</p>
          <div className="mt-3 space-y-1">
            {coreItems
              .filter((item) => !item.roles || item.roles.includes(role))
              .map((item) => {
                const Icon = item.icon;
                const href = item.slug ? `/${role}/${item.slug}` : `/${role}`;
                const active = pathname === href;
                return (
                  <Link
                    href={href}
                    key={item.label}
                    className={cn(
                      "flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                      active && "bg-muted/70 text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
          <p className="mt-6 px-3 text-xs font-semibold uppercase text-muted-foreground">Other</p>
          <div className="mt-3 space-y-1">
            {otherItems.map((item) => {
              const Icon = item.icon;
              const href = `/${role}/${item.slug}`;
              return (
                <Link
                  href={href}
                  key={item.label}
                  className={cn(
                    "flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    pathname === href && "bg-muted/70 text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={logout}
              className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
