// Full-page screenshots of every route at mobile + desktop widths for visual review.
// Usage: npm run screenshots -- [baseUrl] [outDir]
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const [base = "http://localhost:3000", out = "screenshots"] = process.argv.slice(2);
const routes = ["/", "/expertise", "/transactions", "/accessibility", "/he"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
];

await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const name = (route === "/" ? "home" : route.slice(1).replaceAll("/", "_")) + `.${vp.name}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: true });
    console.log("saved", name);
  }
  await context.close();
}
await browser.close();
