import { NextResponse } from "next/server";
import { adminUsers } from "@/lib/admin/mock-data";
import { listLocalAdminUsers, replaceLocalAdminUsers } from "@/lib/admin/local-db";
import { adminUserSchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalAdminUsers() });
}

export async function POST(request: Request) {
  const parsed = adminUserSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: `U-${Date.now()}`, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof adminUsers; items?: typeof adminUsers };
  const data = await replaceLocalAdminUsers(body.data ?? body.items ?? adminUsers);
  return NextResponse.json({ data });
}
