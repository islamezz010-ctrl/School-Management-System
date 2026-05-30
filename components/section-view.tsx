import type React from "react";
import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  MessageCircle,
  Settings,
  TableProperties,
  UserRound,
  Wallet
} from "lucide-react";
import { AnnouncementsList, EventsList, ProfileCard } from "@/components/widgets";
import { RecordTable, type RecordRow } from "@/components/record-table";
import { AssignmentSubmit } from "@/components/assignment-submit";
import { TuitionFeesView } from "@/components/tuition-fees-view";
import { InteractiveCalendar } from "@/components/interactive-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Role, SafeUser, SchoolData } from "@/lib/types";

const sectionTitles: Record<string, { title: string; icon: React.ReactNode }> = {
  teachers: { title: "Teachers", icon: <GraduationCap className="size-5" /> },
  students: { title: "Students", icon: <GraduationCap className="size-5" /> },
  parents: { title: "Parents", icon: <UserRound className="size-5" /> },
  subjects: { title: "Subjects", icon: <FileText className="size-5" /> },
  classes: { title: "Classes", icon: <TableProperties className="size-5" /> },
  lessons: { title: "Lessons", icon: <FileText className="size-5" /> },
  exams: { title: "Exams", icon: <ClipboardCheck className="size-5" /> },
  assignments: { title: "Assignments", icon: <FileText className="size-5" /> },
  results: { title: "Results", icon: <ClipboardCheck className="size-5" /> },
  attendance: { title: "Attendance", icon: <CalendarDays className="size-5" /> },
  events: { title: "Events", icon: <CalendarDays className="size-5" /> },
  messages: { title: "Messages", icon: <MessageCircle className="size-5" /> },
  announcements: { title: "Announcements", icon: <Bell className="size-5" /> },
  "tuition-fees": { title: "Tuition Fees", icon: <Wallet className="size-5" /> },
  profile: { title: "Profile", icon: <UserRound className="size-5" /> },
  settings: { title: "Settings", icon: <Settings className="size-5" /> }
};

function recordsFor(section: string, data: SchoolData, role: Role): RecordRow[] {
  const asRows = <T extends object>(rows: T[]) => rows as unknown as RecordRow[];
  const map: Record<string, RecordRow[]> = {
    teachers: asRows(data.teachers),
    students: asRows(data.students),
    parents: asRows(data.parents),
    subjects: asRows(data.subjects),
    classes: asRows(data.classes),
    lessons: asRows(data.lessons),
    exams: asRows(data.exams),
    assignments: asRows(data.assignments),
    results: asRows(data.results),
    attendance: asRows(data.attendanceRecords),
    messages: asRows(data.messages)
  };

  if (role === "student" && section === "results") {
    return asRows(data.results.filter((result) => result.student === "Stella Lewis"));
  }

  if (role === "student" && section === "attendance") {
    return asRows(data.attendanceRecords.filter((record) => record.name === "Stella Lewis"));
  }

  if (role === "teacher" && section === "teachers") {
    return asRows(data.teachers.filter((teacher) => teacher.name === "Trevor Lucas"));
  }

  return map[section] || [];
}

export function SectionView({
  role,
  section,
  data,
  user
}: {
  role: Role;
  section: string;
  data: SchoolData;
  user: SafeUser;
}) {
  const meta = sectionTitles[section] || sectionTitles.messages;

  if (section === "profile") {
    return (
      <div className="space-y-4">
        <PageTitle title={meta.title} icon={meta.icon} />
        <ProfileCard user={user} />
      </div>
    );
  }

  if (section === "settings") {
    const rows: RecordRow[] = [
      { setting: "Academic Year", value: "2024/25", status: "Active" },
      { setting: "Notifications", value: "Email and dashboard", status: "Active" },
      { setting: "Theme", value: "Shadcn dark mode", status: "Active" },
      { setting: "Data Source", value: "Local JSON files", status: "Read" }
    ];

    return (
      <div className="space-y-4">
        <PageTitle title={meta.title} icon={meta.icon} />
        <Card className="border-0">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <RecordTable rows={rows} searchPlaceholder="Search settings..." />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === "events") {
    return (
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <PageTitle title={meta.title} icon={meta.icon} />
          <EventsList events={data.events} />
        </div>
        <InteractiveCalendar calendar={data.calendar} events={data.events} />
      </div>
    );
  }

  if (section === "announcements") {
    return (
      <div className="space-y-4">
        <PageTitle title={meta.title} icon={meta.icon} />
        <AnnouncementsList announcements={data.announcements} />
      </div>
    );
  }

  const rows = recordsFor(section, data, role);

  if (section === "assignments") {
    return (
      <div className="space-y-4">
        <PageTitle title={meta.title} icon={meta.icon} />
        <Card className="border-0">
          <CardHeader>
            <CardTitle>{meta.title} Directory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AssignmentSubmit />
            <RecordTable rows={rows} searchPlaceholder={`Search ${meta.title.toLowerCase()}...`} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === "tuition-fees") {
    return (
      <div className="space-y-4">
        <PageTitle title={meta.title} icon={meta.icon} />
        <Card className="border-0">
          <CardHeader>
            <CardTitle>Fee Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <TuitionFeesView fees={data.tuitionFees} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageTitle title={meta.title} icon={meta.icon} />
      <Card className="border-0">
        <CardHeader>
          <CardTitle>{meta.title} Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <RecordTable rows={rows} searchPlaceholder={`Search ${meta.title.toLowerCase()}...`} />
        </CardContent>
      </Card>
    </div>
  );
}

function PageTitle({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary">
        {icon}
      </span>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">SchoolDash records and updates</p>
      </div>
    </div>
  );
}
