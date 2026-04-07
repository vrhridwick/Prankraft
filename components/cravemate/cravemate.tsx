"use client"

import { useState, useCallback } from "react"
import { Navbar } from "./navbar"
import { Hero } from "./hero"
import { CategoryPills } from "./category-pills"
import { FoodGrid } from "./food-grid"
import { CartSidebar, CartItem } from "./cart-sidebar"
import { Footer } from "./footer"
import { FoodItem } from "./food-card"

interface CraveMateProps {
  onCheckout?: () => void
}

export function CraveMate({ onCheckout }: CraveMateProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = useCallback((item: FoodItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const handleUpdateQuantity = useCallback((itemId: string, delta: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === itemId)
      if (!item) return prev

      const newQuantity = item.quantity + delta
      if (newQuantity <= 0) {
        return prev.filter((i) => i.id !== itemId)
      }
      return prev.map((i) =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      )
    })
  }, [])

  const handleCheckout = useCallback(() => {
    if (onCheckout) {
      onCheckout()
    } else {
      alert("Checkout initiated! Total: ₹" + cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))
    }
  }, [onCheckout, cartItems])

  const scrollToMenu = useCallback(() => {
    const menuSection = document.getElementById("menu-section")
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <Hero onOrderNow={scrollToMenu} />

        <div id="menu-section">
          <CategoryPills
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <FoodGrid
            activeCategory={activeCategory}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  )
}
