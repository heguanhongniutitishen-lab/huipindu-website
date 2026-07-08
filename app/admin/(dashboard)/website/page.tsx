"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Plus, Save, Trash2 } from "lucide-react";
import { defaultSiteConfig, type SiteConfig } from "@/lib/site-config";

type PanelKey = "seo" | "brand" | "hero" | "sections" | "media" | "form" | "contacts";

const panels: Array<{ key: PanelKey; group: string; label: string; desc: string }> = [
  { key: "seo", group: "基础设置", label: "SEO 设置", desc: "标题、描述、关键词和分享文案" },
  { key: "brand", group: "基础设置", label: "品牌与页脚", desc: "Logo、品牌介绍和版权信息" },
  { key: "hero", group: "首页首屏", label: "首屏内容", desc: "首屏文字、按钮、数据和场景标签" },
  { key: "sections", group: "内容模块", label: "产品/功能/案例/FAQ", desc: "批量维护官网主要内容模块" },
  { key: "media", group: "媒体资源", label: "图片与视频", desc: "首屏图、演示视频、封面和配图路径" },
  { key: "form", group: "转化表单", label: "表单字段", desc: "字段名称、是否必填、显示隐藏和增删" },
  { key: "contacts", group: "联系方式", label: "电话微信二维码", desc: "联系方式可增加、删除、排序和隐藏" }
];

