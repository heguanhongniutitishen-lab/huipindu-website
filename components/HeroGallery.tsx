"use client";

import Image from "next/image";
import { MouseEvent, TouchEvent, useEffect, useMemo, useState } from "react";

type HeroGalleryProps = {
  images: readonly string[];
};

export function HeroGallery({ images }: HeroGalleryProps) {
  const galleryImages = useMemo(() => images.filter(Boolean).slice(0, 5), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [turning, setTurning] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const canSwitch = galleryImages.length > 1;

  useEffect(() => {
    if (activeIndex >= galleryImages.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, galleryImages.length]);

  function selectImage(index: number) {
    if (index === activeIndex) return;
    setTurning(true);
    setActiveIndex(index);
    window.setTimeout(() => setTurning(false), 420);
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!canSwitch) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999);
    const nextIndex = Math.floor(percent * galleryImages.length);
    selectImage(nextIndex);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    if (!canSwitch) return;
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchStart || !canSwitch) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    setTouchStart(null);

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    const nextIndex = deltaX < 0
      ? (activeIndex + 1) % galleryImages.length
      : (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    selectImage(nextIndex);
  }

  if (!galleryImages.length) {
    return null;
  }

  return (
    <div
      className="hero-gallery rounded-xl border border-[#dcecff] bg-white p-2.5 shadow-[0_28px_90px_rgba(9,93,175,0.16)] sm:p-3"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTurning(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setTouchStart(null)}
    >
      <div className="hero-gallery-book relative max-h-[660px] touch-pan-y overflow-hidden rounded-lg bg-[#eef7ff]">
        {galleryImages.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            src={image}
            alt={`慧拼读首页展示图 ${index + 1}`}
            width={1280}
            height={1407}
            priority={index === 0}
            className={`hero-gallery-page max-h-[660px] w-full object-cover object-top ${
              index === activeIndex ? "hero-gallery-page-active" : ""
            } ${turning && index === activeIndex ? "hero-gallery-page-turning" : ""}`}
          />
        ))}
        {canSwitch ? <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/70 shadow-[0_0_30px_rgba(9,93,175,0.28)]" /> : null}
      </div>

      {canSwitch ? (
        <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
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
      ) : null}
    </div>
  );
}
