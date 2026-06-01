import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright";

const svgDataUrl = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const writeIco = async (sources, outputPath) => {
  const images = await Promise.all(
    sources.map(async ({ size, path }) => ({
      size,
      bytes: await readFile(path),
    })),
  );
  const headerSize = 6 + images.length * 16;
  const totalSize = headerSize + images.reduce((sum, image) => sum + image.bytes.length, 0);
  const buffer = Buffer.alloc(totalSize);

  buffer.writeUInt16LE(0, 0);
  buffer.writeUInt16LE(1, 2);
  buffer.writeUInt16LE(images.length, 4);

  let imageOffset = headerSize;
  images.forEach((image, index) => {
    const entryOffset = 6 + index * 16;
    buffer.writeUInt8(image.size === 256 ? 0 : image.size, entryOffset);
    buffer.writeUInt8(image.size === 256 ? 0 : image.size, entryOffset + 1);
    buffer.writeUInt8(0, entryOffset + 2);
    buffer.writeUInt8(0, entryOffset + 3);
    buffer.writeUInt16LE(1, entryOffset + 4);
    buffer.writeUInt16LE(32, entryOffset + 6);
    buffer.writeUInt32LE(image.bytes.length, entryOffset + 8);
    buffer.writeUInt32LE(imageOffset, entryOffset + 12);
    image.bytes.copy(buffer, imageOffset);
    imageOffset += image.bytes.length;
  });

  await writeFile(outputPath, buffer);
};

const ensureParent = async (path) => mkdir(dirname(path), { recursive: true });

const renderPage = async (page, { html, path, width, height, transparent = false }) => {
  await ensureParent(path);
  await page.setViewportSize({ width, height });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path, omitBackground: transparent });
};

const renderSvg = async (page, { svg, path, width, height, transparent = false }) => {
  await renderPage(page, {
    path,
    width,
    height,
    transparent,
    html: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            html, body { width: ${width}px; height: ${height}px; margin: 0; background: transparent; overflow: hidden; }
            img { display: block; width: ${width}px; height: ${height}px; }
          </style>
        </head>
        <body><img src="${svgDataUrl(svg)}" alt="" /></body>
      </html>`,
  });
};

const renderCenteredSvg = async (
  page,
  { svg, path, width, height, imageWidth, imageHeight, background = "transparent", transparent = false },
) => {
  await renderPage(page, {
    path,
    width,
    height,
    transparent,
    html: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            html, body {
              width: ${width}px;
              height: ${height}px;
              margin: 0;
              background: ${background};
              overflow: hidden;
            }
            body {
              display: grid;
              place-items: center;
            }
            img {
              width: ${imageWidth}px;
              height: ${imageHeight}px;
              object-fit: contain;
            }
          </style>
        </head>
        <body><img src="${svgDataUrl(svg)}" alt="" /></body>
      </html>`,
  });
};

const iconSvg = await readFile("src/assets/icons/app-icon.svg", "utf8");
const markSvg = await readFile("src/assets/icons/app-mark.svg", "utf8");
const logoSvg = await readFile("src/assets/icons/app-logo.svg", "utf8");

await mkdir("public/brand", { recursive: true });
await writeFile("public/favicon.svg", iconSvg);
await writeFile("public/brand/desaison-icon.svg", iconSvg);
await writeFile("public/brand/desaison-mark.svg", markSvg);
await writeFile("public/brand/desaison-logo.svg", logoSvg);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });

try {
  for (const size of [16, 32, 48, 180, 192, 512]) {
    const pathBySize = {
      16: "public/favicon-16x16.png",
      32: "public/favicon-32x32.png",
      48: "public/favicon-48x48.png",
      180: "public/apple-touch-icon.png",
      192: "public/icon-192.png",
      512: "public/icon-512.png",
    };
    await renderSvg(page, { svg: iconSvg, path: pathBySize[size], width: size, height: size });
  }

  await renderCenteredSvg(page, {
    svg: markSvg,
    path: "public/maskable-icon-512.png",
    width: 512,
    height: 512,
    imageWidth: 340,
    imageHeight: 340,
    background: "#fff9ed",
  });

  await renderSvg(page, {
    svg: iconSvg,
    path: "public/brand/desaison-icon-512.png",
    width: 512,
    height: 512,
  });
  await renderSvg(page, {
    svg: markSvg,
    path: "public/brand/desaison-mark-512.png",
    width: 512,
    height: 512,
    transparent: true,
  });
  await renderSvg(page, {
    svg: logoSvg,
    path: "public/brand/desaison-logo-1024.png",
    width: 1024,
    height: 259,
    transparent: true,
  });

  const androidDensities = [
    ["mipmap-mdpi", 48, 108],
    ["mipmap-hdpi", 72, 162],
    ["mipmap-xhdpi", 96, 216],
    ["mipmap-xxhdpi", 144, 324],
    ["mipmap-xxxhdpi", 192, 432],
  ];

  for (const [density, legacySize, foregroundSize] of androidDensities) {
    const base = `android/app/src/main/res/${density}`;
    await renderSvg(page, {
      svg: iconSvg,
      path: `${base}/ic_launcher.png`,
      width: legacySize,
      height: legacySize,
    });
    await renderSvg(page, {
      svg: iconSvg,
      path: `${base}/ic_launcher_round.png`,
      width: legacySize,
      height: legacySize,
    });
    await renderCenteredSvg(page, {
      svg: markSvg,
      path: `${base}/ic_launcher_foreground.png`,
      width: foregroundSize,
      height: foregroundSize,
      imageWidth: Math.round(foregroundSize * 0.7),
      imageHeight: Math.round(foregroundSize * 0.7),
      transparent: true,
    });
  }

  const splashTargets = [
    ["android/app/src/main/res/drawable/splash.png", 480, 320],
    ["android/app/src/main/res/drawable-land-mdpi/splash.png", 480, 320],
    ["android/app/src/main/res/drawable-land-hdpi/splash.png", 800, 480],
    ["android/app/src/main/res/drawable-land-xhdpi/splash.png", 1280, 720],
    ["android/app/src/main/res/drawable-land-xxhdpi/splash.png", 1600, 960],
    ["android/app/src/main/res/drawable-land-xxxhdpi/splash.png", 1920, 1280],
    ["android/app/src/main/res/drawable-port-mdpi/splash.png", 320, 480],
    ["android/app/src/main/res/drawable-port-hdpi/splash.png", 480, 800],
    ["android/app/src/main/res/drawable-port-xhdpi/splash.png", 720, 1280],
    ["android/app/src/main/res/drawable-port-xxhdpi/splash.png", 960, 1600],
    ["android/app/src/main/res/drawable-port-xxxhdpi/splash.png", 1280, 1920],
  ];

  for (const [path, width, height] of splashTargets) {
    const logoWidth = Math.min(Math.round(width * (width > height ? 0.52 : 0.72)), 760);
    await renderCenteredSvg(page, {
      svg: logoSvg,
      path,
      width,
      height,
      imageWidth: logoWidth,
      imageHeight: Math.round(logoWidth * 192 / 760),
      background: "#fff9ed",
    });
  }

  await writeIco(
    [
      { size: 16, path: "public/favicon-16x16.png" },
      { size: 32, path: "public/favicon-32x32.png" },
      { size: 48, path: "public/favicon-48x48.png" },
    ],
    "public/favicon.ico",
  );
} finally {
  await browser.close();
}
