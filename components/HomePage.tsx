import Image from "next/image";
import { homeCopy } from "@/content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SectionHeading } from "./SectionHeading";

const moduleNav = [
  { label: "慧拼读是什么", href: "#what" },
  { label: "适合谁使用", href: "#audience" },
  { label: "课程体系", href: "#curriculum" },
  { label: "核心优势", href: "#advantages" },
  { label: "适合机构", href: "#institutions" },
  { label: "联系我们", href: "#contact" }
];

export function HomePage() {
  const { hero, what, audience, curriculum, advantages, institutions, contact } = homeCopy;

  return (
    <main className="home-motion min-h-screen overflow-hidden bg-[#f7fbff]">
      <Header />

      <section className="border-b border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#eef7ff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-16 lg:pt-14">
          <div>
            <p className="inline-flex rounded-full bg-[#fff2cc] px-4 py-2 text-sm font-black text-[#095daf]">
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-normal text-[#061b3b] sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[#334155]">{hero.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-[#095daf] px-7 py-4 text-center text-base font-black text-white shadow-soft transition hover:bg-[#074b8d]"
                href="#curriculum"
              >
                {hero.primaryCta}
              </a>
              <a
                className="rounded-full border border-[#095daf]/25 bg-white px-7 py-4 text-center text-base font-black text-[#095daf] transition hover:border-[#095daf] hover:bg-[#eef7ff]"
                href="#contact"
              >
                {hero.secondaryCta}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-[#dcecff] bg-white p-4 shadow-sm">
                  <div className="text-xl font-black text-[#095daf]">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold leading-5 text-[#475569]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#dcecff] bg-white p-3 shadow-soft">
            <Image
              src="/images/brand/system-overview.png"
              alt="慧拼读单词学习系统介绍海报"
              width={1280}
              height={1407}
              className="max-h-[620px] w-full rounded-[1rem] object-cover object-top"
              priority
            />
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-8 lg:px-8">
          {moduleNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[#dcecff] bg-white px-4 py-2 text-sm font-bold text-[#095daf]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section id="what" className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5a400]">Module 01</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-[#061b3b] sm:text-4xl">{what.title}</h2>
            <p className="mt-5 text-base leading-8 text-[#475569]">{what.description}</p>
            <div className="mt-8 grid gap-3">
              {what.points.map((point) => (
                <div key={point} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] px-5 py-4 text-base font-bold text-[#12325f]">
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.25rem] bg-[#eef7ff] p-3">
            <Image
              src="/images/brand/advantages.png"
              alt="慧拼读单词学习系统优势介绍"
              width={1242}
              height={1354}
              className="w-full rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      <section id="audience" className="bg-[#f7fbff] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Module 02"
            title={audience.title}
            description="围绕孩子、家长、老师和机构四类角色设计使用路径，让学习训练、成长反馈和经营管理同步发生。"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audience.items.map((item) => (
              <article key={item.title} className="rounded-lg border border-[#dcecff] bg-white p-6 shadow-sm">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#095daf] text-lg font-black text-white">
                  {item.title.slice(0, 1)}
                </div>
                <h3 className="text-xl font-black tracking-normal text-[#061b3b]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#475569]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="order-2 rounded-[1.25rem] bg-[#eef7ff] p-3 lg:order-1">
            <Image
              src="/images/brand/curriculum-system-classroom.png"
              alt="慧拼读训练系统课堂界面展示"
              width={1792}
              height={1024}
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-sm"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5a400]">Module 03</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-[#061b3b] sm:text-4xl">{curriculum.title}</h2>
            <p className="mt-5 text-base leading-8 text-[#475569]">{curriculum.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {curriculum.levels.map((level) => (
                <div key={level} className="rounded-lg bg-[#f7fbff] px-5 py-4 text-sm font-black text-[#095daf]">
                  {level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="advantages" className="bg-[#f7fbff] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Module 04" title={advantages.title} description="用系统能力支撑教学与运营，让英语教学更简单，让机构运营更轻松。" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {advantages.items.map((item) => (
              <div key={item} className="rounded-lg border border-[#dcecff] bg-white p-6 shadow-sm">
                <div className="h-1.5 w-12 rounded-full bg-[#f5a400]" />
                <p className="mt-5 text-base font-black leading-8 text-[#12325f]">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-[1.25rem] bg-white p-3 shadow-sm">
            <Image
              src="/images/brand/advantages-english-system.png"
              alt="慧拼读英语系统全场景解决方案"
              width={1280}
              height={1168}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section id="institutions" className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5a400]">Module 05</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-[#061b3b] sm:text-4xl">{institutions.title}</h2>
            <p className="mt-5 text-base leading-8 text-[#475569]">{institutions.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {institutions.items.map((item) => (
                <div key={item} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] px-5 py-4 text-sm font-black text-[#12325f]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image
              src="/images/brand/cooperation-system-partners.png"
              alt="慧拼读合作加盟系统方案"
              width={1452}
              height={1080}
              className="w-full rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#061b3b] px-5 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffd166]">Module 06</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">{contact.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/76">{contact.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-3 text-center text-[#061b3b] shadow-soft">
              <Image
                src="/images/brand/qr-wang.png"
                alt="王老师微信二维码"
                width={180}
                height={180}
                className="mx-auto h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
              />
              <div className="mt-3 text-sm font-black">王老师</div>
              <div className="mt-1 text-xs font-semibold text-[#475569]">17095752608</div>
            </div>
            <div className="rounded-lg bg-white p-3 text-center text-[#061b3b] shadow-soft">
              <Image
                src="/images/brand/qr-jiang.png"
                alt="蒋老师微信二维码"
                width={180}
                height={180}
                className="mx-auto h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
              />
              <div className="mt-3 text-sm font-black">蒋老师</div>
              <div className="mt-1 text-xs font-semibold text-[#475569]">15715659761</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
