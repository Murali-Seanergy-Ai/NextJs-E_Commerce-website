"use client"

import { useDispatch } from "react-redux"
import { addToCart } from "../redux/cartSlice"

interface ProductProps {
  product: any
}

export default function ProductCard({ product }: ProductProps) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <div className="shadow-lg border border-gray-200 rounded bg-white flex flex-col h-[350px] p-4">
      
      <div className="h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      <h2 className="font-semibold text-sm mt-2">
        {product.title}
      </h2>

      <p className="text-green-600 font-bold">
        ${product.price}
      </p>

      <div className="mt-auto flex gap-2">
        <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}