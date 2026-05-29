import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import type { Role, SafeUser } from "@/lib/types";

export function DashboardShell({
  user,
  role,
  children
}: {
  user: SafeUser;
  role: Role;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar role={role} />
      <div className="min-h-screen lg:pl-56">
        <Topbar user={user} />
        <main className="px-4 pb-8 pt-4 sm:px-5">{children}</main>
      </div>
    </div>
  );
}
