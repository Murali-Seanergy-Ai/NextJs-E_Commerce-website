import { NextRequest,NextResponse } from "next/server"
import mongoose from "mongoose"
import products from "../models/products"
import { AddtoCartService ,GetCartItemService} from "../services/cart-service"
import { isValidToken } from "../helpers/verifyToken"

type AddToCartBody = {
  productId: string | number
  quantity?: number
}

export const AddToCartController = async (request: NextRequest): Promise<NextResponse> => {
    try {
         const body = (await request.json()) as AddToCartBody
          const user = isValidToken(request)
         return AddtoCartService(body,user)
 
} catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}


export const GetCartItemsController = async (): Promise<NextResponse> => {
    try{
        return GetCartItemService()

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}