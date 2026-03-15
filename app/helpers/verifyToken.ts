import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

export const isValidToken = async  (req:NextRequest)=>{
     const authHeader = req.headers.get("authorization")
     if(!authHeader) return null
     const token = authHeader.split(' ')[1] 
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET!)
        return decoded
    }catch(err:any){
       console.log(err)
throw new Error(err)
    }
}