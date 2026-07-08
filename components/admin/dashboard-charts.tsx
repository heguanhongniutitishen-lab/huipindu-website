"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const colors = ["#165DFF", "#19B98A", "#FF8A00"];

type DashboardMetric = { label: string; value: string; delta: string };
type DashboardData = {
  metrics: DashboardMetric[];
  trend: Array<{ day: string; 访客: number; 咨询: number; 视频: number }>;
  sphere: Array<{ name: string; value: number }>;
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
  const [data, setData] = useState<DashboardData>({ metrics: [], trend: [], sphere: [] });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((result: { data: DashboardData }) => setData(result.data))
      .catch(() => setData({ metrics: [], trend: [], sphere: [] }));
  }, []);

  const sphereRows = useMemo(() => data.sphere.filter((item) => item.value > 0), [data.sphere]);
  const totalSphere = sphereRows.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ChartCard title="近 7 日趋势折线图">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#64748B" fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="访客" stroke="#165DFF" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="咨询" stroke="#19B98A" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="视频" stroke="#FF8A00" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="累计数据球形图">
        <div className="relative h-full">
          {totalSphere === 0 ? (
            <div className="flex h-full items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-slate-100 text-sm font-bold text-slate-500">
              暂无统计数据
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="sphereShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#165DFF" floodOpacity="0.18" />
                  </filter>
                </defs>
                <Pie data={sphereRows} dataKey="value" nameKey="name" innerRadius={44} outerRadius={104} paddingAngle={4} filter="url(#sphereShadow)">
                  {sphereRows.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-center shadow-inner">
            <div>
              <p className="text-xs font-bold text-slate-500">累计</p>
              <p className="text-2xl font-black text-slate-950">
                {readMetric(data.metrics, "累计访客") + readMetric(data.metrics, "累计咨询数量") + readMetric(data.metrics, "累计查看视频数量")}
              </p>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
