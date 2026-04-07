"use client"

import { Button } from "@/components/ui/button"

interface HeroProps {
  onOrderNow: () => void
}

export function Hero({ onOrderNow }: HeroProps) {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Hungry?{" "}
            <span className="text-primary">{"We've Got You."}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Discover the best restaurants and cuisines in your area. Fast delivery, fresh food, and amazing flavors at your fingertips.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              onClick={onOrderNow}
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 hover:bg-secondary"
              onClick={onOrderNow}
            >
              View Menu
            </Button>
          </div>
        </div>

        {/* Right Decoration */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative">
            {/* Glowing Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/20 glow-orange"></div>
            </div>
            {/* Food Emoji */}
            <div className="relative z-10 text-[120px] md:text-[180px] select-none animate-bounce" style={{ animationDuration: "3s" }}>
              🍔
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
