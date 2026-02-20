"use client"
import { useSelector } from "react-redux"

 export  const Count = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems)

  return (
    <div>
       {cartItems.length}
    </div>
  )
}