"use client";

import * as React from "react";
import { RecordTable, type RecordRow } from "@/components/record-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TuitionFeeRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function feeRows(fees: TuitionFeeRecord[]): RecordRow[] {
  return fees.map((fee) => ({
    ...fee,
    amount: formatCurrency(fee.amount)
  })) as unknown as RecordRow[];
}

function SummaryItem({
  label,
  value,
  highlight
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/30 p-4",
        highlight && "border-primary/40 bg-primary/5"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-2xl font-bold", highlight && "text-primary")}>{value}</p>
    </div>
  );
}

function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.5 19.5h2.1l.4-2.5h2.5c2.8 0 4.9-1.1 5.4-4.3.2-1.3 0-2.3-.7-3.1-.8-.9-2.2-1.4-4-1.4H9.8L7.5 19.5zm1.1-6.8h1.6c1.9 0 2.9-.7 3.2-2.3.2-1-.1-1.6-.7-2-.5-.4-1.3-.6-2.3-.6H9.1l-.5 4.9z"
      />
      <path
        fill="currentColor"
        d="M18.2 7.5c-.5-2.5-2.6-3.8-5.8-3.8H8.1L5 19.5h3.5l.6-3.8h2.5c3.5 0 6.1-1.4 6.8-5.4.3-1.6.1-2.8-.6-3.6-.4-.5-1-.8-1.6-1-.3-.1-.7-.2-1-.2z"
        opacity="0.85"
      />
    </svg>
  );
}

export function TuitionFeesView({ fees }: { fees: TuitionFeeRecord[] }) {
  const [paidViaPayPal, setPaidViaPayPal] = React.useState(false);

  const total = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const paid = fees
    .filter((fee) => fee.status === "Paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const balanceDue = fees
    .filter((fee) => fee.status !== "Paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  function handlePayPal() {
    if (balanceDue <= 0) return;
    setPaidViaPayPal(true);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryItem label="Total fees" value={formatCurrency(total)} />
        <SummaryItem label="Paid" value={formatCurrency(paid)} />
        <SummaryItem label="Balance due" value={formatCurrency(balanceDue)} highlight />
      </div>

      <RecordTable rows={feeRows(fees)} searchPlaceholder="Search tuition fees..." />

      <Card className="border-0 bg-muted/20">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Pay outstanding balance</p>
            <p className="text-2xl font-bold">{formatCurrency(balanceDue)}</p>
            <p className="text-xs text-muted-foreground">
              Secure payment via PayPal for all pending and overdue fees
            </p>
          </div>
          <Button
            type="button"
            disabled={balanceDue <= 0 || paidViaPayPal}
            onClick={handlePayPal}
            className="h-11 gap-2 bg-[#0070ba] px-6 text-white hover:bg-[#003087] disabled:opacity-50"
          >
            <PayPalIcon />
            Pay with PayPal
          </Button>
        </CardContent>
      </Card>

      {paidViaPayPal ? (
        <p className="text-sm text-primary">
          Payment of {formatCurrency(balanceDue)} submitted via PayPal. You will receive a
          confirmation email shortly.
        </p>
      ) : null}
    </div>
  );
}
