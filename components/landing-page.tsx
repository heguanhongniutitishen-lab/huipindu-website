"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Headphones,
  LineChart,
  MonitorSmartphone,
  MousePointerClick,
  Play,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconCard = [title: string, text: string, Icon: LucideIcon];

const navItems = [
  ["首页", "hero"],
  ["系统功能", "features"],
  ["上课模式", "modes"],
  ["产品演示", "demo"],
  ["套餐方案", "pricing"],
  ["成功案例", "cases"],
  ["常见问题", "faq"],
  ["关于我们", "support"]
];

const ports: IconCard[] = [
  ["机构端", "校区管理、课程管理、数据查看、经营分析", Building2],
  ["交付中心", "教学流程管理、教务安排、课程交付", ClipboardList],
  ["教练端", "备课授课、学员跟踪、学习检测、报告生成", GraduationCap],
  ["学员端", "单词训练、每日打卡、抗遗忘复习、学习任务完成", BookOpenCheck],
  ["家长端", "查看学习报告、检测结果、打卡情况、成长轨迹", UsersRound]
];

const functions: IconCard[] = [
  ["单词训练", "科学记忆，高效掌握核心词汇", BookOpenCheck],
  ["抗遗忘复习", "根据遗忘规律安排复习，帮助学员记得更牢", ShieldCheck],
  ["每日打卡", "培养学习习惯，提升学习持续性", CheckCircle2],
  ["短语训练", "从单词延伸到短语，提升表达能力", Sparkles],
  ["语法学习", "补齐语言结构能力，辅助阅读和表达", ClipboardList],
  ["口语练习", "强化发音、跟读、表达训练", Headphones],
  ["阅读练习", "从词汇走向阅读，提高综合理解能力", BookOpenCheck],
  ["音标学习", "夯实发音基础，辅助拼读和记忆", GraduationCap],
  ["词汇量检测", "检测学习结果，量化学习进步", BarChart3],
  ["学习报告", "检测后自动生成个性化报告，同步家长端", LineChart]
];

const demoTabs = [
  "学员端演示",
  "小班课视频",
  "一对一课视频"
];

type DemoVideo = {
  id: string;
  title: string;
  category: string;
  coverUrl: string;
  videoUrl: string;
  description: string;
  sortOrder: number;
  visible: string;
};

const defaultDemoVideos: DemoVideo[] = [
  {
    id: "V-001",
    title: "学员端演示视频",
    category: "学员端演示",
    coverUrl: "/images/student-report-mobile.png",
    videoUrl: "",
    description: "展示学生每日训练、复习、学习报告。",
    sortOrder: 1,
    visible: "显示"
  },
  {
    id: "V-002",
    title: "小班课视频",
    category: "小班课视频",
    coverUrl: "/images/classroom-realistic.png",
    videoUrl: "",
    description: "展示机构标准化小班课交付。",
    sortOrder: 2,
    visible: "显示"
  },
  {
    id: "V-003",
    title: "一对一课视频",
    category: "一对一课视频",
    coverUrl: "/images/one-on-one-realistic.png",
    videoUrl: "",
    description: "展示个性化单词训练流程。",
    sortOrder: 3,
    visible: "显示"
  }
];

const plans = [
  {
    name: "标准版",
    price: 6800,
    unit: "/ 年",
    tag: "",
    fit: "已有招生能力，需要系统工具快速开课的机构",
    items: ["机构自由定价", "系统功能培训", "上课流程培训", "售后问题处理"],
    button: "咨询标准版"
  },
  {
    name: "进阶版",
    price: 8800,
    unit: "/ 年",
    tag: "推荐",
    fit: "希望获得教研、招生、营销素材支持的成长型机构",
    items: [
      "机构自由定价",
      "系统功能培训",
      "上课流程培训",
      "教研指导方案",
      "机构招生方案",
      "提供营销素材",
      "系统迭代免费升级",
      "售后问题处理"
    ],
    button: "咨询进阶版"
  },
  {
    name: "旗舰版",
    price: 49800,
    unit: "/ 永久使用",
    tag: "总部深度陪跑",
    fit: "新开校区、多校区、区域代理、希望总部深度陪跑的机构",
    items: [
      "机构自由定价",
      "系统功能培训",
      "上课流程培训",
      "上门教研升级",
      "上门策划招生",
      "提供营销素材",
      "系统迭代免费升级",
      "机构活动策划",
      "售后专属客服",
      "新店 / 增加门店选址",
      "运营陪跑指导"
    ],
    button: "咨询旗舰版",
    accent: true
  }
];

