import { pageCopy } from "@/content/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function CooperationPage() {
  const page = pageCopy.cooperation;

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-20 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-700">Cooperation</p>
        <h1 className="mt-4 text-4xl font-black tracking-normal text-ink">{page.title}</h1>
        <p className="mt-6 text-lg leading-9 text-ink/70">{page.description}</p>
      </main>
      <Footer />
    </>
  );
}
