"use client";

import { useEffect, useState } from "react";
import { ManagementTable, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { settings } from "@/lib/admin/mock-data";

type SettingRow = (typeof settings)[number];

const columns: Column<SettingRow>[] = [
  { key: "key", label: "配置项" },
  { key: "value", label: "配置值", wide: true },
  { key: "group", label: "分组" }
];

export default function SettingsPage() {
  const [rows, setRows] = useState<SettingRow[]>(settings);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((response) => response.json())
      .then((result: { data: SettingRow[] }) => setRows(result.data))
      .catch(() => setRows(settings));
  }, []);

  return (
    <PageScaffold title="系统设置" description="维护网站名称、Logo、电话、微信二维码、ICP备案、SEO、统计代码和客服链接。">
      <ManagementTable rows={rows} columns={columns} searchPlaceholder="搜索配置项" filters={["分组"]} addLabel="新增配置" batchActions={false} persistHref="/api/site-settings" />
    </PageScaffold>
  );
}
