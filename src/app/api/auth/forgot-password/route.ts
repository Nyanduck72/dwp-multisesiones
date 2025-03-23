import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // 1. Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
      include: { QuestionsUser: { include: { SecurityQuestions: true } } }
    });

    if (!user || !user.QuestionsUser.length) {
      return NextResponse.json(
        { error: 'Usuario no encontrado o sin preguntas de seguridad' },
        { status: 400 }
      );
    }

    // 2. Generar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        questions: user.QuestionsUser.map(q => q.SecurityQuestions.id_security_question)
      },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    // 3. Actualizar usuario en DB
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetExpires: new Date(Date.now() + 15 * 60 * 1000)
      }
    });

    // 4. Enviar correo
    await sendResetEmail(user.email, token);

    return NextResponse.json({
      success: true,
      message: 'Correo enviado correctamente'
    });

  } catch (error) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
