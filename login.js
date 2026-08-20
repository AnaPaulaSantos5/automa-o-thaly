import { chromium } from 'playwright';

export async function loginNoPortal() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://COLOQUE_A_URL_DE_LOGIN_AQUI');

  // TODO: ajustar os seletores depois de inspecionar o HTML real do form
  await page.fill('#usuario', process.env.PORTAL_LOGIN);
  await page.fill('#senha', process.env.PORTAL_SENHA);
  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');

  // Se der 2FA, o fluxo trava aqui - precisa tratar depois
  return { browser, context, page };
}
