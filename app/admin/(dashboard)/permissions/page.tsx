import { PageScaffold } from "@/components/admin/page-scaffold";

const roles = [
  { role: "超级管理员", scope: "全部权限，包含账号、设置、内容、线索、导出和删除。" },
  { role: "销售管理员", scope: "线索、预约、跟进、导出和客户备注。" },
  { role: "内容管理员", scope: "官网内容、案例、演示视频、FAQ、套餐展示。" },
  { role: "查看者", scope: "只读数据，可查看 Dashboard 和列表，不可编辑或导出。" }
];

export default function PermissionsPage() {
  return (
    <PageScaffold title="权限说明" description="后台按角色控制可访问模块，后续可扩展到按钮级权限。">
      <div className="grid gap-4 lg:grid-cols-2">
        {roles.map((item) => (
          <section key={item.role} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">{item.role}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.scope}</p>
          </section>
        ))}
      </div>
    </PageScaffold>
  );
}
