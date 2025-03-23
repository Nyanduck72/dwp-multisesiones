import nodemailer from 'nodemailer';

// Configuración del transporter con variables de entorno
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar correo de recuperación
export const sendResetEmail = async (email: string, token: string) => {
  try {
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
    
    const info = await transporter.sendMail({
      from: `Soporte <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Recuperación de Contraseña',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Recuperación de contraseña</h2>
          <p>Haz clic en el enlace para continuar:</p>
          <a href="${resetLink}" style="color: blue; text-decoration: underline;">
            ${resetLink}
          </a>
          <p><em>Enlace válido por 15 minutos</em></p>
        </div>
      `,
    });

   //Pruebas para ver si jalo
    console.log('Correo enviado. Preview:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw new Error('Error al enviar el correo');
  }
};
