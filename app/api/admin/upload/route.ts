import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/adminAuth";
import { hasGitHubWriteConfig, writeGitHubFile } from "@/lib/githubContent";

const allowedTypes: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp"
};

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "请选择图片文件。" }, { status: 400 });
  }

  const extension = allowedTypes[file.type];
  if (!extension) {
    return NextResponse.json({ ok: false, message: "仅支持 PNG、JPG、WEBP 图片。" }, { status: 400 });
  }

  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "图片不能超过 4MB。" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `admin-${Date.now()}.${extension}`;
  const repoPath = `public/images/brand/${fileName}`;
  const publicPath = `/images/brand/${fileName}`;

  if (hasGitHubWriteConfig()) {
    await writeGitHubFile(repoPath, buffer, `Upload admin image ${fileName}`);
  } else {
    await fs.writeFile(path.join(process.cwd(), repoPath), buffer);
  }

  return NextResponse.json({ ok: true, path: publicPath });
}
