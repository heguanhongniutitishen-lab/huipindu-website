import { NextResponse } from "next/server";
import { faqs } from "@/lib/admin/mock-data";
import { listLocalFaqs, replaceLocalFaqs } from "@/lib/admin/local-db";
import { faqSchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalFaqs() });
}

export async function POST(request: Request) {
  const parsed = faqSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: `F-${Date.now()}`, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof faqs; items?: typeof faqs };
  const data = await replaceLocalFaqs(body.data ?? body.items ?? faqs);
  return NextResponse.json({ data });
}
