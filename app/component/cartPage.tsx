"use client"

// import { useSelector, useDispatch } from "react-redux"
// import { removeFromCart,addToCart } from "../redux/cartSlice"
import { getCartItems } from "../lib/getProducts"
import { useEffect, useState } from "react"

const CartItems = () => {
  const [cartItems, setCartItems] = useState<any[]>([])

  
useEffect(() => {
  const fetchCartItems = async () => {
    try {   
      const items = await getCartItems()
      console.log("Fetched cart items:", items) // Debug log to check the fetched cart items
      setCartItems(items)
      
    } catch (error) {
      console.error("Error fetching cart items:", error)
    }   
  }

  fetchCartItems()
}, [])

  // const handleRemove = (id: number) => {
  //   dispatch(removeFromCart({ id }))
  // }
  // const handleAdd = (item:any)=>{
  //   dispatch(addToCart(item))
  // }

  if (cartItems.length === 0) {
    return <p className="p-4 text-center">Your cart is empty.</p>

  }
  type CartItem = {
    id: number
    title: string,
    price: number,
    quantity: number}

const cartItemsTyped: CartItem[] = cartItems
  const total = cartItemsTyped.reduce<number>((acc, item) => {
  return acc + item.price * item.quantity
}, 0)
  return (
    <div className="space-y-4 p-4">
        <div className='grid'>

      {cartItems.map((item: any) => (
        <div
          key={item._id}
          className=" shadow-md  flex items-center gap-4  rounded p-2"
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
                     
                    >
                    −
                    </button>

                    <span className="px-4 py-1 font-semibold text-gray-700">
                    {item.quantity}
                    </span>

                    <button
                    className="px-3 py-1 bg-green-400 text-white hover:bg-green-500 transition"


                    >
                    +
                    </button>

                </div>

                </div>
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
