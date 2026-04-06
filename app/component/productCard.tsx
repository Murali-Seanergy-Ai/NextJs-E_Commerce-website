"use client"

import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { addToCartItem } from "../redux/cartSlice"
import { addToCart } from "../lib/getProducts"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { getProducts } from "../lib/getProducts"


type ProductProps = {
  products: any[]   // or your product type


}

export default function ProductCard() {

  const dispatch = useDispatch()
  const [products, setProducts] = useState<any[]>([])
  const searchTerm = useSelector((state: any) => state.cart.searchTerm)



  const handleAddToCart = async (pro: any) => {

    const isLoggedIn = localStorage.getItem("isLogin") === "true"
    if (isLoggedIn) {
      try {

        console.log("Adding to cart:", pro) // Debug log to check the product being added
        await addToCart(pro._id, 1)
        toast.success('Item added into youCart')
      } catch (err) {
        console.log(err)

      }
    } else {

      dispatch(addToCartItem(pro))
    }
  }
  const fetchProducts = async () => {
    try {
      const products = await getProducts(searchTerm)
      setProducts(products)
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchProducts()
  }, [searchTerm])


  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id || product._id}
              className="group relative bg-white dark:bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-full border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-56 bg-neutral-50 dark:bg-neutral-800/30 p-8 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply dark:mix-blend-normal"
                />
              </div>

              <div className="flex flex-col flex-grow p-6">
                <h2 className="font-bold text-base text-neutral-900 dark:text-white mb-2 line-clamp-2 leading-snug">
                  {product.title}
                </h2>
                <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                  ${product.price}
                </p>

                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Add to Cart
                  </button>
                  <button className="w-full py-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl font-semibold hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center">
             <svg className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
             </svg>
            <p className="text-neutral-500 dark:text-neutral-400 text-xl font-medium text-center">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

