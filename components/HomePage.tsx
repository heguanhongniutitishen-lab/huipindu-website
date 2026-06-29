import Image from "next/image";
import { homeCopy, siteImages } from "@/content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeroGallery } from "./HeroGallery";
import { CurriculumDetails } from "./CurriculumDetails";
import { SectionHeading } from "./SectionHeading";

const moduleNav = [
  { label: "慧拼读是什么", href: "#what" },
  { label: "课程体系", href: "#curriculum" },
  { label: "核心优势", href: "#advantages" },
  { label: "视频展示", href: "#video" },
  { label: "适合机构", href: "#institutions" },
  { label: "联系我们", href: "#contact" }
];

export function HomePage() {
  const { hero, what, curriculum, advantages, institutions, contact } = homeCopy;

  return (
    <main className="home-motion min-h-screen overflow-hidden bg-[#f7fbff]">
      <Header />

      <section className="border-b border-[#dcecff] bg-[radial-gradient(circle_at_85%_10%,rgba(255,209,102,0.28),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(9,93,175,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#eef7ff_100%)]">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 px-4 pb-12 pt-9 sm:px-6 lg:min-h-[720px] lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:px-10 lg:pb-20 lg:pt-16 xl:gap-16">
          <div className="text-center lg:text-left">
            <p className="inline-flex rounded-full bg-[#fff2cc] px-4 py-2 text-xs font-black text-[#095daf] shadow-sm sm:text-sm">
              {hero.eyebrow}
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl text-[2.5rem] font-black leading-[1.08] tracking-normal text-[#061b3b] sm:text-5xl lg:mx-0 lg:mt-6 lg:text-[4rem] xl:text-[4.5rem]">
              {hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#334155] sm:text-lg lg:mx-0 lg:mt-7 lg:text-xl lg:leading-10">{hero.description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-8 lg:justify-start">
              <a
                className="rounded-full bg-[#095daf] px-8 py-4 text-center text-base font-black text-white shadow-[0_18px_38px_rgba(9,93,175,0.22)] transition hover:bg-[#074b8d] lg:px-9"
                href="#curriculum"
              >
                {hero.primaryCta}
              </a>
              <a
                className="rounded-full border border-[#095daf]/25 bg-white px-8 py-4 text-center text-base font-black text-[#095daf] shadow-sm transition hover:border-[#095daf] hover:bg-[#eef7ff] lg:px-9"
                href="#contact"
              >
                {hero.secondaryCta}
              </a>
            </div>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-2.5 lg:mx-0 lg:mt-12 lg:gap-4">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-[#dcecff] bg-white/95 p-3 shadow-[0_14px_32px_rgba(9,93,175,0.08)] sm:p-4 lg:p-5">
                  <div className="text-lg font-black text-[#095daf] sm:text-xl lg:text-2xl">{stat.value}</div>
                  <div className="mt-1 text-[11px] font-semibold leading-5 text-[#475569] sm:text-xs lg:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <HeroGallery images={siteImages.heroGallery || [siteImages.hero]} />
        </div>
        <div className="mx-auto flex max-w-[88rem] gap-2 overflow-x-auto px-4 pb-7 sm:px-6 lg:justify-center lg:px-10 lg:pb-10">
          {moduleNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[#dcecff] bg-white/95 px-4 py-2 text-sm font-bold text-[#095daf] shadow-sm transition hover:border-[#095daf]/30 hover:bg-[#eef7ff]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section id="what" className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5a400]">Module 01</p>
            <h2 className="mt-3 text-[2.1rem] font-black leading-tight tracking-normal text-[#061b3b] sm:text-4xl lg:text-5xl">{what.title}</h2>
            <p className="mt-4 text-base leading-8 text-[#475569] lg:mt-6 lg:text-lg lg:leading-9">{what.description}</p>
            <div className="mt-7 grid gap-3 lg:mt-9 lg:gap-4">
              {what.points.map((point) => (
                <div key={point} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] px-5 py-4 text-base font-bold leading-7 text-[#12325f] shadow-sm lg:px-6">
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#dcecff] bg-[#eef7ff] p-2.5 shadow-[0_24px_70px_rgba(9,93,175,0.12)] sm:p-3">
            <Image
              src={siteImages.what}
              alt="慧拼读单词学习系统优势介绍"
              width={1242}
              height={1354}
              className="max-h-[560px] w-full rounded-lg object-cover object-top shadow-sm"
            />
          </div>
        </div>
      </section>

      <section id="curriculum" className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10">
          <div className="order-2 rounded-xl border border-[#dcecff] bg-[#eef7ff] p-2.5 shadow-[0_24px_70px_rgba(9,93,175,0.12)] sm:p-3 lg:order-1">
            <Image
              src={siteImages.curriculum}
              alt="慧拼读训练系统课堂界面展示"
              width={1792}
              height={1024}
              className="aspect-[4/3] w-full rounded-lg object-cover object-center shadow-sm sm:aspect-video"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5a400]">Module 02</p>
            <h2 className="mt-3 text-[2.1rem] font-black leading-tight tracking-normal text-[#061b3b] sm:text-4xl lg:text-5xl">{curriculum.title}</h2>
            <p className="mt-4 text-base leading-8 text-[#475569] lg:mt-6 lg:text-lg lg:leading-9">{curriculum.description}</p>
            <CurriculumDetails levels={curriculum.levels} />
          </div>
        </div>
      </section>

      <section id="advantages" className="bg-[#f7fbff] py-16 lg:py-24">
        <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Module 04" title={advantages.title} description="用系统能力支撑教学与运营，让英语教学更简单，让机构运营更轻松。" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {advantages.items.map((item) => (
              <div key={item} className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-[0_16px_42px_rgba(9,93,175,0.08)] lg:p-7">
                <div className="h-1.5 w-12 rounded-full bg-[#f5a400]" />
                <p className="mt-5 text-base font-black leading-8 text-[#12325f]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="bg-[#f7fbff] py-16 lg:py-24">
        <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Module 05"
            title="系统演示视频"
            description="慧拼读系统涵盖音标学习、单词学习、口语学习、短文阅读、词汇检测、抗遗忘复习。"
          />
          <div className="mx-auto mt-9 max-w-6xl rounded-xl border border-[#dcecff] bg-white p-2.5 shadow-[0_24px_70px_rgba(9,93,175,0.1)] sm:p-3 lg:mt-12">
            {siteImages.advantagesVideo ? (
              <video
                src={siteImages.advantagesVideo}
                className="aspect-video w-full rounded-lg bg-[#061b3b] object-contain"
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="grid aspect-video w-full place-items-center rounded-lg border border-dashed border-[#bfd8f3] bg-[#eef7ff] px-6 text-center">
                <div>
                  <p className="text-xl font-black text-[#095daf]">视频展示位</p>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">可在后台上传视频，展示系统功能、课堂案例或合作方案。</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section id="institutions" className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5a400]">Module 06</p>
            <h2 className="mt-3 text-[2.1rem] font-black leading-tight tracking-normal text-[#061b3b] sm:text-4xl lg:text-5xl">{institutions.title}</h2>
            <p className="mt-4 text-base leading-8 text-[#475569] lg:mt-6 lg:text-lg lg:leading-9">{institutions.description}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-9 lg:gap-4">
              {institutions.items.map((item) => (
                <div key={item} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] px-5 py-4 text-sm font-black leading-6 text-[#12325f] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#dcecff] bg-[#eef7ff] p-2.5 shadow-[0_24px_70px_rgba(9,93,175,0.12)] sm:p-3">
            <Image
              src={siteImages.institutions}
              alt="慧拼读合作加盟系统方案"
              width={1452}
              height={1080}
              className="w-full rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
      </section>


      <section id="contact" className="bg-[radial-gradient(circle_at_80%_20%,rgba(255,209,102,0.16),transparent_28%),linear-gradient(135deg,#061b3b_0%,#092f62_100%)] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] gap-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffd166]">Module 07</p>
            <h2 className="mt-3 text-[2.1rem] font-black leading-tight tracking-normal sm:text-4xl lg:text-5xl">{contact.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 lg:text-lg lg:leading-9">{contact.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-lg bg-white p-3 text-center text-[#061b3b] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-4">
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
            <div className="rounded-lg bg-white p-3 text-center text-[#061b3b] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-4">
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


