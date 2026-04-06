'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { registerUser } from "../lib/getProducts"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, CheckCircle2, ShoppingBag, ArrowRight, Github } from "lucide-react"

const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
})

type RegisterFormValues = z.infer<typeof registerSchema>

function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormValues) => {
    const loadingToast = toast.loading("Creating your account...")

    try {
      await registerUser(data)
      toast.dismiss(loadingToast)
      toast.success("Registration successful!")
      router.push("/login")
    } catch (error: any) {
      console.log("Error during registration:", error)
      toast.dismiss(loadingToast)
      const message = error?.message || error || "Registration failed"
      toast.error(message as string)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 relative bg-white lg:bg-transparent">
        {/* Decorative elements for mobile */}
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-80 lg:hidden -z-10 blur-xl"></div>

        <div className="mx-auto w-full max-w-sm lg:w-96 z-10">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">Ur's Shopping</span>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to start shopping and get exclusive offers.
            </p>
          </div>

          <div className="mt-8 z-10">
            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-300 ring-red-300' : 'border-gray-300 focus:ring-black focus:border-black'} rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
                      {...register('name')}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.name.message as string}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300 ring-red-300' : 'border-gray-300 focus:ring-black focus:border-black'} rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.email.message as string}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-300 ring-red-300' : 'border-gray-300 focus:ring-black focus:border-black'} rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition duration-200`}
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.password.message as string}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2 mt-2"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white lg:bg-gray-50 text-gray-500">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button type="button" className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow transition duration-200">
                    <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                      <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                      <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                      <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                    </svg>
                  </button>
                  <button type="button" className="w-full inline-flex justify-center flex-col items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow transition duration-200">
                    <Github className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-black hover:text-gray-800 hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="E-commerce shopping background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-12">
          <div className="max-w-xl text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-6">Join Our Community</h3>
              <ul className="space-y-4 text-left text-white/90">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Early access to new collections</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Personalized product recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Earn rewards with every purchase</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

