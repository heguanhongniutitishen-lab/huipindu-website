import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  role?: string;
  city?: string;
  message?: string;
  company?: string;
  website?: string;
};

const roleOptions = new Set(["个人老师咨询", "学校机构合作咨询", "代理和区域合作"]);

function clean(value: unknown, maxLength: number) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createEmailHtml(payload: Required<Pick<ContactPayload, "name" | "phone" | "role" | "city" | "message">>) {
  const rows = [
    ["姓名", payload.name],
    ["联系电话 / 微信", payload.phone],
    ["咨询类型", payload.role],
    ["所在城市", payload.city || "未填写"],
    ["咨询内容", payload.message || "未填写"]
  ];

  return `
    <div style="font-family:Arial,'Microsoft YaHei',sans-serif;color:#102033;line-height:1.7;">
      <h2 style="margin:0 0 16px;color:#095daf;">慧拼读官网新咨询</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width:150px;border:1px solid #dcecff;background:#f7fbff;padding:10px;font-weight:700;">${escapeHtml(label)}</td>
                <td style="border:1px solid #dcecff;padding:10px;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p style="margin-top:16px;color:#667085;font-size:13px;">来源：慧拼读官网联系我们表单</p>
    </div>
  `;
}

async function sendEmail(payload: Required<Pick<ContactPayload, "name" | "phone" | "role" | "city" | "message">>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "慧拼读官网 <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("邮件服务未配置，请设置 RESEND_API_KEY 和 CONTACT_NOTIFY_EMAIL。");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `慧拼读官网咨询：${payload.role} - ${payload.name}`,
      html: createEmailHtml(payload)
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "邮件发送失败。");
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ContactPayload;

  if (body.website) {
    return NextResponse.json({ ok: true, message: "提交成功，我们会尽快联系你。" });
  }

  const payload = {
    name: clean(body.name, 30),
    phone: clean(body.phone, 40),
    role: clean(body.role, 30),
    city: clean(body.city, 40),
    message: clean(body.message, 500)
  };

  if (!payload.name || !payload.phone) {
    return NextResponse.json({ ok: false, message: "请填写姓名和联系电话。" }, { status: 400 });
  }

  if (!roleOptions.has(payload.role)) {
    payload.role = "个人老师咨询";
  }

  try {
    await sendEmail(payload);
    return NextResponse.json({ ok: true, message: "提交成功，我们会尽快联系你。" });
  } catch (error) {
    console.error("contact email error", error);
    return NextResponse.json(
      { ok: false, message: "提交失败，请稍后再试，或直接扫码添加老师微信。" },
      { status: 500 }
    );
  }
}
