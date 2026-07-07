"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Gauge,
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
  TrendingUp,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type PlanKey = "half" | "year" | "forever";
type LeadForm = {
  org: string;
  name: string;
  phone: string;
  wechat: string;
  city: string;
  students: string;
  plan: string;
  message: string;
};

const navItems = [
  ["产品体系", "system"],
  ["学习功能", "features"],
  ["演示视频", "video"],
  ["收益测算", "roi"],
  ["套餐价格", "pricing"],
  ["合作流程", "process"],
  ["FAQ", "faq"]
];

const sellingPoints = ["四端协同", "系统教学", "学习闭环", "持续升级"];
const pains = ["招生难，获客成本高", "续费难，家长感知弱", "教学不标准，老师压力大", "学习效果难追踪", "运营管理效率低"];
const gains = ["快速开课，轻松转化", "学习效果可视化", "系统教学，老师更高效", "家长实时了解学习进度", "数据驱动续费和运营"];

const products: Array<{ title: string; text: string; icon: LucideIcon; points: string[] }> = [
  { title: "机构端", text: "面向校长和校区管理者", icon: Building2, points: ["课程管理", "学员管理", "数据统计", "运营管理"] },
  { title: "交付中心 / 教练端", text: "面向老师和教学教练", icon: Presentation, points: ["上课流程", "任务布置", "学习检测", "报告生成"] },
  { title: "学员端", text: "面向学员日常学习训练", icon: GraduationCap, points: ["单词训练", "抗遗忘复习", "每日打卡", "词汇检测"] },
  { title: "家长端", text: "面向家长效果感知与续费", icon: MonitorSmartphone, points: ["学习报告", "学习进度", "打卡情况", "效果反馈"] }
];

const features: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "单词训练", text: "按词库、课程和任务完成高频训练。", icon: BookOpenCheck },
  { title: "抗遗忘复习", text: "结合学习记录自动安排复习节奏。", icon: Repeat2 },
  { title: "每日打卡", text: "帮助校区建立持续学习习惯。", icon: ClipboardCheck },
  { title: "短语训练", text: "从单词拓展到常用短语应用。", icon: BookText },
  { title: "语法学习", text: "配合单词课程补齐基础语法。", icon: Brain },
  { title: "口语练习", text: "支持发音跟读和口语强化训练。", icon: Mic2 },
  { title: "阅读练习", text: "用阅读场景提升词汇迁移能力。", icon: LineChart },
  { title: "音标学习", text: "夯实拼读、发音和记忆基础。", icon: Headphones },
  { title: "词汇量检测", text: "课前课后量化评估学习结果。", icon: BarChart3 }
];

const supportItems = ["系统功能培训", "上课流程培训", "教研指导方案", "机构招生方案", "配套营销活动方案", "营销素材支持", "系统迭代免费升级", "售后问题处理", "运营陪跑指导"];
const onsiteItems = ["上门教研升级", "上门招生策划", "上门活动策划", "校区运营指导", "团队执行落地"];
const process = ["咨询沟通", "产品演示", "确认方案", "系统培训", "上线开课", "运营陪跑"];

