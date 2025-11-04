// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("listas.html", () => {
  test("deve ter o charset em UTF-8 no meta dentro do head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator("meta[charset]")).toHaveAttribute(
      "charset",
      "UTF-8"
    );
  });

  test("deve ter um meta viewport com atributo content com \"width=device-width, initial-scale=1.0\" no head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
  });

  test("deve ter o lang em pt no html", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });

  test("deve ter um título no head com o número da atividade, a palavra Listas e o nome do aluno", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page).toHaveTitle(/DCC202 - Atividade 4 - Listas: (.*)/);
  });

  
  test("deve ter um main com algum conteúdo", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator("main")).toBeVisible();
  });
  
  test("deve ter um título no main com o mesmo conteúdo do título do documento", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator("main > h1")).toHaveText(/DCC202 - Atividade 4 - Listas: (.*)/);
  });

  test('o main deve ter um parágrafo logo após o título', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator("main > h1+p")).toBeVisible();
  });

  test('O parágrafo deve ter dois links', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    await expect(page.locator("main > h1+p > a")).toHaveCount(2);
  });

  test('O primeiro link deve levar para uma página sobre tabelas', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    const link = page.locator("main > h1+p > a:first-child");
    await expect(link).toHaveAttribute("href", "tabelas.html");
    await expect(link).toHaveText("tabelas");
  });

  test('O segundo link deve levar para a página principal', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/listas.html`);
    const link = page.locator("main > h1+p > a:nth-child(2)");
    await expect(link).toHaveAttribute("href", "index.html");
    await expect(link).toHaveText("página principal");
  });

});