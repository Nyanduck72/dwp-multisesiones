import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { token, answers, newPassword } = await req.json();

    if (!token || !answers || !newPassword) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Verificar token
    const decoded = verifyJwt(token);
    
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    // Verificar usuario y token
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
        resetToken: token,
        resetExpires: { gt: new Date() }
      },
      include: {
        QuestionsUser: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    // Verificar respuestas de seguridad
    const userAnswers = user.QuestionsUser;
    
    if (userAnswers.length !== answers.length) {
      return NextResponse.json(
        { error: 'Número de respuestas incorrecto' },
        { status: 400 }
      );
    }

    // Verificar cada respuesta
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i].answer.toLowerCase() !== answers[i].toLowerCase()) {
        return NextResponse.json(
          { error: 'Respuestas incorrectas' },
          { status: 401 }
        );
      }
    }

    // Actualizar contraseña
    const hashedPassword = await hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetExpires: null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Contraseña actualizada correctamente'
    });

  } catch (error) {
    console.error('Error en reset-password:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
