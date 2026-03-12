import { NextResponse,NextRequest } from "next/server"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user";



export const RegisterService = async (body:any):Promise<Response> =>{
    try{
        const {name,email,password} = body;
       if(!name || !email || !password){
        return NextResponse.json({message:"All fields are required"},{status:400})
       }    
       const existingUser = await User.findOne({email})
       if(existingUser){
        return NextResponse.json({message:"User already exists"},{status:400})
       }
       const hashedPassword = await bcrypt.hash(password,10)
       const newUser = await User.create({name,email,password:hashedPassword})
       return NextResponse.json({message:"User registered successfully",data:{id:newUser._id,name:newUser.name,email:newUser.email}},{status:201})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}


export const LoginService = async (body:any):Promise<Response> =>{
    try{
        const {email,password} = body;
         if(!email || !password){
        return NextResponse.json({message:"All fields are required"},{status:400})
       }
         const user = await User.findOne({email})
         if(!user){
            return NextResponse.json({message:"Invalid credentials"},{status:401})
         }
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return NextResponse.json({message:"Invalid credentials"},{status:401})
            }

            const token = jwt.sign({
                id : user._id,
                name:user.name,
                email:user.email
                },process.env.JWT_SECRET!,
                {expiresIn:"1h" })
                return NextResponse.json({message:"Login Successful",token},{status:201})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}