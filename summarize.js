import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function gerarResumo(avisos, arquivos) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Resuma os seguintes avisos e arquivos do portal acadêmico em português, de forma clara e organizada por disciplina:

Avisos:
${avisos.join('\n')}

Arquivos disponíveis:
${arquivos.map(a => a.nome).join('\n')}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
