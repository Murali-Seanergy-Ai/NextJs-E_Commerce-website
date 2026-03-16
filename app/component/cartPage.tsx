"use client"

import { useSelector, useDispatch } from "react-redux"
import { removeFromCart,addToCartItem } from "../redux/cartSlice"
import { getCartItems,addToCart, removeItemFromCart } from "../lib/getProducts"

import { useEffect, useState } from "react"





const CartItems = () => {
  
  let [cartItems, setCartItems] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>("")

  const {login, cartItem} = useSelector((state:any)=>state.cart)
  const dispatch = useDispatch()

      useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin")
    setIsLoggedIn(loginStatus)
    console.log("Login status from localStorage:", loginStatus) // Debug log to check the login status
  }, [])


useEffect(() => {
  const fetchCartItems = async () => {
    try {
      if (isLoggedIn === "true") {
        const items = await getCartItems()
        setCartItems(items)
      }
    } catch (error) {
      console.error(error)
    }
  }

  fetchCartItems()
}, [isLoggedIn])
  if(isLoggedIn !== "true"){

  const handleRemove = (id: number) => {
    dispatch(removeFromCart({ id }))
  }
  const handleAdd = (item:any)=>{
    dispatch(addToCartItem(item))
  }
  }
  if (cartItems.length === 0) {
    return <p className="p-4 text-center">Your cart is empty.</p>

  }
  type CartItem = {
    id: number,
    image: string,
    title: string,
    price: number,
    quantity: number}


const filteredCart = cartItems.map(item => ({
  cartItemId: item._id, // Assuming the cart item has a unique _id field
  id: item.productId._id,
  image: item.productId.image,
  title: item.productId.title,
  price: item.productId.price,
  quantity: item.quantity
}));

// Increase quantity for a cart item
const IncreaseQuantity = async  (item:any) => {
  try{

    await addToCart(item.id, 1)
  const items =  await getCartItems()
  setCartItems(items)

   console.log("Quantity increased for item:", item.id) // Debug log to check the item ID
  }catch(error){
    console.error("Error increasing quantity:", error)
  }
}
// Decrease quantity for a cart item
const DecreaseQuantity = async (item:any) => {
  try{
    await addToCart(item.id, -1)
  const items =   await getCartItems()
  setCartItems(items) 
  }catch(error){
    console.error("Error decreasing quantity:", error)
  }
}

// Handle removing an item from the cart
const handleRemove = async (id:any) => {
  try{  
    await removeItemFromCart(id) // Assuming this will remove the item from the cart
  const items =   await getCartItems()
  setCartItems(items) 
  console.log("Item removed from cart:", id) // Debug log to check the removed item ID
  return items
  }catch(error){
    console.error("Error removing item from cart:", error)
  }
}


const cartItemsTyped: CartItem[] = filteredCart
  const total = cartItemsTyped.reduce<number>((acc, item) => {
  return acc + item.price * item.quantity
}, 0)

  return (
    <div className="space-y-4 p-4">
        <div className='grid'>

      {filteredCart.map((item: any) => (
        <div className ="flex items-center justify-between gap-4 shadow-lg p-2" key={item.id}>
           <div
         
          className="flex items-center gap-4  rounded p-2 "
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain"
            />
          )}
          <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>
            <p>${item.price}</p>
                <div className="flex items-center gap-4 mt-3">

                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">

                    <button
                    className="px-3 py-1 bg-red-400 text-white hover:bg-red-500 transition"
                      onClick={()=>DecreaseQuantity(item)}
                    >
                    −
                    </button>

                    <span className="px-4 py-1 font-semibold text-gray-700">
                    {item.quantity}
                    </span>

                    <button
                    className = "px-3 py-1 bg-green-400 text-white hover:bg-green-500 transition"

                      onClick={()=>{IncreaseQuantity(item)}}
                    >
                    +
                    </button>

                </div>

                </div>
          </div>
         
        </div>
        <div>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => handleRemove(item.cartItemId)}
          >
            Remove
          </button>

        </div>

        </div>
       
      ))}
        </div>
        <div className="text-right font-bold text-lg">
            Total: ${total.toFixed(2)}
        </div>
    </div>
  )
}

export default CartItems
