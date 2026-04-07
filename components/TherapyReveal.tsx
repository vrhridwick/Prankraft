"use client";
import { useEffect, useState } from "react";

export default function TherapyReveal() {
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"in" | "hold" | "out">("in");
  const [breathLabel, setBreathLabel] = useState("Breathe in...");

  useEffect(() => {
    const t = setTimeout(() => setShowBreathing(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showBreathing) return;
    const cycle = [
      { phase: "in" as const, label: "Breathe in...", duration: 4000 },
      { phase: "hold" as const, label: "Hold... 🫁", duration: 2000 },
      { phase: "out" as const, label: "Breathe out...", duration: 4000 },
    ];
    let i = 0;
    const run = () => {
      setBreathPhase(cycle[i].phase);
      setBreathLabel(cycle[i].label);
      i = (i + 1) % cycle.length;
    };
    run();
    const interval = setInterval(run, 4000);
    return () => clearInterval(interval);
  }, [showBreathing]);

  return (
    <div className="fixed inset-0 therapy-bg flex flex-col items-center justify-center z-50 therapy-reveal">
      <div className="max-w-md text-center px-8">
        {/* Icon */}
        <div className="text-6xl mb-6">🛋️</div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-purple-800 mb-3 typewriter-text">
          You've been through a lot today.
        </h1>

        <p className="text-purple-600 text-lg mb-2 opacity-0 animate-[fadeIn_1s_ease_2s_forwards]"
          style={{ animation: "therapyFadeIn 1s ease 2s forwards" }}>
          You ordered food. You failed a CAPTCHA about your feelings.
        </p>
        <p className="text-purple-600 text-lg mb-6"
          style={{ animation: "therapyFadeIn 1s ease 3s forwards", opacity: 0 }}>
          You deserve support. 💜
        </p>

        {/* Breathing exercise */}
        {showBreathing && (
          <div className="mb-8">
            <div className={`w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-400 bg-purple-100 breathe-circle ${
              breathPhase === "in" ? "scale-150" : breathPhase === "out" ? "scale-100" : "scale-140"
            }`} />
            <p className="text-purple-700 font-medium text-lg">{breathLabel}</p>
          </div>
        )}

        {/* CTA */}
        <a
          href="https://www.betterhelp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg mb-4"
        >
          Book a Session 🌿
        </a>

        <p className="text-purple-400 text-sm italic">
          (Just kidding 😊 But seriously — take care of yourself.)
        </p>
      </div>
    </div>
  );
}