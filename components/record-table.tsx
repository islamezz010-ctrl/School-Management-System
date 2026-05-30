"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";

type Primitive = string | number | boolean | null;
export type RecordRow = Record<string, Primitive>;
type BadgeTone = "cyan" | "yellow" | "lavender" | "pink" | "outline";

function titleize(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function badgeVariant(value: string): BadgeTone {
  if (["Active", "Submitted", "Published", "Unread", "Paid"].includes(value)) {
    return "cyan";
  }

  if (["Open", "Scheduled", "Review", "Pending"].includes(value)) {
    return "yellow";
  }

  if (["Graded", "Archived", "Excused", "Read"].includes(value)) {
    return "lavender";
  }

  if (["Away", "Overdue"].includes(value)) {
    return "pink";
  }

  return "outline";
}

export function RecordTable({
  rows,
  searchPlaceholder
}: {
  rows: RecordRow[];
  searchPlaceholder?: string;
}) {
  const keys = rows[0] ? Object.keys(rows[0]) : [];
  const columns: ColumnDef<RecordRow>[] = keys.map((key) => ({
    accessorKey: key,
    header: titleize(key),
    cell: ({ row }) => {
      const value = row.original[key];
      const displayValue = value === null ? "-" : String(value);
      const isStatus = key.toLowerCase().includes("status");

      if (isStatus) {
        return <Badge variant={badgeVariant(displayValue)}>{displayValue}</Badge>;
      }

      if (["name", "title", "topic", "student", "subject"].includes(key)) {
        return <span className="font-semibold">{displayValue}</span>;
      }

      return displayValue;
    }
  }));

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchPlaceholder={searchPlaceholder || "Search records..."}
    />
  );
}
