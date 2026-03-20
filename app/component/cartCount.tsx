"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getCartItems } from "../lib/getProducts"


export const Count = () => {
  const cartItems = useSelector((state:any) => state.cart.cartItem || [])
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>("false")
  const [userCart, setUserCart] = useState<Number | null>(0)
  
  
  useEffect(()=>{
     let  login = localStorage.getItem("isLogin")
    setIsLoggedIn(login)
  },[isLoggedIn])
 async  function count(){
  try{
    if(isLoggedIn ==="true"){
  
      const  count = await getCartItems()
      setUserCart(count?.data?.length)
    }else{
      setUserCart(cartItems.length)

    }

  }catch(err){

    
  }
 }

return (
  <>
  {userCart}
  </>
)
}