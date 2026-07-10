import { NextResponse } from "next/server";
import { readSiteConfig, writeSiteConfig } from "@/lib/site-config-store";
import type { SiteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ data: await readSiteConfig() });
}

export async function PUT(request: Request) {
  try {
    const config = (await request.json()) as SiteConfig;
    return NextResponse.json({ data: await writeSiteConfig(config) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存失败";
    return NextResponse.json({ message }, { status: 500 });
  }
}
