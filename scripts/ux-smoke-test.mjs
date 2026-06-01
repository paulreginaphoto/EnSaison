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
    page.getByRole("heading", { name: /^Le meilleur de juin$/i }).waitFor(),
  );
  await assert.doesNotReject(() =>
    page
      .getByText(
        "Découvrez les fruits, légumes et champignons naturellement de saison en Suisse.",
      )
      .waitFor(),
  );
  await assert.doesNotReject(() =>
    page.getByRole("link", { name: /voir les produits de juin/i }).waitFor(),
  );
  const heroSeasonItems = page.locator("[data-hero-season-item]");
  await assert.doesNotReject(() => heroSeasonItems.first().waitFor());
  const heroSeasonItemStates = await heroSeasonItems.evaluateAll((items) =>
    items.map((item) => ({
      id: item.getAttribute("data-item-id"),
      origin: item.getAttribute("data-origin"),
      status: item.getAttribute("data-status"),
    })),
  );
  assert.ok(heroSeasonItemStates.length >= 3, "hero should show several seasonal product images");
  assert.deepEqual(
    [...new Set(heroSeasonItemStates.map((item) => item.status))],
    ["in-season"],
    "hero should only show products that are in season for the selected month and country",
  );
  assert.ok(
    heroSeasonItemStates.every((item) => ["local", "regional"].includes(item.origin ?? "")),
    "hero should not promote imported products as seasonal hero imagery",
  );
  const mobileHeroMetrics = await page.locator(".hero-card").evaluate((hero) => {
    const heroRect = hero.getBoundingClientRect();
    const artRect = hero.querySelector(".hero-art")?.getBoundingClientRect();
    const categoryRect = document
      .querySelector(".category-bento")
      ?.getBoundingClientRect();

    return {
      artHeight: artRect?.height ?? 0,
      categoryTop: categoryRect?.top ?? 0,
      heroHeight: heroRect.height,
      viewportHeight: window.innerHeight,
    };
  });
  assert.ok(
    mobileHeroMetrics.artHeight <= 220,
    `mobile hero seasonal images should stay compact: ${mobileHeroMetrics.artHeight}px`,
  );
  assert.ok(
    mobileHeroMetrics.categoryTop <= mobileHeroMetrics.viewportHeight * 1.05,
    `mobile categories should appear without a long hero-image scroll: ${mobileHeroMetrics.categoryTop}px`,
  );

  const narrowPage = await browser.newPage({
    viewport: { width: 824, height: 947 },
    deviceScaleFactor: 1,
  });
  await narrowPage.goto(baseUrl, { waitUntil: "networkidle" });
  await assert.doesNotReject(() =>
    narrowPage.getByRole("heading", { name: /^Le meilleur de juin$/i }).waitFor(),
  );
  const narrowHeroMetrics = await narrowPage.locator(".hero-card").evaluate((hero) => {
    const artRect = hero.querySelector(".hero-art")?.getBoundingClientRect();
    const categoryRect = document
      .querySelector(".category-bento")
      ?.getBoundingClientRect();

    return {
      artHeight: artRect?.height ?? 0,
      categoryTop: categoryRect?.top ?? 0,
      viewportHeight: window.innerHeight,
    };
  });
  await narrowPage.close();
  assert.ok(
    narrowHeroMetrics.artHeight <= 240,
    `narrow hero seasonal images should stay compact: ${narrowHeroMetrics.artHeight}px`,
  );
  assert.ok(
    narrowHeroMetrics.categoryTop <= narrowHeroMetrics.viewportHeight * 0.95,
    `narrow categories should be visible in the first viewport: ${narrowHeroMetrics.categoryTop}px`,
  );
  assert.equal(await page.getByRole("heading", { name: /^hors saison$/i }).count(), 0);
  assert.equal(await page.getByRole("heading", { name: /^variable$/i }).count(), 0);

  const renderedRows = await page.locator("[data-season-row]").count();
  assert.ok(renderedRows > 0, "season rows should render");
  assert.ok(renderedRows < 140, `default screen renders too many rows: ${renderedRows}`);
  const visibleInSeasonIds = await page
    .locator('[data-season-row][data-status="in-season"]')
    .evaluateAll((rows) => rows.map((row) => row.getAttribute("data-item-id")));
  assert.ok(
    heroSeasonItemStates.every((item) => visibleInSeasonIds.includes(item.id)),
    "hero should draw images from the visible in-season result set",
  );
  const strawberryRow = page.locator('[data-season-row][data-item-id="fraise"]').first();
  await assert.doesNotReject(() => strawberryRow.waitFor());
  await assert.doesNotReject(() =>
    strawberryRow.locator("[data-item-status-badge]", { hasText: /^Pleine saison$/ }).waitFor(),
  );
  await assert.doesNotReject(() =>
    strawberryRow.locator("[data-item-origin-badge]", { hasText: /^Local$/ }).waitFor(),
  );
  await assert.doesNotReject(() =>
    strawberryRow
      .locator("[data-item-origin-note]", { hasText: /Production locale possible/i })
      .waitFor(),
  );
  const strawberryMonthBadges = strawberryRow.locator("[data-season-month]");
  assert.equal(
    await strawberryMonthBadges.count(),
    12,
    "item season calendar should expose 12 readable month badges",
  );
  assert.match(
    (await strawberryMonthBadges.nth(5).textContent()) ?? "",
    /^J$/i,
    "month badges should show compact month initials",
  );
  const strawberryCurrentMonthMetrics = await strawberryMonthBadges
    .nth(5)
    .evaluate((month) => {
      const rect = month.getBoundingClientRect();
      return { height: rect.height, width: rect.width };
    });
  assert.ok(
    strawberryCurrentMonthMetrics.height >= 24 &&
      strawberryCurrentMonthMetrics.width >= 16,
    "current month badge should be large enough to read and tap visually",
  );

  await page.getByRole("link", { name: /voir les produits de juin/i }).click();
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
  await searchBox.fill("ananas");
  await page.waitForURL(/q=ananas/);
  const pineappleRow = page.locator("[data-season-row]").filter({
    has: page.locator(".item-name", { hasText: /^Ananas$/ }),
  });
  await assert.doesNotReject(() =>
    pineappleRow.locator("[data-item-status-badge]", { hasText: /^Disponible$/ }).waitFor(),
  );
  await assert.doesNotReject(() =>
    pineappleRow.locator("[data-item-origin-badge]", { hasText: /^Importé$/ }).waitFor(),
  );
  await assert.doesNotReject(() =>
    pineappleRow
      .locator("[data-item-origin-note]", { hasText: /importation nécessaire/i })
      .waitFor(),
  );

  await searchBox.fill("orange");
  await page.waitForURL(/q=orange/);
  const orangeRow = page.locator("[data-season-row]").filter({
    has: page.locator(".item-name", { hasText: /^Orange$/ }),
  });
  await assert.doesNotReject(() =>
    orangeRow.locator("[data-item-origin-note]", { hasText: /importation nécessaire/i }).waitFor(),
  );

  await searchBox.fill("pomme");
  await page.waitForURL(/q=pomme/);
  const appleRow = page.locator("[data-season-row]").filter({
    has: page.locator(".item-name", { hasText: /^Pomme$/ }),
  });
  await assert.doesNotReject(() =>
    appleRow.locator("[data-item-origin-badge]", { hasText: /^local$/i }).waitFor(),
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
  await assert.doesNotReject(() =>
    page
      .getByText(
        "Découvrez les fruits, légumes et champignons naturellement de saison en France.",
      )
      .waitFor(),
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
  await assert.doesNotReject(() =>
    page.getByRole("heading", { name: /^Le meilleur de septembre$/i }).waitFor(),
  );
  await assert.doesNotReject(() =>
    page.getByRole("link", { name: /voir les produits de septembre/i }).waitFor(),
  );
  const septemberHeroSeasonItemStates = await heroSeasonItems.evaluateAll((items) =>
    items.map((item) => ({
      id: item.getAttribute("data-item-id"),
      origin: item.getAttribute("data-origin"),
      status: item.getAttribute("data-status"),
    })),
  );
  assert.ok(
    septemberHeroSeasonItemStates.length >= 3,
    "hero should keep several seasonal images when country and month change",
  );
  assert.deepEqual(
    [...new Set(septemberHeroSeasonItemStates.map((item) => item.status))],
    ["in-season"],
    "changed country/month hero should only show in-season products",
  );
  assert.ok(
    septemberHeroSeasonItemStates.every((item) =>
      ["local", "regional"].includes(item.origin ?? ""),
    ),
    "changed country/month hero should not promote imported products",
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
  await assert.doesNotReject(() =>
    page.getByRole("heading", { name: /^The best of September$/i }).waitFor(),
  );
  await assert.doesNotReject(() =>
    page
      .getByText(
        "Discover fruit, vegetables and mushrooms naturally in season in France.",
      )
      .waitFor(),
  );
  await assert.doesNotReject(() =>
    page.getByRole("link", { name: /see september produce/i }).waitFor(),
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
