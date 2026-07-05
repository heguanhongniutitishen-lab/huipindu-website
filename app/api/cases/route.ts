import { NextResponse } from "next/server";
import { cases } from "@/lib/admin/mock-data";
import { listLocalCases, replaceLocalCases } from "@/lib/admin/local-db";
import { caseStudySchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalCases() });
}

export async function POST(request: Request) {
  const parsed = caseStudySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: `C-${Date.now()}`, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof cases; items?: typeof cases };
  const data = await replaceLocalCases(body.data ?? body.items ?? cases);
  return NextResponse.json({ data });
}
