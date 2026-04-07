"use client";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const messages = [
  { at: 0,  text: "Placing your order... 🍕" },
  { at: 15, text: "Kitchen confirmed ✅" },
  { at: 30, text: "Assigning delivery partner..." },
  { at: 45, text: "Rethinking your life choices... 🤔" },
  { at: 60, text: "Calculating caloric damage... 📊" },
  { at: 75, text: "Driver found! (probably)" },
  { at: 89, text: "Almost there... just one more thing..." },
  { at: 99, text: "..." },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMsg, setCurrentMsg] = useState(messages[0].text);
  const [stuckAt99, setStuckAt99] = useState(false);
  const [stuckCount, setStuckCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          setStuckAt99(true);
          return 99;
        }
        const next = prev < 89 ? prev + Math.random() * 3 : prev + 0.3;
        return Math.min(next, 99);
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const msg = [...messages].reverse().find(m => progress >= m.at);
    if (msg) setCurrentMsg(msg.text);
  }, [Math.floor(progress)]);

  useEffect(() => {
    if (!stuckAt99) return;
    const t1 = setTimeout(() => setStuckCount(1), 1000);
    const t2 = setTimeout(() => setStuckCount(2), 2500);
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [stuckAt99]);

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <div className="text-4xl mb-2">🍕</div>
      <h2 className="text-white text-xl font-bold mb-8">FoodCrave</h2>

      {/* Progress bar */}
      <div className="w-80 bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 ${
            stuckAt99 ? "loading-stutter" : ""
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="text-orange-400 font-mono text-lg mb-3">
        {Math.floor(progress)}%
        {stuckAt99 && stuckCount === 0 && "..."}
        {stuckAt99 && stuckCount === 1 && " 😅"}
        {stuckAt99 && stuckCount === 2 && " 💀"}
      </p>

      {/* Message */}
      <p className="text-gray-300 text-sm animate-pulse">{currentMsg}</p>

      {stuckAt99 && stuckCount >= 1 && (
        <p className="text-red-400 text-xs mt-4 animate-bounce">
          {stuckCount === 1 ? "Why won't it move..." : "SOMETHING IS WRONG"}
        </p>
      )}
    </div>
  );
}