/**
 * Подключение к Chrome по Chrome DevTools Protocol.
 * Перед запуском откройте Chrome с remote debugging (см. npm run chrome:cdp).
 */
import puppeteer from "puppeteer-core";

const BROWSER_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";

async function main() {
  console.log(`Connecting to ${BROWSER_URL} …`);
  const browser = await puppeteer.connect({
    browserURL: BROWSER_URL,
    defaultViewport: null,
  });
  const pages = await browser.pages();
  console.log("CDP: OK. Open tabs:", pages.length);
  for (const p of pages) {
    const url = p.url() || "(empty)";
    console.log("  —", url);
  }
  await browser.disconnect();
  console.log("Disconnected (browser keeps running).");
}

main().catch((err) => {
  const msg = String(err.message || err);
  console.error(msg);
  if (msg.includes("fetch failed") || msg.includes("ECONNREFUSED")) {
    console.error(
      "\nЗапустите Chrome с отладкой, затем повторите npm run cdp:connect:\n" +
        '  /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome \\\n' +
        "    --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-cdp-profile\n",
    );
  }
  process.exit(1);
});
