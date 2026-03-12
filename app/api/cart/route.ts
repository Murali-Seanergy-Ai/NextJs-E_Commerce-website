import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "../../lib/dbconnection"
import CartProducts from "../../models/cart-products"

import { AddToCartController,GetCartItemsController } from "../../controllers/cart-controller"

/**
 * POST /api/cart
 *
 * Adds an item to the cart.
 * - If the cart already contains the product, we increment its `quantity`.
 * - If it doesn't exist, we create it with the requested quantity (default: 1).
 *
 * Request body:
 * - productId: Mongo ObjectId string (Products._id) OR numeric `products.id`
 * - quantity?: positive integer (optional, default 1)
 */


export async function POST(request: NextRequest): Promise<Response> {
  try {
    await connectDB()
    return AddToCartController(request)

  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}


export async function GET() : Promise<Response> {
  try {
    await connectDB()
    return GetCartItemsController()
   
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  } 
}

