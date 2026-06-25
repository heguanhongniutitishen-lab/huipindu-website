import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  role?: string;
  message?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as ContactPayload;

  if (!payload.name || !payload.phone) {
    return NextResponse.json(
      { ok: false, message: "请填写姓名和联系电话。" },
      { status: 400 }
    );
  }

  // Placeholder for third-party form, webhook, CRM, or database integration.
  return NextResponse.json({
    ok: true,
    message: "咨询信息已收到，后续可在此处接入第三方表单或 CRM。",
    data: {
      name: payload.name,
      phone: payload.phone,
      role: payload.role ?? "",
      message: payload.message ?? ""
    }
  });
}
