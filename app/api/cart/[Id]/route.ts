import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "../../../lib/dbconnection"  
import { isValidToken } from "@/app/helpers/verifyToken"
import { RemoveCartItemController } from "@/app/controllers/cart-controller"





export async function DELETE(request: NextRequest,{params}:{params:{id:string}} ): Promise<Response> {
  try {
    await connectDB()
    const user = await isValidToken(request)
    
     const {id} = params
     console.log(id,"Cart Item Id from params in route") // Debug log to check the cart item ID from params
     if (id === undefined || id === null || id === "") {
      return NextResponse.json({ message: "Cart Item Id is required" }, { status: 400 })
    }   
       if (user instanceof NextResponse) {
      return user // Return the 401 response directly
    }
    if(!user){
        return NextResponse.json({message:"Unathorized"},{status:401})
    }
    return RemoveCartItemController(id,user)
  
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
