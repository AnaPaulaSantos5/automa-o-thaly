import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmail(resumo) {
  await resend.emails.send({
    from: process.env.EMAIL_REMETENTE,
    to: process.env.EMAIL_DESTINO,
    subject: 'Resumo semanal - Portal Cruzeiro do Sul',
    text: resumo
  });
}
