"use client"

interface CategoryPillsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "noodles", label: "Noodles", emoji: "🍜" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "salads", label: "Salads", emoji: "🥗" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
]

export function CategoryPills({ activeCategory, onCategoryChange }: CategoryPillsProps) {
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
