"use client"

import { FoodCard, FoodItem } from "./food-card"

// const foodItems: FoodItem[] = [
//   {
//     id: "1",
//     name: "Margherita Pizza",
//     price: 299,
//     originalPrice: 399,
//     rating: 4.5,
//     deliveryTime: "25 min",
//     emoji: "🍕",
//     image:
//     category: "pizza",
//   },
//   {
//     id: "2",
//     name: "Smoky Burger",
//     price: 249,
//     originalPrice: 329,
//     rating: 4.3,
//     deliveryTime: "20 min",
//     emoji: "🍔",
//     category: "burgers",
//   },
//   {
//     id: "3",
//     name: "Spicy Ramen",
//     price: 219,
//     originalPrice: 289,
//     rating: 4.7,
//     deliveryTime: "30 min",
//     emoji: "🍜",
//     category: "noodles",
//   },
//   {
//     id: "4",
//     name: "Chicken Tacos",
//     price: 189,
//     originalPrice: 249,
//     rating: 4.4,
//     deliveryTime: "15 min",
//     emoji: "🌮",
//     category: "tacos",
//   },
//   {
//     id: "5",
//     name: "Lava Cake",
//     price: 149,
//     originalPrice: 199,
//     rating: 4.8,
//     deliveryTime: "20 min",
//     emoji: "🍫",
//     category: "desserts",
//   },
//   {
//     id: "6",
//     name: "Mango Smoothie",
//     price: 179,
//     originalPrice: 229,
//     rating: 4.6,
//     deliveryTime: "10 min",
//     emoji: "🥭",
//     category: "desserts",
//   },
// ]
const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    deliveryTime: "25 min",
    emoji: "🍕",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80",
    category: "pizza",
  },
  {
    id: "2",
    name: "Smoky Burger",
    price: 249,
    originalPrice: 329,
    rating: 4.3,
    deliveryTime: "20 min",
    emoji: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    category: "burgers",
  },
  {
    id: "3",
    name: "Spicy Ramen",
    price: 219,
    originalPrice: 289,
    rating: 4.7,
    deliveryTime: "30 min",
    emoji: "🍜",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    category: "noodles",
  },
  {
    id: "4",
    name: "Chicken Tacos",
    price: 189,
    originalPrice: 249,
    rating: 4.4,
    deliveryTime: "15 min",
    emoji: "🌮",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
    category: "tacos",
  },
  {
    id: "5",
    name: "Lava Cake",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    deliveryTime: "20 min",
    emoji: "🍫",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80",
    category: "desserts",
  },
  {
    id: "6",
    name: "Mango Smoothie",
    price: 179,
    originalPrice: 229,
    rating: 4.6,
    deliveryTime: "10 min",
    emoji: "🥭",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80",
    category: "desserts",
  },
]
interface FoodGridProps {
  activeCategory: string
  onAddToCart: (item: FoodItem) => void
}

export function FoodGrid({ activeCategory, onAddToCart }: FoodGridProps) {
  const filteredItems = activeCategory === "all"
    ? foodItems
    : foodItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Popular Dishes</h2>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-4">🍽️</p>
            <p>No dishes found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
