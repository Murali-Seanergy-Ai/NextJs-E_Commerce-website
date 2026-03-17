'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {loginApi} from "../../lib/getProducts"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { isLogin } from "../../redux/cartSlice"
const Loginpage = () => {
  const dispatch = useDispatch()
  const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
  })

   const route = useRouter()
  const {register,handleSubmit,formState:{errors}} = useForm({
  resolver:zodResolver(loginSchema)
  })

  const handleLogin = async  (data:any)=>{
    const toastLoading = toast.loading('Login...')
    try{
      toast.dismiss(toastLoading)

      console.log(data,"kk")
      await loginApi(data)
      toast.success('Login Successfull')
      dispatch(isLogin("true"))
      
      setTimeout(() => {
        toast.dismiss()
      }, 2000)
      route.push("/home")
    }catch(err:any){
      toast.dismiss(toastLoading)
      toast.dismiss()
      
      console.log(err)
      const message = err.message || "Login failed"
         toast.error(message)
    }


  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-slate-600">
    <div className="bg-white shadow-lg p-8 rounded-xl  w-80">
      <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
 <input type='email' placeholder="Email"  className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none  focus:ring-2  focus:ring-blue-400" {...register("email")}/>
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" {...register('password')}
        />
     
       <button type='submit'  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" >
          Login
        </button>
      </form>
      <Link href='/register'><span><p className="text-green-600 font-2xl font-bold flex justify-end mt-1">Register here</p></span></Link>  
    </div>
   </div>
  )
}

export default Loginpage
