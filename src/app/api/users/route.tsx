import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(){
    const users: User[] = await prisma.user.findMany({include: {
        Role: true
    }})
    return new Response(JSON.stringify(users))
}