export type Role = "admin" | "teacher" | "student";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  subtitle: string;
};

export type SafeUser = Omit<User, "password">;

export type ScheduleEntry = {
  id: string;
  day: string;
  start: string;
  end: string;
  title: string;
  detail: string;
  color: "cyan" | "yellow" | "lavender" | "pink" | "mint";
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  date: string;
  color: "cyan" | "yellow" | "lavender" | "pink" | "mint";
};

export type EventItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  color: "cyan" | "yellow" | "lavender";
};

export type StudentRecord = {
  id: string;
  name: string;
  className: string;
  parent: string;
  phone: string;
  grade: string;
  status: "Active" | "Review" | "Excused";
};

export type TeacherRecord = {
  id: string;
  name: string;
  subject: string;
  classes: number;
  phone: string;
  status: "Active" | "Away";
};

export type LessonRecord = {
  id: string;
  subject: string;
  className: string;
  teacher: string;
  room: string;
  weekday: string;
};

export type AssignmentRecord = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: "Open" | "Submitted" | "Graded";
};

export type ExamRecord = {
  id: string;
  subject: string;
  date: string;
  className: string;
  status: "Scheduled" | "Published" | "Graded";
};

export type ParentRecord = {
  id: string;
  name: string;
  student: string;
  relation: string;
  phone: string;
  email: string;
};

export type SubjectRecord = {
  id: string;
  name: string;
  lead: string;
  classes: number;
  weeklyHours: number;
};

export type ClassRecord = {
  id: string;
  name: string;
  homeroom: string;
  room: string;
  students: number;
};

export type ResultRecord = {
  id: string;
  student: string;
  subject: string;
  score: number;
  grade: string;
  term: string;
};

export type AttendanceRecord = {
  id: string;
  name: string;
  className: string;
  present: number;
  absent: number;
  rate: string;
};

export type MessageRecord = {
  id: string;
  from: string;
  topic: string;
  date: string;
  status: "Unread" | "Read" | "Archived";
};

export type SchoolData = {
  calendar: {
    month: string;
    year: number;
    selectedDay: number;
    weeks: Array<Array<{ day: number; muted?: boolean; weekend?: boolean }>>;
  };
  counts: {
    admins: number;
    teachers: number;
    students: number;
    parents: number;
    lessons: number;
    branches: number;
    classes: number;
    attendance: number;
  };
  studentSplit: {
    boys: number;
    girls: number;
  };
  attendanceSeries: Array<{ day: string; present: number; absent: number }>;
  financeSeries: Array<{ month: string; income: number; expense: number }>;
  schedule: ScheduleEntry[];
  announcements: Announcement[];
  events: EventItem[];
  students: StudentRecord[];
  teachers: TeacherRecord[];
  parents: ParentRecord[];
  subjects: SubjectRecord[];
  classes: ClassRecord[];
  lessons: LessonRecord[];
  assignments: AssignmentRecord[];
  exams: ExamRecord[];
  results: ResultRecord[];
  attendanceRecords: AttendanceRecord[];
  messages: MessageRecord[];
};
