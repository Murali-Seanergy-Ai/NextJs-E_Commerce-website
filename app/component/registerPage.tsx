'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { registerUser } from "../lib/getProducts"
import { useRouter } from "next/navigation"


 function RegisterPage()  {
  const router = useRouter()
  



  const registerSchema = z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(6)
  })

  const {register, handleSubmit,setValue,watch,formState:{errors}} = useForm({
   resolver: zodResolver(registerSchema)
  })

const onSubmit = async (data:any) => {

  const loadingToast = toast.loading("Registering user...")

  try {

    await registerUser(data)

    toast.dismiss(loadingToast)
    toast.success("Registration successful!")

    router.push("/login")

  } catch (error:any) {
        console.log("Error during registration:", error)

    toast.dismiss(loadingToast)
   
    toast.error(error)

  }
}


  

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-slate-600">
    <div className="bg-white shadow-lg p-8 rounded-xl  w-80">
      <h3 className="text-2xl font-bold mb-6 text-center">Register</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type='text' placeholder="FullName"   className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none  focus:ring-2  focus:ring-blue-400" {...register('name')}/>
          <span>{errors.name && <small className='text-red-600'>{errors.name.message}</small>}</span>
      <input type='email' placeholder="Email"  className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none  focus:ring-2  focus:ring-blue-400" {...register('email')}/>
      <span>{errors.email && <small className='text-red-600'>{errors.email.message}</small>}</span>
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('password')}
        />
        <span>{errors.password && <small className='text-red-600'>{errors.password.message}</small>}</span>
       <button   type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    

    </div>

   </div>
  )
 }

 export default RegisterPage

