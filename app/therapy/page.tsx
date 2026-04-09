"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TherapyPage() {
  const router = useRouter()
  const [showBanner, setShowBanner] = useState(false)
  const [visible, setVisible] = useState(false)
  
  // Prank States
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 })
  const [headingHovered, setHeadingHovered] = useState(false)

  useEffect(() => {
    // Fade in on mount
    setTimeout(() => setVisible(true), 100)
    // Show april fools banner after 4s
    setTimeout(() => setShowBanner(true), 4000)
  }, [])

  // Prank 1: The Runaway Button mechanism
  const dodgeMouse = () => {
    setButtonPos({
      x: Math.random() * 400 - 200, // Teleports randomly between -200px and 200px
      y: Math.random() * 200 - 100,
    })
  }

  // Prank 2: Random annoying background click alerts
  const handleRandomClick = () => {
    if (Math.random() > 0.9) {
      alert("Please stop clicking the background. It's making the server anxious.")
    }
  }

  return (
    <div 
      className={`min-h-screen bg-green-50 transition-opacity duration-1000 overflow-hidden cursor-crosshair
      ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={handleRandomClick}
    >
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <span className="text-green-700 font-bold text-xl hover:text-red-500 cursor-help transition-colors">
          🛋️ MindEase
        </span>
        
        {/* Prank 3: Cursed Navigation Links */}
        <div className="hidden md:flex gap-8 text-gray-600 text-sm font-medium">
          <span className="hover:blur-sm cursor-none transition-all duration-300">Home</span>
          <span className="hover:-scale-y-100 cursor-wait transition-transform duration-500">Services</span>
          <span className="hover:opacity-0 cursor-not-allowed transition-opacity duration-300">About</span>
          <span className="hover:translate-y-10 hover:text-red-500 transition-transform duration-300">Contact</span>
        </div>

        {/* Runaway Button 1 */}
        <button 
          onMouseEnter={dodgeMouse}
          style={{ 
            transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`, 
            transition: 'transform 0.15s ease-out' 
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Book Session
        </button>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6 max-w-3xl mx-auto">
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
          You made it here for a reason
        </span>
        
        {/* Prank 4: Gaslighting Headline */}
        <h1 
          onMouseEnter={() => setHeadingHovered(true)}
          onMouseLeave={() => setHeadingHovered(false)}
          className="text-4xl md:text-5xl font-bold text-gray-800 mt-6 leading-tight transition-all duration-300"
        >
          {headingHovered ? "Actually, you're just hungry and tired." : "You've been through a lot today."}
        </h1>
        
        {/* Prank 5: Unreadable Text until hovered */}
        <p className="text-gray-500 mt-4 text-lg blur-[2px] hover:blur-none transition-all duration-500 cursor-help">
          You deserve real support. We're here whenever you're ready. (Squint harder)
        </p>

        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          {/* Runaway Button 2 */}
          <button 
            onMouseEnter={dodgeMouse}
            style={{ 
              transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`, 
              transition: 'transform 0.15s ease-out' 
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
          >
            Book a Free Session
          </button>
          
          {/* Prank 6: Fake Alert Button */}
          <button 
            onClick={() => alert("Error 404: Motivation to learn more not found. 🍕")}
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 hover:rotate-6 hover:scale-110 px-8 py-3 rounded-full text-lg transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Why you're here cards */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8 hover:tracking-widest transition-all duration-500">
          We noticed a few things 👀
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "🍕", title: "You tried to order food", desc: "Stress eating is valid. But we can help you find healthier coping mechanisms." },
            { emoji: "🤖", title: "You failed 4 CAPTCHAs", desc: "That level of patience — or lack thereof — tells us you might need an outlet." },
            { emoji: "🌍", title: "You watched your world fall", desc: "Sometimes things fall apart. We help you put them back together." },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all">
              {/* Prank 7: Spinning Emojis */}
              <div className="text-4xl mb-3 hover:animate-spin cursor-wait inline-block">{card.emoji}</div>
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
            // Prank 8: Skewing cards
            <div key={i} className="bg-green-50 rounded-2xl p-6 hover:skew-x-6 hover:-skew-y-3 transition-transform duration-300">
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <p className="text-green-700 font-semibold text-sm hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500">
                — {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-6 text-center hover:bg-gray-900 transition-colors">
        <p className="text-white font-semibold mb-1 hover:animate-pulse">🛋️ MindEase</p>
        <p className="text-sm">Good food for the soul. Great therapy for the rest.</p>
        <p className="text-xs mt-4">© 2025 MindEase. You're going to be okay 💚</p>
      </footer>

      {/* April Fools Banner */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          {/* Added 'relative' to the card so the absolute close button aligns to it */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center animate-bounce">
            
            {/* The requested Close Button */}
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-600 hover:rotate-90 transition-all text-2xl font-bold"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-5xl mb-4 hover:animate-spin inline-block">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Happy April Fools!
            </h2>
            <p className="text-gray-500 mb-6">
              No actual therapy was harmed in the making of this website. 
              Hope you enjoyed the ride! 😄 (Good luck catching the buttons now)
            </p>
            
            {/* Prank 9: Fake Restart that just scrambles screen */}
            <button
              onClick={() => {
                alert("Redirecting to the matrix...")
                document.body.style.transform = "rotate(180deg)"
                document.body.style.transition = "transform 2s"
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors w-full"
            >
              🍕 Restart the Journey
            </button>
          </div>
        </div>
      )}
    </div>
  )
}