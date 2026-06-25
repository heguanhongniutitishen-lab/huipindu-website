import Image from "next/image";

type BrandMarkProps = {
  inverted?: boolean;
};

export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3" aria-label="慧拼读">
      <div className={inverted ? "rounded-lg bg-white px-2 py-1" : ""}>
        <Image
          src="/images/brand/logo.png"
          alt="慧拼读 Logo"
          width={136}
          height={54}
          className="h-10 w-auto object-contain"
          priority
        />
      </div>
      <div className="hidden sm:block">
        <div className={inverted ? "text-xl font-black tracking-normal text-white" : "text-xl font-black tracking-normal text-ink"}>
          慧拼读
        </div>
        <div className={inverted ? "text-xs font-medium text-sunny-300" : "text-xs font-medium text-leaf-700"}>
          Smart Phonics
        </div>
      </div>
    </div>
  );
}
