"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EventItem, SchoolData } from "@/lib/types";
import { cn } from "@/lib/utils";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function monthIndex(name: string) {
  return monthNames.findIndex((month) => month === name);
}

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      muted: date.getMonth() !== month,
      weekend: date.getDay() === 0 || date.getDay() === 6
    };
  });
}

export function InteractiveCalendar({
  calendar,
  events = []
}: {
  calendar: SchoolData["calendar"];
  events?: EventItem[];
}) {
  const initialMonth = monthIndex(calendar.month);
  const [cursor, setCursor] = useState({
    month: initialMonth,
    year: calendar.year
  });
  const [selected, setSelected] = useState({
    day: calendar.selectedDay,
    month: initialMonth,
    year: calendar.year
  });

  const days = useMemo(
    () => buildMonth(cursor.year, cursor.month),
    [cursor.month, cursor.year]
  );

  function moveMonth(offset: number) {
    const next = new Date(cursor.year, cursor.month + offset, 1);
    setCursor({ month: next.getMonth(), year: next.getFullYear() });
  }

  function choose(day: number, month: number, year: number) {
    setSelected({ day, month, year });
    setCursor({ month, year });
  }

  return (
    <Card className="border-0">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveMonth(-1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <h3 className="text-sm font-bold">
            {monthNames[cursor.month]} {cursor.year}
          </h3>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveMonth(1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
          {weekdays.map((day) => (
            <span key={day} className="font-bold text-foreground/80">
              {day}
            </span>
          ))}
          {days.map((item) => {
            const isSelected =
              item.day === selected.day &&
              item.month === selected.month &&
              item.year === selected.year;
            return (
              <button
                key={`${item.year}-${item.month}-${item.day}`}
                type="button"
                onClick={() => choose(item.day, item.month, item.year)}
                className={cn(
                  "mx-auto grid h-8 w-10 place-items-center rounded-sm font-medium transition hover:bg-secondary",
                  item.muted && "text-muted-foreground/60",
                  item.weekend && "text-rose-500",
                  isSelected && "bg-[#bdefff] text-slate-900 shadow-sm dark:bg-primary dark:text-primary-foreground"
                )}
              >
                {item.day}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-md bg-muted p-3">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            {monthNames[selected.month]} {selected.day}, {selected.year}
          </p>
          <p className="mt-1 text-sm font-medium">
            {events.length ? `${events.length} school events listed` : "No events listed"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