export default function WebsiteEditorPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [active, setActive] = useState<PanelKey>("seo");
  const [status, setStatus] = useState("正在读取官网配置...");

  useEffect(() => {
    fetch("/api/site-config", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: SiteConfig }) => {
        setConfig(result.data);
        setStatus("配置已加载，修改后点击右上角保存。");
      })
      .catch(() => setStatus("读取失败，当前显示默认配置。"));
  }, []);

  async function save() {
    setStatus("正在保存...");
    try {
      const response = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        throw new Error("save failed");
      }

      setStatus("已保存，刷新官网前台即可看到最新内容。");
    } catch {
      setStatus("保存失败，请稍后重试。");
    }
  }

  const groups = useMemo(() => {
    return panels.reduce<Record<string, typeof panels>>((acc, item) => {
      acc[item.group] = [...(acc[item.group] ?? []), item];
      return acc;
    }, {});
  }, []);

  return (
    <div className="grid min-h-[calc(100vh-7rem)] gap-5 lg:grid-cols-[290px_1fr]">
      <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="border-b border-slate-100 px-2 pb-3">
          <h2 className="text-lg font-black text-slate-950">官网编辑</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">左侧选择模块，右侧修改对应内容。</p>
        </div>
        <div className="mt-4 space-y-5">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p className="px-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">{group}</p>
              <div className="mt-2 space-y-1">
                {items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition ${active === item.key ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span>
                      <span className="block text-sm font-black">{item.label}</span>
                      <span className={`mt-0.5 block text-xs ${active === item.key ? "text-blue-100" : "text-slate-400"}`}>{item.desc}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-950">{panels.find((item) => item.key === active)?.label}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="h-4 w-4 text-blue-600" />{status}</p>
          </div>
          <button onClick={save} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-black text-white shadow-sm transition hover:bg-blue-700">
            <Save className="h-4 w-4" />
            保存到前台
          </button>
        </div>
        <div className="p-5">
          {active === "seo" ? <SeoPanel config={config} setConfig={setConfig} /> : null}
          {active === "brand" ? <BrandPanel config={config} setConfig={setConfig} /> : null}
          {active === "hero" ? <HeroPanel config={config} setConfig={setConfig} /> : null}
          {active === "sections" ? <SectionsPanel config={config} setConfig={setConfig} /> : null}
          {active === "media" ? <MediaPanel config={config} setConfig={setConfig} /> : null}
          {active === "form" ? <FormPanel config={config} setConfig={setConfig} /> : null}
          {active === "contacts" ? <ContactsPanel config={config} setConfig={setConfig} /> : null}
        </div>
      </section>
    </div>
  );
}

function SeoPanel({ config, setConfig }: EditorProps) {
  return (
    <PanelGrid>
      <TextInput label="SEO 标题" value={config.seo.title} onChange={(title) => setConfig({ ...config, seo: { ...config.seo, title } })} wide />
      <Textarea label="SEO 描述" value={config.seo.description} onChange={(description) => setConfig({ ...config, seo: { ...config.seo, description } })} wide />
      <TextInput label="关键词，用英文逗号分隔" value={config.seo.keywords} onChange={(keywords) => setConfig({ ...config, seo: { ...config.seo, keywords } })} wide />
      <TextInput label="分享标题" value={config.seo.ogTitle} onChange={(ogTitle) => setConfig({ ...config, seo: { ...config.seo, ogTitle } })} />
      <TextInput label="分享描述" value={config.seo.ogDescription} onChange={(ogDescription) => setConfig({ ...config, seo: { ...config.seo, ogDescription } })} />
    </PanelGrid>
  );
}

function BrandPanel({ config, setConfig }: EditorProps) {
  return (
    <PanelGrid>
      <TextInput label="Logo 路径" value={config.brand.logo} onChange={(logo) => setConfig({ ...config, brand: { ...config.brand, logo } })} />
      <TextInput label="品牌名称" value={config.brand.name} onChange={(name) => setConfig({ ...config, brand: { ...config.brand, name } })} />
      <Textarea label="页脚品牌介绍" value={config.brand.footerIntro} onChange={(footerIntro) => setConfig({ ...config, brand: { ...config.brand, footerIntro } })} wide />
      <TextInput label="版权信息" value={config.brand.copyright} onChange={(copyright) => setConfig({ ...config, brand: { ...config.brand, copyright } })} wide />
      <JsonEditor label="导航菜单" value={config.nav} onChange={(nav) => setConfig({ ...config, nav })} />
    </PanelGrid>
  );
}

function HeroPanel({ config, setConfig }: EditorProps) {
  return (
    <PanelGrid>
      <TextInput label="顶部蓝色标签" value={config.hero.badge} onChange={(badge) => setConfig({ ...config, hero: { ...config.hero, badge } })} wide />
      <TextInput label="主标题" value={config.hero.title} onChange={(title) => setConfig({ ...config, hero: { ...config.hero, title } })} />
      <TextInput label="副标题" value={config.hero.titleSuffix} onChange={(titleSuffix) => setConfig({ ...config, hero: { ...config.hero, titleSuffix } })} />
      <TextInput label="价值主张" value={config.hero.slogan} onChange={(slogan) => setConfig({ ...config, hero: { ...config.hero, slogan } })} wide />
      <Textarea label="首屏说明" value={config.hero.description} onChange={(description) => setConfig({ ...config, hero: { ...config.hero, description } })} wide />
      <TextInput label="按钮文字" value={config.hero.primaryButton} onChange={(primaryButton) => setConfig({ ...config, hero: { ...config.hero, primaryButton } })} />
      <TextInput label="按钮跳转模块 ID" value={config.hero.primaryTarget} onChange={(primaryTarget) => setConfig({ ...config, hero: { ...config.hero, primaryTarget } })} />
      <JsonEditor label="首屏数据卡片" value={config.hero.stats} onChange={(stats) => setConfig({ ...config, hero: { ...config.hero, stats } })} />
      <JsonEditor label="合作场景标签" value={config.hero.scenes} onChange={(scenes) => setConfig({ ...config, hero: { ...config.hero, scenes } })} />
    </PanelGrid>
  );
}

function SectionsPanel({ config, setConfig }: EditorProps) {
  return (
    <div className="grid gap-5">
      <SectionBlock title="四端产品体系"><SectionHeaderEditor value={config.productSystem} onChange={(productSystem) => setConfig({ ...config, productSystem })} /><JsonEditor label="产品卡片" value={config.productSystem.items} onChange={(items) => setConfig({ ...config, productSystem: { ...config.productSystem, items } })} /></SectionBlock>
      <SectionBlock title="核心功能"><SectionHeaderEditor value={config.features} onChange={(features) => setConfig({ ...config, features })} /><JsonEditor label="功能卡片" value={config.features.items} onChange={(items) => setConfig({ ...config, features: { ...config.features, items } })} /></SectionBlock>
      <SectionBlock title="教学模式"><SectionHeaderEditor value={config.teachingModes} onChange={(teachingModes) => setConfig({ ...config, teachingModes })} /><JsonEditor label="模式列表" value={config.teachingModes.items} onChange={(items) => setConfig({ ...config, teachingModes: { ...config.teachingModes, items } })} /></SectionBlock>
      <SectionBlock title="总部赋能"><SectionHeaderEditor value={config.support} onChange={(support) => setConfig({ ...config, support })} /><JsonEditor label="支持项目" value={config.support.items} onChange={(items) => setConfig({ ...config, support: { ...config.support, items } })} /></SectionBlock>
      <SectionBlock title="合作流程"><SectionHeaderEditor value={config.process} onChange={(process) => setConfig({ ...config, process })} /><JsonEditor label="流程步骤" value={config.process.items} onChange={(items) => setConfig({ ...config, process: { ...config.process, items } })} /></SectionBlock>
      <SectionBlock title="案例与 FAQ"><SectionHeaderEditor value={config.cases} onChange={(cases) => setConfig({ ...config, cases })} /><JsonEditor label="案例列表" value={config.cases.items} onChange={(items) => setConfig({ ...config, cases: { ...config.cases, items } })} /><SectionHeaderEditor value={config.faq} onChange={(faq) => setConfig({ ...config, faq })} /><JsonEditor label="FAQ 列表" value={config.faq.items} onChange={(items) => setConfig({ ...config, faq: { ...config.faq, items } })} /></SectionBlock>
    </div>
  );
}

function MediaPanel({ config, setConfig }: EditorProps) {
  return (
    <PanelGrid>
      <TextInput label="首屏模型图路径" value={config.hero.image} onChange={(image) => setConfig({ ...config, hero: { ...config.hero, image } })} wide />
      <TextInput label="演示视频地址 MP4 / 外链" value={config.video.url} onChange={(url) => setConfig({ ...config, video: { ...config.video, url } })} wide />
      <TextInput label="视频封面图" value={config.video.cover} onChange={(cover) => setConfig({ ...config, video: { ...config.video, cover } })} wide />
      <SectionHeaderEditor value={config.video} onChange={(video) => setConfig({ ...config, video })} />
      <JsonEditor label="教学模式配图在这里批量改" value={config.teachingModes.items} onChange={(items) => setConfig({ ...config, teachingModes: { ...config.teachingModes, items } })} />
      <JsonEditor label="案例配图在这里批量改" value={config.cases.items} onChange={(items) => setConfig({ ...config, cases: { ...config.cases, items } })} />
    </PanelGrid>
  );
}

function FormPanel({ config, setConfig }: EditorProps) {
  const fields = config.leadForm.fields;
  function update(index: number, patch: Partial<(typeof fields)[number]>) {
    setConfig({ ...config, leadForm: { ...config.leadForm, fields: fields.map((field, i) => i === index ? { ...field, ...patch } : field) } });
  }
  function remove(index: number) {
    setConfig({ ...config, leadForm: { ...config.leadForm, fields: fields.filter((_, i) => i !== index) } });
  }
  function add() {
    setConfig({ ...config, leadForm: { ...config.leadForm, fields: [...fields, { key: `field_${Date.now()}`, label: "新字段", placeholder: "请输入", type: "text", required: false, visible: true }] } });
  }

  return (
    <div className="space-y-5">
      <PanelGrid>
        <TextInput label="表单顶部小字" value={config.leadForm.eyebrow} onChange={(eyebrow) => setConfig({ ...config, leadForm: { ...config.leadForm, eyebrow } })} />
        <TextInput label="表单标题" value={config.leadForm.title} onChange={(title) => setConfig({ ...config, leadForm: { ...config.leadForm, title } })} />
        <Textarea label="表单说明" value={config.leadForm.subtitle} onChange={(subtitle) => setConfig({ ...config, leadForm: { ...config.leadForm, subtitle } })} wide />
        <TextInput label="按钮文字" value={config.leadForm.submitText} onChange={(submitText) => setConfig({ ...config, leadForm: { ...config.leadForm, submitText } })} />
        <TextInput label="成功提示" value={config.leadForm.successText} onChange={(successText) => setConfig({ ...config, leadForm: { ...config.leadForm, successText } })} />
        <TextInput label="右侧图片" value={config.leadForm.image} onChange={(image) => setConfig({ ...config, leadForm: { ...config.leadForm, image } })} wide />
      </PanelGrid>
      <div className="flex items-center justify-between"><h3 className="font-black text-slate-950">字段列表</h3><button onClick={add} className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-black text-white"><Plus className="h-4 w-4" />新增字段</button></div>
      <div className="grid gap-4">
        {fields.map((field, index) => (
          <div key={field.key} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-6">
            <TextInput label="字段 Key" value={field.key} onChange={(key) => update(index, { key })} />
            <TextInput label="字段名称" value={field.label} onChange={(label) => update(index, { label })} />
            <TextInput label="占位提示" value={field.placeholder} onChange={(placeholder) => update(index, { placeholder })} />
            <TextInput label="类型 text/tel/textarea" value={field.type} onChange={(type) => update(index, { type })} />
            <Toggle label="必填" checked={field.required} onChange={(required) => update(index, { required })} />
            <div className="flex items-end gap-2"><Toggle label="显示" checked={field.visible} onChange={(visible) => update(index, { visible })} /><button onClick={() => remove(index)} className="grid h-10 w-10 place-items-center rounded-lg border border-red-200 bg-white text-red-600"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPanel({ config, setConfig }: EditorProps) {
  const contacts = config.contacts;
  function update(index: number, patch: Partial<(typeof contacts)[number]>) {
    setConfig({ ...config, contacts: contacts.map((contact, i) => i === index ? { ...contact, ...patch } : contact) });
  }
  function remove(index: number) {
    setConfig({ ...config, contacts: contacts.filter((_, i) => i !== index) });
  }
  function add() {
    setConfig({ ...config, contacts: [...contacts, { type: "wechat", label: "新联系方式", value: "", image: "", visible: true }] });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h3 className="font-black text-slate-950">联系方式，可增删电话、微信、二维码、邮箱等</h3><button onClick={add} className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-black text-white"><Plus className="h-4 w-4" />新增联系方式</button></div>
      {contacts.map((contact, index) => (
        <div key={`${contact.type}-${index}`} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-6">
          <TextInput label="类型" value={contact.type} onChange={(type) => update(index, { type })} />
          <TextInput label="显示名称" value={contact.label} onChange={(label) => update(index, { label })} />
          <TextInput label="电话/微信/邮箱" value={contact.value} onChange={(value) => update(index, { value })} />
          <TextInput label="二维码/图片路径" value={contact.image ?? ""} onChange={(image) => update(index, { image })} />
          <Toggle label="显示" checked={contact.visible} onChange={(visible) => update(index, { visible })} />
          <div className="flex items-end"><button onClick={() => remove(index)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-black text-red-600"><Trash2 className="h-4 w-4" />删除</button></div>
        </div>
      ))}
    </div>
  );
}

type EditorProps = {
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
};

function SectionHeaderEditor<T extends { eyebrow: string; title: string; subtitle?: string } & Record<string, unknown>>({ value, onChange }: { value: T; onChange: (value: T) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <TextInput label="顶部蓝色小字" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
      <TextInput label="标题" value={value.title} onChange={(title) => onChange({ ...value, title })} />
      <TextInput label="副标题" value={value.subtitle ?? ""} onChange={(subtitle) => onChange({ ...value, subtitle })} />
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-black text-slate-950">{title}</h3>{children}</div>;
}

function PanelGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function TextInput({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return <label className={`text-sm font-bold text-slate-700 ${wide ? "md:col-span-2" : ""}`}>{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-blue-500" /></label>;
}

function Textarea({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return <label className={`text-sm font-bold text-slate-700 ${wide ? "md:col-span-2" : ""}`}>{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm leading-6 text-slate-950 outline-none focus:border-blue-500" /></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex h-full items-end gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-blue-600" />{label}</label>;
}

function JsonEditor<T>({ label, value, onChange }: { label: string; value: T; onChange: (value: T) => void }) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState("");

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  function applyJson() {
    try {
      onChange(JSON.parse(text) as T);
      setError("");
    } catch {
      setError("JSON 格式有误，请检查逗号、引号和括号。");
    }
  }

  return (
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <button onClick={applyJson} className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-black text-blue-600">应用此列表</button>
      </div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-56 w-full rounded-lg border border-slate-200 bg-slate-950 px-3 py-3 font-mono text-xs leading-5 text-slate-100 outline-none focus:border-blue-500" />
      {error ? <p className="mt-2 text-sm font-bold text-red-600">{error}</p> : null}
    </div>
  );
}
