import puppeteer from "puppeteer-core";
import { spawn } from "child_process";

const BROWSER_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const query = process.argv[2] ?? "дизайнер";
const searchUrl =
  "https://hh.ru/search/vacancy?text=" +
  encodeURIComponent(query) +
  "&items_on_page=20";

async function ensureBrowser() {
  try {
    return await puppeteer.connect({
      browserURL: BROWSER_URL,
      defaultViewport: { width: 1280, height: 900 },
    });
  } catch {
    spawn(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      [
        "--remote-debugging-port=9222",
        "--user-data-dir=/tmp/chrome-cdp-cursor",
        "--no-first-run",
      ],
      { detached: true, stdio: "ignore" },
    ).unref();
    await new Promise((r) => setTimeout(r, 5000));
    return puppeteer.connect({
      browserURL: BROWSER_URL,
      defaultViewport: { width: 1280, height: 900 },
    });
  }
}

const items = await (async () => {
  const browser = await ensureBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );
  await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2500));

  const list = await page.evaluate(() => {
    const out = [];
    const seen = new Set();
    const links = document.querySelectorAll("a[href]");
    for (const a of links) {
      const href = a.getAttribute("href") || "";
      if (!href.includes("/vacancy/")) continue;
      const m = href.match(/\/vacancy\/(\d+)/);
      if (!m) continue;
      const id = m[1];
      if (seen.has(id)) continue;
      const title = (a.textContent || "").trim().replace(/\s+/g, " ");
      if (title.length < 3) continue;
      seen.add(id);
      const path = href.split("?")[0];
      const full = path.startsWith("http") ? path : "https://hh.ru" + path;
      out.push({ title, url: full });
      if (out.length >= 20) break;
    }
    return out;
  });

  await browser.disconnect();
  return list;
})();

console.log("Запрос:", query);
console.log("URL поиска:", searchUrl);
console.log("Найдено вакансий (первая страница):", items.length);
items.forEach((v, i) => console.log(`${i + 1}. ${v.title}\n   ${v.url}`));
