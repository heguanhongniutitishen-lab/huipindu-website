import { navItems } from "@/content/site";
import { BrandMark } from "./BrandMark";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-leaf-100 bg-[#fbfff7]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink/75 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} className="transition hover:text-leaf-700" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="rounded-full bg-[#095daf] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#074b8d]"
          href="/contact"
        >
          咨询合作
        </a>
      </div>
    </header>
  );
}
