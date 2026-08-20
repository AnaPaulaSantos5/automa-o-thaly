import 'dotenv/config';
import { loginNoPortal } from './login.js';
import { extrairConteudo, baixarArquivo } from './extract.js';
import { gerarResumo } from './summarize.js';
import { enviarEmail } from './sendEmail.js';

async function main() {
  const { browser, page } = await loginNoPortal();
  const { avisos, arquivos } = await extrairConteudo(page);

  const caminhos = [];
  for (const arq of arquivos) {
    const caminho = `/tmp/${arq.nome}`;
    await baixarArquivo(page, arq.url, caminho);
    caminhos.push(caminho);
  }

  const resumo = await gerarResumo(avisos, arquivos);
  await enviarEmail(resumo, caminhos);

  await browser.close();
}

main().catch(console.error);
