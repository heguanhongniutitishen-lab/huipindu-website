import { companyInfo, navItems } from "@/content/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:px-10 lg:py-14">
        <div>
          <BrandMark inverted />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/72">{companyInfo.description}</p>
          <p className="mt-3 text-sm font-semibold text-white/60">{companyInfo.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 sm:gap-4">
          {navItems.slice(1).map((item) => (
            <a key={item.href} className="rounded-full bg-white/5 px-4 py-3 text-center text-white/72 transition hover:text-sunny-300 sm:bg-transparent sm:p-0 sm:text-left" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/55">
        © 2026 {companyInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
