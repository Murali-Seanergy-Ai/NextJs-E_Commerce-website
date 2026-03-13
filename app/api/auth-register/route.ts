import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import {RegisterController} from "../../controllers/auth-controller"

import { connectDB } from "../../lib/dbconnection";


export async  function POST(request:NextRequest):Promise<Response>{
    try{
        await connectDB()
        console.log(request,"kk")
        return RegisterController(request)
    }catch(err){
        console.error(err)
        return NextResponse.json({message:"Internal Server Error"})
    }
}

