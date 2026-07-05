"use client";

import { useEffect, useState } from "react";
import { ArrowRight, FilePlus2, PlaySquare, Settings, Tags } from "lucide-react";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { PageScaffold } from "@/components/admin/page-scaffold";

const quickActions = [
  { label: "新增案例", icon: FilePlus2, href: "/admin/cases" },
  { label: "上传演示视频", icon: PlaySquare, href: "/admin/demo-videos" },
  { label: "编辑套餐", icon: Tags, href: "/admin/pricing" },
  { label: "系统设置", icon: Settings, href: "/admin/settings" }
];

type DashboardMetric = { label: string; value: string; delta: string };
type DashboardData = {
  metrics: DashboardMetric[];
  contentHealth: Record<string, number>;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData>({ metrics: [], contentHealth: {} });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((result: { data: DashboardData }) => setData(result.data))
      .catch(() => setData({ metrics: [], contentHealth: {} }));
  }, []);

  return (
    <PageScaffold title="数据总览" description="读取官网邮件线索、套餐、案例、视频、FAQ 和 CMS 内容的实时配置状态。">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <section key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-bold text-slate-500">{metric.label}</div>
            <div className="mt-3 flex items-end justify-between">
              <strong className="text-3xl font-black text-slate-950">{metric.value}</strong>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                {metric.delta}
              </span>
            </div>
          </section>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <DashboardCharts />
        <div className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-black text-slate-950">快捷入口</h2>
            <div className="mt-4 space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex h-12 items-center justify-between rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {action.label}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-black text-slate-950">前台内容对接状态</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {Object.entries(data.contentHealth).map(([key, value]) => (
                <div key={key} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>{key}</span>
                  <strong className="text-slate-950">{value}</strong>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">官网预约演示和领取资料表单通过邮件接口发送；套餐、案例、FAQ、视频和 CMS 内容由后台 API 统一提供。</p>
          </section>
        </div>
      </div>
    </PageScaffold>
  );
}
