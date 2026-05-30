"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { AssignmentSubmit } from "@/components/assignment-submit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  AssignmentRecord,
  ExamRecord,
  LessonRecord,
  SchoolData,
  StudentRecord,
  TeacherRecord
} from "@/lib/types";

const statusTone = {
  Active: "cyan",
  Review: "yellow",
  Excused: "lavender",
  Away: "pink",
  Open: "yellow",
  Submitted: "cyan",
  Graded: "lavender",
  Scheduled: "yellow",
  Published: "cyan"
} as const;

const studentColumns: ColumnDef<StudentRecord>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>
  },
  { accessorKey: "className", header: "Class" },
  { accessorKey: "parent", header: "Parent" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "grade", header: "Grade" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusTone[row.original.status]}>{row.original.status}</Badge>
    )
  }
];

const teacherColumns: ColumnDef<TeacherRecord>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Teacher",
    cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>
  },
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "classes", header: "Classes" },
  { accessorKey: "phone", header: "Phone" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusTone[row.original.status]}>{row.original.status}</Badge>
    )
  }
];

const lessonColumns: ColumnDef<LessonRecord>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "className", header: "Class" },
  { accessorKey: "teacher", header: "Teacher" },
  { accessorKey: "room", header: "Room" },
  { accessorKey: "weekday", header: "Weekday" }
];

const assignmentColumns: ColumnDef<AssignmentRecord>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "title",
    header: "Assignment",
    cell: ({ row }) => <span className="font-semibold">{row.original.title}</span>
  },
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "due", header: "Due" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusTone[row.original.status]}>{row.original.status}</Badge>
    )
  }
];

const examColumns: ColumnDef<ExamRecord>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "className", header: "Class" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusTone[row.original.status]}>{row.original.status}</Badge>
    )
  }
];

export function AdminDirectoryTables({
  data
}: {
  data: Pick<SchoolData, "students" | "teachers" | "lessons" | "exams">;
}) {
  return (
    <Card className="border-0">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>School Records</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <DataTable columns={studentColumns} data={data.students} />
          </TabsContent>
          <TabsContent value="teachers">
            <DataTable columns={teacherColumns} data={data.teachers} />
          </TabsContent>
          <TabsContent value="lessons">
            <DataTable columns={lessonColumns} data={data.lessons} />
          </TabsContent>
          <TabsContent value="exams">
            <DataTable columns={examColumns} data={data.exams} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export function WorkTables({
  assignments,
  exams,
  lessons
}: {
  assignments: AssignmentRecord[];
  exams: ExamRecord[];
  lessons?: LessonRecord[];
}) {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Academic Work</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assignments">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            {lessons ? <TabsTrigger value="lessons">Lessons</TabsTrigger> : null}
          </TabsList>
          <TabsContent value="assignments" className="space-y-4">
            <AssignmentSubmit />
            <DataTable
              columns={assignmentColumns}
              data={assignments}
              searchPlaceholder="Search assignments..."
            />
          </TabsContent>
          <TabsContent value="exams">
            <DataTable columns={examColumns} data={exams} searchPlaceholder="Search exams..." />
          </TabsContent>
          {lessons ? (
            <TabsContent value="lessons">
              <DataTable
                columns={lessonColumns}
                data={lessons}
                searchPlaceholder="Search lessons..."
              />
            </TabsContent>
          ) : null}
        </Tabs>
      </CardContent>
    </Card>
  );
}
