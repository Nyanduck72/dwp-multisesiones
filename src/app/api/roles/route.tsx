import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(req: Request){
    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get('userEmail');

        const role = prisma.user.findUnique({
            where: {
                email: userEmail!
            }
        })

        if (!role){
            return NextResponse.json({ valid: false }, { status: 401 });
        }

        return NextResponse.json(role);

    } catch (error) {
        console.error('Error verificando token:', error);
        return NextResponse.json({ valid: false }, { status: 500 });
    }
}