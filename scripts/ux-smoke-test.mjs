import assert from "node:assert/strict";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const getFreePort = () =>
  new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        resolve(typeof address === "object" && address ? address.port : 4173);
      });
    });
  });

const port = await getFreePort();
const distIndex = await readFile("dist/index.html", "utf8").catch(() => "");
const distBasePath = distIndex.match(/(?:src|href)="(\/[^"]*?)assets\//)?.[1];
const rawBasePath = process.env.VITE_BASE_PATH || distBasePath || "/";
const basePathWithLeadingSlash = rawBasePath.startsWith("/")
  ? rawBasePath
  : `/${rawBasePath}`;
const normalizedBasePath = basePathWithLeadingSlash.endsWith("/")
  ? basePathWithLeadingSlash
  : `${basePathWithLeadingSlash}/`;
const baseUrl = `http://127.0.0.1:${port}${normalizedBasePath}`;

const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { stdio: "pipe" },
);

const waitForServer = async () => {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("Preview server did not become ready");
};

let browser;

try {
  await waitForServer();

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  page.setDefaultTimeout(7000);

  await page.goto(baseUrl, { waitUntil: "networkidle" });

  await assert.doesNotReject(() =>
    page.getByRole("heading", { name: /quoi choisir/i }).waitFor(),
  );

  assert.equal(await page.getByRole("heading", { name: /^hors saison$/i }).count(), 0);
  assert.equal(await page.getByRole("heading", { name: /^variable$/i }).count(), 0);

  const renderedRows = await page.locator("[data-season-row]").count();
  assert.ok(renderedRows > 0, "season rows should render");
  assert.ok(renderedRows < 140, `default screen renders too many rows: ${renderedRows}`);

  const fruitTab = page.getByRole("button", { name: "Fruits", exact: true });
  await fruitTab.click();
  await page.waitForURL(/category=fruit/);
  await page.reload({ waitUntil: "networkidle" });
  await assert.doesNotReject(() =>
    fruitTab.getAttribute("aria-pressed"),
  );
  assert.equal(
    await fruitTab.getAttribute("aria-pressed"),
    "true",
  );

  await page.getByRole("searchbox").fill("pomme");
  await page.waitForURL(/q=pomme/);
  await page.getByRole("button", { name: /effacer la recherche/i }).click();
  assert.equal(await page.getByRole("searchbox").inputValue(), "");
  assert.ok(!new URL(page.url()).searchParams.has("q"));

  await page.getByRole("button", { name: /sources/i }).first().click();
  await assert.doesNotReject(() => page.getByText(/niveau/i).first().waitFor());

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  assert.ok(height < 18000, `mobile page is too tall: ${height}`);

} finally {
  await browser?.close().catch(() => undefined);
  server.kill();
}
