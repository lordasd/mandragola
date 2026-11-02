// Generates public/og/og-en.png, og-he.png (1200x630) and logo-512.png with sharp.
// Usage: npm run og  (uses system fonts: Georgia, David / FrankRuehl on Windows)
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");

const INK = "#0B1B2E";
const GOLD = "#E2B471";
const out = path.join(ROOT, "public/og");
fs.mkdirSync(out, { recursive: true });

const logoSvg = fs.readFileSync(path.join(ROOT, "public/images/brand/mandragola-logo-white.svg"));
const markerSvg = fs.readFileSync(path.join(ROOT, "public/images/brand/marker-line.svg"));

const W = 1200, H = 630, PAD = 96;

function textLayer({ rtl }) {
  const x = rtl ? W - PAD : PAD;
  const anchor = rtl ? "end" : "start";
  const tagFont = rtl ? "FrankRuehl, David, serif" : "Georgia, serif";
  const tagline = rtl ? "השקעות ושותפויות גלובליות" : "Global Investments &amp; Partnerships";
  const note = rtl ? "גרסת הדגמה – אינו האתר הרשמי" : "Demo rebuild · not the official website";
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${INK}"/>
  <text x="${x}" y="368" text-anchor="${anchor}" font-family="Georgia, serif" font-size="96" fill="#FFFFFF">Mandragola Ltd</text>
  <text x="${x}" y="476" text-anchor="${anchor}" font-family="${tagFont}" font-size="${rtl ? 48 : 42}" fill="#FFFFFF" fill-opacity="0.88">${tagline}</text>
  <rect x="${rtl ? x - 6 : x}" y="530" width="6" height="34" fill="${GOLD}"/>
  <text x="${rtl ? x - 22 : x + 22}" y="556" text-anchor="${anchor}" font-family="${rtl ? "David, sans-serif" : "Georgia, serif"}" font-size="${rtl ? 28 : 24}" fill="${GOLD}">${note}</text>
</svg>`);
}

async function og(locale) {
  const rtl = locale === "he";
  const logoW = 170;
  const logo = await sharp(logoSvg, { density: 300 }).resize({ width: logoW }).png().toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const markerW = 420;
  let mk = sharp(markerSvg, { density: 300 }).resize({ width: markerW }); if (rtl) mk = sharp(await mk.png().toBuffer()).flop(); const marker = await mk.png().toBuffer();
  const file = path.join(out, `og-${locale}.png`);
  await sharp(textLayer({ rtl }))
    .composite([
      { input: logo, top: 84, left: rtl ? W - PAD - logoW : PAD },
      { input: marker, top: 392, left: rtl ? W - PAD - markerW : PAD },
    ])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(file);
  console.log(file, fs.statSync(file).size, logoMeta.height);
}

async function logo512() {
  const S = 512, w = 380;
  const logo = await sharp(logoSvg, { density: 400 }).resize({ width: w }).png().toBuffer();
  const { height } = await sharp(logo).metadata();
  const file = path.join(out, "logo-512.png");
  await sharp({ create: { width: S, height: S, channels: 3, background: INK } })
    .composite([{ input: logo, top: Math.round((S - height) / 2), left: Math.round((S - w) / 2) }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(file);
  console.log(file, fs.statSync(file).size);
}

(async () => {
  await og("en");
  await og("he");
  await logo512();
})().catch((e) => { console.error(e); process.exit(1); });
