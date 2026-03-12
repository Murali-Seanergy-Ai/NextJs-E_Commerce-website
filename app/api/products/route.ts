
import { NextResponse,NextRequest } from "next/server";
import {connectDB} from "../../lib/dbconnection"

import products from "../../models/products"

export async function GET(request:NextRequest) {
    try{
        await  connectDB()
         
       const allProducts = await products.find({})
       if(!allProducts){
        return NextResponse.json({mesage:"No products found in DB"})
       }
       return NextResponse.json({message:'Success',Data:allProducts})
    }catch(err){
        console.log(err)    
    }
}

