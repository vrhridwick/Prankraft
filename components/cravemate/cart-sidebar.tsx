"use client"
import { useState, useEffect } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoodItem } from "./food-card"
// import { useNavigate } from "react-router-dom"
import { useRouter } from "next/navigation"

export interface CartItem extends FoodItem {
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (itemId: string, delta: number) => void
  onCheckout: () => void
}

const failMessages = [
  "Incorrect! Are you sure you're human? 🤔",
  "Still wrong... very suspicious 🦾",
  "Our servers are judging you 👀",
  "Something feels off about you 😐",
  "We can't verify you're human... but we know what you need 🛋️"
]

export function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onCheckout,
}: CartSidebarProps) {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
 // Reset captcha state when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setShowCaptcha(false)
      setAttempts(0)
      setMessage("")
    }
  }, [isOpen])

  const handleCheckoutClick1 = () => {
    setShowCaptcha(true) // show captcha instead of proceeding
  }
  const handleCheckoutClick = () => {
  // navigate("/checkout/verify") // ← feels like real page navigation
  router.push("/checkout/verify")

}

  const handleCaptchaChange = (token: string | null) => {
    if (!token) return

    setIsVerifying(true)

    // Fake verification delay
    setTimeout(() => {
      setIsVerifying(false)

      if (attempts >= 4) {
        // After 5 fails → trigger next scene
        setMessage(failMessages[4])
        setTimeout(() => {
          onCheckout() // now we actually proceed to Scene 2
        }, 1500)
      } else {
        setAttempts(prev => prev + 1)
        setMessage(failMessages[attempts])
      }
    }, 1200) // feels like real verification
  }
const router = useRouter()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <span className="text-sm text-muted-foreground">
                ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some delicious items!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-card rounded-lg border border-border"
                  >
                    {/* Emoji */}
                    <div className="text-3xl flex-shrink-0">{item.emoji}</div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="text-primary font-semibold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-primary">₹{subtotal}</span>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                onClick={handleCheckoutClick}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
          {showCaptcha && (
          <div className="absolute inset-0 bg-black/80 z-60 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-6 w-full flex flex-col items-center gap-4 shadow-2xl">
              
              <h3 className="text-gray-800 font-bold text-lg">
                One last step! 🔐
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Please verify you're human before we process your order.
              </p>

              {/* Google reCAPTCHA with test key — always shows real UI */}
              <ReCAPTCHA
                key={attempts} // remounts on each attempt = fresh captcha
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
              />

              {/* Verifying spinner */}
              {isVerifying && (
                <p className="text-blue-500 text-sm animate-pulse">
                  Verifying... please wait ⏳
                </p>
              )}

              {/* Fail message */}
              {message && !isVerifying && (
                <p className="text-red-500 text-sm text-center font-medium">
                  {message}
                </p>
              )}

              {/* Attempt counter */}
              <p className="text-gray-400 text-xs">
                Attempt {attempts}/5
              </p>

            </div>
          </div>
        )}

      </div>
    </>
  )
}
