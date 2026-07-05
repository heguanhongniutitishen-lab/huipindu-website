import { NextResponse } from "next/server";
import { settings } from "@/lib/admin/mock-data";
import { listLocalSettings, replaceLocalSettings } from "@/lib/admin/local-db";
import { siteSettingSchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalSettings() });
}

export async function POST(request: Request) {
  const parsed = siteSettingSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: `S-${Date.now()}`, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof settings; items?: typeof settings };
  const data = await replaceLocalSettings(body.data ?? body.items ?? settings);
  return NextResponse.json({ data });
}
