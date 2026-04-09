"use client"
import { useRouter } from "next/navigation"
import { CraveMate } from "@/components/cravemate/cravemate"

export default function Home() {
  const router = useRouter()
  const handleCheckout = () => {
    // console.log("Checkout initiated!")
     router.push("/checkout/verify")
  }

  return (
  <div className="food-theme"><CraveMate onCheckout={handleCheckout}/>
  </div> )
}
