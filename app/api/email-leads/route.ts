import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/email";

export const runtime = "nodejs";

const emailLeadSchema = z.object({
  intent: z.enum(["demo", "materials"]),
  name: z.string().min(1),
  phone: z.string().min(6),
  city: z.string().optional(),
  organization: z.string().optional(),
  studentCount: z.coerce.number().int().nonnegative().optional(),
  interestedPlan: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  sourceChannel: z.string().optional()
});

export async function POST(request: Request) {
  const parsed = emailLeadSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await sendLeadEmail(parsed.data);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "邮件发送失败", error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 }
    );
  }
}
