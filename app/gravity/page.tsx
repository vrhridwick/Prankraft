"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ── Mirrors the CAPTCHA page layout exactly ──
function CaptchaMirror() {
  const [selected, setSelected] = useState<number[]>([])
  const emojis = ["🚗","🚦","🏠","🚦","🌳","🚦","🚕","🏢","🚦"]

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center
              justify-center text-white text-xs font-bold">
              rC
            </div>
            <span className="text-gray-500 text-xs">reCAPTCHA v3</span>
          </div>
          <span className="text-gray-400 text-xs">Step 4 of 4</span>
        </div>

        {/* Progress Bar — almost full */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5">
          <div className="bg-blue-500 h-1.5 rounded-full w-3/4
            transition-all duration-500" />
        </div>

        <h2 className="text-gray-800 font-semibold text-base mb-4 text-center">
          Select all squares containing Crosswalks
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-1 mb-4">
          {emojis.map((emoji, i) => (
            <div
              key={i}
              onClick={() => setSelected(prev =>
                prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
              )}
              className={`aspect-square flex items-center justify-center
                text-3xl cursor-pointer rounded-lg border-2 transition-all
                ${selected.includes(i)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50"}`}
            >
              {selected.includes(i) ? (
                <div className="relative">
                  <span>{emoji}</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4
                    bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              ) : <span>{emoji}</span>}
            </div>
          ))}
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold
          py-3 rounded-xl">
          Verify
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-300 text-xs">Privacy · Terms</span>
          <span className="text-gray-300 text-xs">reCAPTCHA</span>
        </div>
      </div>
    </div>
  )
}

