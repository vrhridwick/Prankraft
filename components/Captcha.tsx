"use client";
import { useState } from "react";

interface CaptchaProps {
  onComplete: () => void;
}

const round1Images = [
  { src: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&q=80", label: "Says 'I'm fine'", correct: true },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80", label: "Won't text back", correct: true },
  { src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&q=80", label: "Has feelings", correct: false },
  { src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", label: "Needs space", correct: true },
  { src: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&q=80", label: "Vulnerable", correct: false },
  { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=200&q=80", label: "Replies in 3 days", correct: true },
];

const round2Pizzas = [
  { label: "Anxious Attachment 🥺", desc: "Lots of toppings, needs constant validation", color: "bg-yellow-50 border-yellow-300" },
  { label: "Avoidant Attachment 😶", desc: "Plain, no sauce, doesn't need anyone", color: "bg-gray-50 border-gray-300" },
  { label: "Secure Attachment 🌟", desc: "Well-balanced, healthy crust, emotionally available", color: "bg-green-50 border-green-300" },
  { label: "Fearful-Avoidant 😰", desc: "Half eaten, unsure what it wants", color: "bg-red-50 border-red-300" },
];

export default function Captcha({ onComplete }: CaptchaProps) {
  const [round, setRound] = useState(1);
  const [checked, setChecked] = useState(false);
  const [checkAttempts, setCheckAttempts] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(15);
  const [selectedPizza, setSelectedPizza] = useState<number | null>(null);
  const [captchaText, setCaptchaText] = useState("");

  const toggleSelect = (i: number) => {
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const handleCheck = () => {
    if (checkAttempts < 2) {
      setCheckAttempts(c => c + 1);
      setError("Please complete the checkbox verification.");
      return;
    }
    setChecked(true);
  };

  const submitRound1 = () => {
    if (selected.length === 0) { setError("Please select at least one image."); return; }
    setError("");
    setSelected([]);
    setRound(2);
  };

  const submitRound2 = () => {
    if (selectedPizza === null) { setError("Please select your attachment style pizza."); return; }
    setError("");
    setRound(3);
  };

  const submitRound3 = () => {
    if (captchaText.toUpperCase() !== "HELPME") { setError("Incorrect. Try again."); return; }
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border-2 border-gray-200">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">SECURITY CHECK • Round {round} of 3</p>
            <p className="text-sm font-semibold text-gray-800">
              {round === 1 && "Select all images showing emotional unavailability"}
              {round === 2 && "Click the pizza that represents your attachment style"}
              {round === 3 && 'Type the text you see below'}
            </p>
          </div>
        </div>

        {/* Round 1 */}
        {round === 1 && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {round1Images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => toggleSelect(i)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-3 transition-all ${
                    selected.includes(i) ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-200"
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-24 object-cover" />
                  {selected.includes(i) && (
                    <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                  )}
                  <p className="text-xs text-center p-1 bg-gray-50 text-gray-600">{img.label}</p>
                </div>
              ))}
            </div>
            {/* Fake reCAPTCHA checkbox */}
            <div className="border rounded-lg p-3 flex items-center justify-between mb-3 bg-gray-50">
              <div className="flex items-center gap-3 cursor-pointer" onClick={handleCheck}>
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                  checked ? "bg-green-500 border-green-500" : "border-gray-400 bg-white"
                }`}>
                  {checked && <span className="text-white text-xs">✓</span>}
                </div>
                <span className="text-sm text-gray-700">
                  {!checked && checkAttempts === 0 && "I am not a robot"}
                  {!checked && checkAttempts === 1 && "Are you sure?"}
                  {!checked && checkAttempts >= 2 && "...ok fine"}
                  {checked && "Questionable, but ok"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">reCAPTCHA</p>
                <p className="text-xs text-gray-300">Privacy · Terms</p>
              </div>
            </div>
          </>
        )}

        {/* Round 2 */}
        {round === 2 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {round2Pizzas.map((pizza, i) => (
              <div
                key={i}
                onClick={() => setSelectedPizza(i)}
                className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${pizza.color} ${
                  selectedPizza === i ? "ring-2 ring-blue-500 scale-105" : "hover:scale-102"
                }`}
              >
                <p className="font-semibold text-sm text-gray-800">{pizza.label}</p>
                <p className="text-xs text-gray-500 mt-1">{pizza.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Round 3 */}
        {round === 3 && (
          <div className="mb-4">
            <div className="bg-gray-900 text-green-400 font-mono text-2xl tracking-[0.5em] p-4 rounded-lg text-center mb-3 select-none relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)"
              }}/>
              H E L P M E
            </div>
            <input
              type="text"
              placeholder="Type the letters..."
              value={captchaText}
              onChange={e => setCaptchaText(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 text-center text-lg font-mono focus:border-blue-400 outline-none"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-xs mb-2 text-center">{error}</p>}

        <button
          onClick={round === 1 ? submitRound1 : round === 2 ? submitRound2 : submitRound3}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          {round < 3 ? "Verify →" : "Complete Order"}
        </button>
      </div>
    </div>
  );
}