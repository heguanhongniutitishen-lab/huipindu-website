import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type PageContact = {
  name: string;
  phone: string;
  qr: string;
};

type PageSection = {
  title: string;
  description: string;
};

type SubPage = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  sections: readonly PageSection[];
  highlights: readonly string[];
  contacts?: readonly PageContact[];
};

type SubPageLayoutProps = {
  page: SubPage;
};

export function SubPageLayout({ page }: SubPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="home-motion bg-[#f7fbff]">
        <section className="border-b border-[#dcecff] bg-[radial-gradient(circle_at_85%_10%,rgba(255,209,102,0.28),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(9,93,175,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#eef7ff_100%)] px-4 py-14 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[88rem] items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-700 sm:text-sm">{page.eyebrow}</p>
              <h1 className="mt-4 text-[2.5rem] font-black leading-[1.08] tracking-normal text-ink sm:text-5xl lg:text-[4rem]">{page.title}</h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-ink/70 sm:text-lg lg:mx-0 lg:mt-7 lg:text-xl lg:leading-10">{page.description}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-2.5 lg:mt-8 lg:justify-start lg:gap-3">
                {page.highlights.map((item) => (
                  <span key={item} className="rounded-full border border-[#dcecff] bg-white px-4 py-2 text-sm font-black text-[#095daf] shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#dcecff] bg-white p-2.5 shadow-[0_28px_90px_rgba(9,93,175,0.16)] sm:p-3">
              <Image
                src={page.image}
                alt={page.title}
                width={1280}
                height={900}
                className="max-h-[560px] w-full rounded-lg object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[88rem] gap-4 md:grid-cols-3 lg:gap-6">
            {page.sections.map((section, index) => (
              <article key={section.title} className="rounded-lg border border-[#dcecff] bg-white p-5 shadow-[0_16px_42px_rgba(9,93,175,0.08)] lg:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2cc] text-lg font-black text-[#095daf]">
                  {index + 1}
                </div>
                <h2 className="mt-5 text-xl font-black tracking-normal text-ink">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/68">{section.description}</p>
              </article>
            ))}
          </div>
        </section>

        {page.contacts ? (
          <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="mx-auto grid max-w-[88rem] gap-9 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-700 sm:text-sm">Contact</p>
                  <h2 className="mt-3 text-[2.1rem] font-black leading-tight tracking-normal text-ink sm:text-4xl">提交合作咨询</h2>
                  <p className="mt-4 text-base leading-8 text-ink/68">
                    填写信息后，系统会发送邮件通知负责人。你也可以直接扫码添加老师微信咨询。
                  </p>
                </div>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>

              <div>
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-700 sm:text-sm">Wechat</p>
                  <h2 className="mt-3 text-[2.1rem] font-black leading-tight tracking-normal text-ink sm:text-4xl">扫码咨询慧拼读</h2>
                  <p className="mt-4 text-base leading-8 text-ink/68">
                    可添加老师微信，咨询合作方案与代理的政策（手机端可长按二维码识别添加）。
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
                  {page.contacts.map((contact) => (
                    <article key={contact.phone} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] p-3 text-center shadow-sm sm:p-5">
                      <Image
                        src={contact.qr}
                        alt={`${contact.name} 联系二维码`}
                        width={220}
                        height={220}
                        className="mx-auto h-28 w-28 rounded-xl bg-white object-contain p-2 sm:h-40 sm:w-40"
                      />
                      <h3 className="mt-3 text-base font-black text-ink sm:mt-4 sm:text-lg">{contact.name}</h3>
                      <p className="mt-1 text-xs font-black text-[#095daf] sm:text-base">{contact.phone}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
