"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getCartItems } from "../lib/getProducts"


export const Count = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItem || [])
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>("false")
  const [userCart, setUserCart] = useState<number | null>(0)


  useEffect(() => {
    let login = localStorage.getItem("isLogin")
    setIsLoggedIn(login)
  }, [])

  // Fetch cart count for logged-in users
  async function fetchCartCount() {
    try {
      if (isLoggedIn === "true") {
        const count = await getCartItems()
        setUserCart(count.length)
      } else {
        setUserCart(cartItems.length)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Fetch on mount and when isLoggedIn changes
  useEffect(() => {
    fetchCartCount()
  }, [isLoggedIn])

  // For guest users: sync with Redux cart state
  useEffect(() => {
    if (isLoggedIn !== "true") {
      setUserCart(cartItems.length)
    }
  }, [cartItems, isLoggedIn])

  // For logged-in users: re-fetch when cart count might have changed
  // You can trigger this via a custom event or use a global state
  useEffect(() => {
    if (isLoggedIn === "true") {
      // Listen for cart updates from other components
      const handleCartUpdate = () => fetchCartCount()
      window.addEventListener('cart-updated', handleCartUpdate)
      return () => window.removeEventListener('cart-updated', handleCartUpdate)
    }
  }, [isLoggedIn])

  return (
    <>
      <p className="text-xs">{userCart}</p>
    </>
  )
}