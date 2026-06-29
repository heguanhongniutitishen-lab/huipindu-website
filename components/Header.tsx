import { navItems } from "@/content/site";
import { BrandMark } from "./BrandMark";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dcecff] bg-[#fbfff7]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10 lg:py-4">
        <BrandMark />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink/75 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} className="transition hover:text-leaf-700" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="shrink-0 rounded-full bg-[#095daf] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#074b8d] sm:px-5"
          href="/contact"
        >
          咨询合作
        </a>
      </div>
    </header>
  );
}
