"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BookText,
  Brain,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  Headphones,
  LineChart,
  Menu,
  MessageCircle,
  Mic2,
  MonitorSmartphone,
  Play,
  Presentation,
  Repeat2,
  Sparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LeadForm = {
  org: string;
  name: string;
  phone: string;
  wechat: string;
  city: string;
  students: string;
  message: string;
};

const navItems = [
  ["首页", "hero"],
  ["产品", "system"],
  ["功能", "features"],
  ["演示", "video"],
  ["赋能", "support"],
  ["案例", "cases"],
  ["咨询", "lead"]
];

const heroStats = [
  ["200+", "合作机构"],
  ["5000+", "在用学员"]
];
const sceneCards = ["艺术培训机构", "英语培训机构", "托管机构", "社区培训机构"];
const products: Array<{ title: string; text: string; icon: LucideIcon; points: string[] }> = [
  { title: "机构端", text: "面向校长和校区管理者", icon: Building2, points: ["课程管理", "学员管理", "数据统计", "运营管理"] },
  { title: "交付中心 / 教练端", text: "面向老师和教学教练", icon: Presentation, points: ["学员小组", "课件设置", "学习检测", "报告生成"] },
  { title: "学员端", text: "面向学员日常学习训练", icon: GraduationCap, points: ["单词训练", "抗遗忘复习", "每日打卡", "词汇检测"] },
  { title: "家长端", text: "面向家长效果感知与续费", icon: MonitorSmartphone, points: ["学习报告", "学习进度", "打卡情况", "效果反馈"] }
];

const features: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "单词训练", text: "按词库、课程和任务完成高频训练。", icon: BookOpenCheck },
  { title: "抗遗忘复习", text: "结合学习记录自动安排复习节奏。", icon: Repeat2 },
  { title: "每日打卡", text: "帮助学员建立持续学习习惯。", icon: ClipboardCheck },
  { title: "短语训练", text: "从单词拓展到常用短语应用。", icon: BookText },
  { title: "语法学习", text: "配合单词课程补齐基础语法。", icon: Brain },
  { title: "口语练习", text: "支持发音跟读和口语强化训练。", icon: Mic2 },
  { title: "阅读练习", text: "用阅读场景提升词汇迁移能力。", icon: LineChart },
  { title: "音标学习", text: "夯实拼读、发音和记忆基础。", icon: Headphones },
  { title: "词汇量检测", text: "课前课后量化评估学习结果。", icon: BarChart3 }
];

const supportItems = ["系统功能培训", "上课流程培训", "教研指导方案", "机构招生方案", "配套营销活动方案", "营销素材支持", "系统迭代免费升级", "售后问题处理", "运营陪跑指导"];
const process = ["咨询沟通", "产品演示", "确认方案", "系统培训", "上线开课", "运营陪跑"];
const cases = [
  { name: "星启点英语成长中心", time: "合作 6 个月", image: "/images/classroom-training-screen.png", metrics: ["招生增长 42%", "续费率 93%", "单词班营收 +18.6w"], quote: "慧拼读把单词课做成标准产品，新老师也能快速交付，家长看到报告后续费沟通顺畅很多。" },
  { name: "蓝鲸托管学习中心", time: "合作 4 个月", image: "/images/consulting-realistic.png", metrics: ["新增 3 个班", "满班率 86%", "回本 1.2 个班"], quote: "原来托管只是作业辅导，现在有了可售卖的英语训练项目，校区利润结构更健康。" },
  { name: "未来星素质教育", time: "合作 1 年", image: "/images/one-on-one-realistic.png", metrics: ["续费率 98%", "转介绍 +31%", "年课包转化提升"], quote: "系统把学员端、家长端和老师交付串起来，校长能看数据，老师能按流程上课。" }
];

