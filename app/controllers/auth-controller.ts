import { NextRequest, NextResponse } from "next/server";
import {RegisterService,LoginService} from "../services/auth-service"



export const RegisterController = async (request:NextRequest):Promise<Response> =>{
try{

     const body = await request.json()
    return RegisterService(body)

}catch(err){
    console.log(err)
    return NextResponse.json({message:"Internal Server Error"},{status:500})
}
}

export const LoginController = async (request:NextRequest) =>{
    try{

        const body = await request.json()

  return LoginService(body)
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}