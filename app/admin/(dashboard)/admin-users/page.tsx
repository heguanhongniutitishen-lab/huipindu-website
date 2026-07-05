"use client";

import { ManagementTable, StatusBadge, type Column } from "@/components/admin/interactive-management-table";
import { PageScaffold } from "@/components/admin/page-scaffold";
import { adminUsers } from "@/lib/admin/mock-data";

type AdminUserRow = (typeof adminUsers)[number];

const columns: Column<AdminUserRow>[] = [
  { key: "name", label: "姓名" },
  { key: "email", label: "邮箱", wide: true },
  { key: "phone", label: "手机号" },
  { key: "role", label: "角色", render: (row) => <StatusBadge tone={row.role === "超级管理员" ? "orange" : "blue"}>{row.role}</StatusBadge> },
  { key: "disabled", label: "账号状态", render: (row) => <StatusBadge tone="green">{row.disabled}</StatusBadge> }
];

export default function AdminUsersPage() {
  return (
    <PageScaffold
      title="管理员权限"
      description="管理超级管理员、销售管理员、内容管理员和查看者账号，控制线索、内容、导出和只读权限。"
    >
      <ManagementTable rows={adminUsers} columns={columns} searchPlaceholder="搜索姓名、邮箱、手机号" filters={["角色", "账号状态"]} addLabel="新增管理员" />
    </PageScaffold>
  );
}

