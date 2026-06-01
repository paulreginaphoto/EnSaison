import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname } from "node:path";
import { chromium } from "playwright";

const brandCream = "#fff9ed";
const sourceIconPath = "src/assets/icons/app-icon-source.png";
const sourceLogoPath = "src/assets/icons/app-logo-source.png";
const appIconPath = "src/assets/icons/app-icon.png";
const appMarkPath = "src/assets/icons/app-mark.png";
const appLogoPath = "src/assets/icons/app-logo.png";

const mimeByExt = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const imageDataUrl = async (path) => {
  const mime = mimeByExt[extname(path).toLowerCase()] ?? "application/octet-stream";
  const bytes = await readFile(path);
  return `data:${mime};base64,${bytes.toString("base64")}`;
};

const ensureParent = async (path) => mkdir(dirname(path), { recursive: true });

const writePngDataUrl = async (path, dataUrl) => {
  await ensureParent(path);
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
  await writeFile(path, Buffer.from(base64, "base64"));
};

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

const trimPng = async (
  page,
  { sourcePath, outputPath, padding = 0, maxWidth = null, maxHeight = null },
) => {
  const dataUrl = await imageDataUrl(sourcePath);
  const result = await page.evaluate(
    async ({ dataUrl, padding, maxWidth, maxHeight }) => {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load brand source image"));
        img.src = dataUrl;
      });

      const source = document.createElement("canvas");
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      source.width = width;
      source.height = height;

      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      sourceContext.drawImage(image, 0, 0);

      const imageData = sourceContext.getImageData(0, 0, width, height);
      const { data } = imageData;
      const mask = new Uint8Array(width * height);
      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      for (let index = 0; index < data.length; index += 4) {
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        const isContent =
          a > 10 && ((saturation > 0.12 && min < 248) || min < 205 || (max - min > 34 && max < 248));

        if (isContent) {
          const pixel = index / 4;
          const x = pixel % width;
          const y = Math.floor(pixel / width);
          mask[pixel] = 1;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }

      if (maxX < 0 || maxY < 0) {
        minX = 0;
        minY = 0;
        maxX = width - 1;
        maxY = height - 1;
      }

      for (let index = 0; index < data.length; index += 4) {
        if (!mask[index / 4]) {
          data[index + 3] = 0;
        }
      }

      sourceContext.putImageData(imageData, 0, 0);

      const cropWidth = maxX - minX + 1;
      const cropHeight = maxY - minY + 1;
      const paddedWidth = cropWidth + padding * 2;
      const paddedHeight = cropHeight + padding * 2;
      const scale = Math.min(
        maxWidth ? maxWidth / paddedWidth : 1,
        maxHeight ? maxHeight / paddedHeight : 1,
        1,
      );
      const outputWidth = Math.max(1, Math.round(paddedWidth * scale));
      const outputHeight = Math.max(1, Math.round(paddedHeight * scale));

      const output = document.createElement("canvas");
      output.width = outputWidth;
      output.height = outputHeight;
      const outputContext = output.getContext("2d");
      outputContext.imageSmoothingEnabled = true;
      outputContext.imageSmoothingQuality = "high";
      outputContext.drawImage(
        source,
        minX - padding,
        minY - padding,
        paddedWidth,
        paddedHeight,
        0,
        0,
        outputWidth,
        outputHeight,
      );

      return {
        dataUrl: output.toDataURL("image/png"),
        width: outputWidth,
        height: outputHeight,
      };
    },
    { dataUrl, padding, maxWidth, maxHeight },
  );

  await writePngDataUrl(outputPath, result.dataUrl);
  return { width: result.width, height: result.height };
};

const renderImage = async (
  page,
  {
    sourcePath,
    path,
    width,
    height,
    imageWidth = width,
    imageHeight = height,
    background = "transparent",
    transparent = false,
  },
) => {
  await ensureParent(path);
  const dataUrl = await imageDataUrl(sourcePath);
  await page.setViewportSize({ width, height });
  await page.setContent(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            html,
            body {
              width: ${width}px;
              height: ${height}px;
              margin: 0;
              overflow: hidden;
              background: ${background};
            }

            body {
              display: grid;
              place-items: center;
            }

            img {
              display: block;
              width: ${imageWidth}px;
              height: ${imageHeight}px;
              object-fit: contain;
            }
          </style>
        </head>
        <body><img src="${dataUrl}" alt="" /></body>
      </html>`,
    { waitUntil: "load" },
  );
  await page.screenshot({ path, omitBackground: transparent });
};

await mkdir("public/brand", { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });

try {
  await renderImage(page, {
    sourcePath: sourceIconPath,
    path: appIconPath,
    width: 512,
    height: 512,
  });

  const markSize = await trimPng(page, {
    sourcePath: sourceIconPath,
    outputPath: appMarkPath,
    padding: 24,
    maxWidth: 512,
    maxHeight: 512,
  });

  const logoSize = await trimPng(page, {
    sourcePath: sourceLogoPath,
    outputPath: appLogoPath,
    padding: 14,
    maxWidth: 980,
    maxHeight: 220,
  });

  await copyFile(appLogoPath, "public/brand/desaison-logo.png");
  await copyFile(appMarkPath, "public/brand/desaison-mark.png");

  for (const size of [16, 32, 48, 180, 192, 512]) {
    const pathBySize = {
      16: "public/favicon-16x16.png",
      32: "public/favicon-32x32.png",
      48: "public/favicon-48x48.png",
      180: "public/apple-touch-icon.png",
      192: "public/icon-192.png",
      512: "public/icon-512.png",
    };
    await renderImage(page, {
      sourcePath: sourceIconPath,
      path: pathBySize[size],
      width: size,
      height: size,
    });
  }

  await renderImage(page, {
    sourcePath: appMarkPath,
    path: "public/maskable-icon-512.png",
    width: 512,
    height: 512,
    imageWidth: 360,
    imageHeight: Math.round(360 * markSize.height / markSize.width),
    background: brandCream,
  });

  await renderImage(page, {
    sourcePath: sourceIconPath,
    path: "public/brand/desaison-icon-512.png",
    width: 512,
    height: 512,
  });
  await renderImage(page, {
    sourcePath: appMarkPath,
    path: "public/brand/desaison-mark-512.png",
    width: 512,
    height: 512,
    transparent: true,
  });
  await renderImage(page, {
    sourcePath: appLogoPath,
    path: "public/brand/desaison-logo-1024.png",
    width: 1024,
    height: Math.round(1024 * logoSize.height / logoSize.width),
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
    await renderImage(page, {
      sourcePath: sourceIconPath,
      path: `${base}/ic_launcher.png`,
      width: legacySize,
      height: legacySize,
    });
    await renderImage(page, {
      sourcePath: sourceIconPath,
      path: `${base}/ic_launcher_round.png`,
      width: legacySize,
      height: legacySize,
    });
    const foregroundImageWidth = Math.round(foregroundSize * 0.66);
    await renderImage(page, {
      sourcePath: appMarkPath,
      path: `${base}/ic_launcher_foreground.png`,
      width: foregroundSize,
      height: foregroundSize,
      imageWidth: foregroundImageWidth,
      imageHeight: Math.round(foregroundImageWidth * markSize.height / markSize.width),
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
    const logoWidth = Math.min(Math.round(width * (width > height ? 0.54 : 0.74)), 820);
    await renderImage(page, {
      sourcePath: appLogoPath,
      path,
      width,
      height,
      imageWidth: logoWidth,
      imageHeight: Math.round(logoWidth * logoSize.height / logoSize.width),
      background: brandCream,
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
