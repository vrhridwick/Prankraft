"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TherapyPage() {
  const router = useRouter()
  const [showBanner, setShowBanner] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fade in on mount
    setTimeout(() => setVisible(true), 100)
    // Show april fools banner after 4s
    setTimeout(() => setShowBanner(true), 4000)
  }, [])

  return (
    <div className={`min-h-screen bg-green-50 transition-opacity duration-1000
      ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <span className="text-green-700 font-bold text-xl">🛋️ MindEase</span>
        <div className="hidden md:flex gap-8 text-gray-600 text-sm font-medium">
          <span className="hover:text-green-600 cursor-pointer">Home</span>
          <span className="hover:text-green-600 cursor-pointer">Services</span>
          <span className="hover:text-green-600 cursor-pointer">About</span>
          <span className="hover:text-green-600 cursor-pointer">Contact</span>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white
          px-4 py-2 rounded-lg text-sm transition-colors">
          Book Session
        </button>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6 max-w-3xl mx-auto">
        <span className="bg-green-100 text-green-700 text-xs font-semibold
          px-3 py-1 rounded-full uppercase tracking-wide">
          You made it here for a reason
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6
          leading-tight">
          You've been through<br />a lot today.
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          You deserve real support. We're here whenever you're ready.
        </p>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <button className="bg-green-600 hover:bg-green-700 text-white
            px-8 py-3 rounded-full text-lg font-semibold transition-colors">
            Book a Free Session
          </button>
          <button className="border-2 border-green-600 text-green-600
            hover:bg-green-50 px-8 py-3 rounded-full text-lg transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Why you're here cards */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          We noticed a few things 👀
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "🍕", title: "You tried to order food",
              desc: "Stress eating is valid. But we can help you find healthier coping mechanisms." },
            { emoji: "🤖", title: "You failed 4 CAPTCHAs",
              desc: "That level of patience — or lack thereof — tells us you might need an outlet." },
            { emoji: "🌍", title: "You watched your world fall",
              desc: "Sometimes things fall apart. We help you put them back together." },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 text-center
              hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{card.emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          What our clients say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { quote: "I came for pizza. I found peace.", name: "Rahul, 28" },
            { quote: "The CAPTCHA broke me. MindEase fixed me.", name: "Priya, 31" },
            { quote: "10/10 would have an existential crisis again.", name: "Arjun, 25" },
          ].map((t, i) => (
            <div key={i} className="bg-green-50 rounded-2xl p-6">
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <p className="text-green-700 font-semibold text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-6 text-center">
        <p className="text-white font-semibold mb-1">🛋️ MindEase</p>
        <p className="text-sm">Good food for the soul. Great therapy for the rest.</p>
        <p className="text-xs mt-4">© 2025 MindEase. You're going to be okay 💚</p>
      </footer>

      {/* April Fools Banner */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center
          justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md
            text-center animate-bounce-once">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Happy April Fools!
            </h2>
            <p className="text-gray-500 mb-6">
              No actual therapy was harmed in the making of this website.
              Hope you enjoyed the ride! 😄
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-orange-500 hover:bg-orange-600 text-white
                px-8 py-3 rounded-full font-semibold transition-colors w-full"
            >
              🍕 Restart the Journey
            </button>
          </div>
        </div>
      )}
    </div>
  )
}