const faqs = [
  ["这个系统适合哪些机构？", "适合英语培训机构、托管校区、素质教育中心、社区教育空间和区域代理伙伴。"],
  ["机构可以自己定价吗？", "可以。机构可根据当地市场、班型和服务内容自由制定课程价格。"],
  [
    "小班课怎么上？",
    "老师用电脑投大屏集中教学，一节课1.5小时，1小时带学员学习单词，0.5小时做学后检测，系统自动生成学习报告并同步到家长端小程序。"
  ],
  ["一对一适合什么学员？", "适合需要更高专注度、更个性化节奏和更强学习效果的学员。"],
  [
    "总部提供哪些支持？",
    "根据不同套餐，总部提供系统培训、上课流程培训、教研方案、招生方案、营销素材、系统升级、售后处理、上门指导、活动策划、专属客服、选址建议和运营陪跑等支持。"
  ],
  ["49800套餐为什么是永久使用？", "旗舰版为永久使用权益，并包含总部老师团队上门指导、招生策划、运营陪跑等高价值落地支持。"],
  ["系统可以放产品演示视频吗？", "可以。产品演示模块已预留视频区域，支持系统总览、机构端、交付中心、教练端、学员端、家长端等视频展示。"]
];

type LeadForm = {
  name: string;
  phone: string;
  city: string;
  org: string;
  students: string;
  plan: string;
  message: string;
};

type LeadIntent = "demo" | "materials";

type SiteContent = {
  pricingPlans: Array<{
    id: string;
    name: string;
    price: string;
    tag: string;
    targetAudience: string;
    buttonText: string;
    sortOrder: number;
    visible: string;
    features: string;
  }>;
  cases: Array<{
    id: string;
    organization: string;
    city: string;
    planName: string;
    classMode: string;
    enrollmentCount: number;
    renewalRate: string;
    parentFeedback: string;
    principalQuote: string;
    featured: string;
    sortOrder: number;
  }>;
  cmsSections: Array<{
    id: string;
    moduleKey: string;
    title: string;
    subtitle: string;
    visible: string;
    sortOrder: number;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
    visible: string;
    sortOrder: number;
  }>;
  settings: Array<{ id: string; key: string; value: string; group: string }>;
};

function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content")
      .then((response) => response.json())
      .then((result: { data: SiteContent }) => setContent(result.data))
      .catch(() => setContent(null));
  }, []);

  return content;
}

function settingValue(content: SiteContent | null, key: string, fallback: string) {
  return content?.settings?.find((item) => item.key === key)?.value || fallback;
}

function cmsSection(content: SiteContent | null, moduleKey: string) {
  return content?.cmsSections.find((section) => section.moduleKey === moduleKey && section.visible === "显示");
}

