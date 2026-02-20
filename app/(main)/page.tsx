'use client'
import { UseDispatch } from "react-redux";

import Image from "next/image";
import {getProducts} from "../lib/getProducts"


export default  async function Home() {
  
    const products = await  getProducts()
     
  return (
  <div className="bg-slate-400">
  <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">

    {products.map((product: any) => (
      <div
        key={product.id}
        className="shadow-lg border border-gray-200 rounded bg-white 
                 flex flex-col h-[350px] p-4 rounded-lg" >
         <div className="h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>
        <h2 className="font-semibold text-sm">
          {product.title}
        </h2>
        <p className="text-green-600 font-bold">
          ${product.price}
        </p>
       <div className="mt-auto flex gap-2">
    <button className="flex-1 py-2 bg-red-400 hover:bg-red-600 text-white rounded-md transition">
      Buy Now
    </button>
    <button className="flex-1 py-2 bg-green-400 hover:bg-green-600 text-white rounded-md transition" >
      Add to Cart
    </button>
  </div>
      </div>
    ))}

  </div>
</div>
  );
}
