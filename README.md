# Automação Portal Cruzeiro do Sul

Pega avisos/arquivos do portal, gera resumo com IA e manda por e-mail. Roda sozinho toda semana via GitHub Actions.

## Setup

1. Crie um repositório novo no GitHub e suba esses arquivos.
2. Em `Settings → Secrets and variables → Actions`, cadastre:
   - `PORTAL_LOGIN`
   - `PORTAL_SENHA`
   - `ANTHROPIC_API_KEY` (console.anthropic.com)
   - `RESEND_API_KEY` (resend.com)
   - `EMAIL_DESTINO`
3. Ainda falta ajustar `src/login.js` e `src/extract.js` com os seletores reais do portal (estão marcados com `TODO`).

## Testar manualmente

No repo do GitHub, aba **Actions** → selecione o workflow → **Run workflow**. Não precisa esperar a segunda-feira.

## Rodando local (opcional, pra testar antes de subir)

```
npm install
npx playwright install chromium
cp .env.example .env   # preencha com os dados reais
npm start
```

## Ainda falta fazer

- Confirmar seletores de login (`#usuario`, `#senha`) inspecionando o HTML real
- Confirmar se tem 2FA (se tiver, precisa de outra estratégia)
- Ajustar `extract.js` com os seletores reais de avisos/arquivos do portal
