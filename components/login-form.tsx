"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, ShieldCheck, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const accounts: Record<
  Role,
  {
    email: string;
    password: string;
    title: string;
    description: string;
    icon: typeof ShieldCheck;
    accent: string;
  }
> = {
  admin: {
    email: "adam@school.test",
    password: "admin123",
    title: "Admin",
    description: "School-wide overview, tables, finances, and operations.",
    icon: ShieldCheck,
    accent: "bg-[#ffe575]"
  },
  teacher: {
    email: "trevor@school.test",
    password: "teacher123",
    title: "Teacher",
    description: "Schedule, lessons, assignments, exams, and class updates.",
    icon: UserRoundCog,
    accent: "bg-[#c8f3ff]"
  },
  student: {
    email: "stella@school.test",
    password: "student123",
    title: "Student",
    description: "Weekly schedule, assignments, exams, events, and notices.",
    icon: GraduationCap,
    accent: "bg-[#d9d3ff]"
  }
};

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState(accounts.admin.email);
  const [password, setPassword] = useState(accounts.admin.password);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function selectRole(nextRole: Role) {
    setRole(nextRole);
    setEmail(accounts[nextRole].email);
    setPassword(accounts[nextRole].password);
    setError("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    const payload = (await response.json()) as {
      redirectPath?: string;
      message?: string;
    };

    setLoading(false);

    if (!response.ok) {
      setError(payload.message || "Could not sign in.");
      return;
    }

    router.push(payload.redirectPath || `/${role}`);
    router.refresh();
  }

  return (
    <div className="grid w-full gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="flex flex-col justify-center rounded-lg bg-white/75 p-8 shadow-soft backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#dff7ff]">
            <GraduationCap className="size-6 text-[#23798b]" />
          </div>
          <div>
            <p className="text-xl font-bold">SchoolDash</p>
            <p className="text-sm text-muted-foreground">Role-based school management</p>
          </div>
        </div>
        <h1 className="max-w-xl text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">
          School operations with calm, clear dashboards.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Sign in as an admin, teacher, or student to see a tailored workspace
          with schedules, tables, events, announcements, and performance cards.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {(Object.keys(accounts) as Role[]).map((accountRole) => {
            const account = accounts[accountRole];
            const Icon = account.icon;
            return (
              <button
                key={accountRole}
                type="button"
                onClick={() => selectRole(accountRole)}
                className={cn(
                  "rounded-lg border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                  role === accountRole && "border-primary ring-2 ring-primary/20"
                )}
              >
                <span className={cn("mb-3 grid h-10 w-10 place-items-center rounded-lg", account.accent)}>
                  <Icon className="size-5 text-slate-800" />
                </span>
                <span className="block text-sm font-semibold">{account.title}</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {account.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <Card className="border-white/70 bg-white/90">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Use the demo accounts or switch roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={role} onValueChange={(value) => selectRole(value as Role)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error ? (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in" : `Enter ${accounts[role].title} Dashboard`}
              <ArrowRight />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
