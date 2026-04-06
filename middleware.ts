import { NextResponse,NextRequest } from "next/server";

export function middleware(req:NextRequest){
    console.log('Middleware running...')
    return NextResponse.next()
}