"use client";

import { useEffect, useState } from "react";
import { ManagementTable, StatusBadge, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { cmsSections } from "@/lib/admin/mock-data";

type CmsRow = (typeof cmsSections)[number];

const columns: Column<CmsRow>[] = [
  { key: "moduleKey", label: "模块 Key" },
  { key: "title", label: "标题", wide: true },
  { key: "subtitle", label: "副标题", wide: true },
  { key: "visible", label: "是否显示", render: (row) => <StatusBadge tone="green">{row.visible}</StatusBadge> },
  { key: "sortOrder", label: "排序" }
];

export default function CmsPage() {
  const [rows, setRows] = useState<CmsRow[]>(cmsSections);

  useEffect(() => {
    fetch("/api/cms-sections")
      .then((response) => response.json())
      .then((result: { data: CmsRow[] }) => setRows(result.data))
      .catch(() => setRows(cmsSections));
  }, []);

  return (
    <PageScaffold title="官网内容" description="编辑首页 Hero、数据区、五大端口、核心功能和总部支持模块，保存后前台读取同一内容源。">
      <ManagementTable rows={rows} columns={columns} searchPlaceholder="搜索模块、标题、副标题" filters={["模块类型", "显示状态"]} addLabel="新增模块" persistHref="/api/cms-sections" />
    </PageScaffold>
  );
}
