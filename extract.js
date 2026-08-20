export async function extrairConteudo(page) {
  // TODO: navegar até a área de disciplinas/avisos
  // Estratégia: listar links de cada disciplina, entrar, coletar
  // texto de avisos + links de arquivos pra download

  const avisos = await page.$$eval('.aviso-item', els =>
    els.map(el => el.innerText.trim())
  );

  const arquivos = await page.$$eval('a[href$=".pdf"]', els =>
    els.map(el => ({ nome: el.innerText.trim(), url: el.href }))
  );

  return { avisos, arquivos };
}

export async function baixarArquivo(page, url, caminhoDestino) {
  const response = await page.request.get(url);
  const buffer = await response.body();
  const fs = await import('fs');
  fs.writeFileSync(caminhoDestino, buffer);
}
