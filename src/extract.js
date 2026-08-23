// Busca os itens (atrasados, do dia, futuros) direto da API do Blackboard,
// usando a sessão já autenticada pelo login.js (cookies ficam no `page`/`context`).
export async function extrairConteudo(page) {
  const agora = new Date();
  const daquiA14Dias = new Date(agora.getTime() + 14 * 24 * 60 * 60 * 1000);

  const since = agora.toISOString();
  const until = daquiA14Dias.toISOString();

  const url = `https://bb.cruzeirodosulvirtual.com.br/learn/api/v1/calendars/todo/studentItems?since=${encodeURIComponent(since)}&until=${encodeURIComponent(until)}`;

  const response = await page.request.get(url, {
    headers: { 'Accept': 'application/json' }
  });

  if (!response.ok()) {
    throw new Error(`Falha ao buscar studentItems: ${response.status()}`);
  }

  const data = await response.json();

  const formatar = (lista, categoria) =>
    (lista || []).map(item => ({
      categoria,
      titulo: item.title,
      prazo: item.dueDate,
      disciplinaId: item.column?.courseId || null
    }));

  const itens = [
    ...formatar(data.overdueItems, 'Atrasado'),
    ...formatar(data.dueTodayItems, 'Vence hoje'),
    ...formatar(data.futureDueItems, 'Próximo')
  ];

  return { itens, arquivos: [] };
}
