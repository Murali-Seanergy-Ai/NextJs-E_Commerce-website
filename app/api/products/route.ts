
import { NextResponse,NextRequest } from "next/server";
import {connectDB} from "../../lib/dbconnection"

import products from "../../models/products"



export async function GET(request: NextRequest) {
  try {

    await connectDB()

    const allProducts = await products.find({})
    if (!allProducts || allProducts.length === 0) {
      return NextResponse.json(
        { message: "No products found in DB" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: "Success", Data: allProducts },
      { status: 200 }
    )

  } catch (err) {

    console.log(err)

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    )
  }
}