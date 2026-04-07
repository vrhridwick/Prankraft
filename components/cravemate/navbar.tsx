"use client"

import { Search, MapPin, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NavbarProps {
  cartItemCount: number
  onCartClick: () => void
}

export function Navbar({ cartItemCount, onCartClick }: NavbarProps) {
  const router = useRouter()
   const handleCheckoutClick = () => {
  // navigate("/checkout/verify") // ← feels like real page navigation
  router.push("/checkout/verify")

}
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-primary">FoodCrave</h1>
        </div>

        {/* Search Bar - Hidden on mobile, centered on desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for dishes, restaurants..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Location */}
          <button className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MapPin className="h-4 w-4" />
            <span className="hidden lg:inline">Location</span>
          </button>

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground rounded-full">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>

          {/* Sign In Button */}
          <Button variant="outline" size="sm" className="hidden sm:inline-flex border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleCheckoutClick}>
            Sign In
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
    </nav>
  )
}
