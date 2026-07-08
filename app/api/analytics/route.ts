import { NextResponse } from "next/server";
import { readLocalAnalytics, trackLocalAnalytics } from "@/lib/admin/local-db";

export async function GET() {
  return NextResponse.json({ data: await readLocalAnalytics() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { type?: "visit" | "video" };
  const type = body.type === "video" ? "video" : "visit";
  return NextResponse.json({ data: await trackLocalAnalytics(type) });
}
