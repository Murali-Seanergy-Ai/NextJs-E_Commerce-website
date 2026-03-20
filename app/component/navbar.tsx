"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { toast } from "react-hot-toast"
import { logoutApi } from "../lib/getProducts"
import { Count } from "./cartCount"
import { useDispatch ,useSelector} from "react-redux"
import {searchInputbyUser,logOut} from "../redux/cartSlice"
import Home from "../(main)/home/page"




const Navbar = () => {
  const [isLogin, setIsLogin] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debounceTimeout, setDebounceTimeout] = useState<string>('')
  const dispatch = useDispatch()
  const loginState = useSelector((state: any) => state.cart.login)

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
  },[searchTerm])

  useEffect(() => {
    console.log(debounceTimeout,"debounceTimeout")
    dispatch(searchInputbyUser(debounceTimeout))
  }, [debounceTimeout])


  const handleLogOut = async () => {

    const toastLoading = toast.loading("Logging out...")

    try {

      await logoutApi()

      dispatch(logOut()) // update Redux state
      localStorage.removeItem("token")
      localStorage.removeItem("isLogin")

      setIsLogin(null) // update UI

      toast.dismiss(toastLoading)
      toast.success("Logout Successful")

    } catch (err:any) {

      toast.dismiss(toastLoading)

      const message = err?.message || "Logout failed"
      toast.error(message)

      console.log(message)
    }
  }
 

  return (
    <>
    <nav className="bg-slate-500 p-4">
      
      <ul className="flex flex-row justify-between">

        <li className="font-bold text-white p-2">
          <Link href="/">Ur's Shopping</Link>
        </li>

        <li>
          <input
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
            className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 rounded-lg"
          />
        </li>

        <li>
          <div className="flex flex-row gap-3 mt-3">

            <Link href="/cart-page">
              <ShoppingCart className="cursor-pointer" />
            </Link>

            <sup><Count/></sup>

            {isLogin === "true" ? (
              <button
                onClick={handleLogOut}
                className="bg-blue-900 text-white font-bold p-2 rounded-lg hover:bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-blue-900 text-white font-bold p-2 rounded-lg hover:bg-gradient-to-r from-blue-500 to-purple-600">
                  GetStarted
                </button>
              </Link>
            )}

          </div>
        </li>

      </ul>
    </nav>
   
   
    </>
  )
}

export default Navbar