import { NextRequest,NextResponse } from "next/server"
import mongoose from "mongoose"
import products from "../models/products"
import { AddtoCartService ,GetCartItemService,RemoveCartItemService} from "../services/cart-service"
import { isValidToken } from "../helpers/verifyToken"


type AddToCartBody = {
  productId: string | number
  quantity?: number
}
export const AddToCartController = async (request: NextRequest,user: any): Promise<NextResponse> => {
    try {
         const body = (await request.json()) as AddToCartBody
         return AddtoCartService(body,user)
} catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}


export const GetCartItemsController = async (request: NextRequest,user:any): Promise<NextResponse> => {
    try{
        return GetCartItemService(user)

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}


export const RemoveCartItemController = async (request: NextRequest,user:any): Promise<NextResponse> => {
  try{
         const cartItemId = request.nextUrl.searchParams.get("id")
         console.log(cartItemId,"ID")
         if(!cartItemId){
          return NextResponse.json({message:"Cart Item Id is required"},{status:400})
         }
       return RemoveCartItemService(cartItemId,user)
  }catch(err){
    console.log(err)
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }

}