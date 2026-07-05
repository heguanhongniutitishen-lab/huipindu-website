"use client";

import { useEffect, useState } from "react";
import { ManagementTable, StatusBadge, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { cases } from "@/lib/admin/mock-data";

type CaseRow = (typeof cases)[number];

const columns: Column<CaseRow>[] = [
  { key: "organization", label: "机构名称", wide: true },
  { key: "city", label: "城市" },
  { key: "planName", label: "使用套餐" },
  { key: "classMode", label: "上课模式" },
  { key: "enrollmentCount", label: "招生人数" },
  { key: "renewalRate", label: "续费率" },
  { key: "studentGrowth", label: "学员增长" },
  { key: "principalQuote", label: "校长评价", wide: true },
  { key: "featured", label: "首页推荐", render: (row) => <StatusBadge tone="orange">{row.featured}</StatusBadge> }
];

export default function CasesPage() {
  const [rows, setRows] = useState<CaseRow[]>(cases);

  useEffect(() => {
    fetch("/api/cases")
      .then((response) => response.json())
      .then((result: { data: CaseRow[] }) => setRows(result.data))
      .catch(() => setRows(cases));
  }, []);

  return (
    <PageScaffold title="成功案例" description="管理机构案例、真实经营数据、校长评价和首页推荐状态，支撑招商页信任转化。">
      <ManagementTable rows={rows} columns={columns} searchPlaceholder="搜索机构、城市、套餐" filters={["上课模式", "套餐", "首页推荐"]} addLabel="新增案例" persistHref="/api/cases" />
    </PageScaffold>
  );
}
