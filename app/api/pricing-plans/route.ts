import { NextResponse } from "next/server";
import { pricingPlans } from "@/lib/admin/mock-data";
import { listLocalPricingPlans, replaceLocalPricingPlans } from "@/lib/admin/local-db";
import { pricingPlanSchema } from "@/lib/validations/admin";

export async function GET() {
  return NextResponse.json({ data: await listLocalPricingPlans() });
}

export async function POST(request: Request) {
  const parsed = pricingPlanSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "参数校验失败", errors: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ data: { id: `P-${Date.now()}`, ...parsed.data } }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { data?: typeof pricingPlans; items?: typeof pricingPlans };
  const data = await replaceLocalPricingPlans(body.data ?? body.items ?? pricingPlans);
  return NextResponse.json({ data });
}
