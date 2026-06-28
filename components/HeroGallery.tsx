"use client";

import Image from "next/image";
import { MouseEvent, useMemo, useState } from "react";

type HeroGalleryProps = {
  images: readonly string[];
};

export function HeroGallery({ images }: HeroGalleryProps) {
  const galleryImages = useMemo(() => images.filter(Boolean).slice(0, 5), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [turning, setTurning] = useState(false);

  function selectImage(index: number) {
    if (index === activeIndex) return;
    setTurning(true);
    setActiveIndex(index);
    window.setTimeout(() => setTurning(false), 420);
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (galleryImages.length <= 1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999);
    const nextIndex = Math.floor(percent * galleryImages.length);
    selectImage(nextIndex);
  }

  if (!galleryImages.length) {
    return null;
  }

  return (
    <div
      className="hero-gallery rounded-[1.5rem] border border-[#dcecff] bg-white p-3 shadow-soft"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTurning(false)}
    >
      <div className="hero-gallery-book relative max-h-[620px] overflow-hidden rounded-[1rem] bg-[#eef7ff]">
        {galleryImages.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            src={image}
            alt={`慧拼读首页展示图 ${index + 1}`}
            width={1280}
            height={1407}
            priority={index === 0}
            className={`hero-gallery-page max-h-[620px] w-full object-cover object-top ${
              index === activeIndex ? "hero-gallery-page-active" : ""
            } ${turning && index === activeIndex ? "hero-gallery-page-turning" : ""}`}
          />
        ))}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/70 shadow-[0_0_30px_rgba(9,93,175,0.28)]" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-dot-${index}`}
            type="button"
            aria-label={`切换到第 ${index + 1} 张图片`}
            onClick={() => selectImage(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-7 bg-[#095daf]" : "w-2.5 bg-[#bfd8f3] hover:bg-[#6aa2d8]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
