"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, MessageCircle, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import type { SafeUser } from "@/lib/types";

export function Topbar({ user }: { user: SafeUser }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-card/90 px-4 backdrop-blur sm:px-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
        <div className="relative hidden w-56 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="h-9 pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Messages">
          <MessageCircle />
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell />
          <span className="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
            {user.role === "teacher" ? 3 : 1}
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full p-1 text-left outline-none transition hover:bg-muted">
              <span className="hidden text-right sm:block">
                <span className="block text-xs font-semibold">{user.name}</span>
                <span className="block text-[11px] text-muted-foreground">{user.subtitle}</span>
              </span>
              <Avatar>
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout} className="gap-2">
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
