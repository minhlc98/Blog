"use client";

import { useEffect, useState } from "react";

const FLOWER_COUNT = 15;

export default function FallingFlowers() {
  const [flowers, setFlowers] = useState<Array<{ id: number; left: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate flowers on client side only to avoid hydration mismatch
    const generatedFlowers = Array.from({ length: FLOWER_COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random left position %
      size: Math.random() * 15 + 10, // 10px to 25px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * -20, // Negative delay so they are already falling on load
    }));
    setFlowers(generatedFlowers);
  }, []);

  if (flowers.length === 0) return null;

  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {flowers.map((f) => (
        <div
          key={f.id}
          className="flower"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <svg viewBox="0 0 512 512" fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C256 0 292.9 83.1 350.3 140.4C407.7 197.8 490.8 234.7 490.8 234.7C490.8 234.7 407.7 271.6 350.3 328.9C292.9 386.3 256 469.3 256 469.3C256 469.3 219.1 386.3 161.7 328.9C104.3 271.6 21.2 234.7 21.2 234.7C21.2 234.7 104.3 197.8 161.7 140.4C219.1 83.1 256 0 256 0Z" opacity="0.8"/>
            <circle cx="256" cy="234.7" r="40" fill="#ffcce0" />
          </svg>
        </div>
      ))}
    </div>
  );
}
