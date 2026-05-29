import { StudentDashboard } from "@/components/role-dashboards";
import { requireRole } from "@/lib/auth";
import { getRolePayload } from "@/lib/data";

export default async function StudentPage() {
  const user = await requireRole("student");
  const data = await getRolePayload("student");

  return <StudentDashboard user={user} data={data} />;
}
