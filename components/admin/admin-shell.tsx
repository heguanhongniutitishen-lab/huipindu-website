"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import { navItems } from "@/lib/admin/mock-data";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => item.href === pathname)?.label ?? "数据总览";

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
          <Image src="/images/logo.png" alt="慧拼读" width={40} height={40} className="h-10 w-10 rounded-full object-contain" />
          <div>
            <div className="text-sm font-black text-slate-950">慧拼读官网后台</div>
            <div className="text-xs text-slate-500">内容与数据管理</div>
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
                className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                  active
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
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
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-6">
          <div>
            <h1 className="text-lg font-black text-slate-950">{pageTitle}</h1>
            <p className="hidden text-xs text-slate-500 sm:block">官网内容、表单邮件和前台配置统一管理</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="hidden h-10 w-72 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 lg:flex">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="搜索官网内容、套餐、案例"
              />
            </label>
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500">
              <Bell className="h-4 w-4" />
            </button>
            <div className="hidden text-right sm:block">
              <div className="text-sm font-bold text-slate-950">超级管理员</div>
              <div className="text-xs text-slate-500">账号已隐藏</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-white"
              aria-label="退出登录"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
