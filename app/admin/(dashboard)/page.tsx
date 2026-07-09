"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Edit3, ImagePlus, MessageSquare, PlaySquare } from "lucide-react";

type DashboardData = {
  metrics: Array<{ label: string; value: string; delta: string }>;
  trend: Array<{ day: string; 访客: number; 咨询: number; 视频: number }>;
  sphere: Array<{ name: string; value: number }>;
};

const quickLinks = [
  { label: "编辑官网内容", href: "/admin/website", icon: Edit3 },
  { label: "上传图片视频", href: "/admin/website?tab=media", icon: ImagePlus },
  { label: "查看咨询表单", href: "/admin/form-settings", icon: MessageSquare },
  { label: "管理演示视频", href: "/admin/demo-videos", icon: PlaySquare }
];

const colors = ["#2563eb", "#06b6d4", "#f97316"];

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData>({ metrics: [], trend: [], sphere: [] });

  useEffect(() => {
    fetch("/api/dashboard", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: DashboardData }) => setData(result.data))
      .catch(() => setData({ metrics: [], trend: [], sphere: [] }));
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-black text-blue-600">数据总览</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">官网访问与转化数据</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">只展示今日登录访客、今日咨询、今日视频查看和累计数据，方便快速判断官网转化情况。</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-bold text-slate-500">{metric.label}</div>
            <div className="mt-4 flex items-end justify-between">
              <strong className="text-4xl font-black tracking-tight text-slate-950">{metric.value}</strong>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{metric.delta}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-black text-slate-950">近 7 天趋势</h3>
            <span className="text-xs font-bold text-slate-400">访客 / 咨询 / 视频</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trend} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitor" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.26} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0} /></linearGradient>
                  <linearGradient id="consult" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.24} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip />
                <Area type="monotone" dataKey="访客" stroke="#2563eb" fill="url(#visitor)" strokeWidth={3} />
                <Area type="monotone" dataKey="咨询" stroke="#06b6d4" fill="url(#consult)" strokeWidth={3} />
                <Area type="monotone" dataKey="视频" stroke="#f97316" fill="transparent" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black text-slate-950">累计占比</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.sphere} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                    {data.sphere.map((item, index) => <Cell key={item.name} fill={colors[index % colors.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black text-slate-950">快捷功能</h3>
            <div className="mt-4 grid gap-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} href={item.href} className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
