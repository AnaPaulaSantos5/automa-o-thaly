import 'dotenv/config';
import { loginNoPortal } from './login.js';
import { extrairConteudo } from './extract.js';
import { gerarResumo } from './summarize.js';
import { enviarEmail } from './sendEmail.js';

async function main() {
  const { browser, page } = await loginNoPortal();

  const { itens } = await extrairConteudo(page);
  const resumo = await gerarResumo(itens);
  await enviarEmail(resumo);

  await browser.close();
  console.log('Concluído. Resumo enviado.');
}

main().catch(err => {
  console.error('Erro na automação:', err);
  process.exit(1);
});
