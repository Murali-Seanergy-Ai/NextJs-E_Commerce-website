import { NextRequest, NextResponse } from "next/server";
import { getApiDoc } from "@/app/lib/swagger";


export async function GET(){
    const spec = await getApiDoc()
    return NextResponse.json(spec)
}
