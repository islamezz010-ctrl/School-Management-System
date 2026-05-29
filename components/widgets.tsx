import {
  CalendarDays,
  Clock3,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  School,
  TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveCalendar } from "@/components/interactive-calendar";
import { Progress } from "@/components/ui/progress";
import type {
  Announcement,
  EventItem,
  SafeUser,
  ScheduleEntry,
  SchoolData
} from "@/lib/types";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];

const softColor = {
  cyan: "bg-[#dff7ff] border-[#c8eef9]",
  yellow: "bg-[#fff6c9] border-[#f6e990]",
  lavender: "bg-[#ece9ff] border-[#dcd6ff]",
  pink: "bg-[#ffe8f5] border-[#ffd3eb]",
  mint: "bg-[#dcfce7] border-[#bbf7d0]"
};

function formatHour(hour: number) {
  if (hour === 12) {
    return "12:00 PM";
  }

  if (hour > 12) {
    return `${hour - 12}:00 PM`;
  }

  return `${hour}:00 AM`;
}

function formatTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function MetricCard({
  label,
  value,
  tint,
  icon
}: {
  label: string;
  value: string | number;
  tint: "yellow" | "lavender" | "cyan" | "pink";
  icon: React.ReactNode;
}) {
  const tintClass = {
    yellow: "bg-[#ffe575]",
    lavender: "bg-[#cbc6ff]",
    cyan: "bg-[#bdefff]",
    pink: "bg-[#ffd5ea]"
  }[tint];

  return (
    <Card className={cn("border-0", tintClass)}>
      <CardContent className="flex min-h-28 flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/70 text-slate-700">2024/25</Badge>
          <span className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-slate-800">
              {icon}
            </span>
            <MoreHorizontal className="size-4 text-white" />
          </span>
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="mt-1 text-sm text-slate-700">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function CompactStat({
  label,
  value,
  icon,
  color
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className="border-0">
      <CardContent className="flex items-center gap-4 p-4">
        <span className={cn("grid h-10 w-10 place-items-center rounded-lg", color)}>
          {icon}
        </span>
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ScheduleGrid({
  title,
  entries,
  subtitle = "September 16 - 20"
}: {
  title: string;
  entries: ScheduleEntry[];
  subtitle?: string;
}) {
  return (
    <Card className="overflow-hidden border-0">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium">{subtitle}</span>
          <div className="flex overflow-hidden rounded-md border bg-white">
            <Button size="sm" className="h-8 rounded-none bg-[#d9d3ff] text-slate-900 hover:bg-[#cbc6ff]">
              Work Week
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-none">
              Day
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <div className="min-w-[780px]">
          <div className="grid grid-cols-[76px_repeat(5,minmax(120px,1fr))] border-y bg-[#f2fbfd]">
            <div className="border-r px-3 py-3 text-xs font-semibold text-muted-foreground" />
            {days.map((day) => (
              <div
                key={day}
                className="border-r px-3 py-3 text-center text-xs font-semibold uppercase text-muted-foreground last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>
          {hours.map((hour) => (
            <div
              key={hour}
              className="schedule-row grid grid-cols-[76px_repeat(5,minmax(120px,1fr))] border-b bg-[#f5fcfd]"
            >
              <div className="border-r px-3 py-2 text-xs font-semibold text-slate-600">
                {formatHour(hour)}
              </div>
              {days.map((day) => {
                const entry = entries.find(
                  (item) => item.day === day && Number(item.start.slice(0, 2)) === hour
                );

                return (
                  <div key={`${day}-${hour}`} className="border-r p-2 last:border-r-0">
                    {entry ? (
                      <div
                        className={cn(
                          "schedule-card rounded-md border p-3 text-xs shadow-sm",
                          softColor[entry.color]
                        )}
                      >
                        <p className="font-medium text-muted-foreground">
                          {formatTime(entry.start)} - {formatTime(entry.end)}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">{entry.title}</p>
                        <p className="mt-1 text-[11px] text-slate-600">{entry.detail}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function MiniCalendar({
  calendar
}: {
  calendar: SchoolData["calendar"];
}) {
  return <InteractiveCalendar calendar={calendar} />;
}

export function EventsList({ events }: { events: EventItem[] }) {
  return (
    <Card className="border-0">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Events</CardTitle>
        <MoreHorizontal className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className={cn("rounded-md border-l-4 bg-white p-4 shadow-sm", {
              "border-l-[#bdefff]": event.color === "cyan",
              "border-l-[#cbc6ff]": event.color === "lavender",
              "border-l-[#ffe575]": event.color === "yellow"
            })}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-semibold">{event.title}</h4>
              <span className="whitespace-nowrap text-xs text-muted-foreground">{event.time}</span>
            </div>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">{event.body}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AnnouncementsList({
  announcements,
  compact = false
}: {
  announcements: Announcement[];
  compact?: boolean;
}) {
  return (
    <Card className="border-0">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Announcements</CardTitle>
        <button className="text-xs font-medium text-muted-foreground">View All</button>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={cn("rounded-md p-4", softColor[announcement.color])}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-semibold">{announcement.title}</h4>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {announcement.date}
              </span>
            </div>
            {!compact ? (
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{announcement.body}</p>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ProfileCard({ user }: { user: SafeUser }) {
  return (
    <Card className="border-0 bg-[#bdefff]">
      <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-4xl font-bold text-[#23798b] shadow-sm">
          {user.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-slate-800/15">
              <Pencil className="size-4" />
            </Button>
          </div>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-700">
            Physics department lead with a focus on lab-based instruction,
            weekly progress feedback, and confident exam preparation.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-slate-800 sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <School className="size-4" />
              A+
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              14/09/1994
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4" />
              {user.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4" />
              136-367-467
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformanceCard() {
  return (
    <Card className="border-0">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Performance</CardTitle>
        <MoreHorizontal className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="mx-auto h-28 w-56 overflow-hidden">
          <div className="relative h-56 w-56 rounded-full border-[28px] border-[#bdefff]">
            <div className="absolute -right-7 top-16 h-16 w-16 rounded-full border-[18px] border-[#ffe575]" />
            <div className="absolute inset-0 grid place-items-center pt-9">
              <div className="text-center">
                <p className="text-3xl font-bold">9.2</p>
                <p className="text-xs text-muted-foreground">of 10 max LTS</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-sm font-semibold">1st Semester - 2nd Semester</p>
        <Progress value={92} />
        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="size-3" />
          Strong growth across core science classes
        </p>
      </CardContent>
    </Card>
  );
}

export function ShortcutPanel() {
  const shortcuts = [
    "Teacher's Classes",
    "Teacher's Students",
    "Teacher's Lessons",
    "Teacher's Exams",
    "Teacher's Assignments"
  ];

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Shortcuts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {shortcuts.map((shortcut, index) => (
          <Button
            key={shortcut}
            variant="ghost"
            size="sm"
            className={cn(
              "h-10 rounded-md px-3 text-xs",
              index % 3 === 0 && "bg-[#dff7ff]",
              index % 3 === 1 && "bg-[#ece9ff]",
              index % 3 === 2 && "bg-[#fff6c9]"
            )}
          >
            {shortcut}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

export function TimeChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs text-muted-foreground">
      <Clock3 className="size-3" />
      {children}
    </span>
  );
}
