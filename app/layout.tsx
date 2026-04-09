import type { Metadata } from 'next'
import { DM_Sans, Syne, Playfair_Display, Lora,Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800"],
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600"],
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: 'FoodCrave - Food Delivery',
  description: 'Hungry? We\'ve Got You. Order your favorite food online with FoodCrave.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/food-icon.png',
        type: 'image/png',
      },
      
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`
      ${poppins.variable} 
      ${dmSans.variable}
        ${syne.variable}
        ${playfairDisplay.variable}
        ${lora.variable}
        `}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
