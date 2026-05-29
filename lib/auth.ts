import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUsers } from "@/lib/data";
import type { Role } from "@/lib/types";

export async function getCurrentUser() {
  const sessionId = cookies().get("school_session")?.value;

  if (!sessionId) {
    return null;
  }

  const users = await getUsers();
  const user = users.find((candidate) => candidate.id === sessionId);

  if (!user) {
    return null;
  }

  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export async function requireRole(role: Role) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  if (user.role !== role) {
    redirect(`/${user.role}`);
  }

  return user;
}
