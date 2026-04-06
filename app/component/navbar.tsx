"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { toast } from "react-hot-toast"
import { logoutApi } from "../lib/getProducts"
import { Count } from "./cartCount"
import { useDispatch, useSelector } from "react-redux"
import { searchInputbyUser, logOut, clearCart } from "../redux/cartSlice"

const Navbar = () => {
  const [isLogin, setIsLogin] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debounceTimeout, setDebounceTimeout] = useState<string>('')
  const dispatch = useDispatch();
  const loginState = useSelector((state: any) => state.cart.login);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin")
    setIsLogin(loginStatus)
  }, [])


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceTimeout(searchTerm)

    }, 500) // Adjust the debounce delay as needed (e.g., 500ms)

    return () => {
      clearTimeout(timeout) // Clear the timeout if the component unmounts or searchTerm changes
    }
  }, [searchTerm])

  useEffect(() => {
    console.log(debounceTimeout, "debounceTimeout")
    dispatch(searchInputbyUser(debounceTimeout))
  }, [debounceTimeout])


  const handleLogOut = async () => {

    const toastLoading = toast.loading("Logging out...")

    try {

      await logoutApi()

      dispatch(logOut()) // update Redux state
      dispatch(clearCart())

      localStorage.removeItem("token")
      localStorage.setItem("isLogin", "false")
      setIsLogin(null) // update UI

      toast.dismiss(toastLoading)
      toast.success("Logout Successful")

    } catch (err: any) {

      toast.dismiss(toastLoading)

      const message = err?.message || "Logout failed"
      toast.error(message)

      console.log(message)
    }
  }


  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="font-extrabold text-2xl tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                  Ur's Shopping
                </span>
              </Link>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full py-2 px-4 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/cart-page" className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-neutral-900 text-[10px] font-bold text-white  rounded-full border-2 border-white dark:border-neutral-950">
                  <Count />
                </span>
              </Link>

              {isLogin === "true" ? (
                <button
                  onClick={handleLogOut}
                  className="inline-flex justify-center items-center px-6 py-2 text-sm font-semibold text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 dark:text-white dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="inline-flex justify-center items-center px-6 py-2 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5">
                    Get Started
                  </button>
                </Link>
              )}
            </div>

          </div>

          {/* Mobile Search - Visible only on small screens */}
          <div className="pb-3 sm:hidden">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full py-2 px-4 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </nav>


    </>
  )
}

export default Navbar