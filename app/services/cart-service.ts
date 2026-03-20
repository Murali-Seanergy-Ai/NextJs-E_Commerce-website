import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import CartProducts from "../models/cart-products"
import Products from "../models/products"
import User from "../models/user"
import { isValidToken } from "../helpers/verifyToken"



type AddToCartBody = {
  productId: string | number
  quantity?: number
}

/**
 * Parses a value as a positive integer.
 * - returns `fallback` if value is missing
 * - returns `null` if value is present but invalid (not a positive int)
 */



// function parsePositiveInt(value: unknown, fallback: number) {
//   if (value === undefined || value === null) return fallback
//   const n = typeof value === "string" ? Number(value) : (value as number)
//   if (!Number.isFinite(n)) return null
//   const i = Math.trunc(n)
//   if (i < 1) return null
//   return i
// }

export const AddtoCartService = async (body: AddToCartBody,user:any): Promise<NextResponse> => {
    try {


             const quantity = body?.quantity
             console.log(quantity,"Quantity in service") // Debug log to check the quantity value

            if (!quantity) {
              return NextResponse.json(
                { message: "quantity is required" },
                { status: 400 }
              )
            }
            const raw = body?.productId
            if (raw === undefined || raw === null || raw === "") {
              return NextResponse.json({ message: "productId is required" }, { status: 400 })
            }
            console.log(user,"User in service")
            const userExists = await User.findById(user.id)
            console.log(userExists,"User Exists")

            if(!userExists){
              return NextResponse.json({message:"User not found"},{status:404})

            }

            
        
            // Validate the product id by actually finding it in the Products collection.
            // Accept either Mongo ObjectId string OR your numeric `products.id` field.
            let productDoc: any | null = null
            if (typeof raw === "string" && mongoose.Types.ObjectId.isValid(raw)) {
              productDoc = await Products.findById(raw)
            } else {
              const numericId =
                typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN
              if (!Number.isFinite(numericId)) {
                return NextResponse.json(
                  { message: "productId must be a valid ObjectId or a number" },
                  { status: 400 }
                )
              }
              productDoc = await Products.findOne({ id: numericId })
            }
        
            if (!productDoc) {
              return NextResponse.json({ message: "Product not found" }, { status: 404 })
            }
         
            // Check if a cart item for the same product already exists for this user.
                    const existingItem = await CartProducts.findOne({  productId: productDoc._id, user: userExists._id})
                    if (existingItem) {
                      const newQuantity = existingItem.quantity + quantity
                      if (newQuantity <= 0) {

                        await CartProducts.deleteOne({
                          productId: productDoc._id,
                          user: userExists._id
                        })

                        return NextResponse.json(
                          { message: "Item removed from cart" },
                          { status: 200 }
                        )
                      }

                      }
                    
            // Upsert pattern:
            // - If cart item exists (same productId), increment quantity via $inc.
            // - Otherwise insert a new document (upsert: true).
            const item = await CartProducts.findOneAndUpdate(
              { productId: productDoc._id,user:userExists._id },
              { $inc: { quantity },$set:{user:userExists._id} },
              { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            console.log(item,"Cart Item")
            return NextResponse.json({ message: "Added to cart", data: item }, { status: 200 })

        } catch (err) {
            console.error(err)
            return NextResponse.json({ message: "Server error" }, { status: 500 })
          }

        }
export const GetCartItemService = async (user:any): Promise<NextResponse> => {
    try{
      const userExists = await User.findById(user.id)
      if(!userExists){
        return NextResponse.json({message:"User not found"},{status:404})
      }
        const cartItems = await CartProducts.find({user:userExists._id}).populate("productId")

        return NextResponse.json({ message: "Cart Items are successfully fetched", data: cartItems }, { status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}


export const RemoveCartItemService = async (cartItemId:string,user:any): Promise<NextResponse> => {
  
  try{
    const userExists = await User.findById(user.id)  
     
    if(!userExists){
      return NextResponse.json({message:"User not found"},{status:404})
    }      
    if(!mongoose.Types.ObjectId.isValid(cartItemId)){
      return NextResponse.json({message:"Invalid Cart Item Id"},{status:400})
    }

    const cartItem = await CartProducts.findOne({_id:cartItemId,user:userExists._id})
    console.log(cartItem,"Cart Item to remove")
    if(!cartItem){
      return NextResponse.json({message:"Cart Item not found"},{status:404})
    } 

    await CartProducts.findByIdAndDelete(cartItemId)
    return NextResponse.json({message:"Cart Item removed successfully"},{status:200})
  }catch(err){
    console.log(err)
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  } 
}