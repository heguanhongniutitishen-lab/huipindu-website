import { NextResponse } from "next/server";
import { formFields } from "@/lib/admin/mock-data";
import { listLocalFormFields, replaceLocalFormFields } from "@/lib/admin/local-db";
import { formConfigSchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalFormFields() });
}

export async function POST(request: Request) {
  const parsed = formConfigSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: parsed.data.fieldKey, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof formFields; items?: typeof formFields };
  const data = await replaceLocalFormFields(body.data ?? body.items ?? formFields);
  return NextResponse.json({ data });
}
