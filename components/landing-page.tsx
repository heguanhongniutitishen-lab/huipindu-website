"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Headphones,
  LineChart,
  MonitorSmartphone,
  MousePointerClick,
  Play,
  Rocket,
  School,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LeadIntent = "demo" | "materials";
type LeadForm = { name: string; phone: string; city: string; org: string; students: string; plan: string; message: string };
type DemoVideo = { id: string; title: string; category: string; coverUrl: string; videoUrl: string; description: string; sortOrder: number; visible: string };
type SiteContent = {
  pricingPlans: Array<{ id: string; name: string; price: string; tag: string; targetAudience: string; buttonText: string; sortOrder: number; visible: string; features: string }>;
  cases: Array<{ id: string; organization: string; city: string; planName: string; classMode: string; enrollmentCount: number; renewalRate: string; parentFeedback: string; principalQuote: string; featured: string; sortOrder: number }>;
  cmsSections: Array<{ id: string; moduleKey: string; title: string; subtitle: string; visible: string; sortOrder: number }>;
  faqs: Array<{ id: string; question: string; answer: string; category: string; visible: string; sortOrder: number }>;
  settings: Array<{ id: string; key: string; value: string; group: string }>;
};

type IconCard = { title: string; text: string; icon: LucideIcon };

const navItems = [["首页", "hero"], ["系统价值", "value"], ["上课模式", "modes"], ["产品演示", "demo"], ["套餐方案", "pricing"], ["成功案例", "cases"], ["常见问题", "faq"]];
const valueCards: IconCard[] = [
  { title: "标准化交付", text: "把单词训练、复习、检测、报告串成固定流程，新老师也能快速上手。", icon: ClipboardList },
  { title: "家长看得见", text: "学习结果沉淀为报告和数据，续费沟通不再只靠口头描述。", icon: MonitorSmartphone },
  { title: "校区好复制", text: "小班课和一对一都能落地，适合单校区验证，也适合多校区复制。", icon: Building2 },
  { title: "总部给支持", text: "系统培训、教研指导、招生方案、营销素材和售后支持一起提供。", icon: Rocket }
];
const featureCards: IconCard[] = [
  { title: "单词训练", text: "按教材和词库组织训练任务，降低老师备课压力。", icon: BookOpenCheck },
  { title: "抗遗忘复习", text: "围绕遗忘规律安排复习，提高学员长期记忆效果。", icon: ShieldCheck },
  { title: "词汇量检测", text: "学后检测量化学习结果，方便老师和家长判断进步。", icon: BarChart3 },
  { title: "学习报告", text: "自动汇总训练、检测、进度和效果，形成续费依据。", icon: LineChart },
  { title: "口语与音标", text: "辅助发音、跟读和拼读训练，补齐单词学习基础。", icon: Headphones }
];
const fallbackVideos: DemoVideo[] = [
  { id: "student", title: "学员端演示视频", category: "学员端演示", coverUrl: "/images/student-report-mobile.png", videoUrl: "", description: "查看学员每日训练、复习、检测和学习报告。", sortOrder: 1, visible: "显示" },
  { id: "class", title: "小班课视频", category: "小班课上课演示", coverUrl: "/images/classroom-training-screen.png", videoUrl: "", description: "展示老师大屏授课、小班互动和学后检测流程。", sortOrder: 2, visible: "显示" },
  { id: "one", title: "一对一课视频", category: "一对一上课演示", coverUrl: "/images/one-on-one-realistic.png", videoUrl: "", description: "展示一对一学员的个性化训练与即时反馈。", sortOrder: 3, visible: "显示" }
];
const fallbackPlans = [
  { id: "std", name: "标准版", price: "6800 / 年", tag: "轻量启动", targetAudience: "适合托管校区、单校区英语机构快速开课。", buttonText: "咨询标准版", sortOrder: 1, visible: "显示", features: "机构自由定价、系统功能培训、售后问题处理" },
  { id: "pro", name: "进阶版", price: "8800 / 年", tag: "推荐", targetAudience: "适合已有学员基础，希望提升交付效率和家长感知的机构。", buttonText: "咨询进阶版", sortOrder: 2, visible: "显示", features: "机构自由定价、系统功能培训、教研指导方案、机构招生方案、提供营销素材、系统迭代免费升级、售后问题处理" },
  { id: "max", name: "旗舰版", price: "49800 / 永久使用", tag: "总部陪跑", targetAudience: "适合新店、多校区、区域代理和需要深度落地支持的机构。", buttonText: "咨询旗舰版", sortOrder: 3, visible: "显示", features: "上门教研升级、上门策划招生、机构活动策划、专属客服、选址建议、运营陪跑指导" }
];
const supportGroups = [["开课支持", ["系统功能培训", "上课流程培训", "售后问题处理"]], ["增长支持", ["教研指导方案", "机构招生方案", "营销素材提供", "系统迭代免费升级"]], ["深度陪跑", ["上门教研升级", "上门策划招生", "机构活动策划", "专属客服", "选址建议", "运营陪跑指导"]]];
const fallbackFaqs = [["这个系统适合哪些机构？", "适合英语培训机构、托管校区、素质教育机构、区域代理商，以及想增加英语单词课项目的校区。"], ["机构可以自己定价吗？", "可以。机构可结合当地客单价、班型和服务内容自由设置课程收费。"], ["小班课怎么上？", "老师用电脑投屏大屏集中教学，学员在系统内完成训练、检测和复习，课后生成学习报告。"], ["总部提供哪些支持？", "包含系统培训、教研方案、招生方案、营销素材、升级和售后支持，高阶套餐可提供上门指导和运营陪跑。"]];

