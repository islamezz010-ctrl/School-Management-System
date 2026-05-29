import { TeacherDashboard } from "@/components/role-dashboards";
import { requireRole } from "@/lib/auth";
import { getRolePayload } from "@/lib/data";

export default async function TeacherPage() {
  const user = await requireRole("teacher");
  const data = await getRolePayload("teacher");

  return <TeacherDashboard user={user} data={data} />;
}
