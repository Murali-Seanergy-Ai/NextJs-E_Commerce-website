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
  }, [isLoggedIn])
  async function count() {
    try {
      if(isLoggedIn!== "true") return 
      if (isLoggedIn === "true") {

        const count = await getCartItems()
        console.log(count.length, "jj")
        setUserCart(count.length)
      } else {
        setUserCart(cartItems.length)

      }

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    count()
  }, [isLoggedIn])

  console.log(userCart, "kkk")

  return (
    <>

      <p className="text-xs">{userCart}</p>
    </>
  )
}