const plans = [
  { key: "half" as PlanKey, name: "启动版", price: 5800, display: "5800 元", period: "/ 半年", tag: "快速开课", note: "适合单校区低成本验证项目", features: ["机构自由定价", "系统功能培训", "上课流程培训", "教研指导方案", "机构招生方案", "提供营销素材", "系统迭代免费升级", "售后问题处理"] },
  { key: "year" as PlanKey, name: "增长版", price: 8800, display: "8800 元", period: "/ 年", tag: "推荐套餐", note: "适合希望系统化交付和提升续费的机构", features: ["机构自由定价", "系统功能培训", "上课流程培训", "教研指导方案", "机构招生方案", "配套营销活动方案", "提供营销素材", "系统迭代免费升级", "售后问题处理"], featured: true },
  { key: "forever" as PlanKey, name: "旗舰版", price: 49800, display: "49800 元", period: "/ 永久使用", tag: "永久授权", note: "适合新店、多校区和需要上门落地支持的机构", features: ["机构自由定价", "系统功能培训", "上课流程培训", "上门教研升级", "上门策划招生", "上门策划活动", "提供营销素材", "系统迭代免费升级", "机构活动策划", "售后专属客服", "新店 / 增加门店选址", "运营陪跑指导"] }
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

function yuan(value: number) {
  return Math.round(value).toLocaleString("zh-CN");
}

export function SaasLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#061225] text-white">
      <Header />
      <HeroSection />
      <PainPointsSection />
      <ProductSystemSection />
      <FeaturesSection />
      <TeachingModesSection />
      <VideoDemoSection />
      <SupportSection />
      <ROICalculatorSection />
      <PricingSection />
      <OnsiteSupportSection />
      <ProcessSection />
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061225]/72 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-[min(1200px,calc(100%-32px))] items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
          <img src="/images/logo.png" alt="慧拼读单词系统" className="h-10 w-auto object-contain" />
          <span className="text-base font-black tracking-wide">慧拼读单词系统</span>
        </button>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 lg:flex">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="transition hover:text-white">{label}</button>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <CtaButton variant="ghost" onClick={() => scrollTo("pricing")}>查看产品方案</CtaButton>
          <CtaButton onClick={() => scrollTo("lead")}>立即预约演示</CtaButton>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#061225]/96 px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => { setOpen(false); scrollTo(id); }} className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-200 hover:bg-white/8">{label}</button>
            ))}
            <button onClick={() => { setOpen(false); scrollTo("lead"); }} className="rounded-lg bg-[#FF8A00] px-4 py-3 text-sm font-black text-white">立即预约演示</button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  return (
    <section id="hero" className="relative min-h-screen pt-24">
      <ParticleField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(47,123,255,0.36),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(100,210,255,0.22),transparent_25rem),linear-gradient(180deg,#061225_0%,#081A36_55%,#F7FAFF_100%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] w-[min(1200px,calc(100%-32px))] items-center gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-[#A9D8FF] backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#FFB020]" />
            面向英语培训机构的智能单词学习与教学系统
          </div>
          <h1 className="max-w-3xl text-[2.8rem] font-black leading-[1.04] tracking-[-0.01em] sm:text-6xl lg:text-[4.65rem]">让英语培训机构快速拥有自己的智能单词课程</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">一套覆盖机构端、交付中心（教练端）、学员端、家长端的英语单词学习系统，帮助机构快速开课、提升续费率、降低运营成本。</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton size="lg" onClick={() => scrollTo("lead")}>立即预约演示</CtaButton>
            <CtaButton size="lg" variant="glass" onClick={() => scrollTo("pricing")}>查看产品方案</CtaButton>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sellingPoints.map((item) => (
              <div key={item} className="rounded-lg border border-white/12 bg-white/8 px-4 py-3 text-center text-sm font-black text-white backdrop-blur">{item}</div>
            ))}
          </div>
        </motion.div>
        <motion.div style={{ y }} className="relative">
          <DeviceShowcase />
        </motion.div>
      </div>
    </section>
  );
}

