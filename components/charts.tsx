"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SchoolData } from "@/lib/types";

export function StudentDonut({
  split
}: {
  split: SchoolData["studentSplit"];
}) {
  const total = split.boys + split.girls;
  const data = [
    { name: "Boys", value: split.boys, color: "#bdefff" },
    { name: "Girls", value: split.girls, color: "#ffe575" },
    { name: "Open seats", value: 110, color: "#eef0f4" }
  ];

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={1}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-5 text-center">
          <div>
            <span className="mx-auto mb-2 block h-4 w-4 rounded-full bg-[#bdefff]" />
            <p className="font-bold">{split.boys}</p>
            <p className="text-xs text-muted-foreground">
              Boys ({Math.round((split.boys / total) * 100)}%)
            </p>
          </div>
          <div>
            <span className="mx-auto mb-2 block h-4 w-4 rounded-full bg-[#ffe575]" />
            <p className="font-bold">{split.girls}</p>
            <p className="text-xs text-muted-foreground">
              Girls ({Math.round((split.girls / total) * 100)}%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AttendanceBars({
  data
}: {
  data: SchoolData["attendanceSeries"];
}) {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#cbc6ff]" />
            present
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ffe575]" />
            absent
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="present" fill="#cbc6ff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="absent" fill="#ffe575" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function FinanceLine({
  data
}: {
  data: SchoolData["financeSeries"];
}) {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Finance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8fdbe8"
                strokeWidth={4}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#cbc6ff"
                strokeWidth={4}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
