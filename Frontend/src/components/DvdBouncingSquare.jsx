import { useRef, useEffect } from "react";

const DVD_COLORS = [
  "#e040a0", // magenta (starting color)
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
];

export default function DvdBouncingSquare() {
  const squareRef = useRef(null);
  const posRef = useRef({ x: 80, y: 60 });
  const velRef = useRef({ vx: 1.2, vy: 0.9 });
  const colorIdxRef = useRef(0);
  const frameRef = useRef(null);
  const lastColorChangeRef = useRef(Date.now());

  useEffect(() => {
    const square = squareRef.current;
    if (!square) return;

    const SIZE = 60;

    const animate = () => {
      const pos = posRef.current;
      const vel = velRef.current;

      const maxX = window.innerWidth - SIZE;
      const maxY = window.innerHeight - SIZE;

      pos.x += vel.vx;
      pos.y += vel.vy;

      if (pos.x <= 0) {
        pos.x = 0;
        vel.vx = Math.abs(vel.vx);
      } else if (pos.x >= maxX) {
        pos.x = maxX;
        vel.vx = -Math.abs(vel.vx);
      }

      if (pos.y <= 0) {
        pos.y = 0;
        vel.vy = Math.abs(vel.vy);
      } else if (pos.y >= maxY) {
        pos.y = maxY;
        vel.vy = -Math.abs(vel.vy);
      }

      square.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

      const now = Date.now();
      if (now - lastColorChangeRef.current >= 30000) {
        lastColorChangeRef.current = now;
        colorIdxRef.current = (colorIdxRef.current + 1) % DVD_COLORS.length;
        const newColor = DVD_COLORS[colorIdxRef.current];
        square.style.backgroundColor = newColor;
        square.style.color = newColor;
        square.style.boxShadow = `0 0 20px ${newColor}, 0 0 40px ${newColor}`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const initColor = DVD_COLORS[0];
    square.style.backgroundColor = initColor;
    square.style.color = initColor;
    square.style.boxShadow = `0 0 20px ${initColor}, 0 0 40px ${initColor}`;

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <div ref={squareRef} className="dvd-square" aria-hidden="true" />;
}
