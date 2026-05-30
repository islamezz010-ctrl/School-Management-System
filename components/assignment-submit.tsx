"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function AssignmentSubmit({ className }: { className?: string }) {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!fileName) return;
    setSubmitted(true);
  }

  return (
    <div className={cn("space-y-3", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1 space-y-2">
          <label htmlFor="assignment-file" className="text-sm font-medium">
            Upload assignment
          </label>
          <Input
            id="assignment-file"
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="rounded-md file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
          />
          {fileName ? (
            <p className="text-xs text-muted-foreground">Selected: {fileName}</p>
          ) : (
            <p className="text-xs text-muted-foreground">PDF, Word, or image files accepted</p>
          )}
        </div>
        <Button type="submit" disabled={!fileName} className="gap-2 sm:mb-0.5">
          <Upload className="size-4" />
          Submit
        </Button>
      </form>
      {submitted ? (
        <p className="text-sm text-primary">Assignment submitted successfully.</p>
      ) : null}
    </div>
  );
}
