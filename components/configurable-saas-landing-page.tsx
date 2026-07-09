"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
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
  Mic2,
  MonitorSmartphone,
  Play,
  Presentation,
  Repeat2,
  Sparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { defaultSiteConfig, type SiteConfig } from "@/lib/site-config";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  BookOpenCheck,
  BookText,
  Brain,
  Building2,
  ClipboardCheck,
  GraduationCap,
  Headphones,
  LineChart,
  Mic2,
  MonitorSmartphone,
  Presentation,
  Repeat2
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ConfigurableSaasLandingPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    fetch("/api/site-config", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("site config request failed");
        }
        return response.json();
      })
      .then((result: { data?: SiteConfig }) => setConfig(isValidSiteConfig(result.data) ? result.data : defaultSiteConfig))
      .catch(() => setConfig(defaultSiteConfig));
  }, []);

  useEffect(() => {
    try {
      const key = "huipindu-visit-tracked";
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visit" })
      });
    } catch {
      // Analytics must never block page rendering.
    }
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7FAFF] text-[#07152D]">
      <Header config={config} />
      <HeroSection config={config} />
      <ProductSystemSection config={config} />
      <FeaturesSection config={config} />
      <TeachingModesSection config={config} />
      <VideoDemoSection config={config} />
      <SupportSection config={config} />
      <ProcessSection config={config} />
      <CasesSection config={config} />
      <FAQSection config={config} />
      <LeadFormSection config={config} />
      <Footer config={config} />
      <MobileCta config={config} />
    </main>
  );
}

function isValidSiteConfig(value: unknown): value is SiteConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<SiteConfig>;
  return Boolean(
    config.seo &&
    config.brand &&
    config.hero &&
    config.productSystem &&
    config.features &&
    config.teachingModes &&
    config.video &&
    config.support &&
    config.process &&
    config.cases &&
    config.faq &&
    config.leadForm &&
    Array.isArray(config.nav) &&
    Array.isArray(config.contacts)
  );
}

