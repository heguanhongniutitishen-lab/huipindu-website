import { NextResponse } from "next/server";
import {
  listEmailOutbox,
  listLocalCases,
  listLocalCmsSections,
  listLocalDemoVideos,
  listLocalFaqs,
  listLocalPricingPlans
} from "@/lib/admin/local-db";

export async function GET() {
  const [outbox, pricingPlans, cases, cmsSections, faqs, demoVideos] = await Promise.all([
    listEmailOutbox(),
    listLocalPricingPlans(),
    listLocalCases(),
    listLocalCmsSections(),
    listLocalFaqs(),
    listLocalDemoVideos()
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const todayEmails = outbox.filter((item) => item.createdAt?.startsWith(today));
  const demoEmails = outbox.filter((item) => {
    const payload = item.payload as { intent?: string };
    return payload.intent === "demo";
  });
  const materialEmails = outbox.filter((item) => {
    const payload = item.payload as { intent?: string };
    return payload.intent === "materials";
  });

  return NextResponse.json({
    data: {
      metrics: [
        { label: "今日邮件线索", value: String(todayEmails.length), delta: "实时" },
        { label: "累计邮件线索", value: String(outbox.length), delta: "本地/SMTP" },
        { label: "预约演示邮件", value: String(demoEmails.length), delta: "官网表单" },
        { label: "领取资料邮件", value: String(materialEmails.length), delta: "官网表单" },
        { label: "已配置套餐", value: String(pricingPlans.length), delta: "前台同步" },
        { label: "演示视频", value: String(demoVideos.length), delta: "前台同步" },
        { label: "成功案例", value: String(cases.length), delta: "前台同步" },
        { label: "FAQ数量", value: String(faqs.length), delta: "前台同步" }
      ],
      contentHealth: {
        pricingPlans: pricingPlans.length,
        cases: cases.length,
        cmsSections: cmsSections.length,
        faqs: faqs.length,
        demoVideos: demoVideos.length
      }
    }
  });
}
