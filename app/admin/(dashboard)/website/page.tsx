"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { defaultSiteConfig, type SiteConfig } from "@/lib/site-config";

type TabKey = "overview" | "hero" | "product" | "teaching" | "video" | "support" | "cases" | "form" | "contacts" | "seo";

type SectionData = { eyebrow: string; title: string; subtitle?: string };

const tabs: Array<{ key: TabKey; label: string; desc: string }> = [
  { key: "overview", label: "数据总览", desc: "访客、咨询和视频数据" },
  { key: "hero", label: "首页首屏", desc: "标题、卖点、首图" },
  { key: "product", label: "产品功能", desc: "四端体系和功能卡片" },
  { key: "teaching", label: "教学模式", desc: "班型、配图和卖点" },
  { key: "video", label: "系统演示", desc: "视频、封面和标题" },
  { key: "support", label: "总部赋能", desc: "支持内容和流程" },
  { key: "cases", label: "合作案例", desc: "案例图片和成果" },
  { key: "form", label: "留资表单", desc: "字段增删和文案" },
  { key: "contacts", label: "联系方式", desc: "电话微信二维码" },
  { key: "seo", label: "SEO 设置", desc: "标题、描述、关键词" }
];

const iconOptions = ["Building2", "Presentation", "GraduationCap", "MonitorSmartphone", "BookOpenCheck", "Repeat2", "ClipboardCheck", "BookText", "Brain", "Mic2", "LineChart", "Headphones", "BarChart3"];

export default function WebsiteEditorPage() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [active, setActive] = useState<TabKey>(searchParams.get("tab") === "media" ? "video" : "overview");
  const [status, setStatus] = useState("正在读取官网配置...");

  useEffect(() => {
    fetch("/api/site-config", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data?: SiteConfig }) => {
        setConfig(isValidSiteConfig(result.data) ? result.data : defaultSiteConfig);
        setStatus("配置已加载，修改后点击右上角保存。");
      })
      .catch(() => {
        setConfig(defaultSiteConfig);
        setStatus("读取失败，当前显示默认配置。");
      });
  }, []);

  async function save() {
    setStatus("正在保存...");
    try {
      const response = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });
      if (!response.ok) throw new Error("save failed");
      setStatus("已保存，刷新前台即可看到最新内容。");
    } catch {
      setStatus("保存失败，请稍后再试。");
    }
  }

  const activeInfo = tabs.find((item) => item.key === active) ?? tabs[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:sticky xl:top-24 xl:self-start">
        <div className="px-2 pb-3">
          <p className="text-sm font-black text-blue-600">官网后台</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">内容编辑中心</h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">左侧选择模块，右侧修改官网内容。图片、视频和二维码支持本地上传。</p>
        </div>
        <div className="space-y-1">
          {tabs.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full rounded-xl px-3 py-3 text-left transition ${active === item.key ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
            >
              <div className="text-sm font-black">{item.label}</div>
              <div className={`mt-0.5 text-xs ${active === item.key ? "text-blue-100" : "text-slate-400"}`}>{item.desc}</div>
            </button>
          ))}
        </div>
      </aside>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">{activeInfo.label}</h2>
            <p className="mt-1 text-sm text-slate-500">{status}</p>
          </div>
          <button onClick={save} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white shadow-sm hover:bg-blue-700">
            <Save className="h-4 w-4" />
            保存到前台
          </button>
        </div>
        <div className="p-5">
          {active === "overview" ? <OverviewPanel /> : null}
          {active === "hero" ? <HeroPanel config={config} setConfig={setConfig} /> : null}
          {active === "product" ? <ProductPanel config={config} setConfig={setConfig} /> : null}
          {active === "teaching" ? <TeachingPanel config={config} setConfig={setConfig} /> : null}
          {active === "video" ? <VideoPanel config={config} setConfig={setConfig} /> : null}
          {active === "support" ? <SupportPanel config={config} setConfig={setConfig} /> : null}
          {active === "cases" ? <CasesPanel config={config} setConfig={setConfig} /> : null}
          {active === "form" ? <FormPanel config={config} setConfig={setConfig} /> : null}
          {active === "contacts" ? <ContactsPanel config={config} setConfig={setConfig} /> : null}
          {active === "seo" ? <SeoPanel config={config} setConfig={setConfig} /> : null}
        </div>
      </section>
    </div>
  );
}

