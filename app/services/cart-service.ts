import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import CartProducts from "../models/cart-products"
import Products from "../models/products"



type AddToCartBody = {
  productId: string | number
  quantity?: number
}

/**
 * Parses a value as a positive integer.
 * - returns `fallback` if value is missing
 * - returns `null` if value is present but invalid (not a positive int)
 */



function parsePositiveInt(value: unknown, fallback: number) {
  if (value === undefined || value === null) return fallback
  const n = typeof value === "string" ? Number(value) : (value as number)
  if (!Number.isFinite(n)) return null
  const i = Math.trunc(n)
  if (i < 1) return null
  return i
}

export const AddtoCartService = async (body: AddToCartBody): Promise<NextResponse> => {
    try {
             const quantity = parsePositiveInt(body.quantity, 1)
            if (!quantity) {
              return NextResponse.json(
                { message: "quantity must be a positive integer" },
                { status: 400 }
              )
            }
        
            const raw = body?.productId
            if (raw === undefined || raw === null || raw === "") {
              return NextResponse.json({ message: "productId is required" }, { status: 400 })
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
        
            // Upsert pattern:
            // - If cart item exists (same productId), increment quantity via $inc.
            // - Otherwise insert a new document (upsert: true).
            const item = await CartProducts.findOneAndUpdate(
              { productId: productDoc._id },
              { $inc: { quantity } },
              { new: true, upsert: true, setDefaultsOnInsert: true }
            )
          
            return NextResponse.json({ message: "Added to cart", data: item }, { status: 200 })

        } catch (err) {
            console.error(err)
            return NextResponse.json({ message: "Server error" }, { status: 500 })
          }

        }


 
export const GetCartItemService = async (): Promise<NextResponse> => {
    try{
        const cartItems = await CartProducts.find({}).populate("productId")
      
        return NextResponse.json({ message: "Success", data: cartItems }, { status: 200 })

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}