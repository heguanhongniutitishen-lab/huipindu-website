"use client";

import { ChangeEvent, useState } from "react";

type SiteContent = {
  companyInfo: { name: string; brand: string; description: string };
  siteImages: Record<string, string>;
  navItems: Array<{ label: string; href: string }>;
  pageCopy: Record<string, any>;
  homeCopy: Record<string, any>;
};

const pageLabels: Record<string, string> = {
  about: "品牌介绍",
  curriculum: "课程体系",
  advantages: "产品优势",
  cooperation: "合作加盟",
  contact: "联系我们"
};

const imageLabels: Record<string, string> = {
  hero: "首页首屏图",
  what: "首页慧拼读是什么",
  curriculum: "首页课程体系图",
  advantages: "首页核心优势图",
  institutions: "首页适合机构图"
};

function updateAtPath(target: any, path: Array<string | number>, value: unknown) {
  const next = structuredClone(target);
  let cursor = next;
  path.slice(0, -1).forEach((key) => {
    cursor = cursor[key];
  });
  cursor[path[path.length - 1]] = value;
  return next;
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function request<T>(url: string, init: RequestInit = {}) {
    const response = await fetch(url, {
      ...init,
      headers: {
        "x-admin-password": password,
        ...(init.headers || {})
      }
    });
    const result = (await response.json().catch(() => ({}))) as T & { message?: string };
    if (!response.ok) {
      throw new Error(result.message || "请求失败。");
    }
    return result;
  }

  async function loadContent() {
    setLoading(true);
    setStatus("");
    try {
      const result = await request<{ ok: boolean; data: SiteContent }>("/api/admin/site");
      setContent(result.data);
      setStatus("内容已加载。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "登录失败。");
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    if (!content) return;
    setLoading(true);
    setStatus("");
    try {
      const result = await request<{ ok: boolean; message: string }>("/api/admin/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      setStatus(result.message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>, path: Array<string | number>) {
    const file = event.target.files?.[0];
    if (!file || !content) return;
    const formData = new FormData();
    formData.set("file", file);
    setLoading(true);
    setStatus("");
    try {
      const result = await request<{ ok: boolean; path: string }>("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      setContent(updateAtPath(content, path, result.path));
      setStatus("图片已上传，请点击保存内容。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "上传失败。");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  function setValue(path: Array<string | number>, value: unknown) {
    if (!content) return;
    setContent(updateAtPath(content, path, value));
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] px-5 py-8 text-ink lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-[#dcecff] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-700">Admin</p>
            <h1 className="mt-2 text-3xl font-black">慧拼读官网管理后台</h1>
            <p className="mt-2 text-sm text-ink/65">保存后会更新 GitHub 内容文件，Vercel 自动重新部署后生效。</p>
          </div>
          <div className="flex gap-3">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="后台密码"
              className="rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm outline-none focus:border-[#095daf]"
            />
            <button onClick={loadContent} disabled={loading} className="rounded-lg bg-[#095daf] px-5 py-3 text-sm font-black text-white disabled:bg-slate-400">
              登录加载
            </button>
          </div>
        </div>

        {status ? <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#095daf] shadow-sm">{status}</p> : null}

        {content ? (
          <div className="mt-8 space-y-8">
            <section className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">基础信息</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field label="公司名称" value={content.companyInfo.name} onChange={(value) => setValue(["companyInfo", "name"], value)} />
                <Field label="品牌名称" value={content.companyInfo.brand} onChange={(value) => setValue(["companyInfo", "brand"], value)} />
                <TextArea label="公司简介" value={content.companyInfo.description} onChange={(value) => setValue(["companyInfo", "description"], value)} />
              </div>
            </section>

            <section className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">导航栏文字</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {content.navItems.map((item, index) => (
                  <div key={item.href} className="rounded-lg bg-[#f7fbff] p-4">
                    <Field label="导航名称" value={item.label} onChange={(value) => setValue(["navItems", index, "label"], value)} />
                    <Field label="链接" value={item.href} onChange={(value) => setValue(["navItems", index, "href"], value)} />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">首页图片</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {Object.entries(content.siteImages).map(([key, value]) => (
                  <ImageField
                    key={key}
                    label={imageLabels[key] || key}
                    value={value}
                    onChange={(next) => setValue(["siteImages", key], next)}
                    onUpload={(event) => uploadImage(event, ["siteImages", key])}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">首页文案</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field label="首屏标题" value={content.homeCopy.hero.title} onChange={(value) => setValue(["homeCopy", "hero", "title"], value)} />
                <TextArea label="首屏副标题" value={content.homeCopy.hero.description} onChange={(value) => setValue(["homeCopy", "hero", "description"], value)} />
                <TextArea label="适合机构说明" value={content.homeCopy.institutions.description} onChange={(value) => setValue(["homeCopy", "institutions", "description"], value)} />
                <TextArea label="底部联系我们说明" value={content.homeCopy.contact.description} onChange={(value) => setValue(["homeCopy", "contact", "description"], value)} />
              </div>
            </section>

            {Object.entries(content.pageCopy).map(([key, page]) => (
              <section key={key} className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black">{pageLabels[key] || key}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field label="页面标题" value={page.title} onChange={(value) => setValue(["pageCopy", key, "title"], value)} />
                  <TextArea label="页面描述" value={page.description} onChange={(value) => setValue(["pageCopy", key, "description"], value)} />
                  <ImageField
                    label="页面配图"
                    value={page.image}
                    onChange={(value) => setValue(["pageCopy", key, "image"], value)}
                    onUpload={(event) => uploadImage(event, ["pageCopy", key, "image"])}
                  />
                </div>
              </section>
            ))}

            <div className="sticky bottom-4 rounded-lg border border-[#dcecff] bg-white p-4 shadow-soft">
              <button onClick={saveContent} disabled={loading} className="w-full rounded-full bg-[#095daf] px-6 py-4 text-base font-black text-white disabled:bg-slate-400">
                {loading ? "处理中..." : "保存全部内容"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-black">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm outline-none focus:border-[#095daf]" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-black">{label}</span>
      <textarea value={value} rows={4} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#095daf]" />
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-lg bg-[#f7fbff] p-4">
      <Field label={label} value={value} onChange={onChange} />
      <div className="mt-3 flex items-center gap-3">
        <img src={value} alt={label} className="h-20 w-28 rounded-lg bg-white object-cover" />
        <label className="cursor-pointer rounded-lg bg-white px-4 py-3 text-sm font-black text-[#095daf] shadow-sm">
          上传替换
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
