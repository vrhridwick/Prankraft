"use client"

import { Star, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface FoodItem {
  id: string
  name: string
  price: number
  originalPrice: number
  rating: number
  deliveryTime: string
  emoji: string
  image: string 
  category: string
}

interface FoodCardProps {
  item: FoodItem
  onAddToCart: (item: FoodItem) => void
}

export function FoodCard({ item, onAddToCart }: FoodCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
      {/* Image Placeholder with Gradient */}
      <div className="relative h-40 bg-gradient-to-br from-primary/30 via-secondary to-card flex items-center justify-center">
        {/* Image Section */}
<div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
  <img
    src={item.image}
    alt={item.name}
    className="w-full h-full object-cover transition-transform 
      duration-300 hover:scale-105"
    onError={(e) => {
      // fallback to emoji if image fails to load
      e.currentTarget.style.display = "none"
      e.currentTarget.nextElementSibling?.classList.remove("hidden")
    }}
  />
  {/* Emoji fallback — hidden by default */}
  <div className="hidden absolute inset-0 flex items-center 
    justify-center text-6xl bg-gray-100">
    {item.emoji}
  </div>

  {/* Badge */}
  <span className="absolute top-2 left-2 bg-orange-500 text-white 
    text-xs font-bold px-2 py-1 rounded-full">
    BESTSELLER
  </span>
</div>
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{item.rating}</span>
        </div>
        {/* Delivery Time */}
        {/* <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{item.deliveryTime}</span>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">₹{item.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => onAddToCart(item)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
