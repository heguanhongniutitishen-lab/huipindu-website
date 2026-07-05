import { NextResponse } from "next/server";
import { cmsSections } from "@/lib/admin/mock-data";
import { listLocalCmsSections, replaceLocalCmsSections } from "@/lib/admin/local-db";

export async function GET() {
  return NextResponse.json({ data: await listLocalCmsSections() });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ data: { id: `CMS-${Date.now()}`, ...body } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof cmsSections; items?: typeof cmsSections };
  const data = await replaceLocalCmsSections(body.data ?? body.items ?? cmsSections);
  return NextResponse.json({ data });
}
