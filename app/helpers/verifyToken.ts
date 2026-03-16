import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export const isValidToken = async  (req:NextRequest)=>{
     const authHeader = req.headers.get("authorization")
     if(!authHeader) return null
     const token = authHeader.split(' ')[1] 
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET!)
        if(!decoded){
            return NextResponse.json({message:"Invalid token"},{status:401})
        }
       
        return decoded
    }catch(err:any){
       console.log(err.message,"Error in token verification") // Debug log to check the error object
        return NextResponse.json({message:"Authentication failed"},{status:401})
    }
}