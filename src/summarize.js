import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}

export async function gerarResumo(itens) {
  if (!itens.length) {
    return 'Nenhuma atividade pendente ou próxima nos próximos 14 dias. 🎉';
  }

  const listaTexto = itens
    .map(i => `- [${i.categoria}] ${i.titulo} - prazo: ${formatarData(i.prazo)}`)
    .join('\n');

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Você vai gerar um resumo curto e organizado em português para um e-mail semanal de acompanhamento acadêmico.

Aqui estão as atividades do aluno no portal (atrasadas, vencendo hoje, ou próximas):

${listaTexto}

Organize em três seções claras: "Atrasado" (priorize e alerte), "Vence hoje" e "Próximos prazos". Seja direto, sem enrolação. Se não houver itens em alguma seção, omita a seção.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
