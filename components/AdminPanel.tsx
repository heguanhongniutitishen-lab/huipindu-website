"use client";

import { ChangeEvent, useMemo, useState } from "react";

type SiteContent = {
  companyInfo: { name: string; brand: string; description: string };
  siteImages: Record<string, string | string[]>;
  navItems: Array<{ label: string; href: string }>;
  pageCopy: Record<string, any>;
  homeCopy: Record<string, any>;
};

type AdminSection = "basic" | "nav" | "homeImages" | "homeCopy" | "pages";

const sections: Array<{ key: AdminSection; label: string; desc: string }> = [
  { key: "basic", label: "基础信息", desc: "公司、品牌、简介" },
  { key: "nav", label: "导航栏", desc: "菜单文字和链接" },
  { key: "homeImages", label: "首页图片", desc: "首屏和模块配图" },
  { key: "homeCopy", label: "首页文案", desc: "首页核心内容" },
  { key: "pages", label: "子页面内容", desc: "栏目页标题和配图" }
];

const pageLabels: Record<string, string> = {
  about: "品牌介绍",
  curriculum: "课程体系",
  advantages: "产品优势",
  cooperation: "合作加盟",
  contact: "联系我们"
};

const imageLabels: Record<string, string> = {
  hero: "首页首屏默认图",
  heroGallery: "首页首屏轮播图",
  what: "首页慧拼读是什么",
  curriculum: "首页课程体系图",
  advantages: "首页核心优势图",
  advantagesVideo: "首页视频展示模块",
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
  const [activeSection, setActiveSection] = useState<AdminSection>("basic");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const activeMeta = useMemo(() => sections.find((item) => item.key === activeSection) || sections[0], [activeSection]);

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
      const nextContent = updateAtPath(content, path, result.path);
      if (path[0] === "siteImages" && path[1] === "heroGallery" && path[2] === 0) {
        nextContent.siteImages.hero = result.path;
      }
      setContent(nextContent);
      setStatus("图片已上传，请点击保存全部内容。");
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
    <main className="min-h-screen bg-[#f7fbff] px-5 py-6 text-ink lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-700">Admin</p>
              <h1 className="mt-2 text-3xl font-black">慧拼读官网管理后台</h1>
              <p className="mt-2 text-sm text-ink/65">左侧选择管理类型，右侧修改内容。保存后写入 GitHub，并由 Vercel 自动重新部署。</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
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
        </header>

        {status ? <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#095daf] shadow-sm">{status}</p> : null}

        {content ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
            <aside className="rounded-lg border border-[#dcecff] bg-white p-4 shadow-sm lg:sticky lg:top-6">
              <div className="mb-4 border-b border-[#dcecff] pb-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-700">Controls</p>
                <h2 className="mt-2 text-xl font-black">管理分类</h2>
              </div>
              <nav className="space-y-2">
                {sections.map((item) => {
                  const active = item.key === activeSection;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSection(item.key)}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                        active ? "border-[#095daf] bg-[#eef7ff] text-[#095daf]" : "border-transparent bg-[#f7fbff] text-ink hover:border-[#dcecff]"
                      }`}
                    >
                      <span className="block text-sm font-black">{item.label}</span>
                      <span className="mt-1 block text-xs font-semibold text-ink/55">{item.desc}</span>
                    </button>
                  );
                })}
              </nav>
              <button onClick={saveContent} disabled={loading} className="mt-5 w-full rounded-full bg-[#095daf] px-5 py-3 text-sm font-black text-white disabled:bg-slate-400">
                {loading ? "处理中..." : "保存全部内容"}
              </button>
            </aside>

            <section className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-sm">
              <div className="mb-6 border-b border-[#dcecff] pb-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-700">Editor</p>
                <h2 className="mt-2 text-2xl font-black">{activeMeta.label}</h2>
                <p className="mt-2 text-sm text-ink/60">{activeMeta.desc}</p>
              </div>

              {activeSection === "basic" ? <BasicEditor content={content} setValue={setValue} /> : null}
              {activeSection === "nav" ? <NavEditor content={content} setValue={setValue} /> : null}
              {activeSection === "homeImages" ? <HomeImagesEditor content={content} setValue={setValue} uploadImage={uploadImage} /> : null}
              {activeSection === "homeCopy" ? <HomeCopyEditor content={content} setValue={setValue} /> : null}
              {activeSection === "pages" ? <PagesEditor content={content} setValue={setValue} uploadImage={uploadImage} /> : null}
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}

function BasicEditor({ content, setValue }: { content: SiteContent; setValue: (path: Array<string | number>, value: unknown) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="公司名称" value={content.companyInfo.name} onChange={(value) => setValue(["companyInfo", "name"], value)} />
      <Field label="品牌名称" value={content.companyInfo.brand} onChange={(value) => setValue(["companyInfo", "brand"], value)} />
      <TextArea label="公司简介" value={content.companyInfo.description} onChange={(value) => setValue(["companyInfo", "description"], value)} />
    </div>
  );
}

function NavEditor({ content, setValue }: { content: SiteContent; setValue: (path: Array<string | number>, value: unknown) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {content.navItems.map((item, index) => (
        <div key={item.href} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] p-4">
          <Field label="导航名称" value={item.label} onChange={(value) => setValue(["navItems", index, "label"], value)} />
          <Field label="链接" value={item.href} onChange={(value) => setValue(["navItems", index, "href"], value)} />
        </div>
      ))}
    </div>
  );
}

function HomeImagesEditor({
  content,
  setValue,
  uploadImage
}: {
  content: SiteContent;
  setValue: (path: Array<string | number>, value: unknown) => void;
  uploadImage: (event: ChangeEvent<HTMLInputElement>, path: Array<string | number>) => void;
}) {
  const heroGallery = Array.isArray(content.siteImages.heroGallery)
    ? content.siteImages.heroGallery
    : [String(content.siteImages.hero || "")];
  const gallerySlots = Array.from({ length: 5 }, (_, index) => heroGallery[index] || String(content.siteImages.hero || ""));
  const normalImages = Object.entries(content.siteImages).filter(
    (entry): entry is [string, string] => !["heroGallery", "advantagesVideo"].includes(entry[0]) && typeof entry[1] === "string"
  );
  const advantagesVideo = String(content.siteImages.advantagesVideo || "");

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-[#dcecff] bg-[#f7fbff] p-4">
        <h3 className="text-lg font-black">首页首屏轮播图</h3>
        <p className="mt-1 text-sm text-ink/60">最多 5 张，保存后首页首屏右侧会显示轮播圆点和翻页效果。</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {gallerySlots.map((value, index) => (
            <ImageField
              key={`hero-gallery-${index}`}
              label={`轮播图 ${index + 1}`}
              value={value}
              onChange={(next) => {
                const nextGallery = [...gallerySlots];
                nextGallery[index] = next;
                setValue(["siteImages", "heroGallery"], nextGallery);
                if (index === 0) {
                  setValue(["siteImages", "hero"], next);
                }
              }}
              onUpload={(event) => uploadImage(event, ["siteImages", "heroGallery", index])}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#dcecff] bg-[#f7fbff] p-4">
        <h3 className="text-lg font-black">视频展示模块</h3>
        <p className="mt-1 text-sm text-ink/60">支持 MP4、WEBM，建议压缩到 40MB 以内。</p>
        <div className="mt-4">
          <MediaField
            label="视频文件"
            value={advantagesVideo}
            onChange={(next) => setValue(["siteImages", "advantagesVideo"], next)}
            onUpload={(event) => uploadImage(event, ["siteImages", "advantagesVideo"])}
            type="video"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {normalImages.map(([key, value]) => (
          <ImageField
            key={key}
            label={imageLabels[key] || key}
            value={value}
            onChange={(next) => setValue(["siteImages", key], next)}
            onUpload={(event) => uploadImage(event, ["siteImages", key])}
          />
        ))}
      </div>
    </div>
  );
}

function HomeCopyEditor({ content, setValue }: { content: SiteContent; setValue: (path: Array<string | number>, value: unknown) => void }) {
  return (
    <ContentTreeEditor value={content.homeCopy} path={["homeCopy"]} setValue={setValue} />
  );
}

function PagesEditor({
  content,
  setValue,
  uploadImage
}: {
  content: SiteContent;
  setValue: (path: Array<string | number>, value: unknown) => void;
  uploadImage: (event: ChangeEvent<HTMLInputElement>, path: Array<string | number>) => void;
}) {
  return (
    <ContentTreeEditor value={content.pageCopy} path={["pageCopy"]} setValue={setValue} uploadImage={uploadImage} />
  );
}

function ContentTreeEditor({
  value,
  path,
  setValue,
  uploadImage
}: {
  value: any;
  path: Array<string | number>;
  setValue: (path: Array<string | number>, value: unknown) => void;
  uploadImage?: (event: ChangeEvent<HTMLInputElement>, path: Array<string | number>) => void;
}) {
  if (Array.isArray(value)) {
    const canAddObject = value.some((item) => item && typeof item === "object" && !Array.isArray(item));
    return (
      <div className="space-y-3 rounded-lg border border-[#dcecff] bg-[#f7fbff] p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-black">{labelForPath(path)}</h3>
          <button
            type="button"
            onClick={() => {
              const template = canAddObject ? structuredClone(value.find((item) => item && typeof item === "object" && !Array.isArray(item)) || {}) : "";
              setValue(path, [...value, template]);
            }}
            className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#095daf] shadow-sm"
          >
            新增
          </button>
        </div>
        <div className="space-y-3">
          {value.map((item, index) => {
            const itemPath = [...path, index];
            return (
              <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-ink/70">{labelForPath(path)} {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => setValue(path, value.filter((_, itemIndex) => itemIndex !== index))}
                    className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-black text-red-600"
                  >
                    删除
                  </button>
                </div>
                <ContentTreeEditor value={item} path={itemPath} setValue={setValue} uploadImage={uploadImage} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-4 rounded-lg border border-[#dcecff] bg-[#f7fbff] p-4">
        <h3 className="text-lg font-black">{labelForPath(path)}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(value).map(([key, childValue]) => (
            <ContentTreeEditor key={key} value={childValue} path={[...path, key]} setValue={setValue} uploadImage={uploadImage} />
          ))}
        </div>
      </div>
    );
  }

  const label = labelForPath(path);
  const stringValue = value == null ? "" : String(value);
  const key = String(path[path.length - 1] || "");
  const isMedia = ["image", "qr"].includes(key) || /\.(png|jpe?g|webp|mp4|webm)$/i.test(stringValue) || stringValue.startsWith("/images/") || stringValue.startsWith("/videos/");

  if (isMedia && uploadImage) {
    return (
      <MediaField
        label={label}
        value={stringValue}
        onChange={(next) => setValue(path, next)}
        onUpload={(event) => uploadImage(event, path)}
        type={stringValue.endsWith(".mp4") || stringValue.endsWith(".webm") || stringValue.startsWith("/videos/") ? "video" : "image"}
      />
    );
  }

  if (stringValue.length > 36 || ["description", "summary", "message"].includes(key)) {
    return <TextArea label={label} value={stringValue} onChange={(next) => setValue(path, next)} />;
  }

  return <Field label={label} value={stringValue} onChange={(next) => setValue(path, next)} />;
}

function labelForPath(path: Array<string | number>) {
  const key = String(path[path.length - 1] || "");
  const parent = String(path[path.length - 2] || "");
  const labels: Record<string, string> = {
    homeCopy: "首页全部文案",
    pageCopy: "子页面全部内容",
    hero: "首屏",
    what: "慧拼读是什么",
    curriculum: "课程体系",
    advantages: "核心优势",
    institutions: "适合机构",
    contact: "联系我们",
    video: "视频模块",
    stats: "数据卡片",
    points: "要点",
    items: "条目",
    levels: "课程按钮",
    details: "课程弹窗详情",
    sections: "内容模块",
    highlights: "标签",
    contacts: "联系人",
    title: "标题",
    description: "描述",
    summary: "说明",
    value: "数值",
    label: "标签",
    desc: "说明",
    image: "配图",
    qr: "二维码",
    name: "名称",
    phone: "电话",
    eyebrow: "角标",
    primaryCta: "主按钮",
    secondaryCta: "副按钮",
    cta: "按钮",
    href: "链接"
  };
  if (parent === "pageCopy" && pageLabels[key]) return pageLabels[key];
  if (/^\d+$/.test(key)) return "第 " + (Number(key) + 1) + " 项";
  return labels[key] || key;
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
    <div className="rounded-lg bg-white p-4">
      <Field label={label} value={value} onChange={onChange} />
      <div className="mt-3 flex items-center gap-3">
        <img src={value} alt={label} className="h-20 w-28 rounded-lg bg-[#f7fbff] object-cover" />
        <label className="cursor-pointer rounded-lg bg-[#eef7ff] px-4 py-3 text-sm font-black text-[#095daf] shadow-sm">
          上传替换
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
}

function MediaField({
  label,
  value,
  onChange,
  onUpload,
  type
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  type: "image" | "video";
}) {
  return (
    <div className="rounded-lg bg-white p-4">
      <Field label={label} value={value} onChange={onChange} />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        {value ? (
          type === "video" ? (
            <video src={value} className="h-28 w-44 rounded-lg bg-[#061b3b] object-cover" controls />
          ) : (
            <img src={value} alt={label} className="h-20 w-28 rounded-lg bg-[#f7fbff] object-cover" />
          )
        ) : (
          <div className="grid h-28 w-44 place-items-center rounded-lg border border-dashed border-[#bfd8f3] bg-[#f7fbff] text-xs font-bold text-ink/55">
            暂未上传
          </div>
        )}
        <label className="cursor-pointer rounded-lg bg-[#eef7ff] px-4 py-3 text-sm font-black text-[#095daf] shadow-sm">
          上传替换
          <input
            type="file"
            accept={type === "video" ? "video/mp4,video/webm" : "image/png,image/jpeg,image/webp"}
            onChange={onUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
