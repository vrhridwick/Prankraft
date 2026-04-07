// pages/CaptchaPage.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Round configs
const rounds = [
  { type: "image-grid",  instruction: "Select all images containing Traffic Lights" },
  { type: "image-grid",  instruction: "Select all images containing Bicycles" },
  { type: "checkbox",    instruction: "Select all that apply to confirm your identity" },
  { type: "image-grid",  instruction: "Select all images containing Crosswalks" },
]

// Emoji sets per round for fake image grid
const emojiSets = [
  ["🚗","🚦","🏠","🚦","🌳","🚦","🚕","🏢","🚦"],
  ["🚲","🚗","🏠","🚲","🌳","🚕","🚲","🏢","🚗"],
  [], // checkbox round — no grid
  ["🚶","🛣️","🚶","🚗","🚶","🏠","🛣️","🚶","🚗"],
]

const failMessages = [
  "Please try again. Make sure to select ALL matching images.",
  "Verification failed. Some selections were incorrect.",
  "Hmm, that doesn't look right. Please try again.",
  "Too many incorrect attempts. Loading additional verification...",
]

const checkboxItems = [
  "I am not a robot",
  "I accept my questionable food choices",
  "I acknowledge I've been stress-eating lately",
  "I agree I might need to talk to someone",
  "I am emotionally available",
]

export default function CaptchaPage() {
  const navigate = useNavigate()
  const [round, setRound] = useState(0)
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState([])
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [shake, setShake] = useState(false)

  const current = rounds[round]

  // Auto-proceed after round 4
  useEffect(() => {
    if (round >= rounds.length) {
      navigate("/loading") // → Scene 3
    }
  }, [round])

  const toggleCell = (i) => {
    setSelected(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const toggleCheck = (i) => {
    setChecked(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const handleVerify = () => {
    if (selected.length === 0 && checked.length === 0) {
      setError("Please make a selection before verifying.")
      return
    }

    setIsVerifying(true)
    setError("")

    // Fake verification delay
    setTimeout(() => {
      setIsVerifying(false)

      if (round < rounds.length - 1) {
        // Always fail — show error + next round
        triggerShake()
        setError(failMessages[round])
        setTimeout(() => {
          setRound(prev => prev + 1)
          setSelected([])
          setChecked([])
          setError("")
        }, 1500)
      } else {
        // Final round — proceed
        setError("Verification complete. Redirecting...")
        setTimeout(() => navigate("/loading"), 1500)
      }
    }, 1800) // feels like real server check
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 
        ${shake ? "animate-shake" : ""}`}
      >
        {/* Header — looks like real CAPTCHA provider */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full 
              flex items-center justify-center text-white text-xs font-bold">
              rC
            </div>
            <span className="text-gray-500 text-xs">reCAPTCHA v3</span>
          </div>
          <span className="text-gray-400 text-xs">
            Step {round + 1} of {rounds.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((round) / rounds.length) * 100}%` }}
          />
        </div>

        {/* Instruction */}
        <h2 className="text-gray-800 font-semibold text-base mb-4 text-center">
          {current.instruction}
        </h2>

        {/* IMAGE GRID ROUND */}
        {current.type === "image-grid" && (
          <div className="grid grid-cols-3 gap-1 mb-4">
            {emojiSets[round].map((emoji, i) => (
              <div
                key={i}
                onClick={() => toggleCell(i)}
                className={`aspect-square flex items-center justify-center 
                  text-3xl cursor-pointer rounded-lg border-2 transition-all
                  ${selected.includes(i)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                {/* Blue checkmark overlay when selected */}
                {selected.includes(i) && (
                  <div className="relative">
                    <span>{emoji}</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 
                      bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
                {!selected.includes(i) && <span>{emoji}</span>}
              </div>
            ))}
          </div>
        )}

        {/* CHECKBOX ROUND */}
        {current.type === "checkbox" && (
          <div className="flex flex-col gap-3 mb-4">
            {checkboxItems.map((label, i) => (
              <label
                key={i}
                className="flex items-center gap-3 cursor-pointer 
                  p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  onClick={() => toggleCheck(i)}
                  className={`w-5 h-5 rounded border-2 flex items-center 
                    justify-center transition-all flex-shrink-0
                    ${checked.includes(i)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                    }`}
                >
                  {checked.includes(i) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className={`text-sm text-center mb-3 font-medium
            ${error.includes("complete") ? "text-green-500" : "text-red-500"}`}>
            {error}
          </p>
        )}

        {/* Verify Button */}
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

        {/* Footer — mimics real CAPTCHA */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-300 text-xs">Privacy - Terms</span>
          <span className="text-gray-300 text-xs">reCAPTCHA</span>
        </div>
      </div>
    </div>
  )
}