function DeviceShowcase() {
  return (
    <div className="relative mx-auto max-w-[650px]">
      <div className="absolute -inset-10 rounded-full bg-[#2F7BFF]/25 blur-3xl" />
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative rounded-[22px] border border-white/14 bg-[#0A1832]/88 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="mb-2 flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <img src="/images/system-dashboard.png" alt="慧拼读系统数据看板" className="aspect-[16/10] w-full rounded-xl object-cover" />
      </motion.div>
      <FloatCard className="-left-4 top-10" title="学习进度" value="86%" icon={Gauge} />
      <FloatCard className="-right-2 top-24" title="续费线索" value="+42%" icon={TrendingUp} />
      <FloatCard className="bottom-4 left-8" title="四端协同" value="在线" icon={MonitorSmartphone} />
      <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-10 right-4 w-28 rounded-[24px] border border-white/16 bg-[#07152D] p-2 shadow-2xl sm:w-36">
        <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-white/30" />
        <img src="/images/student-report-mobile.png" alt="学员端与家长报告" className="rounded-[18px]" />
      </motion.div>
    </div>
  );
}

function FloatCard({ className, title, value, icon: Icon }: { className: string; title: string; value: string; icon: LucideIcon }) {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className={`absolute hidden rounded-lg border border-white/16 bg-white/12 p-4 shadow-2xl backdrop-blur-xl sm:block ${className}`}>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#2F7BFF]"><Icon className="h-5 w-5" /></span>
        <div>
          <p className="text-xs text-slate-300">{title}</p>
          <p className="text-xl font-black">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PainPointsSection() {
  return (
    <DarkSection id="pain" eyebrow="机构增长痛点" title="为什么机构需要慧拼读单词系统？" subtitle="把传统机构难以标准化、难以感知、难以续费的问题，转化为可交付、可视化、可运营的课程体系。">
      <div className="grid items-center gap-5 lg:grid-cols-[1fr_120px_1fr]">
        <CompareCard title="传统机构痛点" items={pains} tone="danger" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl font-black text-[#FFB020] shadow-[0_0_60px_rgba(255,138,0,0.35)]">
          VS
        </motion.div>
        <CompareCard title="使用慧拼读后" items={gains} tone="success" />
      </div>
    </DarkSection>
  );
}

function ProductSystemSection() {
  return (
    <LightSection id="system" eyebrow="四端产品体系" title="四端产品体系，全方位赋能机构教学" subtitle="校长、老师、学员、家长各有清晰工作台，课程交付不再依赖单点经验。">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((item, index) => (
          <MotionCard key={item.title} delay={index * 0.08} className="group min-h-[310px] bg-white/78">
            <div className="mb-6 flex items-center justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br from-[#E8F2FF] to-white text-[#165DFF] shadow-inner">
                <item.icon className="h-7 w-7" />
              </span>
              <span className="text-sm font-black text-[#94A3B8]">0{index + 1}</span>
            </div>
            <h3 className="text-2xl font-black text-[#07152D]">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            <div className="mt-6 grid gap-2">
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
    <LightSection id="features" eyebrow="九大学习功能" title="九大学习功能，覆盖英语学习全场景" subtitle="围绕单词学习的训练、复习、检测、打卡、报告持续闭环。">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
          <MotionCard key={item.title} delay={index * 0.04} className="flex items-start gap-4 bg-white/82 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#EAF3FF] text-[#165DFF]">
              <item.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-black text-[#07152D]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          </MotionCard>
        ))}
      </div>
      <div className="mt-10 text-center">
        <CtaButton onClick={() => scrollTo("lead")}>获取产品方案</CtaButton>
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
          <motion.article key={mode.title} whileHover={{ y: -8 }} className="overflow-hidden rounded-lg border border-white/12 bg-white/8 shadow-2xl backdrop-blur">
            <div className="relative h-72 overflow-hidden">
              <img src={mode.image} alt={mode.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#061225] to-transparent" />
              <h3 className="absolute bottom-6 left-6 text-3xl font-black">{mode.title}</h3>
            </div>
            <div className="p-6">
              <p className="leading-7 text-slate-300">{mode.text}</p>
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
    <DarkSection id="video" eyebrow="产品演示视频" title="3分钟看懂慧拼读单词系统如何上课" subtitle="从机构管理、教练上课、学员训练到家长报告，一条完整学习闭环清晰展示。">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-[18px] border border-[#3D8BFF]/30 bg-[#091B3A] p-3 shadow-[0_0_120px_rgba(47,123,255,0.25)]">
          <div className="absolute -inset-4 rounded-[26px] bg-[#2F7BFF]/18 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl bg-black">
            <img src="/images/system-dashboard.png" alt="系统演示视频封面" className="aspect-video w-full object-cover opacity-74" />
            <div className="absolute inset-0 grid place-items-center">
              <button className="group grid h-20 w-20 place-items-center rounded-full bg-white text-[#165DFF] shadow-[0_0_0_18px_rgba(47,123,255,0.20)] transition hover:scale-105">
                <Play className="ml-1 h-9 w-9 fill-current" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["四端协同", "课堂教学流程", "学习报告同步家长端"].map((item) => <GlassPill key={item}>{item}</GlassPill>)}
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
    <LightSection id="support" eyebrow="总部赋能" title="不只是系统，更是全方位运营支持" subtitle="慧拼读不只是提供软件系统，还为机构提供从开课、招生、教研、运营到售后的完整支持。">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {supportItems.map((item, index) => (
          <MotionCard key={item} delay={index * 0.04} className="bg-white/82 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#EAF3FF] text-[#165DFF]"><CheckCircle2 className="h-5 w-5" /></span>
              <h3 className="font-black text-[#07152D]">{item}</h3>
            </div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function ROICalculatorSection() {
  const [current, setCurrent] = useState(80);
  const [signup, setSignup] = useState(30);
  const [fee, setFee] = useState(1280);
  const [weeks, setWeeks] = useState(12);
  const [teacherCost, setTeacherCost] = useState(4200);
  const [plan, setPlan] = useState<PlanKey>("year");
  const selectedPlan = plans.find((item) => item.key === plan) || plans[1];
  const result = useMemo(() => {
    const revenue = signup * fee;
    const grossProfit = Math.max(0, revenue - teacherCost - selectedPlan.price);
    const classProfit = Math.max(0, signup * fee - teacherCost);
    const payback = classProfit > 0 ? Math.max(0.2, selectedPlan.price / classProfit) : 0;
    const roi = selectedPlan.price > 0 ? grossProfit / selectedPlan.price : 0;
    const base = Math.max(1, revenue / Math.max(1, weeks));
    const chart = Array.from({ length: 6 }, (_, index) => ({ name: `${index + 1}期`, value: Math.round(base * (index + 1) * 0.72 + current * 28) }));
    return { revenue, grossProfit, classProfit, payback, roi, chart };
  }, [current, signup, fee, weeks, teacherCost, selectedPlan.price]);

  return (
    <LightSection id="roi" eyebrow="ROI 收益测算" title="测一测：开通慧拼读后，机构多久可以回本？" subtitle="输入你的校区数据，系统自动测算预计收入、利润空间和回本周期。">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <MotionCard className="bg-white/86">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="当前学员数量" value={current} onChange={setCurrent} />
            <NumberInput label="预计报名人数" value={signup} onChange={setSignup} />
            <NumberInput label="单个学员收费" value={fee} onChange={setFee} prefix="￥" />
            <NumberInput label="课程周期（周）" value={weeks} onChange={setWeeks} />
            <NumberInput label="老师课时成本" value={teacherCost} onChange={setTeacherCost} prefix="￥" />
            <label className="text-sm font-bold text-[#28517A]">选择套餐
              <select value={plan} onChange={(event) => setPlan(event.target.value as PlanKey)} className="mt-2 h-12 w-full rounded-lg border border-[#D9E6F7] bg-white px-3 text-[#07152D] outline-none focus:border-[#165DFF]">
                <option value="half">5800 半年</option>
                <option value="year">8800 一年</option>
                <option value="forever">49800 永久授权</option>
              </select>
            </label>
          </div>
          <p className="mt-5 rounded-lg bg-[#F1F6FF] p-4 text-xs leading-6 text-slate-500">以上测算仅为示例，具体收益会根据机构定价、招生能力和当地市场情况变化。</p>
          <div className="mt-6">
            <CtaButton onClick={() => scrollTo("lead")}>获取我的专属盈利方案</CtaButton>
          </div>
        </MotionCard>
        <MotionCard className="bg-[#07152D] text-white">
          <div className="grid gap-4 sm:grid-cols-2">
            <Metric label="预计总收入" value={`￥${yuan(result.revenue)}`} />
            <Metric label="预计毛利润" value={`￥${yuan(result.grossProfit)}`} highlight />
            <Metric label="单个班级收益" value={`￥${yuan(result.classProfit)}`} />
            <Metric label="回本周期" value={`${result.payback.toFixed(1)} 个班`} highlight />
            <Metric label="推荐套餐" value={selectedPlan.display} />
            <Metric label="预计 ROI 倍数" value={`${Math.max(0, result.roi).toFixed(1)}x`} highlight />
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[170px_1fr]">
            <div className="relative mx-auto grid h-40 w-40 place-items-center rounded-full bg-[conic-gradient(#2F7BFF_0_74%,rgba(255,255,255,0.12)_74%_100%)]">
              <div className="grid h-28 w-28 place-items-center rounded-full bg-[#07152D] text-center">
                <span className="text-3xl font-black text-[#FFB020]">{Math.min(99, Math.round(Math.max(0, result.roi) * 35))}%</span>
                <span className="-mt-7 text-xs text-slate-400">收益进度</span>
              </div>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.chart}>
                  <defs>
                    <linearGradient id="roiGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#4D9CFF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4D9CFF" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="#8BA4C3" fontSize={12} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: "#0A1832", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "#fff" }} />
                  <Area type="monotone" dataKey="value" stroke="#64D2FF" fill="url(#roiGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionCard>
      </div>
    </LightSection>
  );
}

function PricingSection() {
  return (
    <DarkSection id="pricing" eyebrow="套餐价格" title="三档套餐，灵活选择，价值保障" subtitle="机构可结合校区阶段、预算和落地需求选择合作方式。">
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <motion.article key={plan.key} whileHover={{ y: -10, scale: 1.01 }} className={`relative rounded-lg border p-6 shadow-2xl backdrop-blur ${plan.featured ? "border-[#64D2FF] bg-[#123A76] ring-2 ring-[#64D2FF]/30" : "border-white/12 bg-white/8"}`}>
            {plan.featured ? <span className="absolute -top-4 left-6 rounded-full bg-[#FF8A00] px-4 py-2 text-xs font-black text-white">推荐套餐</span> : null}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-300">{plan.note}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[#A9D8FF]">{plan.tag}</span>
            </div>
            <p className="mt-7 text-4xl font-black text-white">{plan.display}<span className="text-base font-bold text-slate-300"> {plan.period}</span></p>
            <ul className="mt-7 space-y-3">
              {plan.features.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
            <button onClick={() => scrollTo("lead")} className={`mt-8 w-full rounded-lg px-5 py-3 text-sm font-black transition ${plan.featured ? "bg-[#FF8A00] text-white hover:bg-[#F07B00]" : "bg-white text-[#165DFF] hover:bg-[#EAF3FF]"}`}>立即咨询</button>
          </motion.article>
        ))}
      </div>
    </DarkSection>
  );
}

function OnsiteSupportSection() {
  return (
    <LightSection id="onsite" eyebrow="总部上门落地" title="总部上门落地，执行到位效果更好" subtitle="49800 套餐的上门权益由总部具备多年校区运营经验的老师团队上门指导，协助机构完成招生、教研、活动和运营落地执行。">
      <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr]">
        <MotionCard className="bg-white/86">
          <div className="grid gap-4 sm:grid-cols-2">
            {onsiteItems.map((item) => (
              <div key={item} className="rounded-lg bg-[#F1F6FF] p-4">
                <CheckCircle2 className="mb-3 h-6 w-6 text-[#165DFF]" />
                <h3 className="font-black text-[#07152D]">{item}</h3>
              </div>
            ))}
          </div>
        </MotionCard>
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-[#2F7BFF]/15 blur-3xl" />
          <img src="/images/consulting-realistic.png" alt="总部顾问团队与运营数据看板" className="relative rounded-[18px] shadow-[0_34px_90px_rgba(12,42,92,0.24)]" />
        </div>
      </div>
    </LightSection>
  );
}

function ProcessSection() {
  return (
    <DarkSection id="process" eyebrow="合作流程" title="合作流程清晰，最快快速上线开课" subtitle="从咨询到上线开课，每一步都有清晰交付和支持。">
      <div className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div className="absolute left-8 right-8 top-10 hidden h-0.5 bg-gradient-to-r from-[#2F7BFF] via-[#64D2FF] to-[#FF8A00] lg:block" />
        {process.map((item, index) => (
          <motion.div key={item} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative rounded-lg border border-white/12 bg-white/8 p-5 text-center backdrop-blur">
            <span className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#165DFF] text-sm font-black">{index + 1}</span>
            <h3 className="font-black">{item}</h3>
          </motion.div>
        ))}
      </div>
    </DarkSection>
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
  const [form, setForm] = useState<LeadForm>({ org: "", name: "", phone: "", wechat: "", city: "", students: "", plan: "8800 元 / 年", message: "" });
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
          interestedPlan: form.plan,
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
    <section id="lead" className="relative bg-[#061225] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(47,123,255,0.28),transparent_28rem),radial-gradient(circle_at_90%_80%,rgba(255,138,0,0.16),transparent_24rem)]" />
      <div className="relative mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 lg:grid-cols-[1fr_0.86fr]">
        <div>
          <p className="text-sm font-black text-[#64D2FF]">预约产品演示</p>
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">预约产品演示，获取专属合作方案</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">留下联系方式，我们将为你提供系统演示和机构专属落地方案。</p>
          <form onSubmit={submit} className="mt-8 grid gap-4 rounded-lg border border-white/12 bg-white/8 p-5 backdrop-blur sm:grid-cols-2">
            <TextInput label="机构名称" value={form.org} onChange={(value) => setForm({ ...form, org: value })} />
            <TextInput label="联系人" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            <TextInput label="手机号" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
            <TextInput label="微信号" value={form.wechat} onChange={(value) => setForm({ ...form, wechat: value })} />
            <TextInput label="所在城市" value={form.city} onChange={(value) => setForm({ ...form, city: value })} />
            <TextInput label="当前学员数量" value={form.students} onChange={(value) => setForm({ ...form, students: value })} />
            <label className="text-sm font-bold text-slate-200">感兴趣套餐
              <select value={form.plan} onChange={(event) => setForm({ ...form, plan: event.target.value })} className="mt-2 h-12 w-full rounded-lg border border-white/12 bg-white px-3 text-[#07152D] outline-none focus:border-[#64D2FF]">
                <option>5800 元 / 半年</option>
                <option>8800 元 / 年</option>
                <option>49800 元 / 永久使用</option>
                <option>49800 上门落地方案</option>
              </select>
            </label>
            <label className="text-sm font-bold text-slate-200 sm:col-span-2">备注
              <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 min-h-28 w-full rounded-lg border border-white/12 bg-white px-3 py-3 text-[#07152D] outline-none focus:border-[#64D2FF]" placeholder="可填写校区情况、想了解的套餐或演示时间" />
            </label>
            {error ? <p className="rounded-lg bg-red-500/12 p-3 text-sm font-bold text-red-200 sm:col-span-2">{error}</p> : null}
            {status === "success" ? <p className="rounded-lg bg-emerald-500/12 p-3 text-sm font-bold text-emerald-200 sm:col-span-2">提交成功，我们将尽快与您联系。</p> : null}
            {status === "error" ? <p className="rounded-lg bg-red-500/12 p-3 text-sm font-bold text-red-200 sm:col-span-2">提交失败，请稍后再试或直接联系顾问。</p> : null}
            <button disabled={status === "loading"} className="rounded-lg bg-[#FF8A00] px-5 py-3 font-black text-white shadow-[0_18px_40px_rgba(255,138,0,0.25)] disabled:opacity-70 sm:col-span-2">{status === "loading" ? "提交中..." : "立即预约演示"}</button>
          </form>
        </div>
        <div className="relative self-center">
          <div className="absolute -inset-6 rounded-full bg-[#2F7BFF]/20 blur-3xl" />
          <img src="/images/consulting-realistic.png" alt="3D 咨询顾问人物与系统界面" className="relative rounded-[18px] shadow-[0_34px_90px_rgba(0,0,0,0.35)]" />
          <div className="relative -mt-12 ml-auto max-w-sm rounded-lg border border-white/14 bg-white/12 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-7 w-7 text-[#64D2FF]" />
              <div>
                <p className="font-black">顾问将在 24 小时内联系</p>
                <p className="mt-1 text-sm text-slate-300">系统演示、报价方案、落地路径一次讲清楚</p>
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
    <footer className="border-t border-white/10 bg-[#040B17] py-12 text-slate-400">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-white">
            <img src="/images/logo.png" alt="慧拼读单词系统" className="h-12 w-auto object-contain" />
            <span className="text-lg font-black">慧拼读单词系统</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7">面向英语培训机构的智能单词学习与教学系统，帮助机构快速开课、提升续费率、降低运营成本。</p>
          <p className="mt-6 text-xs">Copyright © 2026 慧拼读单词系统. All rights reserved.</p>
        </div>
        <FooterGroup title="产品功能" items={["机构端", "教练端", "学员端", "家长端", "ROI 测算"]} />
        <FooterGroup title="解决方案" items={["小班课一对多", "一对一教学", "招生转化", "教研交付", "运营陪跑"]} />
        <div>
          <h3 className="font-black text-white">联系方式</h3>
          <div className="mt-4 space-y-3 text-sm">
            <p>电话 / 微信：请在后台配置</p>
            <p>合作咨询：预约产品演示</p>
            <div className="grid h-24 w-24 place-items-center rounded-lg border border-white/12 bg-white/8 text-xs">二维码位置</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DarkSection({ id, eyebrow, title, subtitle, children }: { id?: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative bg-[#061225] py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(47,123,255,0.16),transparent_24rem)]" />
      <div className="relative mx-auto w-[min(1200px,calc(100%-32px))]">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} light />
        {children}
      </div>
    </section>
  );
}

function LightSection({ id, eyebrow, title, subtitle, children }: { id?: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative bg-[#F7FAFF] py-20 text-[#07152D] md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(47,123,255,0.14),transparent_26rem),linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,250,255,0))]" />
      <div className="relative mx-auto w-[min(1200px,calc(100%-32px))]">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mx-auto mb-12 max-w-3xl text-center">
      <p className={`text-sm font-black ${light ? "text-[#64D2FF]" : "text-[#165DFF]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-black leading-tight md:text-5xl ${light ? "text-white" : "text-[#07152D]"}`}>{title}</h2>
      {subtitle ? <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 ${light ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p> : null}
    </motion.div>
  );
}

function MotionCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay }} whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(22,93,255,0.16)" }} className={`rounded-lg border border-white/70 p-6 shadow-[0_16px_45px_rgba(12,42,92,0.08)] backdrop-blur ${className}`}>
      {children}
    </motion.div>
  );
}

function CompareCard({ title, items, tone }: { title: string; items: string[]; tone: "danger" | "success" }) {
  return (
    <motion.div initial={{ opacity: 0, x: tone === "danger" ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-lg border border-white/12 bg-white/8 p-6 backdrop-blur">
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 px-4 py-3">
            <span className={`h-2.5 w-2.5 rounded-full ${tone === "danger" ? "bg-[#FF6B6B]" : "bg-[#32D583]"}`} />
            <span className="text-sm font-bold text-slate-200">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CtaButton({ children, onClick, variant = "primary", size = "md" }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost" | "glass"; size?: "md" | "lg" }) {
  const styles = {
    primary: "bg-[#FF8A00] text-white shadow-[0_18px_44px_rgba(255,138,0,0.26)] hover:bg-[#F07B00]",
    ghost: "border border-white/14 bg-white/8 text-white hover:bg-white/14",
    glass: "border border-white/18 bg-white/10 text-white backdrop-blur hover:bg-white/16"
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-lg font-black transition ${size === "lg" ? "min-h-13 px-6 py-4 text-base" : "min-h-11 px-5 py-3 text-sm"} ${styles[variant]}`}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm font-semibold text-slate-200">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#64D2FF]" />
      <span>{children}</span>
    </div>
  );
}

function GlassPill({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-white/12 bg-white/8 px-5 py-4 text-center font-black text-slate-100 backdrop-blur">{children}</div>;
}

function NumberInput({ label, value, onChange, prefix }: { label: string; value: number; onChange: (value: number) => void; prefix?: string }) {
  return (
    <label className="text-sm font-bold text-[#28517A]">{label}
      <div className="mt-2 flex h-12 items-center rounded-lg border border-[#D9E6F7] bg-white px-3 focus-within:border-[#165DFF]">
        {prefix ? <span className="mr-1 text-slate-400">{prefix}</span> : null}
        <input inputMode="numeric" value={value === 0 ? "" : String(value)} onChange={(event) => onChange(Number(event.target.value.replace(/\D/g, "")) || 0)} className="w-full bg-transparent text-[#07152D] outline-none" />
      </div>
    </label>
  );
}

function Metric({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <motion.div key={value} initial={{ opacity: 0.5, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg border border-white/10 bg-white/8 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-black ${highlight ? "text-[#FFB020]" : "text-white"}`}>{value}</p>
    </motion.div>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-200">{label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-lg border border-white/12 bg-white px-3 text-[#07152D] outline-none focus:border-[#64D2FF]" />
    </label>
  );
}

function FooterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-4 grid gap-3 text-sm">
        {items.map((item) => <button key={item} onClick={() => scrollTo("lead")} className="text-left transition hover:text-white">{item}</button>)}
      </div>
    </div>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {Array.from({ length: 28 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-[#64D2FF]/70"
          style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%` }}
          animate={{ opacity: [0.15, 0.9, 0.15], y: [0, -22, 0] }}
          transition={{ duration: 3 + (index % 5), repeat: Infinity, delay: index * 0.13 }}
        />
      ))}
    </div>
  );
}

function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-white/10 bg-[#061225]/92 p-3 backdrop-blur lg:hidden">
      <button onClick={() => scrollTo("lead")} className="rounded-lg bg-[#FF8A00] py-3 text-sm font-black text-white">预约演示</button>
      <button onClick={() => scrollTo("roi")} className="rounded-lg border border-[#64D2FF] py-3 text-sm font-black text-[#A9D8FF]">收益测算</button>
    </div>
  );
}
