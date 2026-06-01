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
const flagPathForCode = (countryCode) =>
  `flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

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
  {
    env: {
      ...process.env,
      VITE_BASE_PATH: normalizedBasePath,
    },
    stdio: "pipe",
  },
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

  await page.getByRole("link", { name: /voir les produits de saison/i }).click();
  await page.waitForURL((url) => url.searchParams.get("view") === "now");
  const seasonalStatusChip = page.getByRole("button", {
    name: /^De saison$/i,
  });
  await assert.doesNotReject(() => seasonalStatusChip.waitFor());
  assert.equal(
    await seasonalStatusChip.getAttribute("aria-pressed"),
    "true",
    "hero CTA should activate the seasonal-only filter",
  );
  const showAllSeasonal = page.getByRole("button", { name: /^Voir tout$/i });
  if (await showAllSeasonal.count()) {
    await showAllSeasonal.click();
  }
  const heroFilteredStatuses = await page
    .locator("[data-season-row]")
    .evaluateAll((rows) => rows.map((row) => row.getAttribute("data-status")));
  assert.ok(heroFilteredStatuses.length > 0, "hero CTA should keep seasonal rows visible");
  assert.deepEqual(
    [...new Set(heroFilteredStatuses)],
    ["in-season"],
    "hero CTA should display only in-season products",
  );

  await page.getByRole("button", { name: /tout le calendrier/i }).click();
  await page.waitForURL((url) => url.searchParams.get("view") !== "now");

  const firstSeasonChart = page.locator("[data-season-chart]").first();
  await assert.doesNotReject(() => firstSeasonChart.waitFor());
  assert.equal(
    await firstSeasonChart.locator("[data-season-month]").count(),
    12,
    "season chart should show all 12 months at a glance",
  );
  assert.equal(
    await firstSeasonChart.locator('[data-current-month="true"]').count(),
    1,
    "season chart should mark the selected month",
  );
  assert.ok(
    await page.locator('[data-season-state="in-season"]').count() > 0,
    "season chart should visibly mark in-season months",
  );

  const fruitCategoryCard = page.getByRole("button", { name: "Carte Fruits" });
  const fruitCategoryCopy = fruitCategoryCard.locator("[data-category-card-copy]");
  await assert.doesNotReject(() => fruitCategoryCopy.waitFor());
  assert.match(
    await fruitCategoryCopy.textContent(),
    /20 fruits/i,
    "category card count should use a compact readable label",
  );
  const categoryCardIconNames = await page
    .locator("[data-category-card-icon]")
    .evaluateAll((icons) =>
      icons.map((icon) => icon.getAttribute("data-category-card-icon")),
    );
  assert.deepEqual(
    categoryCardIconNames,
    ["cherry", "carrot", "mushroom"],
    "category cards should use category-specific icons",
  );
  const fruitCategoryCopyMetrics = await fruitCategoryCopy.evaluate((copy) => {
    const copyRect = copy.getBoundingClientRect();
    const card = copy.closest(".category-card");
    const cardRect = card?.getBoundingClientRect();
    const imageRect = card
      ?.querySelector(".category-card-icon")
      ?.getBoundingClientRect();
    const titleRect = copy
      .querySelector(".category-card-title")
      ?.getBoundingClientRect();
    const style = getComputedStyle(copy);

    return {
      bottomInset: cardRect ? cardRect.bottom - copyRect.bottom : 0,
      imageGap: imageRect ? imageRect.top - copyRect.bottom : 0,
      leftInset: cardRect ? copyRect.left - cardRect.left : 0,
      rightInset: cardRect ? cardRect.right - copyRect.right : 0,
      textAlign: style.textAlign,
      titleInset: titleRect ? titleRect.left - copyRect.left : 0,
      topInset: cardRect ? copyRect.top - cardRect.top : 0,
    };
  });
  assert.ok(
    fruitCategoryCopyMetrics.leftInset >= 8 &&
      fruitCategoryCopyMetrics.rightInset >= 8,
    "category card copy should align inside the card",
  );
  assert.ok(
    fruitCategoryCopyMetrics.topInset >= 8 &&
      fruitCategoryCopyMetrics.topInset <= 64,
    "category card copy should sit in the image-free top bar",
  );
  assert.ok(
    fruitCategoryCopyMetrics.imageGap >= 8,
    "category card image should start below the copy",
  );
  assert.ok(
    fruitCategoryCopyMetrics.titleInset >= 0,
    "category card title should align with its top copy block",
  );
  assert.equal(fruitCategoryCopyMetrics.textAlign, "left");

  const statusChipRow = page.locator('.quick-chip-row[aria-label="Statut"]');
  const hoverStatusChip = statusChipRow.getByRole("button", {
    name: /^De saison$/i,
  });
  await hoverStatusChip.hover();
  await page.waitForTimeout(200);
  const statusHoverMetrics = await hoverStatusChip.evaluate((chip) => {
    const row = chip.closest(".quick-chip-row");
    const rowRect = row?.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const rowStyle = row ? getComputedStyle(row) : null;

    return {
      paddingTop: rowStyle ? Number.parseFloat(rowStyle.paddingTop) : 0,
      topInset: rowRect ? chipRect.top - rowRect.top : -1,
    };
  });
  assert.ok(
    statusHoverMetrics.paddingTop >= 4,
    "status chip row should reserve top padding for hover motion",
  );
  assert.ok(
    statusHoverMetrics.topInset >= 0,
    `hovered status chip should not be cropped above the row (${statusHoverMetrics.topInset}px)`,
  );

  const searchBox = page.getByRole("searchbox");
  await searchBox.fill("orange");
  await page.waitForURL(/q=orange/);
  const orangeRow = page.locator("[data-season-row]").filter({
    has: page.locator(".item-name", { hasText: /^Orange$/ }),
  });
  await assert.doesNotReject(() =>
    orangeRow.getByText(/import nécessaire/i).waitFor(),
  );

  await searchBox.fill("pomme");
  await page.waitForURL(/q=pomme/);
  const appleRow = page.locator("[data-season-row]").filter({
    has: page.locator(".item-name", { hasText: /^Pomme$/ }),
  });
  await assert.doesNotReject(() =>
    appleRow.getByText(/^local$/i).waitFor(),
  );

  await page.getByRole("button", { name: /effacer la recherche/i }).click();
  assert.equal(await searchBox.inputValue(), "");
  assert.ok(!new URL(page.url()).searchParams.has("q"));

  for (const label of ["Pays", "Mois", "Langue"]) {
    assert.equal(
      await page.locator(".control-label", { hasText: label }).count(),
      1,
      `${label} control should expose a visible label`,
    );
  }

  const countryControl = page.locator('[data-control-name="country"]');
  assert.match(await countryControl.textContent(), /Suisse/);
  assert.equal(
    await countryControl
      .locator('[data-country-flag="CH"] img')
      .getAttribute("src"),
    `https://${flagPathForCode("CH")}`,
    "country selector should display the selected country flag image",
  );
  await countryControl.click();
  await assert.doesNotReject(() =>
    page.getByRole("listbox", { name: "Pays" }).waitFor(),
  );
  const franceOption = page.getByRole("option", { name: "France", exact: true });
  assert.equal(
    await franceOption
      .locator('[data-country-flag="FR"] img')
      .getAttribute("src"),
    `https://${flagPathForCode("FR")}`,
    "country list should display a flag image beside country names",
  );
  await franceOption.click();
  await page.waitForURL(/country=FR/);
  assert.match(
    await countryControl.textContent(),
    /France/,
    "country selector should use a custom popover control",
  );

  const monthControl = page.locator('[data-control-name="month"]');
  assert.match(await monthControl.textContent(), /juin/i);
  await monthControl.click();
  await assert.doesNotReject(() =>
    page.getByRole("listbox", { name: "Mois" }).waitFor(),
  );
  await page.getByRole("option", { name: "septembre", exact: true }).click();
  await page.waitForURL(/month=9/);
  assert.match(
    await monthControl.textContent(),
    /septembre/i,
    "month selector should update the selected month",
  );

  const languageControl = page.locator('[data-control-name="language"]');
  assert.match(await languageControl.textContent(), /Français/);
  await languageControl.click();
  await assert.doesNotReject(() =>
    page.getByRole("listbox", { name: "Langue" }).waitFor(),
  );
  await page.getByRole("option", { name: "English", exact: true }).click();
  await page.waitForURL(/lang=en/);
  assert.match(
    await languageControl.textContent(),
    /English/,
    "language selector should update the selected language",
  );

  await languageControl.click();
  await page.getByRole("option", { name: "Français", exact: true }).click();
  await page.waitForURL((url) => url.searchParams.get("lang") !== "en");
  await page.waitForFunction(
    () => document.querySelector('[data-control-name="language"]')?.textContent?.includes("Français"),
  );

  const fruitTab = page.locator('[data-category-tab="fruit"]');
  await assert.doesNotReject(() => fruitTab.waitFor());
  await fruitTab.click();
  await page.waitForURL(/category=fruit/);
  await page.reload({ waitUntil: "networkidle" });
  await assert.doesNotReject(() =>
    page.locator('[data-category-tab="fruit"][aria-pressed="true"]').waitFor(),
  );

  await page.getByRole("searchbox").fill("pomme");
  await page.waitForURL(/q=pomme/);
  await page.getByRole("button", { name: /effacer la recherche/i }).click();
  assert.equal(await page.getByRole("searchbox").inputValue(), "");
  assert.ok(!new URL(page.url()).searchParams.has("q"));

  await page.getByRole("button", { name: /sources/i }).first().click();
  await assert.doesNotReject(() => page.getByText(/niveau|donnée/i).first().waitFor());

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  assert.ok(height < 18000, `mobile page is too tall: ${height}`);

} finally {
  await browser?.close().catch(() => undefined);
  server.kill();
}
