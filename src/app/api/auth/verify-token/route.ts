import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    // Verificar token
    const decoded = verifyJwt(token);
    
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // Verificar en base de datos
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
        resetToken: token,
        resetExpires: { gt: new Date() }
      },
      include: {
        QuestionsUser: {
          include: {
            SecurityQuestions: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // Extraer preguntas de seguridad
    const questions = user.QuestionsUser.map(q => ({
      id: q.SecurityQuestions.id_security_question,
      question: q.SecurityQuestions.security_question
    }));

    return NextResponse.json({
      valid: true,
      questions
    });

  } catch (error) {
    console.error('Error verificando token:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
