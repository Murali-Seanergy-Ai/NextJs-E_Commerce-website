"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, addToCartItem } from "../redux/cartSlice"
import { getCartItems, addToCart, removeItemFromCart } from "../lib/getProducts"
import toast from "react-hot-toast"

const CartItems = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>("")

  const { cartItem } = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin")
    setIsLoggedIn(loginStatus)
  }, [])

  const isUserLoggedIn = isLoggedIn === "true"

  useEffect(() => {
    const fetchCartItems = async () => {
      if (isUserLoggedIn) {
        const items = await getCartItems()
        setCartItems(items)
      }
    }
    fetchCartItems()
  }, [isUserLoggedIn])

  //  Normalize
  const normalizedCart = isUserLoggedIn
    ? cartItems.map(item => ({
        cartItemId: item._id,
        id: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity
      }))
    : cartItem.map((item: any) => ({
        cartItemId: item.id,
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }))

  //  Correct empty check
  if (normalizedCart.length === 0) {
    return <p className="p-4 text-center">Your cart is empty.</p>
  }

  //  Increase
  const IncreaseQuantity = async (item: any) => {
    if (isUserLoggedIn) {
      await addToCart(item.id, 1)
      setCartItems(await getCartItems())
    } else {
      dispatch(addToCartItem(item))
    }
  }

  //  Decrease
  const DecreaseQuantity = async (item: any) => {
    if (isUserLoggedIn) {
      await addToCart(item.id, -1)
      setCartItems(await getCartItems())
    } else {
      dispatch(removeFromCart({ id: item.id }))
    }
  }

  //  Remove
  const handleRemove = async (id: any) => {
    if (isUserLoggedIn) {
      await removeItemFromCart(id)
      setCartItems(await getCartItems())
      toast.error("Item removed from cart")
    } else {
      dispatch(removeFromCart({ id }))
    }
  }

  const total = normalizedCart.reduce((acc: number, item: any) => {
    return acc + item.price * item.quantity
  }, 0)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
  <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

  <div className="space-y-4">
    {normalizedCart.map((item: any) => (
      <div
        key={item.id}
        className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
      >
        {/* Left Section */}
        <div className="flex gap-4 items-center">
          <img
            src={item.image}
            className="w-20 h-30 object-cover rounded-lg border"
          />

          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h2>
            <p className="text-green-600 font-medium">${item.price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => DecreaseQuantity(item)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                −
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => IncreaseQuantity(item)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-3">
          <p className="font-semibold text-gray-700">
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => handleRemove(item.cartItemId)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Total Section */}
  <div className="mt-8 bg-white p-4 rounded-xl shadow flex justify-between items-center">
    <span className="text-lg font-semibold">Total</span>
    <span className="text-xl font-bold text-green-600">
      ${total.toFixed(2)}
    </span>
  </div>

  {/* Checkout Button */}
  <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-semibold">
    Proceed to Checkout
  </button>
</div>
  )
}

export default CartItems