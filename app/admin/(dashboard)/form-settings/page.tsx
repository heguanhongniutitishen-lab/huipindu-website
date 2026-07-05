"use client";

import { ManagementTable, StatusBadge, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { formFields } from "@/lib/admin/mock-data";

type FieldRow = (typeof formFields)[number];

const columns: Column<FieldRow>[] = [
  { key: "label", label: "字段名称" },
  { key: "fieldKey", label: "字段 Key" },
  { key: "fieldType", label: "字段类型" },
  { key: "required", label: "是否必填", render: (row) => <StatusBadge tone={row.required === "必填" ? "orange" : "slate"}>{row.required}</StatusBadge> },
  { key: "visible", label: "是否显示", render: (row) => <StatusBadge tone="green">{row.visible}</StatusBadge> },
  { key: "placeholder", label: "占位提示", wide: true },
  { key: "sortOrder", label: "排序" }
];

export default function FormSettingsPage() {
  return (
    <PageScaffold
      title="表单配置"
      description="配置前台留资表单字段、必填规则、下拉选项、提交成功提示和销售通知方式。"
    >
      <ManagementTable rows={formFields} columns={columns} searchPlaceholder="搜索字段" filters={["显示状态", "必填状态"]} addLabel="新增字段" />
    </PageScaffold>
  );
}

