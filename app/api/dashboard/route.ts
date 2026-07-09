import { NextResponse } from "next/server";
import { listEmailOutbox, readLocalAnalytics } from "@/lib/admin/local-db";

export async function GET() {
  const [outbox, analytics] = await Promise.all([
    listEmailOutbox(),
    readLocalAnalytics()
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const todayConsults = outbox.filter((item) => item.createdAt?.startsWith(today));
  const todayVisitors = analytics.visitors.filter((item) => item.startsWith(today));
  const todayVideoViews = analytics.videoViews.filter((item) => item.startsWith(today));
  const trend = buildTrend(outbox.map((item) => item.createdAt), analytics.visitors, analytics.videoViews);

  return NextResponse.json({
    data: {
      metrics: [
        { label: "今日登录访客", value: String(todayVisitors.length), delta: "今日" },
        { label: "今日咨询数量", value: String(todayConsults.length), delta: "今日" },
        { label: "今日查看视频数量", value: String(todayVideoViews.length), delta: "今日" },
        { label: "累计访客", value: String(analytics.visitors.length), delta: "累计" },
        { label: "累计咨询数量", value: String(outbox.length), delta: "累计" },
        { label: "累计查看视频数量", value: String(analytics.videoViews.length), delta: "累计" }
      ],
      trend,
      sphere: [
        { name: "访客", value: analytics.visitors.length },
        { name: "咨询", value: outbox.length },
        { name: "视频", value: analytics.videoViews.length }
      ]
    }
  });
}

function buildTrend(consults: string[], visitors: string[], videoViews: string[]) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });

  return days.map((day) => ({
    day: day.slice(5),
    访客: visitors.filter((item) => item.startsWith(day)).length,
    咨询: consults.filter((item) => item?.startsWith(day)).length,
    视频: videoViews.filter((item) => item.startsWith(day)).length
  }));
}