function isValidSiteConfig(value: unknown): value is SiteConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<SiteConfig>;
  return Boolean(config.seo && config.brand && config.hero && config.productSystem && config.features && config.teachingModes && config.video && config.support && config.process && config.cases && config.faq && config.leadForm && Array.isArray(config.nav) && Array.isArray(config.contacts));
}

function OverviewPanel() {
  return <div className="grid gap-4 md:grid-cols-3"><InfoCard title="快速编辑" text="从左侧进入首屏、产品、视频、案例、表单等模块。" /><InfoCard title="上传资源" text="图片、视频、二维码上传后会自动写入路径，也可以手动粘贴外链。" /><InfoCard title="前台生效" text="修改完成后点击保存到前台，刷新官网即可看到最新内容。" /></div>;
}

function HeroPanel({ config, setConfig }: EditorProps) {
  return <PanelGrid><TextInput label="顶部标签" value={config.hero.badge} onChange={(badge) => setConfig({ ...config, hero: { ...config.hero, badge } })} wide /><TextInput label="主标题" value={config.hero.title} onChange={(title) => setConfig({ ...config, hero: { ...config.hero, title } })} /><TextInput label="副标题" value={config.hero.titleSuffix} onChange={(titleSuffix) => setConfig({ ...config, hero: { ...config.hero, titleSuffix } })} /><TextInput label="价值主张" value={config.hero.slogan} onChange={(slogan) => setConfig({ ...config, hero: { ...config.hero, slogan } })} wide /><Textarea label="首屏说明" value={config.hero.description} onChange={(description) => setConfig({ ...config, hero: { ...config.hero, description } })} wide /><TextInput label="按钮文字" value={config.hero.primaryButton} onChange={(primaryButton) => setConfig({ ...config, hero: { ...config.hero, primaryButton } })} /><TextInput label="跳转模块 ID" value={config.hero.primaryTarget} onChange={(primaryTarget) => setConfig({ ...config, hero: { ...config.hero, primaryTarget } })} /><ImageField label="首屏模型图" value={config.hero.image} onChange={(image) => setConfig({ ...config, hero: { ...config.hero, image } })} wide /><StringList label="合作场景" value={config.hero.scenes} onChange={(scenes) => setConfig({ ...config, hero: { ...config.hero, scenes } })} /><StatsEditor value={config.hero.stats} onChange={(stats) => setConfig({ ...config, hero: { ...config.hero, stats } })} /></PanelGrid>;
}

function ProductPanel({ config, setConfig }: EditorProps) {
  return <div className="space-y-6"><SectionEditor value={config.productSystem} onChange={(productSystem) => setConfig({ ...config, productSystem })} /><ItemCards title="四端产品体系" items={config.productSystem.items} onChange={(items) => setConfig({ ...config, productSystem: { ...config.productSystem, items } })} /><SectionEditor value={config.features} onChange={(features) => setConfig({ ...config, features })} /><FeatureCards items={config.features.items} onChange={(items) => setConfig({ ...config, features: { ...config.features, items } })} /></div>;
}

function TeachingPanel({ config, setConfig }: EditorProps) {
  return <div className="space-y-6"><SectionEditor value={config.teachingModes} onChange={(teachingModes) => setConfig({ ...config, teachingModes })} /><TeachingCards items={config.teachingModes.items} onChange={(items) => setConfig({ ...config, teachingModes: { ...config.teachingModes, items } })} /></div>;
}

