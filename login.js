import { chromium } from 'playwright';

export async function loginNoPortal() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // URL de entrada do portal - redireciona sozinho pro login Microsoft
  await page.goto('https://sso.cruzeirodosul.edu.br/?origin=https:%2F%2Fnovoportal.cruzeirodosul.edu.br&blackboard=false&terminal=false&empresa=up');

  // Tela 1 - Microsoft pede o e-mail/usuário institucional
  await page.waitForSelector('#i0116', { timeout: 15000 });
  await page.fill('#i0116', process.env.PORTAL_LOGIN);
  await page.click('#idSIButton9'); // botão "Avançar"

  // Tela 2 - Microsoft pede a senha
  await page.waitForSelector('input[type="password"]', { timeout: 15000 });
  await page.fill('input[type="password"]', process.env.PORTAL_SENHA);
  await page.click('#idSIButton9'); // botão "Entrar"

  // Tela 3 - "Continuar conectado?" (nem sempre aparece)
  try {
    await page.waitForSelector('#idSIButton9', { timeout: 8000 });
    await page.click('#idSIButton9');
  } catch {
    // não apareceu essa tela, segue o fluxo
  }

  await page.waitForLoadState('networkidle');

  // ATENÇÃO: se a conta tiver MFA (código no celular, app autenticador),
  // o fluxo trava aqui e precisa de outra estratégia (sessão salva manualmente).
  return { browser, context, page };
}
