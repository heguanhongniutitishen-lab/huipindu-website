import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/adminAuth";
import { hasGitHubWriteConfig, writeGitHubFile } from "@/lib/githubContent";
import siteContent from "@/content/site-content.json";

const contentPath = "content/site-content.json";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, data: siteContent });
}

export async function PUT(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return NextResponse.json({ ok: false, message: "内容格式不正确。" }, { status: 400 });
  }

  const formatted = `${JSON.stringify(data, null, 2)}\n`;

  if (hasGitHubWriteConfig()) {
    await writeGitHubFile(contentPath, formatted, "Update website content from admin");
  } else {
    await fs.writeFile(path.join(process.cwd(), contentPath), formatted, "utf8");
  }

  return NextResponse.json({
    ok: true,
    message: hasGitHubWriteConfig() ? "保存成功，GitHub 已更新，Vercel 将自动重新部署。" : "保存成功，本地 JSON 已更新。"
  });
}