function scrollToLead(intent: LeadIntent = "materials") {
  window.dispatchEvent(new CustomEvent<LeadIntent>("hpd-lead-intent", { detail: intent }));
  document.getElementById("lead")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function submitLeadForm(data: LeadForm, intent: LeadIntent) {
  const payload = {
    intent,
    name: data.name,
    phone: data.phone,
    city: data.city,
    organization: data.org,
    studentCount: Number(data.students) || undefined,
    interestedPlan: data.plan,
    message: data.message,
    sourcePage: "官网留资模块",
    sourceChannel: intent === "demo" ? "预约演示表单" : "领取产品资料表单"
  };

  const response = await fetch("/api/email-leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return { ok: response.ok };
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = ""
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`section-shell py-16 md:py-24 ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title && (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-black text-brand-500">{eyebrow}</p>}
          <h2 className="text-3xl font-black leading-tight tracking-normal text-ink md:text-[2.6rem]">{title}</h2>
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.section>
  );
}

function Button({
  children,
  variant = "primary",
  intent = "materials"
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  intent?: LeadIntent;
}) {
  const styles = {
    primary: "bg-brand-500 text-white shadow-soft hover:bg-brand-600",
    secondary: "border border-brand-500 bg-white text-brand-600 hover:bg-brand-50",
    dark: "bg-white text-brand-700 hover:bg-brand-50"
  };
  return (
    <motion.button
      type="button"
      onClick={() => scrollToLead(intent)}
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <ArrowRight size={16} />
    </motion.button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-card border border-white/80 bg-white/85 p-6 shadow-card transition hover:border-brand-500 hover:shadow-soft ${className}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 18 });
  const display = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);
  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);
  return <motion.span>{display}</motion.span>;
}

function DeviceMockup() {
  const content = useSiteContent();
  const desktopImage = settingValue(content, "首页电脑图", "/images/system-dashboard.png");
  const mobileImage = settingValue(content, "首页手机图", "/images/student-report-mobile.png");

  return (
    <motion.div
      className="relative mx-auto h-[250px] w-full max-w-[620px] sm:h-[360px] md:h-[430px]"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-label="慧拼读系统界面电脑模型图"
    >
      <div className="absolute inset-0 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="glass absolute left-2 top-4 w-[90%] rounded-2xl p-2.5 sm:top-8 sm:w-[92%] sm:p-3 md:left-8">
        <div className="rounded-xl border border-white/70 bg-ink p-2 shadow-soft">
          <div className="mb-2 flex items-center gap-2 px-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 h-2 w-32 rounded-full bg-white/20" />
          </div>
          <div className="overflow-hidden rounded-lg bg-brand-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={desktopImage}
              alt="慧拼读训练系统界面"
              className="block h-auto w-full"
            />
          </div>
        </div>
        <div className="mx-auto h-4 w-2/5 rounded-b-xl bg-ink/80" />
        <div className="mx-auto h-2 w-3/5 rounded-full bg-brand-500/20 blur-sm" />
      </div>
      <div className="glass absolute right-0 top-5 hidden rounded-xl px-4 py-3 shadow-soft sm:block">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-500">
            <MonitorSmartphone size={18} />
          </div>
          <div>
            <p className="text-sm font-bold">真实系统界面</p>
            <p className="text-xs text-muted">训练系统大屏展示</p>
          </div>
        </div>
      </div>
      <div className="glass absolute bottom-2 right-1 w-20 rounded-[20px] p-1.5 shadow-soft sm:bottom-8 sm:right-3 sm:w-32 sm:p-2">
        <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-ink/20" />
        <div className="overflow-hidden rounded-[18px] bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mobileImage}
            alt="慧拼读家长端学习概况"
            className="block h-auto w-full"
          />
        </div>
      </div>
      <div className="glass absolute bottom-0 left-0 hidden h-36 w-48 rounded-2xl p-4 sm:block">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
            <Sparkles />
          </div>
          <div>
            <p className="text-sm font-bold">学习报告</p>
            <p className="text-xs text-muted">同步家长端</p>
          </div>
        </div>
        <div className="mt-4 h-2 rounded bg-brand-500/25" />
        <div className="mt-2 h-2 w-2/3 rounded bg-accent/40" />
      </div>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <main className="pb-24 md:pb-0">
      <Header />
      <Hero />
      <Ports />
      <Modes />
      <Features />
      <Demo />
      <Growth />
      <Pricing />
      <RoiCalculator />
      <Support />
      <Cases />
      <Lead />
      <Faq />
      <FinalCta />
      <FloatingCtas />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-2 font-bold text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="慧拼读" className="h-10 w-auto object-contain" />
        </a>
        <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="transition hover:text-brand-500">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="secondary" intent="demo">预约演示</Button>
          <Button>咨询合作</Button>
        </div>
        <button onClick={() => scrollToLead("materials")} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white sm:hidden">
          咨询
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const content = useSiteContent();
  const hero = cmsSection(content, "home.hero");
  const stats = [
    ["五端", "协同"],
    ["两种", "上课模式"],
    ["10大", "学习功能"],
    ["3档", "合作套餐"],
    ["总部", "运营支持"]
  ];
  return (
    <section id="hero" className="section-shell grid min-h-[calc(100vh-64px)] items-start gap-8 py-8 md:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white px-4 py-2 text-xs font-semibold text-brand-600 shadow-card sm:text-sm">
          <Rocket size={16} />
          培训机构英语单词课程快速开课系统
        </div>
        <h1 className="max-w-2xl text-[2.55rem] font-black leading-[1.06] tracking-normal text-ink sm:text-5xl lg:text-[4.25rem]">
          {hero?.title || "校长开英语单词课"}
          <span className="block text-brand-500">{hero ? "后台内容实时同步" : "一套系统就够"}</span>
        </h1>
        <p className="mt-5 max-w-xl text-base font-medium leading-7 text-muted md:text-lg md:leading-8">
          {hero?.subtitle || "覆盖教、学、练、测、报告和家长反馈，支持小班课与一对一。让校区更快开课、更好交付，更容易促成咨询和续费。"}
        </p>
        <div className="mt-6 flex max-w-xl flex-wrap gap-2.5">
          {["机构自由定价", "小班课/一对一", "学习报告同步", "总部培训支持"].map((tag) => (
            <span key={tag} className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-ink shadow-card">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button intent="demo">免费预约演示</Button>
          <Button variant="secondary" intent="materials">获取合作方案</Button>
        </div>
        <div className="mt-8 hidden grid-cols-2 gap-2.5 sm:grid sm:grid-cols-5">
          {stats.map(([num, label]) => (
            <div key={label} className="rounded-card bg-white/85 px-3 py-3 text-center shadow-card">
              <p className="text-xl font-black text-brand-500">{num}</p>
              <p className="mt-0.5 text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <DeviceMockup />
    </section>
  );
}

function Ports() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.ports");

  return (
    <Section id="features" eyebrow="系统架构" title={section?.title || "五大端口协同，构建完整教学闭环"} subtitle={section?.subtitle}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {ports.map(([title, text, Icon]) => (
          <Card key={title as string}>
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-brand-500">
              <Icon />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Modes() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.modes");
  const modeCards = [
    {
      title: "小班课一对多",
      icon: School,
      image: "/images/classroom-training-screen.png",
      items: ["老师电脑投屏大屏集中教学", "一节课1.5小时", "1小时学习单词，0.5小时学后检测", "每位学员生成独立学习报告", "报告同步到家长端小程序"],
      tags: ["课堂氛围好", "性价比高", "家长感知强", "续费率更高", "适合规模化交付"]
    },
    {
      title: "一对一教学",
      icon: UsersRound,
      image: "/images/one-on-one-realistic.png",
      items: ["一个老师带一个学生学习", "专注度更高", "学习节奏更个性化", "问题反馈更及时", "效果更明显"],
      tags: ["高客单价", "高服务感", "适合个性化辅导", "适合高端学员"]
    }
  ];
  return (
    <Section id="modes" eyebrow="上课模式" title={section?.title || "双教学模式，满足不同机构与学员需求"} subtitle={section?.subtitle}>
      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        {modeCards.map((card) => (
          <Card key={card.title} className="overflow-hidden p-0">
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/72 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/18 backdrop-blur">
                  <card.icon size={24} />
                </div>
                <h3 className="text-2xl font-black">{card.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-5 text-sm font-semibold leading-6 text-muted">
                {card.title === "小班课一对多"
                  ? "适合希望提升班级人效、复制标准课程流程的校区。"
                  : "适合高客单价服务、个性化辅导和高端学员转化。"}
              </p>
              <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-500" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Features() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.functions");
  return (
    <Section eyebrow="学习功能" title={section?.title || "丰富学习功能，全方位提升词汇能力"} subtitle={section?.subtitle}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {functions.map(([title, text, Icon]) => (
          <Card key={title as string} className="p-4">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
                <Icon size={21} />
              </div>
              <h3 className="font-black leading-tight">{title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Demo() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.demo");
  const [active, setActive] = useState(demoTabs[0]);
  const [videos, setVideos] = useState<DemoVideo[]>(defaultDemoVideos);
  useEffect(() => {
    function readVideos() {
      void fetch("/api/demo-videos")
        .then((response) => response.json())
        .then((result: { data: DemoVideo[] }) => {
          const nextVideos = result.data || defaultDemoVideos;
          setVideos(
            nextVideos
              .filter((video) => video.visible !== "隐藏")
              .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder))
          );
        })
        .catch(() => {
          setVideos(defaultDemoVideos);
        });
    }

    function readLocalFallback() {
      try {
        const nextVideos = defaultDemoVideos;
        setVideos(
          nextVideos
            .filter((video) => video.visible !== "隐藏")
            .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder))
        );
      } catch {
        setVideos(defaultDemoVideos);
      }
    }

    readVideos();
    window.addEventListener("storage", readLocalFallback);
    window.addEventListener("hpd-demo-videos-updated", readVideos);
    return () => {
      window.removeEventListener("storage", readLocalFallback);
      window.removeEventListener("hpd-demo-videos-updated", readVideos);
    };
  }, []);

  const tabs = videos.length > 0 ? videos.map((video) => video.category) : demoTabs;
  const activeVideo = videos.find((video) => video.category === active) ?? videos[0];

  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(active)) {
      setActive(tabs[0]);
    }
  }, [active, tabs]);

  return (
    <Section id="demo" eyebrow="产品演示" title={section?.title || "产品演示，一眼看懂系统如何交付"} subtitle={section?.subtitle}>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className="grid gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                active === tab ? "bg-brand-500 text-white shadow-soft" : "bg-white text-muted hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          <div className="rounded-2xl bg-ink p-3 shadow-soft">
            <div className="rounded-xl bg-white p-4">
              <div className="grid aspect-video place-items-center rounded-lg bg-gradient-to-br from-brand-500 via-skyplus to-ink text-white">
                {activeVideo?.videoUrl ? (
                  <video src={activeVideo.videoUrl} poster={activeVideo.coverUrl} controls className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={activeVideo?.coverUrl || "/images/student-report-mobile.png"} alt={activeVideo?.title || active} className="h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 grid place-items-center bg-ink/35 text-white">
                      <div className="text-center">
                        <button onClick={() => scrollToLead("demo")} className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white text-brand-500">
                          <Play fill="currentColor" />
                        </button>
                        <p className="text-xl font-bold">{activeVideo?.title || active}</p>
                        <p className="mt-2 text-sm text-white/80">{activeVideo?.description || "后台可替换真实演示视频"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button intent="demo">预约完整演示</Button>
            <Button variant="secondary" intent="materials">领取产品资料</Button>
            <Button variant="secondary">咨询合作套餐</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Growth() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.growth");
  const items: IconCard[] = [
    ["机构自由定价", "机构可根据本地市场设置课程价格和套餐", Target],
    ["小班课更好规模化", "一名老师可同时带多个学员，提升人效", UsersRound],
    ["家长感知更强", "检测报告同步家长端，让学习效果看得见", MonitorSmartphone],
    ["续费理由更充分", "打卡、检测、报告、成长记录持续沉淀学习数据", LineChart],
    ["总部支持落地", "提供系统培训、上课流程培训、教研方案、招生方案和运营指导", Rocket]
  ];
  return (
    <Section title={section?.title || "不只是学习系统，更是机构新的增长项目"} subtitle={section?.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/consulting-realistic.png" alt="校长咨询合作方案" className="h-80 w-full object-cover lg:h-full" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([title, text, Icon]) => (
            <Card key={title as string} className="p-5">
              <Icon className="mb-4 text-brand-500" />
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Pricing() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.pricing");
  const displayPlans = content?.pricingPlans
    ?.filter((plan) => plan.visible === "显示")
    .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder))
    .map((plan, index) => {
      const priceNumber = Number(String(plan.price).match(/\d+/)?.[0] || 0);
      return {
        name: plan.name,
        price: priceNumber,
        unit: String(plan.price).replace(String(priceNumber), "") || "",
        tag: plan.tag,
        fit: plan.targetAudience,
        items: String(plan.features).split(/[、,，]/).filter(Boolean),
        button: plan.buttonText,
        accent: index === 2 || plan.name.includes("旗舰")
      };
    });
  const activePlans = displayPlans?.length ? displayPlans : plans;

  return (
    <Section id="pricing" eyebrow="套餐方案" title={section?.title || "三档套餐，满足不同阶段机构需求"} subtitle={section?.subtitle}>
      <div className="grid gap-5 lg:grid-cols-3">
        {activePlans.map((plan) => (
          <Card key={plan.name} className={plan.accent ? "border-accent/50" : plan.tag ? "border-brand-500" : ""}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-black">{plan.name}</h3>
              {plan.tag && (
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${plan.accent ? "bg-accent text-white" : "bg-brand-500 text-white"}`}>
                  {plan.tag}
                </span>
              )}
            </div>
            <p className="mt-5">
              <span className={`text-4xl font-black ${plan.accent ? "text-accent" : "text-brand-500"}`}>¥{plan.price.toLocaleString()}</span>
              <span className="ml-1 text-muted">{plan.unit}</span>
            </p>
            <p className="mt-4 min-h-12 text-sm leading-6 text-muted">{plan.fit}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {plan.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 size={18} className={plan.accent ? "text-accent" : "text-brand-500"} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {plan.accent && <p className="mt-5 text-sm leading-6 text-muted">上门权益由具备多年校区运营经验的总部老师团队指导、安排并落地执行。</p>}
            <div className="mt-7">
              <Button variant={plan.accent ? "primary" : "secondary"}>{plan.button}</Button>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-6 rounded-card bg-white p-4 text-center text-sm font-semibold text-muted shadow-card">
        所有套餐均支持机构自由定价，方便校区根据本地市场设计课程价格和成交策略。
      </p>
    </Section>
  );
}

