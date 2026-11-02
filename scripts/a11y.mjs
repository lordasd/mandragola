// WCAG 2.2 AA check with axe-core on every route, mobile + desktop.
// Usage: npm run build && npm start (in another shell), then `npm run a11y [baseUrl] [route...]`
// Routes are given without a leading slash (Git Bash rewrites "/x" into a Windows path): `home expertise he`.
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const [base = "http://localhost:3000", ...routesArg] = process.argv.slice(2);
const toPath = (r) => (r === "home" || r === "/" ? "/" : "/" + r.replace(/^\/+/, ""));
const routes = routesArg.length
  ? routesArg.map(toPath)
  : ["/", "/expertise", "/transactions", "/accessibility", "/he", "/he/accessibility"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch();
let failures = 0;

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    const label = `${vp.name.padEnd(7)} ${route}`;
    if (violations.length === 0) {
      console.log(`PASS ${label}`);
      continue;
    }
    failures += violations.length;
    console.log(`FAIL ${label}`);
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
      for (const n of v.nodes.slice(0, 3)) console.log(`     ${n.target.join(" ")}`);
    }
  }
  await context.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
