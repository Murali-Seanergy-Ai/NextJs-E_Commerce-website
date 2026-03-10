
import { NextResponse,NextRequest } from "next/server";
import {connectDB} from "../../lib/dbconnection"
import mongoose from "mongoose";
import products from "../../models/products"

export async function GET(request:NextRequest) {
    try{
        await  connectDB()
         // console.log('My first api route')
         // const  searchParams = request.nextUrl.searchParams
         // console.log(request.nextUrl,"Request Method")
         // console.log(searchParams.get('name'),"jj")
         // return NextResponse.json({message:"Your Fist Api Route in Next.js , Happy Learning Murali!"})
       const allProducts = await products.find({})
       if(!allProducts){
        return NextResponse.json({mesage:"No products found in DB"})
       }
       return NextResponse.json({message:'Success',Data:allProducts})
    }catch(err){
        console.log(err)    
    }
}


export async function POST(request:NextRequest):Promise<Response>{
    const body = await request.json()
    console.log(body)
    return NextResponse.json({message:'Sucess'} ,{status:200})
 }