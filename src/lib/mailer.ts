import nodemailer from 'nodemailer';

// Configuración del transporter
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
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
      from: `"Sistema de Recuperación" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperación de Contraseña',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Recuperación de Contraseña</h2>
          <p>Has solicitado recuperar tu contraseña. Usa el siguiente enlace:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
            Restablecer Contraseña
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            Si no solicitaste este cambio, ignora este mensaje.<br>
            El enlace expirará en 15 minutos.
          </p>
        </div>
      `,
    });
    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true;
    
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
};