function RoiCalculator() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.roi");
  const [students, setStudents] = useState(30);
  const [fee, setFee] = useState(999);
  const [plan, setPlan] = useState(6800);
  const [teacherCost, setTeacherCost] = useState(0);
  const [otherCost, setOtherCost] = useState(0);
  const result = useMemo(() => {
    const revenue = students * fee;
    const profit = revenue - plan - teacherCost - otherCost;
    return {
      revenue,
      profit,
      payback: profit > 0 ? Math.max(1, Math.ceil(plan / Math.max(1, profit / 3))) : 0,
      uplift: Math.max(20, Math.round(students * 1.2))
    };
  }, [students, fee, plan, teacherCost, otherCost]);
  const bars = [result.revenue, plan, Math.max(result.profit, 0)];
  const max = Math.max(...bars, 1);

  return (
    <Section eyebrow="ROI 测算" title={section?.title || "校长最关心的账，帮你算清楚"} subtitle={section?.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="预计招生人数" value={students} onChange={setStudents} />
            <NumberInput label="单个学员收费" value={fee} onChange={setFee} />
            <label className="text-sm font-semibold">
              选择套餐
              <select value={plan} onChange={(event) => setPlan(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-brand-100 bg-white px-3 py-3">
                {plans.map((item) => (
                  <option key={item.name} value={item.price}>
                    {item.price} {item.name}
                  </option>
                ))}
              </select>
            </label>
            <NumberInput label="老师成本" value={teacherCost} onChange={setTeacherCost} />
            <NumberInput label="其他成本" value={otherCost} onChange={setOtherCost} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button>测算我的校区收益</Button>
            <Button variant="secondary" intent="demo">预约顾问帮我测算</Button>
          </div>
        </Card>
        <Card className="bg-ink text-white">
          <div className="grid grid-cols-2 gap-4">
            <Metric label="预计总收入" value={result.revenue} />
            <Metric label="系统成本" value={plan} />
            <Metric label="预计利润" value={result.profit} highlight />
            <Metric label="回本周期" value={result.payback} suffix="个月" />
          </div>
          <p className="mt-5 rounded-lg bg-white/10 p-4 text-sm">单班人效预计提升：{result.uplift}%</p>
          <div className="mt-6 flex h-40 items-end gap-5 rounded-lg bg-white/10 p-5">
            {[
              ["收入", result.revenue],
              ["系统", plan],
              ["利润", Math.max(result.profit, 0)]
            ].map(([label, value]) => (
              <div key={label as string} className="flex h-full flex-1 flex-col justify-end gap-2">
                <motion.div
                  className="rounded-t bg-accent"
                  initial={{ height: 0 }}
                  animate={{ height: `${(Number(value) / max) * 100}%` }}
                />
                <span className="text-center text-xs text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    if (text === "" && value === 0) {
      return;
    }
    if (Number(text) !== value) {
      setText(String(value));
    }
  }, [text, value]);

  function handleChange(rawValue: string) {
    if (rawValue === "") {
      setText("");
      onChange(0);
      return;
    }

    const digitsOnly = rawValue.replace(/[^\d]/g, "");
    const cleaned = digitsOnly.replace(/^0+(?=\d)/, "");
    setText(cleaned);
    onChange(cleaned === "" ? 0 : Number(cleaned));
  }

  return (
    <label className="text-sm font-semibold">
      {label}
      <input
        inputMode="numeric"
        value={text}
        onChange={(event) => handleChange(event.target.value)}
        onBlur={() => {
          if (text === "") {
            setText("0");
          }
        }}
        className="mt-2 w-full rounded-lg border border-brand-100 bg-white px-3 py-3"
      />
    </label>
  );
}

function Metric({ label, value, suffix = "元", highlight = false }: { label: string; value: number; suffix?: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-white/10 p-4">
      <p className="text-xs text-white/65">{label}</p>
      <p className={`mt-2 text-2xl font-black ${highlight ? "text-accent" : ""}`}>
        <Counter value={value} suffix={suffix} />
      </p>
    </div>
  );
}

function Support() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.support");
  const tiers = [
    ["基础支持", ["系统功能培训", "上课流程培训", "售后问题处理"]],
    ["增长支持", ["教研指导方案", "机构招生方案", "营销素材提供", "系统迭代免费升级"]],
    ["旗舰陪跑", ["上门教研升级", "上门策划招生", "机构活动策划", "专属客服", "选址建议", "运营陪跑指导"]]
  ];
  return (
    <Section id="support" title={section?.title || "从系统到招生，从教研到运营，总部陪你落地"} subtitle={section?.subtitle}>
      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map(([title, items], index) => (
          <Card key={title as string} className={index === 2 ? "bg-gradient-to-br from-brand-500 to-ink text-white" : ""}>
            <h3 className="text-2xl font-black">{title}</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {(items as string[]).map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 size={18} className={index === 2 ? "text-accent" : "text-brand-500"} />
                  <span className={index === 2 ? "text-white/90" : "text-muted"}>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Cases() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.cases");
  const caseImage = settingValue(content, "案例默认图", "/images/classroom-training-screen.png");
  const defaultCases = [
    ["星桥英语成长中心", "杭州", "进阶版", "小班课一对多", "48人", "占位数据"],
    ["启航托管校区", "郑州", "标准版", "小班课一对多", "32人", "占位数据"],
    ["朗跃素质教育", "成都", "旗舰版", "小班课 + 一对一", "86人", "占位数据"]
  ];
  const displayCases = content?.cases
    ?.filter((item) => item.featured === "首页推荐")
    .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder))
    .map((item) => [item.organization, item.city, item.planName, item.classMode, `${item.enrollmentCount}人`, item.renewalRate, item.parentFeedback || item.principalQuote]);
  const activeCases = displayCases?.length ? displayCases : defaultCases;

  return (
    <Section id="cases" title={section?.title || "成功案例，让结果说话"} subtitle={section?.subtitle}>
      <div className="grid gap-5 lg:grid-cols-3">
        {activeCases.map(([name, city, plan, mode, count, renewal, quote]) => (
          <Card key={name}>
            <div className="mb-5 h-36 overflow-hidden rounded-lg bg-brand-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mode.includes("一对一") ? "/images/one-on-one-realistic.png" : caseImage}
                alt={`${name}案例场景`}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted">
              <span>城市：{city}</span>
              <span>套餐：{plan}</span>
              <span>模式：{mode}</span>
              <span>招生：{count}</span>
              <span className="col-span-2">续费率：{renewal}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{quote || "家长反馈和校长评价可在后台成功案例模块维护，刷新前台后同步展示。"}</p>
            <div className="mt-5 flex gap-2">
              <Button variant="secondary">查看案例详情</Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Lead() {
  const content = useSiteContent();
  const [intent, setIntent] = useState<LeadIntent>("materials");
  const [form, setForm] = useState<LeadForm>({
    name: "",
    phone: "",
    city: "",
    org: "",
    students: "",
    plan: "6800标准版",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    function updateIntent(event: Event) {
      setIntent((event as CustomEvent<LeadIntent>).detail ?? "materials");
      setStatus("idle");
      setError("");
    }

    window.addEventListener("hpd-lead-intent", updateIntent);
    return () => window.removeEventListener("hpd-lead-intent", updateIntent);
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.city || !form.org) {
      setError("请填写姓名、联系电话、城市和机构名称。");
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      setError("请输入正确的中国大陆手机号。");
      return;
    }
    setStatus("loading");
    try {
      const res = await submitLeadForm(form, intent);
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const leadSection = cmsSection(content, intent === "demo" ? "home.lead.demo" : "home.lead.materials");

  return (
    <Section id="lead" eyebrow="立即留资" title={leadSection?.title || (intent === "demo" ? "预约产品演示" : "领取产品资料")} subtitle={leadSection?.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setIntent("demo")}
              className={`rounded-lg border px-5 py-4 text-left transition ${
                intent === "demo"
                  ? "border-brand-500 bg-brand-500 text-white shadow-soft"
                  : "border-brand-100 bg-brand-50 text-brand-700 hover:border-brand-300"
              }`}
            >
              <span className="block text-base font-black">预约演示</span>
              <span className={`mt-1 block text-xs ${intent === "demo" ? "text-white/80" : "text-muted"}`}>看系统、看课堂、看交付流程</span>
            </button>
            <button
              type="button"
              onClick={() => setIntent("materials")}
              className={`rounded-lg border px-5 py-4 text-left transition ${
                intent === "materials"
                  ? "border-brand-500 bg-brand-500 text-white shadow-soft"
                  : "border-brand-100 bg-brand-50 text-brand-700 hover:border-brand-300"
              }`}
            >
              <span className="block text-base font-black">领取资料</span>
              <span className={`mt-1 block text-xs ${intent === "materials" ? "text-white/80" : "text-muted"}`}>拿方案、拿报价、拿合作资料</span>
            </button>
          </div>
          <p className="mb-6 text-muted">
            {intent === "demo"
              ? "填写后进入预约演示表单，顾问会优先安排系统演示。"
              : "填写后进入产品资料表单，顾问会发送合作方案和产品资料。"}
          </p>
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <FormInput label="姓名" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            <FormInput label="联系电话" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
            <FormInput label="所在城市" value={form.city} onChange={(value) => setForm({ ...form, city: value })} />
            <FormInput label="机构名称" value={form.org} onChange={(value) => setForm({ ...form, org: value })} />
            <FormInput label="当前学员人数" value={form.students} onChange={(value) => setForm({ ...form, students: value })} />
            <label className="text-sm font-semibold">
              感兴趣套餐
              <select value={form.plan} onChange={(event) => setForm({ ...form, plan: event.target.value })} className="mt-2 w-full rounded-lg border border-brand-100 px-3 py-3">
                {["6800标准版", "8800进阶版", "49800旗舰版"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2 text-sm font-semibold">
              留言需求
              <textarea
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="mt-2 min-h-28 w-full rounded-lg border border-brand-100 px-3 py-3"
                placeholder="想了解产品演示、套餐价格、校区落地或招生方案"
              />
            </label>
            {error && <p className="sm:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
            {status === "success" && (
              <p className="sm:col-span-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                {intent === "demo" ? "预约提交成功，顾问将尽快联系确认演示时间。" : "资料领取成功，顾问将在24小时内联系你。"}
              </p>
            )}
            {status === "error" && <p className="sm:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">提交失败，请稍后再试。</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="sm:col-span-2 rounded-lg bg-brand-500 px-5 py-3 font-semibold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? "提交中..." : intent === "demo" ? "提交预约演示" : "立即领取资料"}
            </button>
          </form>
        </Card>
        <Card className="self-start overflow-hidden bg-brand-500 p-5 text-white">
          <div className="mb-5 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/consulting-realistic.png" alt="顾问讲解合作方案" className="h-36 w-full object-cover sm:h-40 lg:h-44" />
          </div>
          <h3 className="text-xl font-black leading-tight md:text-2xl">
            {intent === "demo" ? "预约后顾问会演示这些内容" : "提交后你将收到这些资料"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/75">
            {intent === "demo"
              ? "顾问会按机构校长视角演示系统怎么开课、老师怎么上课、家长怎么看到效果。"
              : "顾问会结合校区规模、收费模型和上课模式，给出可落地的合作建议。"}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {(intent === "demo"
              ? ["系统后台演示", "学员端学习流程", "小班课上课流程", "家长报告展示"]
              : ["产品介绍资料", "套餐权益说明", "校区开课流程", "合作方案建议"]
            ).map((item) => (
              <div key={item} className="flex min-h-12 items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <CheckCircle2 className="shrink-0 text-accent" size={18} />
                <span className="text-sm font-semibold leading-5">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-white/10 p-4">
            <p className="text-sm font-black">{intent === "demo" ? "适合想先看系统效果的校长" : "适合想先评估合作成本的校长"}</p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              {intent === "demo"
                ? "建议准备好校区学员人数、当前英语课程情况和老师配置，演示时可以直接评估是否适合落地。"
                : "资料会重点说明套餐差异、总部支持、开课准备和适合机构类型，方便内部决策。"}
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function FormInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-brand-100 px-3 py-3" />
    </label>
  );
}

function Faq() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.faq");
  const displayFaqs = content?.faqs
    ?.filter((item) => item.visible === "显示")
    .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder))
    .map((item) => [item.question, item.answer]);
  const activeFaqs = displayFaqs?.length ? displayFaqs : faqs;
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" title={section?.title || "FAQ 常见问题"} subtitle={section?.subtitle}>
      <div className="mx-auto max-w-4xl space-y-3">
        {activeFaqs.map(([question, answer], index) => (
          <div key={question} className="rounded-card bg-white shadow-card">
            <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold">
              {question}
              <ChevronDown className={`shrink-0 transition ${open === index ? "rotate-180" : ""}`} />
            </button>
            {open === index && <p className="px-5 pb-5 text-sm leading-7 text-muted">{answer}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function FinalCta() {
  const content = useSiteContent();
  const section = cmsSection(content, "home.finalCta");
  return (
    <section className="bg-gradient-to-br from-ink via-brand-700 to-brand-500 py-16 text-white md:py-24">
      <div className="section-shell grid items-center gap-8 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <h2 className="text-3xl font-black md:text-5xl">{section?.title || "让英语单词学习，成为机构新的增长项目"}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            {section?.subtitle || "一套系统覆盖教学、检测、报告、复习、打卡、家长反馈与运营支持，帮助机构更轻松地完成课程交付和续费转化。"}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="dark" intent="demo">立即预约演示</Button>
            <Button variant="dark" intent="materials">获取合作方案</Button>
            <Button variant="dark">咨询套餐价格</Button>
          </div>
        </div>
        <DeviceMockup />
      </div>
    </section>
  );
}

function FloatingCtas() {
  const actions: Array<[string, LucideIcon]> = [
    ["预约演示", MousePointerClick],
    ["领取方案", ClipboardList]
  ];

  return (
    <>
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-soft lg:block">
        {actions.map(([label, Icon]) => (
          <button
            key={label as string}
            onClick={() => scrollToLead(label === "预约演示" ? "demo" : "materials")}
            className="flex w-24 flex-col items-center gap-2 border-b border-brand-50 px-3 py-4 text-xs text-muted hover:bg-brand-50 hover:text-brand-500"
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-24 px-3 py-4 text-xs font-semibold text-brand-500 hover:bg-brand-50">
          返回顶部
        </button>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-white/80 bg-white/90 p-3 shadow-soft backdrop-blur lg:hidden">
        <button onClick={() => scrollToLead("demo")} className="rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white">
          预约演示
        </button>
        <button onClick={() => scrollToLead("materials")} className="rounded-lg border border-brand-500 py-3 text-sm font-semibold text-brand-600">
          咨询合作
        </button>
      </div>
    </>
  );
}
