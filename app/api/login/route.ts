import { NextResponse } from "next/server";
import { getUsers } from "@/lib/data";
import type { Role } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    role?: Role;
  };

  const users = await getUsers();
  const user = users.find(
    (candidate) =>
      candidate.email.toLowerCase() === body.email?.toLowerCase() &&
      candidate.password === body.password &&
      candidate.role === body.role
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email, password, or role." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    },
    redirectPath: `/${user.role}`
  });

  response.cookies.set("school_session", user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
