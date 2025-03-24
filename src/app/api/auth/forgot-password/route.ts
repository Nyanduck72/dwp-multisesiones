import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signJwtAccessToken } from '@/lib/jwt';
import { sendResetEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Buscar usuario y verificar preguntas de seguridad
    const user = await prisma.user.findUnique({
      where: { email },
      include: { 
        QuestionsUser: { 
          include: { 
            SecurityQuestions: true 
          } 
        } 
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    if (!user.QuestionsUser || user.QuestionsUser.length === 0) {
      return NextResponse.json(
        { error: 'Usuario sin preguntas de seguridad configuradas' },
        { status: 400 }
      );
    }

    // Generar token JWT
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      questions: user.QuestionsUser.map(q => ({
        id: q.SecurityQuestions.id_security_question,
        question: q.SecurityQuestions.security_question
      }))
    };

    const token = signJwtAccessToken(tokenPayload, { expiresIn: '15m' });

    // Actualizar usuario con token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetExpires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
      }
    });

    // Enviar correo
    const emailSent = await sendResetEmail(user.email, token);

      if (!emailSent) {
        console.error("Fallo envío de email - Detalles:", {
          to: user.email,
          error: emailSent
        });
      }


    return NextResponse.json({
      success: true,
      message: 'Se ha enviado un correo con instrucciones'
    });

  } catch (error) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