const faqs = [
  ["系统适合哪些机构？", "适合英语培训机构、托管校区、综合素质教育机构，以及想新增英语单词课程项目的教育创业者。"],
  ["老师不会用怎么办？", "总部提供系统功能培训、上课流程培训和教研指导，新老师也能按照标准流程快速上手。"],
  ["是否支持小班课？", "支持。小班课一对多适合机构规模化开课，提高老师人效和班级收益。"],
  ["是否支持一对一？", "支持。一对一适合高客单价服务和针对性强化学习。"],
  ["是否提供招生方案？", "提供。合作后可获得机构招生方案、营销活动方案和配套素材支持。"],
  ["购买后是否免费升级？", "系统迭代会持续升级，合作套餐内包含对应的升级支持。"],
  ["是否有售后支持？", "有售后问题处理支持，高阶套餐包含更深度的运营陪跑和专属服务。"],
  ["多久可以上线开课？", "完成产品演示、确认方案和系统培训后，即可按校区节奏快速上线开课。"],
  ["家长端能看到什么？", "家长可查看学习报告、学习进度、打卡情况和阶段效果反馈。"]
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SaasLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7FAFF] text-[#07152D]">
      <Header />
      <HeroSection />
      <ProductSystemSection />
      <FeaturesSection />
      <TeachingModesSection />
      <VideoDemoSection />
      <SupportSection />
      <ProcessSection />
      <CasesSection />
      <FAQSection />
      <LeadFormSection />
      <Footer />
      <MobileCta />
    </main>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#DCEBFF] bg-white/92 shadow-[0_10px_32px_rgba(22,93,255,0.08)] backdrop-blur-2xl">
      <div className="mx-auto flex h-14 w-[min(1200px,calc(100%-28px))] items-center justify-between md:h-16">
        <button onClick={() => scrollTo("hero")} className="flex min-w-0 items-center gap-2.5">
          <img src="/images/logo.png" alt="慧拼读单词训练系统" className="h-8 w-auto shrink-0 object-contain md:h-10" />
          <span className="truncate text-sm font-black tracking-wide text-[#07152D] md:text-base">慧拼读单词训练系统</span>
        </button>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="transition hover:text-[#165DFF]">{label}</button>
          ))}
        </nav>
        <div className="hidden md:block" />
        <button onClick={() => setOpen(!open)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#DCEBFF] bg-[#F4F8FF] text-[#07152D] md:h-10 md:w-10 lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#DCEBFF] bg-white/98 px-3 py-3 shadow-[0_18px_40px_rgba(22,93,255,0.08)] lg:hidden">
          <div className="grid gap-2">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => { setOpen(false); scrollTo(id); }} className="rounded-lg px-4 py-2.5 text-left text-sm font-bold text-slate-700 hover:bg-[#F1F6FF]">{label}</button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative pt-20 lg:min-h-screen lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(47,123,255,0.16),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(100,210,255,0.16),transparent_25rem),linear-gradient(180deg,#FFFFFF_0%,#F1F7FF_58%,#F7FAFF_100%)]" />
      <div className="relative mx-auto grid w-[min(1200px,calc(100%-28px))] items-center gap-7 pb-8 md:gap-10 lg:min-h-[calc(100vh-150px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center lg:text-left">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#DCEBFF] bg-white/82 px-3 py-2 text-xs font-bold leading-5 text-[#165DFF] shadow-[0_12px_30px_rgba(22,93,255,0.08)] backdrop-blur sm:text-sm">
            <Sparkles className="h-4 w-4 text-[#2F7BFF]" />
            <span className="truncate">面向培训机构的英语单词训练增长系统</span>
          </div>
          <h1 className="mx-auto max-w-3xl text-[2.25rem] font-black leading-[1.06] tracking-normal text-[#07152D] sm:text-6xl lg:mx-0 lg:text-[4.65rem]">慧拼读单词训练系统</h1>
          <p className="mx-auto mt-4 max-w-2xl text-2xl font-black leading-tight text-[#165DFF] sm:text-3xl lg:mx-0">让孩子见词能读，听词能写</p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#385878] sm:text-lg sm:leading-8 lg:mx-0">以单词训练为核心，掌握单词规律，配合语法、阅读、口语训练，帮助孩子真正建立英语能力，帮助机构快速开课、提升续费率。</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:justify-start">
            <CtaButton size="lg" onClick={() => scrollTo("video")}>查看系统演示</CtaButton>
          </div>
          <div className="mx-auto mt-7 grid max-w-lg grid-cols-2 gap-3 lg:mx-0">
            {heroStats.map(([value, label]) => (
              <div key={label} className="rounded-[18px] border border-[#DCEBFF] bg-white/78 px-5 py-4 text-center shadow-[0_18px_42px_rgba(22,93,255,0.10)] backdrop-blur">
                <p className="text-3xl font-black text-[#165DFF] md:text-4xl">{value}</p>
                <p className="mt-2 text-sm font-black text-[#28517A] md:text-base">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative -mb-8 sm:mb-0">
          <DeviceShowcase />
        </div>
      </div>
      <div className="relative mx-auto grid w-[min(900px,calc(100%-28px))] grid-cols-2 gap-3 pb-12 md:grid-cols-4 md:pb-16">
        {sceneCards.map((item) => (
          <div key={item} className="rounded-full border border-[#CFE2FF] bg-white/78 px-4 py-3 text-center text-xs font-black text-[#28517A] shadow-[0_12px_28px_rgba(22,93,255,0.08)] backdrop-blur md:text-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function DeviceShowcase() {
  return (
    <div className="relative mx-auto max-w-[720px] pb-8">
      <div className="absolute inset-x-10 bottom-0 h-16 rounded-[50%] bg-[#165DFF]/14 blur-2xl" />
      <div className="relative">
        <div className="relative mx-auto w-[92%] rounded-[22px] border border-[#B9C5D6] bg-gradient-to-b from-[#F8FAFC] to-[#CBD5E1] p-2 shadow-[0_28px_70px_rgba(15,57,120,0.22)] md:rounded-[30px] md:p-3">
          <div className="overflow-hidden rounded-[14px] border border-[#0F172A]/12 bg-[#0B1220] md:rounded-[20px]">
            <img src="/images/training-system-ui.png" alt="慧拼读训练系统真实界面" className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>
        <div className="mx-auto h-2 w-[78%] rounded-b-[18px] bg-gradient-to-r from-[#94A3B8] via-white to-[#94A3B8] shadow-[0_12px_24px_rgba(15,23,42,0.16)] md:h-3" />
        <div className="mx-auto h-2 w-[46%] rounded-b-full bg-[#CBD5E1] md:h-3" />
        <div className="absolute -bottom-2 right-1 w-[31%] rounded-[22px] border border-[#B9C5D6] bg-gradient-to-b from-[#F8FAFC] to-[#D9E2EF] p-1.5 shadow-[0_24px_54px_rgba(15,57,120,0.24)] sm:right-2 sm:w-[29%] md:-bottom-1 md:p-2">
          <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-[#CBD5E1]" />
          <div className="overflow-hidden rounded-[14px] border border-[#0F172A]/10 bg-white">
            <img src="/images/student-mobile-stats.png" alt="学员学习数据手机界面" className="aspect-[3/4] w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSystemSection() {
  return (
    <LightSection id="system" eyebrow="四端产品体系" title="四端产品体系，全方位赋能机构教学" subtitle="机构后台、交付中心、学员端、家长端协同运转，让课程交付标准化、数据化、可复制。">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((item, index) => (
          <MotionCard key={item.title} delay={index * 0.08} className="group bg-white/78 md:min-h-[310px]">
            <div className="mb-4 flex items-center justify-between md:mb-6">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-[#E8F2FF] to-white text-[#165DFF] shadow-inner md:h-14 md:w-14">
                <item.icon className="h-5 w-5 md:h-7 md:w-7" />
              </span>
              <span className="text-sm font-black text-[#94A3B8]">0{index + 1}</span>
            </div>
            <h3 className="text-xl font-black text-[#07152D] md:text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            <div className="mt-5 grid grid-cols-2 gap-2 md:mt-6 md:grid-cols-1">
              {item.points.map((point) => (
                <span key={point} className="rounded-lg bg-[#F1F6FF] px-3 py-2 text-sm font-bold text-[#28517A]">{point}</span>
              ))}
            </div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function FeaturesSection() {
  return (
    <LightSection id="features" eyebrow="八大核心功能" title="八大核心功能，覆盖英语学习全场景" subtitle="围绕单词训练、抗遗忘复习、语法、口语、阅读、音标和检测持续闭环。">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {features.map((item, index) => (
          <MotionCard key={item.title} delay={index * 0.04} className="flex flex-col gap-3 bg-white/82 p-4 sm:flex-row sm:items-start sm:gap-4 sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#EAF3FF] text-[#165DFF] sm:h-12 sm:w-12">
              <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <div>
              <h3 className="text-base font-black text-[#07152D] sm:text-lg">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">{item.text}</p>
            </div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function TeachingModesSection() {
  const modes = [
    { title: "小班课一对多", image: "/images/classroom-training-screen.png", text: "一个老师带多个学生学习，适合机构规模化开课。", points: ["互动氛围好", "性价比高", "家长续费率高", "适合校区批量招生转化"] },
    { title: "一对一", image: "/images/one-on-one-realistic.png", text: "一个老师带一个学生学习，专注度更高，针对性强化学习。", points: ["个性化更强", "学习效率更高", "问题定位更精准", "学习效果更好"] }
  ];
  return (
    <DarkSection id="modes" eyebrow="教学模式" title="两种教学模式，满足不同机构需求" subtitle="既支持规模化小班课，也支持高客单价一对一强化服务。">
      <div className="grid gap-6 lg:grid-cols-2">
        {modes.map((mode) => (
          <motion.article key={mode.title} whileHover={{ y: -8 }} className="overflow-hidden rounded-lg border border-[#DCEBFF] bg-white shadow-[0_18px_50px_rgba(12,42,92,0.10)] backdrop-blur">
            <div className="relative h-48 overflow-hidden sm:h-64 lg:h-72">
              <img src={mode.image} alt={mode.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
              <h3 className="absolute bottom-5 left-5 text-2xl font-black text-[#07152D] md:bottom-6 md:left-6 md:text-3xl">{mode.title}</h3>
            </div>
            <div className="p-5 md:p-6">
              <p className="text-sm leading-7 text-slate-600 md:text-base">{mode.text}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mode.points.map((point) => <CheckItem key={point}>{point}</CheckItem>)}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </DarkSection>
  );
}

function VideoDemoSection() {
  return (
    <DarkSection id="video" eyebrow="系统演示" title="3分钟看懂慧拼读如何上课" subtitle="从机构管理、教练上课、学员训练到家长报告，一条完整学习闭环清晰展示。">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-lg border border-[#CFE2FF] bg-white p-2 shadow-[0_22px_70px_rgba(47,123,255,0.16)] md:rounded-[18px] md:p-3">
          <div className="absolute -inset-4 rounded-[26px] bg-[#2F7BFF]/18 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl bg-black">
            <img src="/images/system-dashboard.png" alt="系统演示视频封面" className="aspect-video w-full object-cover opacity-74" />
            <div className="absolute inset-0 grid place-items-center">
              <button className="group grid h-14 w-14 place-items-center rounded-full bg-white text-[#165DFF] shadow-[0_0_0_12px_rgba(47,123,255,0.18)] transition hover:scale-105 md:h-20 md:w-20 md:shadow-[0_0_0_18px_rgba(47,123,255,0.20)]">
                <Play className="ml-1 h-7 w-7 fill-current md:h-9 md:w-9" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-9 text-center">
          <CtaButton onClick={() => scrollTo("lead")}>预约系统演示</CtaButton>
        </div>
      </div>
    </DarkSection>
  );
}

function SupportSection() {
  return (
    <LightSection id="support" eyebrow="总部赋能" title="不仅提供系统，更帮助机构赚钱" subtitle="慧拼读为机构提供从系统培训、教研指导、招生方案、活动策划到运营陪跑的完整支持。">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {supportItems.map((item, index) => (
          <MotionCard key={item} delay={index * 0.04} className="bg-white/82 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EAF3FF] text-[#165DFF] sm:h-10 sm:w-10"><CheckCircle2 className="h-5 w-5" /></span>
              <h3 className="font-black text-[#07152D]">{item}</h3>
            </div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function ProcessSection() {
  return (
    <DarkSection id="process" eyebrow="合作流程" title="合作流程清晰，最快快速上线开课" subtitle="从咨询到上线开课，每一步都有清晰交付和支持。">
      <div className="relative grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        <div className="absolute left-8 right-8 top-10 hidden h-0.5 bg-gradient-to-r from-[#2F7BFF] via-[#64D2FF] to-[#BFD9FF] lg:block" />
        {process.map((item, index) => (
          <motion.div key={item} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative rounded-lg border border-[#DCEBFF] bg-white/88 p-4 text-center shadow-[0_14px_36px_rgba(12,42,92,0.08)] backdrop-blur md:p-5">
            <span className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full bg-[#165DFF] text-sm font-black text-white md:mb-4 md:h-11 md:w-11">{index + 1}</span>
            <h3 className="text-sm font-black md:text-base">{item}</h3>
          </motion.div>
        ))}
      </div>
    </DarkSection>
  );
}

function CasesSection() {
  return (
    <LightSection id="cases" eyebrow="合作案例" title="真实机构增长案例" subtitle="用标准化课程、可视化学习报告和总部运营支持，帮助机构把单词训练做成可持续项目。">
      <div className="grid gap-5 lg:grid-cols-3">
        {cases.map((item, index) => (
          <MotionCard key={item.name} delay={index * 0.08} className="overflow-hidden bg-white/88 p-0">
            <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-[#07152D]">{item.name}</h3>
                  <p className="mt-1 text-sm font-bold text-[#165DFF]">{item.time}</p>
                </div>
                <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-black text-[#165DFF]">案例</span>
              </div>
              <div className="mt-5 grid gap-2">
                {item.metrics.map((metric) => (
                  <div key={metric} className="rounded-lg bg-[#F1F6FF] px-3 py-2 text-sm font-black text-[#28517A]">{metric}</div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">“{item.quote}”</p>
            </div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <LightSection id="faq" eyebrow="FAQ" title="常见问题" subtitle="合作前校长最关心的问题，先帮你说清楚。">
      <div className="mx-auto max-w-4xl space-y-3">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="rounded-lg border border-[#DDE8F6] bg-white/86 shadow-sm">
            <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-[#07152D]">
              {question}
              <ChevronDown className={`h-5 w-5 shrink-0 text-[#165DFF] transition ${open === index ? "rotate-180" : ""}`} />
            </button>
            {open === index ? <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{answer}</p> : null}
          </div>
        ))}
      </div>
    </LightSection>
  );
}

function LeadFormSection() {
  const [form, setForm] = useState<LeadForm>({ org: "", name: "", phone: "", wechat: "", city: "", students: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!form.org || !form.name || !form.phone || !form.city) {
      setError("请填写机构名称、联系人、手机号和所在城市。");
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      setError("请输入正确的中国大陆手机号。");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/email-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "demo",
          organization: form.org,
          name: form.name,
          phone: form.phone,
          wechat: form.wechat,
          city: form.city,
          studentCount: Number(form.students) || undefined,
          message: form.message,
          sourcePage: "慧拼读高转化官网",
          sourceChannel: "底部预约演示表单"
        })
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="lead" className="relative bg-[#F7FAFF] py-12 pb-24 text-[#07152D] md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(47,123,255,0.16),transparent_28rem),radial-gradient(circle_at_90%_80%,rgba(100,210,255,0.14),transparent_24rem)]" />
      <div className="relative mx-auto grid w-[min(1200px,calc(100%-28px))] gap-6 md:w-[min(1200px,calc(100%-32px))] lg:grid-cols-[1fr_0.86fr] lg:gap-8">
        <div>
          <p className="text-sm font-black text-[#165DFF]">预约产品演示</p>
          <h2 className="mt-2 text-2xl font-black leading-tight md:mt-3 md:text-5xl">预约产品演示，获取专属合作方案</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:mt-5 md:text-lg md:leading-8">留下联系方式，我们将为你提供系统演示和机构专属落地方案。</p>
          <form onSubmit={submit} className="mt-5 grid gap-3 rounded-lg border border-[#DCEBFF] bg-white/88 p-4 shadow-[0_18px_52px_rgba(12,42,92,0.10)] backdrop-blur sm:grid-cols-2 md:mt-8 md:gap-4 md:p-5">
            <TextInput label="机构名称" value={form.org} onChange={(value) => setForm({ ...form, org: value })} />
            <TextInput label="联系人" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            <TextInput label="手机号" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
            <TextInput label="微信号" value={form.wechat} onChange={(value) => setForm({ ...form, wechat: value })} />
            <TextInput label="所在城市" value={form.city} onChange={(value) => setForm({ ...form, city: value })} />
            <TextInput label="当前学员数量" value={form.students} onChange={(value) => setForm({ ...form, students: value })} />
            <label className="text-sm font-bold text-[#28517A] sm:col-span-2">备注
              <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 min-h-24 w-full rounded-lg border border-[#D9E6F7] bg-white px-3 py-3 text-[#07152D] outline-none focus:border-[#165DFF] md:min-h-28" placeholder="可填写校区情况、想了解的套餐或演示时间" />
            </label>
            {error ? <p className="rounded-lg bg-red-500/12 p-3 text-sm font-bold text-red-200 sm:col-span-2">{error}</p> : null}
            {status === "success" ? <p className="rounded-lg bg-emerald-500/12 p-3 text-sm font-bold text-emerald-200 sm:col-span-2">提交成功，我们将尽快与您联系。</p> : null}
            {status === "error" ? <p className="rounded-lg bg-red-500/12 p-3 text-sm font-bold text-red-200 sm:col-span-2">提交失败，请稍后再试或直接联系顾问。</p> : null}
            <button disabled={status === "loading"} className="h-11 rounded-lg bg-[#165DFF] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(22,93,255,0.22)] disabled:opacity-70 sm:col-span-2 md:h-auto md:py-3 md:text-base">{status === "loading" ? "提交中..." : "立即预约演示"}</button>
          </form>
        </div>
        <div className="relative self-center">
          <div className="absolute -inset-3 rounded-full bg-[#2F7BFF]/20 blur-3xl md:-inset-6" />
          <img src="/images/consulting-realistic.png" alt="3D 咨询顾问人物与系统界面" className="relative max-h-[260px] w-full rounded-[14px] object-cover shadow-[0_24px_70px_rgba(0,0,0,0.32)] md:max-h-none md:rounded-[18px] md:shadow-[0_34px_90px_rgba(0,0,0,0.35)]" />
          <div className="relative -mt-10 ml-auto max-w-sm rounded-lg border border-[#DCEBFF] bg-white/88 p-4 text-[#07152D] shadow-[0_16px_42px_rgba(12,42,92,0.12)] backdrop-blur-xl md:-mt-12 md:p-5">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 shrink-0 text-[#165DFF] md:h-7 md:w-7" />
              <div>
                <p className="text-sm font-black md:text-base">顾问将在 24 小时内联系</p>
                <p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm">系统演示、报价方案、落地路径一次讲清楚</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#DCEBFF] bg-white py-10 pb-24 text-slate-600 md:py-12">
      <div className="mx-auto grid w-[min(1200px,calc(100%-28px))] gap-7 md:w-[min(1200px,calc(100%-32px))] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-[#07152D]">
            <img src="/images/logo.png" alt="慧拼读单词训练系统" className="h-9 w-auto object-contain md:h-12" />
            <span className="text-base font-black md:text-lg">慧拼读单词训练系统</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 md:mt-4 md:leading-7">面向英语培训机构的智能单词学习与教学系统，帮助机构快速开课、提升续费率、降低运营成本。</p>
          <p className="mt-5 text-xs md:mt-6">Copyright © 2026 慧拼读单词训练系统. All rights reserved.</p>
        </div>
        <FooterGroup title="产品功能" items={["机构端", "教练端", "学员端", "家长端", "系统演示"]} />
        <FooterGroup title="解决方案" items={["小班课一对多", "一对一教学", "招生转化", "教研交付", "运营陪跑"]} />
        <div>
          <h3 className="font-black text-[#07152D]">联系方式</h3>
          <div className="mt-3 space-y-2 text-sm md:mt-4 md:space-y-3">
            <p>电话 / 微信：请在后台配置</p>
            <p>合作咨询：预约产品演示</p>
            <div className="grid h-20 w-20 place-items-center rounded-lg border border-[#DCEBFF] bg-[#F7FAFF] text-xs md:h-24 md:w-24">二维码位置</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DarkSection({ id, eyebrow, title, subtitle, children }: { id?: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative bg-[#F7FAFF] py-12 text-[#07152D] md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(47,123,255,0.12),transparent_24rem),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,255,0))]" />
      <div className="relative mx-auto w-[min(1200px,calc(100%-28px))] md:w-[min(1200px,calc(100%-32px))]">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}

function LightSection({ id, eyebrow, title, subtitle, children }: { id?: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative bg-[#F7FAFF] py-12 text-[#07152D] md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(47,123,255,0.14),transparent_26rem),linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,250,255,0))]" />
      <div className="relative mx-auto w-[min(1200px,calc(100%-28px))] md:w-[min(1200px,calc(100%-32px))]">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mx-auto mb-7 max-w-3xl text-center md:mb-12">
      <p className="text-xs font-black text-[#165DFF] md:text-sm">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#07152D] md:mt-3 md:text-5xl">{title}</h2>
      {subtitle ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:mt-5 md:text-base md:leading-7">{subtitle}</p> : null}
    </motion.div>
  );
}

function MotionCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay }} whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(22,93,255,0.16)" }} className={`rounded-lg border border-white/70 p-4 shadow-[0_16px_45px_rgba(12,42,92,0.08)] backdrop-blur md:p-6 ${className}`}>
      {children}
    </motion.div>
  );
}

function CtaButton({ children, onClick, variant = "primary", size = "md" }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost" | "glass"; size?: "md" | "lg" }) {
  const styles = {
    primary: "bg-[#165DFF] text-white shadow-[0_18px_44px_rgba(22,93,255,0.24)] hover:bg-[#0F4FE6]",
    ghost: "border border-[#CFE2FF] bg-white text-[#165DFF] hover:bg-[#F1F6FF]",
    glass: "border border-[#CFE2FF] bg-white/80 text-[#165DFF] backdrop-blur hover:bg-white"
  };
  return (
    <button onClick={onClick} className={`inline-flex w-full items-center justify-center gap-2 rounded-lg font-black transition sm:w-auto ${size === "lg" ? "min-h-11 px-5 py-3 text-sm md:min-h-13 md:px-6 md:py-4 md:text-base" : "min-h-10 px-4 py-2.5 text-sm md:min-h-11 md:px-5 md:py-3"} ${styles[variant]}`}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm font-semibold leading-5 text-[#28517A]">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#64D2FF]" />
      <span>{children}</span>
    </div>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-[#28517A]">{label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#D9E6F7] bg-white px-3 text-[#07152D] outline-none focus:border-[#165DFF] md:h-12" />
    </label>
  );
}

function FooterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-[#07152D]">{title}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm md:mt-4 md:block md:space-y-3">
        {items.map((item) => <button key={item} onClick={() => scrollTo("lead")} className="text-left transition hover:text-[#165DFF]">{item}</button>)}
      </div>
    </div>
  );
}

function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#DCEBFF] bg-white/94 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 shadow-[0_-14px_36px_rgba(22,93,255,0.10)] backdrop-blur lg:hidden">
      <button onClick={() => scrollTo("video")} className="h-11 rounded-lg bg-[#165DFF] text-sm font-black text-white">系统演示</button>
      <button onClick={() => scrollTo("lead")} className="h-11 rounded-lg border border-[#BFD9FF] text-sm font-black text-[#165DFF]">咨询</button>
    </div>
  );
}
