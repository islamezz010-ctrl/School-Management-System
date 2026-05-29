import { NextResponse } from "next/server";
import { getRolePayload } from "@/lib/data";
import type { Role } from "@/lib/types";

const roles = ["admin", "teacher", "student"];

export async function GET(
  _request: Request,
  { params }: { params: { role: Role } }
) {
  if (!roles.includes(params.role)) {
    return NextResponse.json({ message: "Unknown role." }, { status: 404 });
  }

  const payload = await getRolePayload(params.role);
  return NextResponse.json(payload);
}
