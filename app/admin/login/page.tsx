"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { loginSchema } from "@/lib/validations/admin";

type LoginValues = z.infer<typeof loginSchema>;

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      account: "",
      password: "",
      captcha: ""
    }
  });

  async function onSubmit(values: LoginValues) {
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      account: values.account,
      password: values.password,
      captcha: values.captcha
    });

    if (result?.error) {
      setError("账号或密码不正确");
      return;
    }

    router.push(searchParams.get("callbackUrl") ?? "/admin");
  }

  return (
    <main className="grid min-h-screen bg-[#eef5ff] p-4 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
      <section className="hidden rounded-lg bg-brand-500 p-10 text-white shadow-card lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="慧拼读"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-white object-contain p-1"
            />
            <div>
              <div className="text-xl font-black">单词学习系统</div>
            </div>
          </div>
          <h1 className="mt-16 max-w-xl text-4xl font-black leading-tight">官网后台</h1>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg bg-white p-8 shadow-card">
          <div className="mb-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-950">官网后台</h2>
          </div>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">手机号 / 邮箱</span>
            <div className="flex h-12 items-center gap-2 rounded-lg border border-slate-200 px-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input {...register("account")} className="w-full outline-none" placeholder="请输入手机号或邮箱" />
            </div>
            {errors.account ? <span className="mt-1 block text-xs text-red-600">{errors.account.message}</span> : null}
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">密码</span>
            <div className="flex h-12 items-center gap-2 rounded-lg border border-slate-200 px-3">
              <LockKeyhole className="h-4 w-4 text-slate-400" />
              <input {...register("password")} type={showPassword ? "text" : "password"} className="w-full outline-none" placeholder="请输入密码" />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="grid h-8 w-8 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={showPassword ? "隐藏密码" : "查看密码"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password ? <span className="mt-1 block text-xs text-red-600">{errors.password.message}</span> : null}
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">验证码预留</span>
            <input
              {...register("captcha")}
              className="h-12 w-full rounded-lg border border-slate-200 px-3 outline-none"
              placeholder="后续接入短信或图形验证码"
            />
          </label>

          {error ? <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">{error}</div> : null}
          <button disabled={isSubmitting} className="h-12 w-full rounded-lg bg-brand-500 text-sm font-black text-white disabled:opacity-60">
            {isSubmitting ? "登录中..." : "登录后台"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#eef5ff]" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
