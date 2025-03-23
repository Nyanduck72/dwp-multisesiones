import prisma from "@/lib/prisma";
import { SecurityQuestions } from "@prisma/client";
import { NextResponse } from "next/server";


  export async function GET(request: Request,{params}: {params: Promise<{slug: string}>}){
    const {slug} = await params
    const securityQuestions = await prisma.securityQuestions.findMany({where: {id_security_question: parseInt(slug)}})
    console.log(securityQuestions)
    return new Response(JSON.stringify(securityQuestions))
}

