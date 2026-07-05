"use client";

import { useEffect, useState } from "react";
import { ManagementTable, StatusBadge, type Column } from "@/components/admin/interactive-management-table";
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

  return (
    <PageScaffold title="套餐管理" description="维护标准版、进阶版、旗舰版套餐，支持调整权益、排序、推荐标识和前台展示状态。">
      <ManagementTable rows={rows} columns={columns} searchPlaceholder="搜索套餐、权益、适合对象" filters={["显示状态", "推荐套餐"]} addLabel="新增套餐" persistHref="/api/pricing-plans" />
    </PageScaffold>
  );
}
