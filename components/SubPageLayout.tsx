import Image from "next/image";
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
        <section className="border-b border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#eef7ff_100%)] px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-700">{page.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-black tracking-normal text-ink sm:text-5xl">{page.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-ink/70">{page.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {page.highlights.map((item) => (
                  <span key={item} className="rounded-full border border-[#dcecff] bg-white px-4 py-2 text-sm font-black text-[#095daf] shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#dcecff] bg-white p-3 shadow-soft">
              <Image
                src={page.image}
                alt={page.title}
                width={1280}
                height={900}
                className="max-h-[520px] w-full rounded-[1rem] object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        <section className="px-5 py-14 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {page.sections.map((section, index) => (
              <article key={section.title} className="rounded-lg border border-[#dcecff] bg-white p-6 shadow-sm">
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
          <section className="bg-white px-5 py-14 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-700">Wechat</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">扫码咨询慧拼读</h2>
                <p className="mt-4 text-base leading-8 text-ink/68">
                  可添加老师微信，咨询课程体系、孩子学习方案、机构合作与区域代理政策。
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
                {page.contacts.map((contact) => (
                  <article key={contact.phone} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] p-5 text-center shadow-sm">
                    <Image
                      src={contact.qr}
                      alt={`${contact.name} 联系二维码`}
                      width={220}
                      height={220}
                      className="mx-auto h-36 w-36 rounded-lg bg-white object-contain p-2 sm:h-40 sm:w-40"
                    />
                    <h3 className="mt-4 text-lg font-black text-ink">{contact.name}</h3>
                    <p className="mt-1 text-base font-black text-[#095daf]">{contact.phone}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
