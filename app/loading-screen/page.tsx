"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const messages = [
  { pct: 0,   text: "Connecting to servers..." },
  { pct: 12,  text: "Fetching your order details..." },
  { pct: 27,  text: "Verifying payment information..." },
  { pct: 41,  text: "Contacting the restaurant..." },
  { pct: 55,  text: "Rethinking your life choices..." },
  { pct: 63,  text: "Reviewing your recent decisions..." },
  { pct: 71,  text: "Consulting with professionals..." },
  { pct: 83,  text: "Preparing something you actually need..." },
  { pct: 91,  text: "Almost there... we promise..." },
  { pct: 97,  text: "Gathering your courage..." },
  { pct: 99,  text: "This might sting a little..." },
]

export default function LoadingScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    let currentMsg = 0
    const totalDuration = 9000 // 9 seconds total

    // Advance through messages
    const msgInterval = setInterval(() => {
      currentMsg += 1
      if (currentMsg < messages.length) {
        setMessageIndex(currentMsg)
      } else {
        clearInterval(msgInterval)
      }
    }, totalDuration / messages.length)

    // Smooth progress counter
    const startTime = Date.now()
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min((elapsed / totalDuration) * 100, 99)
      setProgress(Math.floor(rawProgress))
    }, 50)

    // Final trigger
    const done = setTimeout(() => {
      clearInterval(msgInterval)
      clearInterval(progressInterval)
      setProgress(100)
      setTimeout(() => router.push("/gravity"), 800)
    }, totalDuration)

    return () => {
      clearInterval(msgInterval)
      clearInterval(progressInterval)
      clearTimeout(done)
    }
  }, [])

  // Color shifts from orange → blue as progress increases
  const barColor = progress < 50
    ? `rgb(${255}, ${Math.floor(107 + progress * 1.5)}, 53)`
    : `rgb(${Math.floor(255 - (progress - 50) * 4)}, 180, ${Math.floor(53 + (progress - 50) * 3)})`

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center
      justify-center p-8 gap-8">

      {/* Logo stays from food app */}
      <div className="text-orange-500 font-bold text-2xl mb-4">
        🍕 CraveMate
      </div>

      {/* Progress container */}
      <div className="w-full max-w-md flex flex-col gap-4">

        {/* Percentage */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Processing your order</span>
          <span className="text-white font-bold text-lg">{progress}%</span>
        </div>

        {/* Bar */}
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              backgroundColor: barColor,
            }}
          />
        </div>

        {/* Status message */}
        <p
          key={messageIndex}
          className="text-gray-300 text-sm text-center animate-pulse min-h-[24px]"
        >
          {messages[messageIndex]?.text}
        </p>
      </div>

      {/* Spinning indicator */}
      <div className="w-8 h-8 border-2 border-gray-600 border-t-white
        rounded-full animate-spin mt-4" />

      <p className="text-gray-600 text-xs mt-8">
        Please do not close this window
      </p>
    </div>
  )
}