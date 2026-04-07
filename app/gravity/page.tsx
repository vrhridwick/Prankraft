"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function GravityPage() {
  const router = useRouter()
  const [gravityOn, setGravityOn] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show therapy layout for 2s then trigger gravity
    const gravityTimer = setTimeout(() => {
      setShowToast(true)
      setTimeout(() => {
        setGravityOn(true)
        setShowToast(false)
      }, 1000)
    }, 2000)

    // Fade out and redirect after gravity
    const redirectTimer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => router.push("/therapy"), 1000)
    }, 6500)

    return () => {
      clearTimeout(gravityTimer)
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <div className={`min-h-screen bg-green-50 overflow-hidden relative
      transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white
          px-4 py-2 rounded-lg text-sm shadow-lg animate-bounce">
          🌍 GRAVITY ON
        </div>
      )}

      {/* Navbar */}
      <div className={`bg-white shadow-sm px-6 py-4 flex items-center
        justify-between transition-all duration-700 ease-in
        ${gravityOn ? "translate-y-[90vh]" : ""}`}
        style={{ transitionDelay: gravityOn ? "0ms" : "0ms" }}
      >
        <span className="text-green-700 font-bold text-xl">🛋️ MindEase</span>
        <div className="flex gap-6 text-gray-600 text-sm">
          <span>Home</span><span>Services</span><span>About</span>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
          Book Session
        </button>
      </div>

      {/* Hero Text */}
      <div className={`text-center mt-16 px-6 transition-all duration-700
        ease-in ${gravityOn ? "translate-y-[80vh]" : ""}`}
        style={{ transitionDelay: gravityOn ? "100ms" : "0ms" }}
      >
        <h1 className="text-4xl font-bold text-gray-800">
          You've been through a lot today.
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          You deserve real support. We're here.
        </p>
      </div>

      {/* Cards row */}
      <div className={`flex gap-4 justify-center mt-12 px-6 flex-wrap
        transition-all duration-700 ease-in
        ${gravityOn ? "translate-y-[70vh]" : ""}`}
        style={{ transitionDelay: gravityOn ? "200ms" : "0ms" }}
      >
        {["🍕 You tried to order food", "🤖 You failed 4 CAPTCHAs",
          "🌍 Your world fell apart"].map((text, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-5 w-48 text-center">
            <p className="text-gray-700 text-sm font-medium">{text}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className={`flex justify-center mt-10 transition-all duration-700
        ease-in ${gravityOn ? "translate-y-[60vh]" : ""}`}
        style={{ transitionDelay: gravityOn ? "300ms" : "0ms" }}
      >
        <button className="bg-green-600 text-white px-8 py-3 rounded-full
          text-lg font-semibold">
          Book a Free Session
        </button>
      </div>
    </div>
  )
}