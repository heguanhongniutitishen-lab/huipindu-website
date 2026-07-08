"use client";

import { useEffect, useState } from "react";
import { StatusBadge, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { pricingPlans } from "@/lib/admin/mock-data";

type PlanRow = (typeof pricingPlans)[number];

const columns: Column<PlanRow>[] = [
  { key: "name", label: "套餐名称" },
  { key: "price", label: "价格" },
  { key: "tag", label: "推荐标签", render: (row) => <StatusBadge tone={row.tag === "推荐" ? "orange" : "blue"}>{row.tag}</StatusBadge> },
  { key: "targetAudience", label: "适合对象", wide: true },
  { key: "features", label: "权益列表", wide: true },
  { key: "buttonText", label: "按钮文案" },
  { key: "sortOrder", label: "排序" },
  { key: "visible", label: "是否显示", render: (row) => <StatusBadge tone="green">{row.visible}</StatusBadge> }
];

export default function PricingPage() {
  const [rows, setRows] = useState<PlanRow[]>(pricingPlans);

  useEffect(() => {
    fetch("/api/pricing-plans")
      .then((response) => response.json())
      .then((result: { data: PlanRow[] }) => setRows(result.data))
      .catch(() => setRows(pricingPlans));
  }, []);
  void rows;
  void columns;

  return (
    <PageScaffold title="套餐管理" description="该模块已按当前官网需求移除。">
      <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-black text-slate-950">套餐管理模块已删除</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          当前后台不再维护套餐内容。如需修改官网前台内容，请进入“官网编辑”模块统一管理。
        </p>
      </section>
    </PageScaffold>
  );
}
