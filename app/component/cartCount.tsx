"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Count = () => {
  const cartItems = useSelector((state:any) => state.cart.cartItem || [])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <span>{cartItems.length}</span>
}