function VideoPanel({ config, setConfig }: EditorProps) {
  return <PanelGrid><SectionEditor value={config.video} onChange={(video) => setConfig({ ...config, video })} /><ImageField label="视频封面图" value={config.video.cover} onChange={(cover) => setConfig({ ...config, video: { ...config.video, cover } })} wide /><UploadField label="上传演示视频" accept="video/mp4,video/*" onUploaded={(url) => setConfig({ ...config, video: { ...config.video, url } })} wide /><TextInput label="视频地址 MP4 / 外链" value={config.video.url} onChange={(url) => setConfig({ ...config, video: { ...config.video, url } })} wide /></PanelGrid>;
}

function SupportPanel({ config, setConfig }: EditorProps) {
  return <div className="space-y-6"><SectionEditor value={config.support} onChange={(support) => setConfig({ ...config, support })} /><StringList label="总部赋能项目" value={config.support.items} onChange={(items) => setConfig({ ...config, support: { ...config.support, items } })} /><SectionEditor value={config.process} onChange={(process) => setConfig({ ...config, process })} /><StringList label="合作流程" value={config.process.items} onChange={(items) => setConfig({ ...config, process: { ...config.process, items } })} /></div>;
}

function CasesPanel({ config, setConfig }: EditorProps) {
  return <div className="space-y-6"><SectionEditor value={config.cases} onChange={(cases) => setConfig({ ...config, cases })} /><CaseCards value={config.cases.items} onChange={(items) => setConfig({ ...config, cases: { ...config.cases, items } })} /><SectionEditor value={config.faq} onChange={(faq) => setConfig({ ...config, faq })} /><FaqCards value={config.faq.items} onChange={(items) => setConfig({ ...config, faq: { ...config.faq, items } })} /></div>;
}

function FormPanel({ config, setConfig }: EditorProps) {
  return <div className="space-y-6"><PanelGrid><TextInput label="表单顶部小字" value={config.leadForm.eyebrow} onChange={(eyebrow) => setConfig({ ...config, leadForm: { ...config.leadForm, eyebrow } })} /><TextInput label="表单标题" value={config.leadForm.title} onChange={(title) => setConfig({ ...config, leadForm: { ...config.leadForm, title } })} /><Textarea label="表单说明" value={config.leadForm.subtitle} onChange={(subtitle) => setConfig({ ...config, leadForm: { ...config.leadForm, subtitle } })} wide /><TextInput label="按钮文字" value={config.leadForm.submitText} onChange={(submitText) => setConfig({ ...config, leadForm: { ...config.leadForm, submitText } })} /><TextInput label="成功提示" value={config.leadForm.successText} onChange={(successText) => setConfig({ ...config, leadForm: { ...config.leadForm, successText } })} /><ImageField label="表单配图" value={config.leadForm.image} onChange={(image) => setConfig({ ...config, leadForm: { ...config.leadForm, image } })} wide /></PanelGrid><LeadFields value={config.leadForm.fields} onChange={(fields) => setConfig({ ...config, leadForm: { ...config.leadForm, fields } })} /></div>;
}

function ContactsPanel({ config, setConfig }: EditorProps) {
  return <ContactCards value={config.contacts} onChange={(contacts) => setConfig({ ...config, contacts })} />;
}

function SeoPanel({ config, setConfig }: EditorProps) {
  return <PanelGrid><TextInput label="SEO 标题" value={config.seo.title} onChange={(title) => setConfig({ ...config, seo: { ...config.seo, title } })} wide /><Textarea label="SEO 描述" value={config.seo.description} onChange={(description) => setConfig({ ...config, seo: { ...config.seo, description } })} wide /><Textarea label="关键词" value={config.seo.keywords} onChange={(keywords) => setConfig({ ...config, seo: { ...config.seo, keywords } })} wide /><TextInput label="分享标题" value={config.seo.ogTitle} onChange={(ogTitle) => setConfig({ ...config, seo: { ...config.seo, ogTitle } })} /><TextInput label="分享描述" value={config.seo.ogDescription} onChange={(ogDescription) => setConfig({ ...config, seo: { ...config.seo, ogDescription } })} /></PanelGrid>;
}

type EditorProps = { config: SiteConfig; setConfig: (config: SiteConfig) => void };

