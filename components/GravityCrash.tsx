"use client";
import { useEffect, useState } from "react";

interface GravityCrashProps {
  onComplete: () => void;
}

export default function GravityCrash({ onComplete }: GravityCrashProps) {
  const [phase, setPhase] = useState<"shake" | "glitch" | "error" | "done">("shake");

  useEffect(() => {
    // Play glass break sound
    try {
      const ctx = new AudioContext();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start();
    } catch(e) {}

    const t1 = setTimeout(() => setPhase("glitch"), 600);
    const t2 = setTimeout(() => setPhase("error"), 1400);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "error" || phase === "done") {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <div className="text-center">
          <p className="text-red-500 font-mono text-6xl font-bold mb-4">ERROR</p>
          <p className="text-red-400 font-mono text-xl mb-2">404: Life Choices Not Found</p>
          <p className="text-gray-500 font-mono text-sm">Dumping emotional core... please wait</p>
          <div className="mt-6 text-gray-600 font-mono text-xs text-left max-w-sm">
            <p>at checkout() in FoodCrave.tsx:247</p>
            <p>at processOrder() in life.ts:∞</p>
            <p>at main() [self]</p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "glitch") {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden" style={{
        background: "#111",
        animation: "screenShake 0.3s ease-in-out infinite"
      }}>
        {/* RGB glitch layers */}
        <div className="absolute inset-0 bg-red-500/30" style={{
          clipPath: "inset(20% 0 60% 0)",
          transform: "translate(-4px, 0)",
          mixBlendMode: "screen"
        }} />
        <div className="absolute inset-0 bg-cyan-500/30" style={{
          clipPath: "inset(50% 0 20% 0)",
          transform: "translate(4px, 0)",
          mixBlendMode: "screen"
        }} />
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-mono text-4xl font-bold opacity-80">SYSTEM FAILURE</p>
        </div>
      </div>
    );
  }

  // Phase: shake — falling items
  const items = ["🍕", "🍔", "🌮", "🍜", "🥤", "🍣", "🧁", "🍟"];
  return (
    <div className="fixed inset-0 bg-gray-950 z-50 overflow-hidden" style={{
      animation: "screenShake 0.4s ease-in-out"
    }}>
      {items.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-5xl gravity-fall"
          style={{
            left: `${10 + i * 11}%`,
            top: `${5 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${0.9 + i * 0.1}s`,
          }}
        >
          {emoji}
        </div>
      ))}
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400 font-mono text-2xl animate-pulse">Everything is falling apart...</p>
      </div>
    </div>
  );
}