import { NextResponse } from "next/server"
import { LogOutController } from "../../controllers/auth-controller"

export async function POST(request:Request){
    try{
        // Clear the token from localStorage
        return LogOutController()
    }catch(error){
        console.error("Error during logout:", error)
        return NextResponse.json({message:"Internal Server Error"}, {status:500})
    }
}
