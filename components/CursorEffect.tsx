"use client";

import { type CSSProperties, useEffect, useState } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

type BurstLetter = {
  id: number;
  letter: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
};

const letters = ["A", "B", "C"];

export function CursorEffect() {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [burstLetters, setBurstLetters] = useState<BurstLetter[]>([]);

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
      const burst = letters.flatMap((letter, groupIndex) =>
        [-1, 1].map((side) => {
          const id = nextId;
          nextId += 1;

          return {
            id,
            letter,
            x: event.clientX,
            y: event.clientY,
            dx: side * (48 + groupIndex * 18),
            dy: -34 - groupIndex * 12,
            rotate: side * (18 + groupIndex * 14)
          };
        })
      );

      setBurstLetters((current) => [...current, ...burst]);
      window.setTimeout(() => {
        setBurstLetters((current) => current.filter((item) => !burst.some((letter) => letter.id === item.id)));
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
        <span className="site-cursor-letters">ABC</span>
      </div>
      {burstLetters.map((item) => (
        <span
          aria-hidden="true"
          className="site-cursor-burst"
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
          {item.letter}
        </span>
      ))}
    </>
  );
}
