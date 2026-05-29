import fs from "node:fs/promises";
import path from "node:path";
import type {
  Announcement,
  AssignmentRecord,
  EventItem,
  ExamRecord,
  LessonRecord,
  Role,
  ScheduleEntry,
  SchoolData,
  User
} from "@/lib/types";

const dataDirectory = path.join(process.cwd(), "data");

async function readJson<T>(fileName: string): Promise<T> {
  const file = await fs.readFile(path.join(dataDirectory, fileName), "utf8");
  return JSON.parse(file) as T;
}

export async function getUsers() {
  return readJson<User[]>("users.json");
}

export async function getSchoolData() {
  return readJson<SchoolData>("school.json");
}

type AdminPayload = {
  role: "admin";
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

type TeacherPayload = {
  role: "teacher";
  counts: SchoolData["counts"];
  calendar: SchoolData["calendar"];
  events: EventItem[];
  announcements: Announcement[];
  schedule: ScheduleEntry[];
  assignments: AssignmentRecord[];
  exams: ExamRecord[];
  lessons: LessonRecord[];
};

type StudentPayload = {
  role: "student";
  calendar: SchoolData["calendar"];
  events: EventItem[];
  announcements: Announcement[];
  schedule: ScheduleEntry[];
  assignments: AssignmentRecord[];
  exams: ExamRecord[];
};

export async function getRolePayload(role: "admin"): Promise<AdminPayload>;
export async function getRolePayload(role: "teacher"): Promise<TeacherPayload>;
export async function getRolePayload(role: "student"): Promise<StudentPayload>;
export async function getRolePayload(
  role: Role
): Promise<AdminPayload | TeacherPayload | StudentPayload> {
  const data = await getSchoolData();

  if (role === "admin") {
    return {
      role,
      counts: data.counts,
      calendar: data.calendar,
      events: data.events,
      announcements: data.announcements,
      studentSplit: data.studentSplit,
      attendanceSeries: data.attendanceSeries,
      financeSeries: data.financeSeries,
      students: data.students,
      teachers: data.teachers,
      lessons: data.lessons,
      exams: data.exams
    };
  }

  if (role === "teacher") {
    return {
      role,
      counts: data.counts,
      calendar: data.calendar,
      events: data.events,
      announcements: data.announcements,
      schedule: data.schedule,
      assignments: data.assignments,
      exams: data.exams,
      lessons: data.lessons
    };
  }

  return {
    role,
    calendar: data.calendar,
    events: data.events,
    announcements: data.announcements,
    schedule: data.schedule,
    assignments: data.assignments,
    exams: data.exams
  };
}
