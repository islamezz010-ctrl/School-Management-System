import { AdminDashboard } from "@/components/role-dashboards";
import { requireRole } from "@/lib/auth";
import { getRolePayload } from "@/lib/data";

export default async function AdminPage() {
  const user = await requireRole("admin");
  const data = await getRolePayload("admin");

  return <AdminDashboard user={user} data={data} />;
}
