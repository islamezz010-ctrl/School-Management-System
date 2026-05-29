import {
  BookOpen,
  Building2,
  CalendarCheck2,
  GraduationCap,
  School,
  Users,
  UserRoundCog
} from "lucide-react";
import { AttendanceBars, FinanceLine, StudentDonut } from "@/components/charts";
import { DashboardShell } from "@/components/dashboard-shell";
import { AdminDirectoryTables, WorkTables } from "@/components/directory-tables";
import {
  AnnouncementsList,
  CompactStat,
  EventsList,
  MetricCard,
  MiniCalendar,
  PerformanceCard,
  ProfileCard,
  ScheduleGrid,
  ShortcutPanel
} from "@/components/widgets";
import type {
  Announcement,
  AssignmentRecord,
  EventItem,
  ExamRecord,
  LessonRecord,
  SafeUser,
  ScheduleEntry,
  SchoolData
} from "@/lib/types";

type AdminData = {
  counts: SchoolData["counts"];
  calendar: SchoolData["calendar"];
  events: EventItem[];
  announcements: Announcement[];
  studentSplit: SchoolData["studentSplit"];
  attendanceSeries: SchoolData["attendanceSeries"];
  financeSeries: SchoolData["financeSeries"];
  students: SchoolData["students"];
  teachers: SchoolData["teachers"];
  lessons: LessonRecord[];
  exams: ExamRecord[];
};

type TeacherData = {
  counts: SchoolData["counts"];
  calendar: SchoolData["calendar"];
  events: EventItem[];
  announcements: Announcement[];
  schedule: ScheduleEntry[];
  assignments: AssignmentRecord[];
  exams: ExamRecord[];
  lessons: LessonRecord[];
};

type StudentData = {
  calendar: SchoolData["calendar"];
  events: EventItem[];
  announcements: Announcement[];
  schedule: ScheduleEntry[];
  assignments: AssignmentRecord[];
  exams: ExamRecord[];
};

export function AdminDashboard({
  user,
  data
}: {
  user: SafeUser;
  data: AdminData;
}) {
  return (
    <DashboardShell user={user} role="admin">
      <div className="dashboard-grid">
        <section className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Admins"
              value={data.counts.admins}
              tint="lavender"
              icon={<School className="size-4" />}
            />
            <MetricCard
              label="Teachers"
              value={data.counts.teachers}
              tint="yellow"
              icon={<UserRoundCog className="size-4" />}
            />
            <MetricCard
              label="Students"
              value={data.counts.students}
              tint="lavender"
              icon={<GraduationCap className="size-4" />}
            />
            <MetricCard
              label="Parents"
              value={data.counts.parents}
              tint="yellow"
              icon={<Users className="size-4" />}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.4fr]">
            <StudentDonut split={data.studentSplit} />
            <AttendanceBars data={data.attendanceSeries} />
          </div>

          <FinanceLine data={data.financeSeries} />
          <AdminDirectoryTables data={data} />
        </section>

        <aside className="space-y-4">
          <MiniCalendar calendar={data.calendar} />
          <EventsList events={data.events} />
          <AnnouncementsList announcements={data.announcements} />
        </aside>
      </div>
    </DashboardShell>
  );
}

export function TeacherDashboard({
  user,
  data
}: {
  user: SafeUser;
  data: TeacherData;
}) {
  return (
    <DashboardShell user={user} role="teacher">
      <div className="dashboard-grid">
        <section className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
            <ProfileCard user={user} />
            <div className="grid gap-4 sm:grid-cols-2">
              <CompactStat
                label="Attendance"
                value={`${data.counts.attendance}%`}
                color="bg-[#fff6c9]"
                icon={<CalendarCheck2 className="size-5" />}
              />
              <CompactStat
                label="Branches"
                value={data.counts.branches}
                color="bg-[#ece9ff]"
                icon={<Building2 className="size-5" />}
              />
              <CompactStat
                label="Lessons"
                value={data.counts.lessons}
                color="bg-[#ffe8f5]"
                icon={<BookOpen className="size-5" />}
              />
              <CompactStat
                label="Classes"
                value={data.counts.classes}
                color="bg-[#dff7ff]"
                icon={<School className="size-5" />}
              />
            </div>
          </div>

          <ScheduleGrid title="Teacher's Schedule" entries={data.schedule} />
          <WorkTables
            assignments={data.assignments}
            exams={data.exams}
            lessons={data.lessons}
          />
        </section>

        <aside className="space-y-4">
          <ShortcutPanel />
          <PerformanceCard />
          <AnnouncementsList announcements={data.announcements} compact />
          <MiniCalendar calendar={data.calendar} />
          <EventsList events={data.events} />
        </aside>
      </div>
    </DashboardShell>
  );
}

export function StudentDashboard({
  user,
  data
}: {
  user: SafeUser;
  data: StudentData;
}) {
  return (
    <DashboardShell user={user} role="student">
      <div className="dashboard-grid">
        <section className="space-y-4">
          <ScheduleGrid title="Schedule (4A)" entries={data.schedule} />
          <WorkTables assignments={data.assignments} exams={data.exams} />
        </section>

        <aside className="space-y-4">
          <MiniCalendar calendar={data.calendar} />
          <EventsList events={data.events} />
          <AnnouncementsList announcements={data.announcements} />
        </aside>
      </div>
    </DashboardShell>
  );
}