function isVisible(value?: string) { return !value || value === "显示" || value.toLowerCase() === "show"; }
function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  useEffect(() => { fetch("/api/site-content").then((r) => r.json()).then((r: { data: SiteContent }) => setContent(r.data)).catch(() => setContent(null)); }, []);
  return content;
}
function cmsSection(content: SiteContent | null, key: string) { return content?.cmsSections?.find((s) => s.moduleKey === key && isVisible(s.visible)); }
function settingValue(content: SiteContent | null, key: string, fallback: string) { return content?.settings?.find((s) => s.key === key)?.value || fallback; }
function scrollToLead(intent: LeadIntent = "materials") { window.dispatchEvent(new CustomEvent<LeadIntent>("hpd-lead-intent", { detail: intent })); document.getElementById("lead")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
async function submitLeadForm(data: LeadForm, intent: LeadIntent) {
  const response = await fetch("/api/email-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent, name: data.name, phone: data.phone, city: data.city, organization: data.org, studentCount: Number(data.students) || undefined, interestedPlan: data.plan, message: data.message, sourcePage: "官网留资模块", sourceChannel: intent === "demo" ? "预约演示表单" : "领取产品资料表单" }) });
  return { ok: response.ok };
}
function Button({ children, variant = "primary", intent = "materials" }: { children: React.ReactNode; variant?: "primary" | "secondary" | "white"; intent?: LeadIntent }) {
  const styles = { primary: "bg-[#165DFF] text-white shadow-[0_18px_40px_rgba(22,93,255,0.24)] hover:bg-[#0f4ee7]", secondary: "border border-[#165DFF] bg-white text-[#165DFF] hover:bg-blue-50", white: "bg-white text-[#165DFF] hover:bg-blue-50" };
  return <button type="button" onClick={() => scrollToLead(intent)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${styles[variant]}`}>{children}<ArrowRight className="h-4 w-4" /></button>;
}
function Section({ id, eyebrow, title, subtitle, children, compact = false }: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode; compact?: boolean }) {
  return <section id={id} className={`section-shell ${compact ? "py-12" : "py-16 md:py-20"}`}><div className="mx-auto mb-9 max-w-3xl text-center">{eyebrow ? <p className="mb-3 text-sm font-black text-[#165DFF]">{eyebrow}</p> : null}<h2 className="text-3xl font-black leading-tight text-[#102A43] md:text-[2.45rem]">{title}</h2>{subtitle ? <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">{subtitle}</p> : null}</div>{children}</section>;
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] ${className}`}>{children}</div>; }

export function LandingPage() {
  return <main className="bg-[#F6FAFF] pb-24 text-[#102A43] md:pb-0"><Header /><Hero /><Value /><Modes /><Features /><Demo /><Pricing /><Roi /><Support /><Cases /><Lead /><Faq /><FinalCta /><FloatingCtas /></main>;
}
function Header() {
  return <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"><div className="section-shell flex h-16 items-center justify-between gap-4"><a href="#hero" className="flex items-center gap-3"><img src="/images/logo.png" alt="慧拼读" className="h-10 w-auto object-contain" /></a><nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-[#165DFF]">{label}</a>)}</nav><div className="hidden items-center gap-2 sm:flex"><Button variant="secondary" intent="demo">预约演示</Button><Button intent="materials">领取方案</Button></div><button onClick={() => scrollToLead("demo")} className="rounded-lg bg-[#165DFF] px-4 py-2 text-sm font-bold text-white sm:hidden">预约演示</button></div></header>;
}
function Hero() {
  const content = useSiteContent(); const hero = cmsSection(content, "home.hero");
  return <section id="hero" className="section-shell grid min-h-[calc(100vh-64px)] items-center gap-10 py-10 lg:grid-cols-[0.94fr_1.06fr]"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-[#165DFF] shadow-sm"><Rocket className="h-4 w-4" />培训机构英语单词课程快速开课系统</div><h1 className="max-w-2xl text-[2.55rem] font-black leading-[1.06] text-[#102A43] sm:text-5xl lg:text-[4.1rem]">{hero?.title || "一套系统，解决机构英语单词教学全流程"}</h1><p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600">{hero?.subtitle || "覆盖机构端、交付中心、教练端、学员端、家长端，帮助校长提升交付效率、家长感知和续费转化。"}</p><div className="mt-6 flex flex-wrap gap-2.5">{["机构自由定价", "小班课 / 一对一", "学习报告同步", "总部培训支持"].map((tag) => <span key={tag} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">{tag}</span>)}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button intent="demo">免费预约演示</Button><Button variant="secondary" intent="materials">领取合作方案</Button></div><div className="mt-8 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-5">{[["5端", "协同"], ["2种", "班型"], ["10+", "功能"], ["3档", "套餐"], ["总部", "支持"]].map(([num, label]) => <div key={label} className="rounded-lg bg-white p-3 text-center shadow-sm"><p className="text-xl font-black text-[#165DFF]">{num}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}</div></motion.div><HeroVisual /></section>;
}
function HeroVisual() {
  const content = useSiteContent(); const desktopImage = settingValue(content, "首页电脑图", "/images/system-dashboard.png"); const mobileImage = settingValue(content, "首页手机图", "/images/student-report-mobile.png");
  return <motion.div className="relative mx-auto w-full max-w-[650px]" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}><div className="absolute inset-6 rounded-full bg-blue-200/40 blur-3xl" /><div className="relative rounded-[18px] bg-[#0f172a] p-3 shadow-[0_28px_80px_rgba(15,23,42,0.22)]"><div className="mb-2 flex items-center gap-2 px-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div><div className="overflow-hidden rounded-xl bg-white"><img src={desktopImage} alt="慧拼读系统电脑界面" className="w-full object-cover" /></div></div><div className="absolute -bottom-6 right-3 w-24 rounded-[22px] bg-[#0f172a] p-2 shadow-2xl sm:w-32"><div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/30" /><div className="overflow-hidden rounded-[16px] bg-white"><img src={mobileImage} alt="慧拼读手机端学习概况" className="w-full object-cover" /></div></div></motion.div>;
}
function Value() {
  const content = useSiteContent(); const section = cmsSection(content, "home.ports");
  return <Section id="value" eyebrow="系统价值" title={section?.title || "五端协同，让校区交付更标准"} subtitle={section?.subtitle || "从机构管理到家长反馈，所有关键角色都有清晰入口。"} compact><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{valueCards.map(({ title, text, icon: Icon }) => <Card key={title}><div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-[#165DFF]"><Icon className="h-6 w-6" /></div><h3 className="text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></Card>)}</div></Section>;
}
function Modes() {
  const content = useSiteContent(); const section = cmsSection(content, "home.modes");
  const modes = [{ title: "小班课一对多", image: "/images/classroom-training-screen.png", icon: School, points: ["老师电脑投屏集中教学", "学员独立完成训练检测", "课后自动生成学习报告", "适合规模化交付"] }, { title: "一对一教学", image: "/images/one-on-one-realistic.png", icon: UsersRound, points: ["一个老师服务一个学生", "学习节奏更个性化", "问题反馈更及时", "适合高客单价服务"] }];
  return <Section id="modes" eyebrow="上课模式" title={section?.title || "双教学模式，满足不同机构与学员需求"} subtitle={section?.subtitle || "小班课适合提高人效，一对一适合强化服务感。"}><div className="grid gap-5 lg:grid-cols-2">{modes.map((mode) => { const Icon = mode.icon; return <Card key={mode.title} className="overflow-hidden p-0"><div className="relative h-64 overflow-hidden"><img src={mode.image} alt={mode.title} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent" /><div className="absolute bottom-5 left-5 flex items-center gap-3 text-white"><div className="grid h-12 w-12 place-items-center rounded-lg bg-white/20 backdrop-blur"><Icon className="h-6 w-6" /></div><h3 className="text-2xl font-black">{mode.title}</h3></div></div><div className="grid gap-3 p-6 sm:grid-cols-2">{mode.points.map((point) => <div key={point} className="flex gap-2 text-sm font-semibold text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#165DFF]" />{point}</div>)}</div></Card>; })}</div></Section>;
}
function Features() {
  const content = useSiteContent(); const section = cmsSection(content, "home.functions");
  return <Section eyebrow="学习功能" title={section?.title || "核心功能覆盖单词学习全流程"} subtitle={section?.subtitle || "学、练、测、复习、报告形成闭环，让学习效果更容易被看见。"}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{featureCards.map(({ title, text, icon: Icon }) => <Card key={title} className="p-5"><Icon className="mb-4 h-7 w-7 text-[#165DFF]" /><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></Card>)}</div></Section>;
}
function Demo() {
  const content = useSiteContent(); const section = cmsSection(content, "home.demo"); const [videos, setVideos] = useState<DemoVideo[]>(fallbackVideos); const [activeId, setActiveId] = useState(fallbackVideos[0].id);
  useEffect(() => { fetch("/api/demo-videos").then((r) => r.json()).then((r: { data: DemoVideo[] }) => { const next = (r.data?.length ? r.data : fallbackVideos).filter((v) => isVisible(v.visible)).sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder)); setVideos(next.length ? next : fallbackVideos); setActiveId((current) => next.some((v) => v.id === current) ? current : next[0]?.id || fallbackVideos[0].id); }).catch(() => setVideos(fallbackVideos)); }, []);
  const active = videos.find((v) => v.id === activeId) || videos[0];
  return <Section id="demo" eyebrow="产品演示" title={section?.title || "产品演示，一眼看懂系统如何交付"} subtitle={section?.subtitle || "后台替换或隐藏视频后，前台产品演示模块同步更新。"}><div className="grid gap-5 lg:grid-cols-[280px_1fr]"><div className="grid gap-2">{videos.map((video) => <button key={video.id} onClick={() => setActiveId(video.id)} className={`rounded-lg px-4 py-3 text-left text-sm font-bold transition ${active.id === video.id ? "bg-[#165DFF] text-white" : "bg-white text-slate-600 hover:bg-blue-50"}`}>{video.title || video.category}</button>)}</div><Card className="p-0"><div className="relative overflow-hidden rounded-lg bg-slate-950"><img src={active.coverUrl || "/images/classroom-training-screen.png"} alt={active.title} className="h-[360px] w-full object-cover opacity-90" /><button type="button" className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-white text-[#165DFF] shadow-xl"><Play className="ml-1 h-7 w-7 fill-current" /></button></div><div className="p-5"><h3 className="text-xl font-black">{active.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{active.description}</p></div></Card></div></Section>;
}
function Pricing() {
  const content = useSiteContent(); const section = cmsSection(content, "home.pricing"); const plans = (content?.pricingPlans?.length ? content.pricingPlans : fallbackPlans).filter((p) => isVisible(p.visible)).sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));
  return <Section id="pricing" eyebrow="套餐方案" title={section?.title || "三档套餐，满足不同阶段机构需求"} subtitle={section?.subtitle || "从轻量启动到总部陪跑，按校区阶段选择合作方式。"}><div className="grid gap-5 lg:grid-cols-3">{plans.map((plan, index) => { const featured = plan.tag?.includes("推荐") || index === 1; const items = String(plan.features || "").split(/[、,，]/).filter(Boolean); return <Card key={plan.id || plan.name} className={featured ? "border-[#165DFF] ring-2 ring-blue-100" : ""}><div className="flex items-center justify-between gap-3"><h3 className="text-2xl font-black">{plan.name}</h3>{plan.tag ? <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#165DFF]">{plan.tag}</span> : null}</div><p className="mt-5 text-3xl font-black text-[#165DFF]">{plan.price}</p><p className="mt-4 min-h-14 text-sm leading-6 text-slate-600">{plan.targetAudience}</p><ul className="mt-6 space-y-3 text-sm">{items.map((item) => <li key={item} className="flex gap-2 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#165DFF]" />{item}</li>)}</ul><div className="mt-7"><Button intent="materials" variant={featured ? "primary" : "secondary"}>{plan.buttonText || "咨询套餐"}</Button></div></Card>; })}</div></Section>;
}
function Roi() {
  const content = useSiteContent(); const section = cmsSection(content, "home.roi"); const [students, setStudents] = useState(30); const [fee, setFee] = useState(999); const [cost, setCost] = useState(6800); const revenue = students * fee; const profit = Math.max(0, revenue - cost);
  return <Section eyebrow="ROI 测算" title={section?.title || "校长最关心的账，帮你算清楚"} subtitle={section?.subtitle || "输入预估招生人数和收费，快速判断项目回报空间。"}><div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]"><Card><div className="grid gap-4 sm:grid-cols-3"><NumberInput label="预计招生人数" value={students} onChange={setStudents} /><NumberInput label="单个学员收费" value={fee} onChange={setFee} /><NumberInput label="系统成本" value={cost} onChange={setCost} /></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button intent="materials">领取测算方案</Button><Button variant="secondary" intent="demo">预约顾问测算</Button></div></Card><Card className="bg-[#102A43] text-white"><div className="grid grid-cols-2 gap-4"><Metric label="预计总收入" value={revenue} /><Metric label="系统成本" value={cost} /><Metric label="预计毛利" value={profit} highlight /><Metric label="单班人效提升" value={Math.max(20, Math.round(students * 1.2))} suffix="%" highlight /></div></Card></div></Section>;
}
function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <label className="text-sm font-bold text-slate-700">{label}<input inputMode="numeric" value={value === 0 ? "" : String(value)} onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")) || 0)} className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#165DFF]" /></label>; }
function Metric({ label, value, suffix = "元", highlight = false }: { label: string; value: number; suffix?: string; highlight?: boolean }) { return <div className="rounded-lg bg-white/10 p-4"><p className="text-xs text-white/65">{label}</p><p className={`mt-2 text-2xl font-black ${highlight ? "text-[#FFB020]" : ""}`}>{value.toLocaleString()}{suffix}</p></div>; }
function Support() {
  const content = useSiteContent(); const section = cmsSection(content, "home.support");
  return <Section title={section?.title || "从系统到招生，从教研到运营，总部陪你落地"} subtitle={section?.subtitle || "不同套餐匹配不同支持深度，帮助机构少走弯路。"}><div className="grid gap-4 lg:grid-cols-3">{supportGroups.map(([title, items], index) => <Card key={title as string} className={index === 2 ? "bg-[#165DFF] text-white" : ""}><h3 className="text-2xl font-black">{title}</h3><ul className="mt-6 space-y-3 text-sm">{(items as string[]).map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${index === 2 ? "text-[#FFB020]" : "text-[#165DFF]"}`} /><span className={index === 2 ? "text-white/90" : "text-slate-600"}>{item}</span></li>)}</ul></Card>)}</div></Section>;
}
function Cases() {
  const content = useSiteContent(); const section = cmsSection(content, "home.cases"); const caseImage = settingValue(content, "案例默认图", "/images/classroom-training-screen.png");
  const cases = content?.cases?.filter((item) => item.featured === "首页推荐" || isVisible(item.featured)).sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));
  const fallbackCases = [{ organization: "星桥英语成长中心", city: "杭州", planName: "进阶版", classMode: "小班课一对多", enrollmentCount: 48, renewalRate: "82%", parentFeedback: "家长能看到每天学习结果，续费沟通更顺。", principalQuote: "课程标准化以后，新老师上手明显更快。" }, { organization: "启航托管校区", city: "郑州", planName: "标准版", classMode: "混合模式", enrollmentCount: 32, renewalRate: "76%", parentFeedback: "晚辅增加了英语单词项目，家长接受度高。", principalQuote: "比单纯卖托管更有项目感。" }, { organization: "朗跃素质教育", city: "成都", planName: "旗舰版", classMode: "小班课 + 一对一", enrollmentCount: 86, renewalRate: "88%", parentFeedback: "学习报告让家长更容易感知效果。", principalQuote: "总部陪跑解决了落地细节。" }];
  const activeCases = cases?.length ? cases : fallbackCases;
  return <Section id="cases" title={section?.title || "成功案例，让结果说话"} subtitle={section?.subtitle || "用真实场景帮助校长理解系统如何落地。"}><div className="grid gap-5 lg:grid-cols-3">{activeCases.map((item) => <Card key={item.organization}><div className="mb-5 h-40 overflow-hidden rounded-lg bg-blue-50"><img src={item.classMode.includes("一对一") ? "/images/one-on-one-realistic.png" : caseImage} alt={`${item.organization}案例`} className="h-full w-full object-cover" /></div><h3 className="text-xl font-black">{item.organization}</h3><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600"><span>城市：{item.city}</span><span>套餐：{item.planName}</span><span>模式：{item.classMode}</span><span>招生：{item.enrollmentCount}人</span><span className="col-span-2">续费率：{item.renewalRate}</span></div><p className="mt-4 text-sm leading-6 text-slate-600">{item.parentFeedback || item.principalQuote}</p></Card>)}</div></Section>;
}
function Lead() {
  const content = useSiteContent(); const [intent, setIntent] = useState<LeadIntent>("materials"); const [form, setForm] = useState<LeadForm>({ name: "", phone: "", city: "", org: "", students: "", plan: "标准版", message: "" }); const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); const [error, setError] = useState(""); const leadSection = cmsSection(content, intent === "demo" ? "home.lead.demo" : "home.lead.materials");
  useEffect(() => { function updateIntent(event: Event) { setIntent((event as CustomEvent<LeadIntent>).detail || "materials"); setStatus("idle"); setError(""); } window.addEventListener("hpd-lead-intent", updateIntent); return () => window.removeEventListener("hpd-lead-intent", updateIntent); }, []);
  async function onSubmit(event: FormEvent) { event.preventDefault(); setError(""); if (!form.name || !form.phone || !form.city || !form.org) { setError("请填写姓名、联系电话、城市和机构名称。"); return; } if (!/^1[3-9]\d{9}$/.test(form.phone)) { setError("请输入正确的中国大陆手机号。"); return; } setStatus("loading"); try { const result = await submitLeadForm(form, intent); setStatus(result.ok ? "success" : "error"); } catch { setStatus("error"); } }
  return <Section id="lead" eyebrow="立即留资" title={leadSection?.title || (intent === "demo" ? "预约产品演示" : "领取产品资料")} subtitle={leadSection?.subtitle || "填写信息后，顾问会把演示安排或合作资料发送给你。"}><div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]"><Card><div className="mb-6 grid gap-3 sm:grid-cols-2"><LeadTab active={intent === "demo"} title="预约演示" text="看系统、课堂和交付流程" onClick={() => setIntent("demo")} /><LeadTab active={intent === "materials"} title="领取资料" text="拿方案、报价和合作资料" onClick={() => setIntent("materials")} /></div><form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2"><FormInput label="姓名" value={form.name} onChange={(v) => setForm({ ...form, name: v })} /><FormInput label="联系电话" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} /><FormInput label="所在城市" value={form.city} onChange={(v) => setForm({ ...form, city: v })} /><FormInput label="机构名称" value={form.org} onChange={(v) => setForm({ ...form, org: v })} /><FormInput label="当前学员人数" value={form.students} onChange={(v) => setForm({ ...form, students: v })} /><label className="text-sm font-bold text-slate-700">感兴趣套餐<select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#165DFF]">{["标准版", "进阶版", "旗舰版"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-bold text-slate-700 sm:col-span-2">留言需求<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-[#165DFF]" placeholder="想了解演示、套餐价格、校区落地或招生方案" /></label>{error ? <p className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600 sm:col-span-2">{error}</p> : null}{status === "success" ? <p className="rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700 sm:col-span-2">提交成功，顾问会尽快联系你。</p> : null}{status === "error" ? <p className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600 sm:col-span-2">提交失败，请稍后再试。</p> : null}<button disabled={status === "loading"} className="rounded-lg bg-[#165DFF] px-5 py-3 font-black text-white shadow-lg disabled:opacity-70 sm:col-span-2">{status === "loading" ? "提交中..." : intent === "demo" ? "提交预约演示" : "立即领取资料"}</button></form></Card><Card className="self-start bg-[#165DFF] text-white"><div className="mb-5 overflow-hidden rounded-lg"><img src="/images/consulting-realistic.png" alt="顾问讲解合作方案" className="h-44 w-full object-cover" /></div><h3 className="text-2xl font-black">{intent === "demo" ? "演示会重点看什么" : "资料会包含什么"}</h3><div className="mt-5 grid gap-3">{(intent === "demo" ? ["系统后台和学员端", "小班课上课流程", "学习报告和家长端", "套餐落地建议"] : ["产品介绍资料", "套餐权益说明", "校区开课流程", "合作方案建议"]).map((item) => <div key={item} className="flex items-center gap-2 rounded-lg bg-white/12 px-3 py-3 text-sm font-bold"><CheckCircle2 className="h-4 w-4 text-[#FFB020]" />{item}</div>)}</div></Card></div></Section>;
}
function LeadTab({ active, title, text, onClick }: { active: boolean; title: string; text: string; onClick: () => void }) { return <button type="button" onClick={onClick} className={`rounded-lg border px-5 py-4 text-left transition ${active ? "border-[#165DFF] bg-[#165DFF] text-white" : "border-slate-200 bg-blue-50 text-slate-700"}`}><span className="block text-base font-black">{title}</span><span className={`mt-1 block text-xs ${active ? "text-white/80" : "text-slate-500"}`}>{text}</span></button>; }
function FormInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="text-sm font-bold text-slate-700">{label}<input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#165DFF]" /></label>; }
function Faq() {
  const content = useSiteContent(); const section = cmsSection(content, "home.faq"); const [open, setOpen] = useState(0); const faqs = content?.faqs?.length ? content.faqs.filter((item) => isVisible(item.visible)).sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder)).map((item) => [item.question, item.answer]) : fallbackFaqs;
  return <Section id="faq" title={section?.title || "FAQ 常见问题"} subtitle={section?.subtitle || "把合作前最常见的问题提前说清楚。"}><div className="mx-auto max-w-4xl space-y-3">{faqs.map(([question, answer], index) => <div key={question} className="rounded-lg bg-white shadow-sm"><button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-black">{question}<ChevronDown className={`h-5 w-5 shrink-0 transition ${open === index ? "rotate-180" : ""}`} /></button>{open === index ? <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{answer}</p> : null}</div>)}</div></Section>;
}
function FinalCta() {
  const content = useSiteContent(); const section = cmsSection(content, "home.finalCta");
  return <section className="bg-[#102A43] py-16 text-white md:py-20"><div className="section-shell grid items-center gap-8 lg:grid-cols-[1fr_0.7fr]"><div><h2 className="text-3xl font-black leading-tight md:text-5xl">{section?.title || "想把英语单词课做成校区新增收项目？"}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{section?.subtitle || "预约演示后，我们会根据你的校区规模、班型和客单价，给出更具体的合作建议。"}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button variant="white" intent="demo">立即预约演示</Button><Button variant="white" intent="materials">领取合作方案</Button></div></div><HeroVisual /></div></section>;
}
function FloatingCtas() {
  return <><div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-xl lg:block"><button onClick={() => scrollToLead("demo")} className="flex w-24 flex-col items-center gap-2 border-b border-slate-100 px-3 py-4 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#165DFF]"><MousePointerClick className="h-5 w-5" />预约演示</button><button onClick={() => scrollToLead("materials")} className="flex w-24 flex-col items-center gap-2 border-b border-slate-100 px-3 py-4 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#165DFF]"><ClipboardList className="h-5 w-5" />领取方案</button><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-24 px-3 py-4 text-xs font-bold text-[#165DFF] hover:bg-blue-50">返回顶部</button></div><div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur lg:hidden"><button onClick={() => scrollToLead("demo")} className="rounded-lg bg-[#165DFF] py-3 text-sm font-black text-white">预约演示</button><button onClick={() => scrollToLead("materials")} className="rounded-lg border border-[#165DFF] py-3 text-sm font-black text-[#165DFF]">领取方案</button></div></>;
}
