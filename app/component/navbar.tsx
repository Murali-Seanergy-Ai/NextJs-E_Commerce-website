"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import {Count} from "./cartCount"

const navbar = () => {
 

  return (
   <nav className="bg-slate-500 p-4 ">
    <ul className='flex flex-row justify-between'>
      <li className='font-bold text-white p-2'>
       <Link href='/'>Ur's Shopping </Link>  
      </li>
      <li>
        <input type="text" placeholder="Search..." className='block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 rounded-lg'/>
      </li>
      <li  >
        <div className="flex flex-row gap-3 mt-3 ">
       <Link href="/cart-page">
    <ShoppingCart className="cursor-pointer" />
  </Link>
  <sup><Count/></sup>
       <Link href='/login'><button className='roundeed-lg bg-blue-900 text-white font-bold p-2 rounded-lg hover: bg-gradient-to-r from-blue-500 to-purple-600 border-none '>GetStarted</button></Link> 
        </div>
      </li>
    </ul>

   </nav>
  )
}
export default navbar
