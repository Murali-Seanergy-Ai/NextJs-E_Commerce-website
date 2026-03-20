import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "../../lib/dbconnection"
import CartProducts from "../../models/cart-products"
import Products from "../../models/products"
import { isValidToken } from "@/app/helpers/verifyToken"
import { AddToCartController, GetCartItemsController ,RemoveCartItemController} from "@/app/controllers/cart-controller"


// POST /api/cart - Add item to cart
export async function POST(request: NextRequest): Promise<Response> {
  try {
    await connectDB()
      const user = await isValidToken(request)
         if (user instanceof NextResponse) {
      return user // Return the 401 response directly
    }
      if(!user){
        return NextResponse.json({message:"Unathorized"},{status:401})
    }
    return AddToCartController(request,user)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

// GET /api/cart - Get cart items
export async function GET(request: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const user = await isValidToken(request)
     if (user instanceof NextResponse) {
      return user // Return the 401 response directly
    }
   
    if(!user){
        return NextResponse.json({message:"Unathorized"},{status:401})

    }
    
    return GetCartItemsController(request,user)
    
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}


// DELETE /api/cart/:id - Remove item from cart
export async function DELETE(request: NextRequest ): Promise<Response> {
  try {
    await connectDB()
    const user = await isValidToken(request)
    console.log(request,"User in delete route")
  
       if (user instanceof NextResponse) {
      return user // Return the 401 response directly
    }
    if(!user){
        return NextResponse.json({message:"Unathorized"},{status:401})
    }
    return RemoveCartItemController(request,user)
  
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}



