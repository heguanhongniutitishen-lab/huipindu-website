import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "未找到上传文件" }, { status: 400 });
    }

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      return NextResponse.json({ message: "请上传图片或视频文件" }, { status: 400 });
    }

    await mkdir(uploadDir, { recursive: true });
    const fallbackExt = isVideo ? ".mp4" : ".png";
    const prefix = isVideo ? "video" : "image";
    const ext = path.extname(file.name) || fallbackExt;
    const safeName = `${prefix}-${Date.now()}${ext.toLowerCase()}`;
    const target = path.join(uploadDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(target, buffer);

    return NextResponse.json({ data: { url: `/uploads/${safeName}` } });
  } catch {
    return NextResponse.json({ message: "上传失败，当前环境可能不支持本地文件写入" }, { status: 500 });
  }
}
