"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const colors = ["#165DFF", "#FF8A00", "#19B98A", "#6B5BFF", "#0F172A"];

type DashboardMetric = { label: string; value: string; delta: string };
type DashboardData = {
  metrics: DashboardMetric[];
  contentHealth: Record<string, number>;
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-black text-slate-950">{title}</h2>
      <div className="h-72">{children}</div>
    </section>
  );
}

function readMetric(metrics: DashboardMetric[], label: string) {
  const value = metrics.find((item) => item.label === label)?.value;
  return Number(value || 0);
}

export function DashboardCharts() {
  const [data, setData] = useState<DashboardData>({ metrics: [], contentHealth: {} });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((result: { data: DashboardData }) => setData(result.data))
      .catch(() => setData({ metrics: [], contentHealth: {} }));
  }, []);

  const emailRows = useMemo(
    () => [
      { name: "预约演示", value: readMetric(data.metrics, "预约演示邮件") },
      { name: "领取资料", value: readMetric(data.metrics, "领取资料邮件") }
    ],
    [data.metrics]
  );

  const contentRows = useMemo(
    () => [
      { name: "套餐", value: data.contentHealth.pricingPlans || 0 },
      { name: "案例", value: data.contentHealth.cases || 0 },
      { name: "CMS", value: data.contentHealth.cmsSections || 0 },
      { name: "FAQ", value: data.contentHealth.faqs || 0 },
      { name: "视频", value: data.contentHealth.demoVideos || 0 }
    ],
    [data.contentHealth]
  );

  const totalEmail = emailRows.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ChartCard title="官网表单邮件分类">
        {totalEmail === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg bg-slate-50 text-sm font-bold text-slate-500">
            暂无官网表单邮件，当前真实数据为 0
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={emailRows} dataKey="value" nameKey="name" innerRadius={56} outerRadius={92}>
                {emailRows.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="前台内容配置数量">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={contentRows}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#64748B" fontSize={12} />
            <Tooltip />
            <Bar dataKey="value" name="真实数量" fill="#165DFF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="今日与累计邮件线索">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: "今日", value: readMetric(data.metrics, "今日邮件线索") },
              { name: "累计", value: readMetric(data.metrics, "累计邮件线索") }
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#64748B" fontSize={12} />
            <Tooltip />
            <Bar dataKey="value" name="邮件线索" fill="#19B98A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="官网可编辑模块接入情况">
        <div className="flex h-full flex-col justify-center gap-3">
          {contentRows.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm font-bold text-slate-600">{item.name}</span>
              <strong className="text-2xl font-black text-slate-950">{item.value}</strong>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
