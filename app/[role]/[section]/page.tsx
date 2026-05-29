import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { SectionView } from "@/components/section-view";
import { requireRole } from "@/lib/auth";
import { getSchoolData } from "@/lib/data";
import type { Role } from "@/lib/types";

const roles: Role[] = ["admin", "teacher", "student"];

const allowedSections: Record<Role, string[]> = {
  admin: [
    "teachers",
    "students",
    "parents",
    "subjects",
    "classes",
    "lessons",
    "exams",
    "assignments",
    "results",
    "attendance",
    "events",
    "messages",
    "announcements",
    "profile",
    "settings"
  ],
  teacher: [
    "teachers",
    "students",
    "parents",
    "classes",
    "lessons",
    "exams",
    "assignments",
    "results",
    "attendance",
    "events",
    "messages",
    "announcements",
    "profile",
    "settings"
  ],
  student: [
    "exams",
    "assignments",
    "results",
    "attendance",
    "events",
    "messages",
    "announcements",
    "profile",
    "settings"
  ]
};

export default async function SidebarSectionPage({
  params
}: {
  params: { role: Role; section: string };
}) {
  if (!roles.includes(params.role)) {
    notFound();
  }

  if (!allowedSections[params.role].includes(params.section)) {
    notFound();
  }

  const user = await requireRole(params.role);
  const data = await getSchoolData();

  return (
    <DashboardShell user={user} role={params.role}>
      <SectionView
        role={params.role}
        section={params.section}
        data={data}
        user={user}
      />
    </DashboardShell>
  );
}
