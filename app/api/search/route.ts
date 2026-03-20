import { NextResponse,NextRequest } from "next/server";
import Products from "../../models/products";
import { connectDB } from "@/app/lib/dbconnection";



export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const query = request.nextUrl.searchParams.get("searchTerm")
    console.log(query, "searchTerm")
    let product
    if (query && query.trim() !== "") {
      product = await Products.find({
        $or:[
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } }
        ]
      })
    } else {
      product = await Products.find()
    }
    return NextResponse.json({  message: "Data fetched successfully",  data: product })
  } catch (err) {
    console.log(err, "Error")
    return NextResponse.json({ message: "Internal server error"})
  }
}