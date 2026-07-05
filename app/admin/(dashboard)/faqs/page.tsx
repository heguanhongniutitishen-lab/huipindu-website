"use client";

import { useEffect, useState } from "react";
import { ManagementTable, StatusBadge, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { faqs } from "@/lib/admin/mock-data";

type FaqRow = (typeof faqs)[number];

const columns: Column<FaqRow>[] = [
  { key: "question", label: "问题", wide: true },
  { key: "answer", label: "答案", wide: true },
  { key: "category", label: "分类" },
  { key: "sortOrder", label: "排序" },
  { key: "visible", label: "是否显示", render: (row) => <StatusBadge tone="green">{row.visible}</StatusBadge> }
];

export default function FaqsPage() {
  const [rows, setRows] = useState<FaqRow[]>(faqs);

  useEffect(() => {
    fetch("/api/faqs")
      .then((response) => response.json())
      .then((result: { data: FaqRow[] }) => setRows(result.data))
      .catch(() => setRows(faqs));
  }, []);

  return (
    <PageScaffold title="FAQ管理" description="维护校长最关心的问题与答案，减少销售重复解释，提高页面停留和表单转化。">
      <ManagementTable rows={rows} columns={columns} searchPlaceholder="搜索问题、答案、分类" filters={["分类", "显示状态"]} addLabel="新增FAQ" persistHref="/api/faqs" />
    </PageScaffold>
  );
}
