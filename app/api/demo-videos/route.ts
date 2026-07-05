import { NextResponse } from "next/server";
import { demoVideos } from "@/lib/admin/mock-data";
import { listLocalDemoVideos, replaceLocalDemoVideos } from "@/lib/admin/local-db";
import { demoVideoSchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalDemoVideos() });
}

export async function POST(request: Request) {
  const parsed = demoVideoSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: `V-${Date.now()}`, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof demoVideos; items?: typeof demoVideos; videos?: typeof demoVideos };
  const data = await replaceLocalDemoVideos(body.data ?? body.items ?? body.videos ?? demoVideos);
  return NextResponse.json({ data });
}
