"use client";

import { type CSSProperties, useEffect, useState } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

type BurstWord = {
  id: number;
  text: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
  side: "left" | "right";
};

export function CursorEffect() {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [burstWords, setBurstWords] = useState<BurstWord[]>([]);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsPointerDevice(canHover);

    if (!canHover) {
      return;
    }

    let nextId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const burst: BurstWord[] = [
        {
          id: nextId++,
          text: "慧拼读",
          x: event.clientX,
          y: event.clientY,
          dx: -96,
          dy: -42,
          rotate: -16,
          side: "left"
        },
        {
          id: nextId++,
          text: "English",
          x: event.clientX,
          y: event.clientY,
          dx: 104,
          dy: -38,
          rotate: 14,
          side: "right"
        }
      ];

      setBurstWords((current) => [...current, ...burst]);
      window.setTimeout(() => {
        setBurstWords((current) => current.filter((item) => !burst.some((word) => word.id === item.id)));
      }, 760);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  if (!isPointerDevice) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="site-cursor"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      >
        <span className="site-cursor-mic" />
        <span className="site-cursor-letters">跟我读</span>
      </div>
      {burstWords.map((item) => (
        <span
          aria-hidden="true"
          className={`site-cursor-burst site-cursor-burst-${item.side}`}
          key={item.id}
          style={
            {
              left: item.x,
              top: item.y,
              "--cursor-burst-x": `${item.dx}px`,
              "--cursor-burst-y": `${item.dy}px`,
              "--cursor-burst-rotate": `${item.rotate}deg`
            } as CSSProperties
          }
        >
          {item.text}
        </span>
      ))}
    </>
  );
}
