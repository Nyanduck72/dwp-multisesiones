import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    // Verificar token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      questions: number[];
    };

    // Verificar en base de datos
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
        resetToken: token,
        resetExpires: { gt: new Date() }
      },
      include: {
        QuestionsUser: {
          include: { SecurityQuestions: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({
      valid: true,
      questions: user.QuestionsUser.map(q => q.SecurityQuestions.security_question)
    });

  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
