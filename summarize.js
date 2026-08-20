import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function gerarResumo(avisos, arquivos) {
  const prompt = `Resuma os seguintes avisos e arquivos do portal acadêmico em português, de forma clara e organizada por disciplina:

Avisos:
${avisos.join('\n')}

Arquivos disponíveis:
${arquivos.map(a => a.nome).join('\n')}`;

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  });

  return msg.content[0].text;
}
