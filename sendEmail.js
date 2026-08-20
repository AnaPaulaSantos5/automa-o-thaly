import { Resend } from 'resend';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmail(resumo, caminhosAnexos) {
  const attachments = caminhosAnexos.map(caminho => ({
    filename: caminho.split('/').pop(),
    content: fs.readFileSync(caminho).toString('base64')
  }));

  await resend.emails.send({
    from: process.env.EMAIL_REMETENTE,
    to: process.env.EMAIL_DESTINO,
    subject: 'Resumo semanal - Portal Cruzeiro do Sul',
    text: resumo,
    attachments
  });
}
