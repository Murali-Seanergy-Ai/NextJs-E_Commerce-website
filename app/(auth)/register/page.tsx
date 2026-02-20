import Link from "next/link"

 export default function RegisterPage()  {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-slate-600">
    <div className="bg-white shadow-lg p-8 rounded-xl  w-80">
      <h3 className="text-2xl font-bold mb-6 text-center">Register</h3>
      <input type='text' placeholder="FullName"   className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none  focus:ring-2  focus:ring-blue-400"/>
      
      <input type='email' placeholder="Email"  className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none  focus:ring-2  focus:ring-blue-400"/>
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
       <Link href='/login'> <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Register
        </button></Link> 

    </div>

   </div>
  )
}

