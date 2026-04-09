# 🍕 FoodCrave 

> A Prankraft 2026 submission — A deceptive food ordering experience that slowly reveals you needed therapy more than pizza.

---

## 🎭 About FoodCrave?

**FoodCrave** is a fully functional, multi-scene prank web experience built for **Prankraft 2026** — a front-end web design competition inspired by the spirit of April Fools.

What starts as a completely convincing food delivery app (think Swiggy meets Zomato) gradually descends into chaos — broken servers, impossible CAPTCHAs, gravity turning on — before finally revealing that what the user *really* needed wasn't a burger. It was **therapy**.

---

## 🎬 The Journey

The user goes through the same 5-act story:

```
🍕  Act 1 — Food Ordering Site
        A beautiful, dark-themed food delivery app. Add to cart, browse dishes.
        Looks 100% real. No hints of anything unusual.
        ↓
🤖  Act 2 — The Infinite CAPTCHA
        Click "Proceed to Checkout" and get hit with a fake reCAPTCHA v3 flow.
        4 rounds of increasingly absurd image grids and checkbox confirmations.
        Always fails. Every single time.
        ↓
⏳  Act 3 — Suspicious Loading Screen
        "Initializing secure checkout..." turns into "Redirecting to payment..."
        A progress bar that shifts from orange to green as it loads.
        ↓
🌍  Act 4 — Gravity & Server Chaos
        The CAPTCHA page flips upside down. Connection drops. Servers fail.
        Three reconnection attempts. One last desperate CAPTCHA. Then —
        pure black. TV static. NO SIGNAL.
        ↓
🛋️  Act 5 — Therapy Website Reveal
        MindEase. Calm. Clean. Serif fonts. "You've been through a lot today."
        An April Fools banner appears. A "Restart the Journey" button awaits.
```

---

## 🛠️ Tech Stack

- **Next.js 15** — App Router, file-based routing per scene
- **React** — `useState`, `useEffect`, `useRef` for all interactions
- **Tailwind CSS** — Utility-first styling, responsive design
- **TypeScript** — Full type safety across all components
- **Google Fonts** — Syne, DM Sans, Playfair Display, Lora

---

## 📁 Project Structure

```
app/
├── page.tsx                      → 🍕 Food Site (Scene 1)
├── checkout/
│   └── verify/
│       └── page.tsx              → 🤖 CAPTCHA Page (Scene 2)
├── loading-screen/
│   └── page.tsx                  → ⏳ Loading Screen (Scene 3)
├── gravity/
│   └── page.tsx                  → 🌍 Gravity & Chaos (Scene 4)
├── therapy/
│   └── page.tsx                  → 🛋️ Therapy Reveal (Scene 5)
├── layout.tsx                    → Font imports, global metadata
└── globals.css                   → Themes, keyframes, animations

components/
└── cravemate/
    ├── cravemate.tsx             → Root food app component
    ├── navbar.tsx                → Sticky nav with cart badge
    ├── hero.tsx                  → Hero section
    ├── category-filter.tsx       → Filter pills
    ├── food-grid.tsx             → 6 food cards
    ├── food-card.tsx             → Individual card with Add to Cart
    └── cart-sidebar.tsx          → Sliding cart panel
```

---

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) (v18.17.0 or higher recommended)
- npm (comes bundled with Node.js)

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/vrhridwick/Prankraft.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start your journey. 🍕

---

## 🌐 Live Demo

🔗 **[prankraft-six.vercel.app](https://prankraft-six.vercel.app/)** 

---

## 🏆 Evaluation Criteria Coverage

### 🎭 Creativity & Concept
A multi-act narrative prank that tells a complete story. The user's emotional arc — curiosity → frustration → confusion → laughter — mirrors the joke itself. The therapy reveal only lands because every previous scene earned it.

### 🎭 Deceptive / Surprise Element
- Food site looks completely legitimate — no hints of a prank
- `/checkout/verify` URL feels like a real checkout redirect
- `ERR_CONNECTION_RESET` mimics actual browser network errors
- reCAPTCHA v3 branding is instantly recognizable, making the fake feel real
- The 180° page flip is unexpected and physically disorienting

### 🎨 UI/UX & Design Quality
- Fully responsive across mobile (375px), tablet (768px), and desktop (1440px)
- Two complete, polished design systems (food dark theme + therapy light theme)
- Smooth transitions between every scene
- Consistent typography hierarchy using paired Google Font combinations

---

## 📄 License

MIT License — feel free to learn from it, but maybe don't order food from it.

---