// ── Fake final CAPTCHA that always fails ──
function FinalCaptcha({ onFail }: { onFail: () => void }) {
  const [selected, setSelected] = useState<number[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const emojis = ["🚶","🛣️","🚶","🚗","🚶","🏠","🛣️","🚶","🚗"]

  const handleVerify = () => {
    if (selected.length === 0) {
      setError("Please make a selection.")
      return
    }
    setIsVerifying(true)
    setError("")
    setTimeout(() => {
      setIsVerifying(false)
      setError("Critical verification failure. Connection unstable.")
      setTimeout(onFail, 1500)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center
            justify-center text-white text-xs font-bold">
            rC
          </div>
          <span className="text-gray-500 text-xs">reCAPTCHA v3</span>
        </div>
        <span className="text-red-400 text-xs font-medium">⚠ Unstable</span>
      </div>

      {/* Glitchy progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 overflow-hidden">
        <div className="bg-red-400 h-1.5 rounded-full w-11/12 animate-pulse" />
      </div>

      <h2 className="text-gray-800 font-semibold text-base mb-1 text-center">
        Final verification required
      </h2>
      <p className="text-gray-400 text-xs text-center mb-4">
        Select all squares containing Pedestrians
      </p>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 mb-4">
        {emojis.map((emoji, i) => (
          <div
            key={i}
            onClick={() => setSelected(prev =>
              prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
            )}
            className={`aspect-square flex items-center justify-center
              text-3xl cursor-pointer rounded-lg border-2 transition-all
              ${selected.includes(i)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
          >
            {selected.includes(i) ? (
              <div className="relative">
                <span>{emoji}</span>
                <div className="absolute -top-1 -right-1 w-4 h-4
                  bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            ) : <span>{emoji}</span>}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-3 font-medium">
          {error}
        </p>
      )}

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
          text-white font-semibold py-3 rounded-xl transition-all"
      >
        {isVerifying ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent
              rounded-full animate-spin" />
            Verifying...
          </span>
        ) : "Verify"}
      </button>

      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-300 text-xs">Privacy · Terms</span>
        <span className="text-gray-300 text-xs">reCAPTCHA</span>
      </div>
    </div>
  )
}

// ── Phase types ──
type Phase =
  | "normal"        // CAPTCHA page looks fine
  | "glitch"        // flicker before flip
  | "flipped"       // page rotated 180deg
  | "disconnected"  // connection lost banner
  | "reconnecting"  // reconnecting modal
  | "captcha"       // final captcha attempt
  | "blankout"      // screen goes white
  | "redirect"      // push to /therapy

export default function GravityPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("normal")
  const [reconnectCount, setReconnectCount] = useState(0)
  const [glitchOffset, setGlitchOffset] = useState(0)
  const [staticOpacity, setStaticOpacity] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // Phase 1 — normal CAPTCHA view (2s)
    timers.push(setTimeout(() => setPhase("glitch"), 2000))

    // Phase 2 — glitch flicker (0.8s)
    timers.push(setTimeout(() => {
      let flickers = 0
      const glitchInterval = setInterval(() => {
        setGlitchOffset(Math.random() * 10 - 5)
        setTimeout(() => setGlitchOffset(0), 60)
        flickers++
        if (flickers > 5) clearInterval(glitchInterval)
      }, 150)
    }, 2000))

    // Phase 3 — flip upside down (2.8s)
    timers.push(setTimeout(() => setPhase("flipped"), 2800))

    // Phase 4 — connection lost banner (4s)
    timers.push(setTimeout(() => setPhase("disconnected"), 4000))

    // Phase 5 — reconnecting modal (5.5s)
    timers.push(setTimeout(() => {
      setPhase("reconnecting")
      let count = 0
      const interval = setInterval(() => {
        count++
        setReconnectCount(count)
        if (count >= 3) clearInterval(interval)
      }, 1200)
    }, 5500))

    // Phase 6 — final CAPTCHA (10s)
    timers.push(setTimeout(() => setPhase("captcha"), 10000))

    return () => timers.forEach(clearTimeout)
  }, [])

  // Called when final CAPTCHA fails
//   const handleFinalFail = () => {
//     setPhase("blankout")

//     // Static noise effect
//     let ticks = 0
//     const staticInterval = setInterval(() => {
//       setStaticOpacity(Math.random() * 0.95 + 0.05)
//       ticks++
//       if (ticks > 25) {
//         clearInterval(staticInterval)
//         setStaticOpacity(1)
//         setPhase("redirect")
//         setTimeout(() => router.push("/therapy"), 800)
//       }
//     }, 60)
//   }
const handleFinalFail = () => {
  setPhase("blankout")

  // First go black for 1s, then static
  setTimeout(() => {
    let ticks = 0
    const staticInterval = setInterval(() => {
      setStaticOpacity(Math.random() * 0.95 + 0.05)
      ticks++
      if (ticks > 80) { // 80 ticks × 60ms = ~5s of static
        clearInterval(staticInterval)
        setPhase("redirect")
        setTimeout(() => router.push("/therapy"), 300)
      }
    }, 60)
  }, 1000) // 1s of pure black first
}

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100">

      {/* ── Main CAPTCHA content ── */}
      <div
        style={{
          transform: `
            translateX(${glitchOffset}px)
            rotate(${phase === "flipped" || phase === "disconnected"
              || phase === "reconnecting" || phase === "captcha"
              || phase === "blankout" || phase === "redirect"
              ? "180deg" : "0deg"})
          `,
          transition: phase === "flipped"
            ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
          transformOrigin: "center center",
        }}
      >
        <CaptchaMirror />
      </div>

      {/* ── Glitch color lines ── */}
      {phase === "glitch" && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute top-1/3 left-0 right-0 h-1
            bg-red-500 opacity-70" />
          <div className="absolute top-2/3 left-0 right-0 h-0.5
            bg-cyan-400 opacity-50" />
          <div className="absolute top-1/2 left-0 right-0 h-0.5
            bg-yellow-300 opacity-40" />
        </div>
      )}

      {/* ── Connection Lost Banner ── */}
      {(phase === "disconnected" || phase === "reconnecting") && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600
          text-white px-4 py-3 flex items-center justify-between
          shadow-lg animate-slideDown"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-white animate-ping" />
            <div>
              <p className="font-bold text-sm">Connection Lost</p>
              <p className="text-xs text-red-200">
                Unable to reach verification servers
              </p>
            </div>
          </div>
          <div className="text-xs text-red-200 font-mono">
            ERR_CONNECTION_RESET
          </div>
        </div>
      )}

      {/* ── Reconnecting Modal ── */}
      {phase === "reconnecting" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
          bg-black/70 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl p-8 mx-4 w-full max-w-sm
            shadow-2xl text-center"
          >
            {/* Signal bars */}
            <div className="flex items-end justify-center gap-1 mb-6 h-10">
              {[3, 5, 7, 9, 7].map((h, i) => (
                <div key={i} className="w-3 bg-gray-200 rounded-sm"
                  style={{ height: `${h * 4}px` }}
                >
                  <div
                    className="w-full rounded-sm bg-orange-500 transition-all duration-500"
                    style={{ height: reconnectCount > i * 0.6 ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>

            <h3 className="text-gray-800 font-bold text-lg mb-2">
              Reconnecting to servers...
            </h3>

            <p className="text-gray-400 text-sm mb-6">
              {reconnectCount === 0 && "Attempting connection..."}
              {reconnectCount === 1 && "Checking network routes..."}
              {reconnectCount === 2 && "Retrying with backup servers..."}
              {reconnectCount >= 3 && "Something unexpected happened..."}
            </p>

            {/* Attempt dots */}
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map(i => (
                <div key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500
                    ${reconnectCount > i ? "bg-orange-500" : "bg-gray-200"}`}
                />
              ))}
            </div>

            <p className="text-gray-300 text-xs font-mono mb-4">
              Attempt {reconnectCount}/3
            </p>

            {reconnectCount >= 3 && (
              <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="text-red-500 text-xs font-medium">
                  ⚠️ Server anomaly detected. Requesting manual verification...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Final CAPTCHA overlay ── */}
      {phase === "captcha" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
          bg-gray-100"
        >
          <FinalCaptcha onFail={handleFinalFail} />
        </div>
      )}

      {/* ── Static noise + blankout ── */}
      {/* ── Black screen + Static noise + redirect ── */}
{(phase === "blankout" || phase === "redirect") && (
  <div className="fixed inset-0 z-50 bg-black">

    {/* TV Static — only shows after 1s black */}
    {staticOpacity > 0 && (
      <div
        className="absolute inset-0"
        style={{
          opacity: staticOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
          mixBlendMode: "screen", // gives it that white-on-black TV look
        }}
      />
    )}

    {/* Optional: "NO SIGNAL" text during static */}
    {staticOpacity > 0 && phase !== "redirect" && (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white/20 font-mono text-2xl font-bold tracking-widest">
          NO SIGNAL
        </p>
      </div>
    )}

    {/* Final black fadeout before redirect */}
    {phase === "redirect" && (
      <div className="absolute inset-0 bg-black animate-fadeIn" />
    )}
  </div>
)}
      
    </div>
  )
}