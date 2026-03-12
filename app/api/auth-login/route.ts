import {NextResponse,NextRequest} from "next/server"
import { connectDB } from "../../lib/dbconnection"
import { LoginController } from "../../controllers/auth-controller"

export async function POST(request:NextRequest):Promise<Response>{
    try{
        await connectDB()
        return LoginController(request)

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}