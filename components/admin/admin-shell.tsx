"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BarChart3, Edit3, FileText, HelpCircle, LogOut, MessageSquare, PlaySquare, Settings, Users } from "lucide-react";

const navItems = [
  { href: "/admin", label: "数据总览", icon: BarChart3 },
  { href: "/admin/website", label: "官网编辑", icon: Edit3 },
  { href: "/admin/demo-videos", label: "演示视频", icon: PlaySquare },
  { href: "/admin/cases", label: "合作案例", icon: Users },
  { href: "/admin/faqs", label: "常见问题", icon: HelpCircle },
  { href: "/admin/form-settings", label: "表单字段", icon: MessageSquare },
  { href: "/admin/cms", label: "内容模块", icon: FileText },
  { href: "/admin/settings", label: "系统设置", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => item.href === pathname)?.label ?? "官网后台";

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
          <Image src="/images/logo.png" alt="慧拼读" width={44} height={44} className="h-11 w-11 rounded-full bg-white object-contain" />
          <div className="min-w-0">
            <div className="truncate text-base font-black text-slate-950">官网后台</div>
            <div className="text-xs font-semibold text-slate-500">单词学习系统</div>
          </div>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
                  active ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 lg:px-6">
            <div>
              <h1 className="text-lg font-black text-slate-950">{pageTitle}</h1>
              <p className="hidden text-xs font-medium text-slate-500 sm:block">统一管理官网文字、图片、视频、表单、SEO 和联系方式</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" target="_blank" className="hidden h-10 items-center rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 sm:inline-flex">
                查看前台
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"
                aria-label="退出登录"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${pathname === item.href ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