function SectionEditor<T extends SectionData>({ value, onChange }: { value: T; onChange: (value: T) => void }) {
  return <PanelGrid><TextInput label="模块小标题" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} /><TextInput label="模块大标题" value={value.title} onChange={(title) => onChange({ ...value, title })} /><Textarea label="模块说明" value={value.subtitle ?? ""} onChange={(subtitle) => onChange({ ...value, subtitle })} wide /></PanelGrid>;
}

function ItemCards({ title, items, onChange }: { title: string; items: SiteConfig["productSystem"]["items"]; onChange: (items: SiteConfig["productSystem"]["items"]) => void }) {
  return <ArrayBlock title={title} onAdd={() => onChange([...items, { title: "新卡片", text: "说明文字", icon: "Building2", points: ["功能点"] }])}>{items.map((item, index) => <EditableCard key={index} onRemove={() => onChange(items.filter((_, i) => i !== index))}><PanelGrid><TextInput label="标题" value={item.title} onChange={(title) => onChange(items.map((row, i) => i === index ? { ...row, title } : row))} /><SelectInput label="图标" value={item.icon} options={iconOptions} onChange={(icon) => onChange(items.map((row, i) => i === index ? { ...row, icon } : row))} /><Textarea label="说明" value={item.text} onChange={(text) => onChange(items.map((row, i) => i === index ? { ...row, text } : row))} wide /><StringList label="功能点" value={item.points} onChange={(points) => onChange(items.map((row, i) => i === index ? { ...row, points } : row))} /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function FeatureCards({ items, onChange }: { items: SiteConfig["features"]["items"]; onChange: (items: SiteConfig["features"]["items"]) => void }) {
  return <ArrayBlock title="核心功能" onAdd={() => onChange([...items, { title: "新功能", text: "功能说明", icon: "BookOpenCheck" }])}>{items.map((item, index) => <EditableCard key={index} onRemove={() => onChange(items.filter((_, i) => i !== index))}><PanelGrid><TextInput label="功能名称" value={item.title} onChange={(title) => onChange(items.map((row, i) => i === index ? { ...row, title } : row))} /><SelectInput label="图标" value={item.icon} options={iconOptions} onChange={(icon) => onChange(items.map((row, i) => i === index ? { ...row, icon } : row))} /><Textarea label="功能说明" value={item.text} onChange={(text) => onChange(items.map((row, i) => i === index ? { ...row, text } : row))} wide /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function TeachingCards({ items, onChange }: { items: SiteConfig["teachingModes"]["items"]; onChange: (items: SiteConfig["teachingModes"]["items"]) => void }) {
  return <ArrayBlock title="教学模式列表" onAdd={() => onChange([...items, { title: "新教学模式", text: "模式说明", image: "/images/classroom-realistic.png", points: ["优势点"] }])}>{items.map((item, index) => <EditableCard key={index} onRemove={() => onChange(items.filter((_, i) => i !== index))}><PanelGrid><TextInput label="模式标题" value={item.title} onChange={(title) => onChange(items.map((row, i) => i === index ? { ...row, title } : row))} /><ImageField label="模式配图" value={item.image} onChange={(image) => onChange(items.map((row, i) => i === index ? { ...row, image } : row))} /><Textarea label="说明" value={item.text} onChange={(text) => onChange(items.map((row, i) => i === index ? { ...row, text } : row))} wide /><StringList label="优势点" value={item.points} onChange={(points) => onChange(items.map((row, i) => i === index ? { ...row, points } : row))} /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function CaseCards({ value, onChange }: { value: SiteConfig["cases"]["items"]; onChange: (value: SiteConfig["cases"]["items"]) => void }) {
  return <ArrayBlock title="合作案例" onAdd={() => onChange([...value, { name: "新合作机构", time: "合作 1 个月", image: "/images/classroom-training-screen.png", metrics: ["招生增长 30%"], quote: "这里填写客户评价。" }])}>{value.map((item, index) => <EditableCard key={index} onRemove={() => onChange(value.filter((_, i) => i !== index))}><PanelGrid><TextInput label="机构名称" value={item.name} onChange={(name) => onChange(value.map((row, i) => i === index ? { ...row, name } : row))} /><TextInput label="合作时间" value={item.time} onChange={(time) => onChange(value.map((row, i) => i === index ? { ...row, time } : row))} /><ImageField label="案例图片" value={item.image} onChange={(image) => onChange(value.map((row, i) => i === index ? { ...row, image } : row))} wide /><StringList label="成果数据" value={item.metrics} onChange={(metrics) => onChange(value.map((row, i) => i === index ? { ...row, metrics } : row))} /><Textarea label="客户评价" value={item.quote} onChange={(quote) => onChange(value.map((row, i) => i === index ? { ...row, quote } : row))} wide /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function FaqCards({ value, onChange }: { value: SiteConfig["faq"]["items"]; onChange: (value: SiteConfig["faq"]["items"]) => void }) {
  return <ArrayBlock title="FAQ 列表" onAdd={() => onChange([...value, { question: "新问题", answer: "问题回答" }])}>{value.map((item, index) => <EditableCard key={index} onRemove={() => onChange(value.filter((_, i) => i !== index))}><PanelGrid><TextInput label="问题" value={item.question} onChange={(question) => onChange(value.map((row, i) => i === index ? { ...row, question } : row))} wide /><Textarea label="回答" value={item.answer} onChange={(answer) => onChange(value.map((row, i) => i === index ? { ...row, answer } : row))} wide /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function LeadFields({ value, onChange }: { value: SiteConfig["leadForm"]["fields"]; onChange: (value: SiteConfig["leadForm"]["fields"]) => void }) {
  return <ArrayBlock title="表单字段" onAdd={() => onChange([...value, { key: `field_${Date.now()}`, label: "新字段", placeholder: "请输入", type: "text", required: false, visible: true }])}>{value.map((item, index) => <EditableCard key={item.key} onRemove={() => onChange(value.filter((_, i) => i !== index))}><PanelGrid><TextInput label="字段 Key" value={item.key} onChange={(key) => onChange(value.map((row, i) => i === index ? { ...row, key } : row))} /><TextInput label="字段名称" value={item.label} onChange={(label) => onChange(value.map((row, i) => i === index ? { ...row, label } : row))} /><TextInput label="占位提示" value={item.placeholder} onChange={(placeholder) => onChange(value.map((row, i) => i === index ? { ...row, placeholder } : row))} /><SelectInput label="类型" value={item.type} options={["text", "tel", "textarea"]} onChange={(type) => onChange(value.map((row, i) => i === index ? { ...row, type } : row))} /><Toggle label="必填" checked={item.required} onChange={(required) => onChange(value.map((row, i) => i === index ? { ...row, required } : row))} /><Toggle label="显示" checked={item.visible} onChange={(visible) => onChange(value.map((row, i) => i === index ? { ...row, visible } : row))} /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function ContactCards({ value, onChange }: { value: SiteConfig["contacts"]; onChange: (value: SiteConfig["contacts"]) => void }) {
  return <ArrayBlock title="联系方式" onAdd={() => onChange([...value, { type: "wechat", label: "新联系方式", value: "", image: "", visible: true }])}>{value.map((item, index) => <EditableCard key={index} onRemove={() => onChange(value.filter((_, i) => i !== index))}><PanelGrid><SelectInput label="类型" value={item.type} options={["phone", "wechat", "email", "qrcode", "other"]} onChange={(type) => onChange(value.map((row, i) => i === index ? { ...row, type } : row))} /><TextInput label="名称" value={item.label} onChange={(label) => onChange(value.map((row, i) => i === index ? { ...row, label } : row))} /><TextInput label="内容" value={item.value} onChange={(nextValue) => onChange(value.map((row, i) => i === index ? { ...row, value: nextValue } : row))} /><Toggle label="显示" checked={item.visible} onChange={(visible) => onChange(value.map((row, i) => i === index ? { ...row, visible } : row))} /><ImageField label="二维码 / 图片" value={item.image ?? ""} onChange={(image) => onChange(value.map((row, i) => i === index ? { ...row, image } : row))} wide /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function StatsEditor({ value, onChange }: { value: SiteConfig["hero"]["stats"]; onChange: (value: SiteConfig["hero"]["stats"]) => void }) {
  return <ArrayBlock title="首屏数据" onAdd={() => onChange([...value, { value: "100+", label: "新数据" }])}>{value.map((item, index) => <EditableCard key={index} onRemove={() => onChange(value.filter((_, i) => i !== index))}><PanelGrid><TextInput label="数字" value={item.value} onChange={(nextValue) => onChange(value.map((row, i) => i === index ? { ...row, value: nextValue } : row))} /><TextInput label="名称" value={item.label} onChange={(label) => onChange(value.map((row, i) => i === index ? { ...row, label } : row))} /></PanelGrid></EditableCard>)}</ArrayBlock>;
}

function StringList({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return <Textarea label={`${label}（一行一个）`} value={value.join("\n")} onChange={(text) => onChange(text.split("\n").map((item) => item.trim()).filter(Boolean))} wide />;
}

function ImageField({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return <div className={wide ? "md:col-span-2" : ""}><TextInput label={label} value={value} onChange={onChange} /><UploadField label={`上传${label}`} accept="image/*" onUploaded={onChange} preview={value} /></div>;
}

function UploadField({ label, accept, onUploaded, preview, wide = false }: { label: string; accept: string; onUploaded: (url: string) => void; preview?: string; wide?: boolean }) {
  const [status, setStatus] = useState("");
  async function upload(file?: File) {
    if (!file) return;
    setStatus("正在上传...");
    const form = new FormData();
    form.append("file", file);
    try {
      const response = await fetch("/api/local-upload", { method: "POST", body: form });
      const result = (await response.json()) as { data?: { url: string }; message?: string };
      if (!response.ok || !result.data?.url) throw new Error(result.message ?? "upload failed");
      onUploaded(result.data.url);
      setStatus(`上传成功：${result.data.url}`);
    } catch {
      setStatus("上传失败，线上环境建议使用外链或对象存储。");
    }
  }
  return <div className={`mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 ${wide ? "md:col-span-2" : ""}`}>{preview ? <img src={preview} alt="预览" className="mb-3 h-28 w-full rounded-lg object-cover" /> : null}<label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-blue-200 bg-white px-3 py-3 text-sm font-black text-blue-700 hover:bg-blue-50"><UploadCloud className="h-4 w-4" />{label}<input type="file" accept={accept} onChange={(event) => void upload(event.target.files?.[0])} className="hidden" /></label>{status ? <p className="mt-2 text-xs font-bold text-blue-600">{status}</p> : null}</div>;
}

function ArrayBlock({ title, onAdd, children }: { title: string; onAdd: () => void; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-black text-slate-950">{title}</h3><button onClick={onAdd} className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-black text-white"><Plus className="h-4 w-4" />新增</button></div><div className="space-y-4">{children}</div></section>;
}

function EditableCard({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4"><div className="mb-4 flex justify-end"><button onClick={onRemove} className="inline-flex h-8 items-center gap-1 rounded-lg bg-red-50 px-2 text-xs font-black text-red-600"><Trash2 className="h-3.5 w-3.5" />删除</button></div>{children}</div>;
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><CheckCircle2 className="h-6 w-6 text-blue-600" /><h3 className="mt-4 font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>;
}

function PanelGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function TextInput({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return <label className={`block text-sm font-bold text-slate-700 ${wide ? "md:col-span-2" : ""}`}>{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-blue-500" /></label>;
}

function Textarea({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return <label className={`block text-sm font-bold text-slate-700 ${wide ? "md:col-span-2" : ""}`}>{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-6 text-slate-950 outline-none focus:border-blue-500" /></label>;
}

function SelectInput({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block text-sm font-bold text-slate-700">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-blue-500">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex h-11 items-center gap-2 self-end text-sm font-bold text-slate-700"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-blue-600" />{label}</label>;
}