function Header({ config }: { config: SiteConfig }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#DCEBFF] bg-white/92 shadow-[0_10px_32px_rgba(22,93,255,0.08)] backdrop-blur-2xl">
      <div className="mx-auto flex h-14 w-[min(1200px,calc(100%-28px))] items-center justify-between md:h-16">
        <button onClick={() => scrollTo("hero")} className="flex min-w-0 items-center">
          <img src={config.brand.logo} alt={config.brand.name} className="h-9 w-auto shrink-0 object-contain md:h-12" />
        </button>
        <nav className="hidden items-center gap-7 text-[15px] font-black text-[#28517A] lg:flex xl:text-base">
          {config.nav.map((item) => (
            <button key={item.target} onClick={() => scrollTo(item.target)} className="relative py-2 transition hover:text-[#165DFF] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-[#165DFF] after:transition hover:after:scale-x-100">
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#DCEBFF] bg-[#F4F8FF] text-[#07152D] md:h-10 md:w-10 lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#DCEBFF] bg-white/98 px-3 py-3 shadow-[0_18px_40px_rgba(22,93,255,0.08)] lg:hidden">
          <div className="grid gap-2">
            {config.nav.map((item) => (
              <button key={item.target} onClick={() => { setOpen(false); scrollTo(item.target); }} className="rounded-lg px-4 py-3 text-left text-base font-black text-[#28517A] hover:bg-[#F1F6FF]">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection({ config }: { config: SiteConfig }) {
  return (
    <section id="hero" className="relative pt-20 lg:min-h-screen lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(47,123,255,0.16),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(100,210,255,0.16),transparent_25rem),linear-gradient(180deg,#FFFFFF_0%,#F1F7FF_58%,#F7FAFF_100%)]" />
      <div className="relative mx-auto grid w-[min(1200px,calc(100%-28px))] items-center gap-8 pb-8 md:gap-10 lg:min-h-[calc(100vh-150px)] lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center lg:text-left">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#CFE2FF] bg-white/86 px-4 py-2.5 text-xs font-black leading-5 text-[#165DFF] shadow-[0_14px_34px_rgba(22,93,255,0.10)] backdrop-blur sm:text-sm">
            <Sparkles className="h-4 w-4 text-[#2F7BFF]" />
            <span className="truncate">{config.hero.badge}</span>
          </div>
          <h1 className="mx-auto max-w-4xl font-serif text-[2.8rem] font-black leading-[1.02] tracking-normal text-[#07152D] sm:text-7xl lg:mx-0 lg:max-w-[760px] lg:text-[4.9rem] xl:text-[5.25rem]">
            <span className="block bg-gradient-to-r from-[#063B7A] via-[#165DFF] to-[#00A3FF] bg-clip-text text-transparent">{config.hero.title}</span>
            <span className="mt-3 block text-[2.05rem] leading-tight text-[#102A43] sm:text-5xl lg:text-[3.25rem] xl:text-[3.45rem]">{config.hero.titleSuffix}</span>
          </h1>
          <div className="mx-auto mt-5 max-w-2xl rounded-[22px] border border-[#CFE2FF] bg-white/74 px-5 py-4 shadow-[0_18px_48px_rgba(22,93,255,0.10)] backdrop-blur lg:mx-0">
            <p className="text-2xl font-black leading-tight text-[#165DFF] sm:text-3xl">{config.hero.slogan}</p>
            <p className="mt-3 text-base font-medium leading-7 text-[#385878] sm:text-lg sm:leading-8 lg:max-w-[620px]">{config.hero.description}</p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:justify-start">
            <CtaButton size="lg" onClick={() => scrollTo(config.hero.primaryTarget)}>{config.hero.primaryButton}</CtaButton>
          </div>
          <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 lg:mx-0">
            {config.hero.stats.map((item) => (
              <div key={item.label} className="rounded-[22px] border border-[#CFE2FF] bg-white/82 px-5 py-5 text-center shadow-[0_20px_48px_rgba(22,93,255,0.11)] backdrop-blur">
                <p className="text-4xl font-black tracking-tight text-[#165DFF] md:text-5xl">{item.value}</p>
                <p className="mt-2 text-sm font-black text-[#28517A] md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {config.hero.scenes.map((item) => (
              <div key={item} className="rounded-full border border-[#CFE2FF] bg-white/78 px-4 py-3 text-center text-xs font-black text-[#28517A] shadow-[0_12px_28px_rgba(22,93,255,0.08)] backdrop-blur md:text-sm">{item}</div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="relative mx-auto max-w-[860px] pt-4">
            <div className="absolute inset-x-8 bottom-2 h-24 rounded-[50%] bg-[#165DFF]/12 blur-2xl" />
            <img src={config.hero.image} alt={config.brand.name} className="relative z-10 h-auto w-full object-contain" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductSystemSection({ config }: { config: SiteConfig }) {
  return (
    <LightSection id="system" data={config.productSystem}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {config.productSystem.items.map((item, index) => {
          const Icon = iconMap[item.icon] ?? Building2;
          return (
            <MotionCard key={item.title} delay={index * 0.08} className="group bg-white/82 p-5 md:min-h-[330px] md:p-6">
              <div className="mb-5 flex items-center justify-between md:mb-7">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-[#E8F2FF] to-white text-[#165DFF] shadow-inner md:h-14 md:w-14"><Icon className="h-5 w-5 md:h-7 md:w-7" /></span>
                <span className="text-sm font-black text-[#8FB7FF]">0{index + 1}</span>
              </div>
              <h3 className="break-words text-xl font-black leading-[1.18] tracking-tight text-[#07152D] md:text-[1.45rem]">{item.title}</h3>
              <p className="mt-3 min-h-12 text-sm font-medium leading-6 text-[#526B86]">{item.text}</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-6 md:grid-cols-1">
                {item.points.map((point) => <span key={point} className="rounded-lg bg-[#F1F6FF] px-3.5 py-2.5 text-sm font-black leading-5 text-[#165DFF]">{point}</span>)}
              </div>
            </MotionCard>
          );
        })}
      </div>
    </LightSection>
  );
}

function FeaturesSection({ config }: { config: SiteConfig }) {
  return (
    <LightSection id="features" data={config.features}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {config.features.items.map((item, index) => {
          const Icon = iconMap[item.icon] ?? BookOpenCheck;
          return (
            <MotionCard key={item.title} delay={index * 0.04} className="flex items-start gap-3 bg-white/86 p-4 md:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#EAF3FF] text-[#165DFF] sm:h-12 sm:w-12"><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></span>
              <div><h3 className="text-base font-black tracking-tight text-[#07152D] sm:text-lg">{item.title}</h3><p className="mt-1 text-xs font-medium leading-5 text-[#526B86] sm:mt-2 sm:text-sm sm:leading-6">{item.text}</p></div>
            </MotionCard>
          );
        })}
      </div>
    </LightSection>
  );
}

function TeachingModesSection({ config }: { config: SiteConfig }) {
  return (
    <LightSection id="modes" data={config.teachingModes}>
      <div className="grid gap-5 lg:grid-cols-2">
        {config.teachingModes.items.map((mode) => (
          <MotionCard key={mode.title} className="overflow-hidden bg-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EAF3FF]">
              <img src={mode.image} alt={mode.title} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07152D]/65 via-[#07152D]/22 to-transparent" />
              <h3 className="absolute bottom-4 left-4 rounded-xl border border-white/70 bg-white/88 px-4 py-2 text-2xl font-black tracking-tight text-[#07152D] shadow-[0_14px_34px_rgba(7,21,45,0.18)] backdrop-blur md:bottom-6 md:left-6 md:text-3xl">{mode.title}</h3>
            </div>
            <div className="p-5 md:p-7"><p className="text-sm font-medium leading-7 text-[#526B86] md:max-w-[560px] md:text-base">{mode.text}</p><div className="mt-5 grid grid-cols-2 gap-3">{mode.points.map((point) => <Bullet key={point}>{point}</Bullet>)}</div></div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function VideoDemoSection({ config }: { config: SiteConfig }) {
  return (
    <LightSection id="video" data={config.video}>
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[24px] border border-[#CFE2FF] bg-[#07152D] p-2 shadow-[0_28px_80px_rgba(22,93,255,0.22)] md:rounded-[32px] md:p-3">
          {config.video.url ? (
            <video
              src={config.video.url}
              poster={config.video.cover}
              controls
              onPlay={() => {
                void fetch("/api/analytics", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ type: "video" })
                });
              }}
              className="aspect-video w-full rounded-[18px] bg-black object-cover md:rounded-[24px]"
            />
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-[18px] md:rounded-[24px]"><img src={config.video.cover} alt={config.video.title} className="h-full w-full object-cover opacity-80" /><button className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#165DFF] shadow-[0_0_0_12px_rgba(47,123,255,0.18)] md:h-20 md:w-20"><Play className="ml-1 h-7 w-7 fill-current md:h-9 md:w-9" /></button></div>
          )}
        </div>
      </div>
    </LightSection>
  );
}

function SupportSection({ config }: { config: SiteConfig }) {
  return <LightSection id="support" data={config.support}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{config.support.items.map((item) => <MotionCard key={item} className="flex items-center gap-3 bg-white/86 p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EAF3FF] text-[#165DFF]"><CheckCircle2 className="h-5 w-5" /></span><h3 className="font-black text-[#165DFF]">{item}</h3></MotionCard>)}</div></LightSection>;
}

function ProcessSection({ config }: { config: SiteConfig }) {
  return <LightSection id="process" data={config.process}><div className="grid gap-3 md:grid-cols-6">{config.process.items.map((item, index) => <MotionCard key={item} className="bg-white/86 p-4 text-center"><span className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full bg-[#165DFF] text-sm font-black text-white md:mb-4 md:h-11 md:w-11">{index + 1}</span><h3 className="text-sm font-black text-[#07152D] md:text-base">{item}</h3></MotionCard>)}</div></LightSection>;
}

function CasesSection({ config }: { config: SiteConfig }) {
  return (
    <LightSection id="cases" data={config.cases}>
      <div className="grid gap-5 lg:grid-cols-2">
        {config.cases.items.map((item) => (
          <MotionCard key={item.name} className="overflow-hidden bg-white">
            <img src={item.image} alt={item.name} className="aspect-[16/9] w-full object-cover" />
            <div className="p-5 md:p-7"><h3 className="text-xl font-black leading-tight tracking-tight text-[#07152D] md:text-2xl">{item.name}</h3><p className="mt-2 text-sm font-bold text-[#165DFF]">{item.time}</p><div className="mt-5 grid gap-2 sm:grid-cols-3">{item.metrics.map((metric) => <div key={metric} className="rounded-lg bg-[#F1F6FF] px-3 py-2 text-sm font-black leading-5 text-[#165DFF]">{metric}</div>)}</div><p className="mt-5 text-sm font-medium leading-7 text-[#526B86] md:text-[15px]">“{item.quote}”</p></div>
          </MotionCard>
        ))}
      </div>
    </LightSection>
  );
}

function FAQSection({ config }: { config: SiteConfig }) {
  const [open, setOpen] = useState(0);
  return (
    <LightSection id="faq" data={config.faq}>
      <div className="mx-auto max-w-3xl space-y-3">
        {config.faq.items.map((item, index) => (
          <div key={item.question} className="overflow-hidden rounded-lg border border-[#DCEBFF] bg-white">
            <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-[#07152D]"><span>{item.question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#165DFF] transition ${open === index ? "rotate-180" : ""}`} /></button>
            {open === index ? <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.answer}</p> : null}
          </div>
        ))}
      </div>
    </LightSection>
  );
}

function LeadFormSection({ config }: { config: SiteConfig }) {
  const fields = useMemo(() => config.leadForm.fields.filter((field) => field.visible), [config.leadForm.fields]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = fields.find((field) => field.required && !form[field.key]?.trim());
    if (missing) {
      setError(`请填写${missing.label}`);
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const response = await fetch("/api/email-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("submit failed");
      setStatus("success");
      setForm({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="lead" className="relative bg-[#F7FAFF] py-12 pb-24 text-[#07152D] md:py-20">
      <div className="mx-auto grid w-[min(1200px,calc(100%-28px))] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div><p className="text-base font-black uppercase tracking-[0.12em] text-[#165DFF] md:text-lg">{config.leadForm.eyebrow}</p><h2 className="mt-2 text-2xl font-black leading-tight tracking-tight text-[#07152D] md:mt-3 md:text-5xl">{config.leadForm.title}</h2><p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[#526B86] md:mt-5 md:text-lg md:leading-8">{config.leadForm.subtitle}</p><img src={config.leadForm.image} alt={config.leadForm.title} className="mt-8 hidden max-w-md rounded-[24px] object-cover shadow-[0_28px_70px_rgba(22,93,255,0.14)] lg:block" /></div>
        <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-[#CFE2FF] bg-white/90 p-5 shadow-[0_28px_70px_rgba(22,93,255,0.14)] backdrop-blur md:grid-cols-2 md:p-6">
          {fields.map((field) => (
            <label key={field.key} className={`text-sm font-bold text-[#28517A] ${field.type === "textarea" ? "md:col-span-2" : ""}`}>{field.label}{field.required ? <span className="text-red-500"> *</span> : null}
              {field.type === "textarea" ? <textarea value={form[field.key] ?? ""} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} className="mt-2 min-h-24 w-full rounded-lg border border-[#D9E6F7] bg-white px-3 py-3 text-[#07152D] outline-none focus:border-[#165DFF]" placeholder={field.placeholder} /> : <input type={field.type} value={form[field.key] ?? ""} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} className="mt-2 h-11 w-full rounded-lg border border-[#D9E6F7] bg-white px-3 text-[#07152D] outline-none focus:border-[#165DFF]" placeholder={field.placeholder} />}
            </label>
          ))}
          {error ? <p className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600 md:col-span-2">{error}</p> : null}
          {status === "success" ? <p className="rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700 md:col-span-2">{config.leadForm.successText}</p> : null}
          {status === "error" ? <p className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600 md:col-span-2">提交失败，请稍后再试或直接联系顾问。</p> : null}
          <button disabled={status === "loading"} className="h-11 rounded-lg bg-[#165DFF] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(22,93,255,0.22)] disabled:opacity-70 md:col-span-2">{status === "loading" ? "提交中..." : config.leadForm.submitText}</button>
        </form>
      </div>
    </section>
  );
}

function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-[#DCEBFF] bg-white py-10 text-[#526B86]">
      <div className="mx-auto grid w-[min(1200px,calc(100%-28px))] gap-8 md:grid-cols-[1.2fr_1fr]">
        <div><div className="flex items-center gap-3 text-[#07152D]"><img src={config.brand.logo} alt={config.brand.name} className="h-12 w-auto object-contain" /></div><p className="mt-4 max-w-md text-sm leading-7">{config.brand.footerIntro}</p><p className="mt-6 text-xs">{config.brand.copyright}</p></div>
        <div><h3 className="font-black text-[#07152D]">联系方式</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{config.contacts.filter((item) => item.visible).map((item) => <div key={`${item.type}-${item.label}`} className="rounded-lg border border-[#DCEBFF] bg-[#F7FAFF] p-3 text-sm"><p className="font-black text-[#165DFF]">{item.label}</p><p className="mt-1 text-[#28517A]">{item.value}</p>{item.image ? <img src={item.image} alt={item.label} className="mt-3 h-24 w-24 rounded-lg object-contain" /> : null}</div>)}</div></div>
      </div>
    </footer>
  );
}

function LightSection({ id, data, children }: { id?: string; data: { eyebrow: string; title: string; subtitle?: string }; children: React.ReactNode }) {
  return <section id={id} className="relative bg-[#F7FAFF] py-12 text-[#07152D] md:py-24"><div className="mx-auto w-[min(1200px,calc(100%-28px))]"><SectionTitle data={data} />{children}</div></section>;
}

function SectionTitle({ data }: { data: { eyebrow: string; title: string; subtitle?: string } }) {
  return <div className="mx-auto mb-8 max-w-4xl text-center md:mb-12"><p className="text-base font-black uppercase tracking-[0.12em] text-[#165DFF] md:text-lg">{data.eyebrow}</p><h2 className="mx-auto mt-2 max-w-3xl text-2xl font-black leading-[1.16] tracking-tight text-[#07152D] md:mt-3 md:text-[2.8rem] xl:text-5xl">{data.title}</h2>{data.subtitle ? <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#526B86] md:mt-5 md:text-base md:leading-7">{data.subtitle}</p> : null}</div>;
}

function CtaButton({ children, onClick, size = "md" }: { children: React.ReactNode; onClick?: () => void; size?: "md" | "lg" }) {
  return <button onClick={onClick} className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#165DFF] font-black text-white shadow-[0_18px_40px_rgba(22,93,255,0.22)] transition hover:bg-[#0F4ED8] sm:w-auto ${size === "lg" ? "min-h-11 px-5 py-3 text-sm md:min-h-13 md:px-6 md:py-4 md:text-base" : "min-h-10 px-4 py-2.5 text-sm md:min-h-11 md:px-5 md:py-3"}`}>{children}</button>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 text-sm font-semibold leading-5 text-[#28517A]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#64D2FF]" />{children}</div>;
}

function MotionCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={`rounded-lg border border-[#DCEBFF] shadow-[0_18px_44px_rgba(22,93,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(22,93,255,0.14)] ${className}`}>{children}</motion.div>;
}

function MobileCta({ config }: { config: SiteConfig }) {
  return <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#DCEBFF] bg-white/94 p-3 shadow-[0_-12px_32px_rgba(22,93,255,0.10)] backdrop-blur lg:hidden"><button onClick={() => scrollTo(config.hero.primaryTarget)} className="h-11 rounded-lg bg-[#165DFF] text-sm font-black text-white">{config.hero.primaryButton}</button><button onClick={() => scrollTo("lead")} className="h-11 rounded-lg border border-[#BFD9FF] text-sm font-black text-[#165DFF]">咨询</button></div>;
}
