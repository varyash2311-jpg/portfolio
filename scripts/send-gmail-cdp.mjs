/**
 * CDP: открыть Gmail с черновиком и попытаться нажать «Отправить».
 * Нужен Chrome с --remote-debugging-port=9222 и залогиненный Gmail в этом профиле.
 */
import puppeteer from "puppeteer-core";
import { spawn } from "child_process";

const BROWSER_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";

const to = process.env.MAIL_TO ?? "info@woopicx.com";
const subject = process.env.MAIL_SUBJECT ?? "Заявление о приёме на работу";
const body =
  process.env.MAIL_BODY ??
  `Уважаемые коллеги,

обращаюсь в вашу компанию с просьбой рассмотреть возможность моего трудоустройства. Меня заинтересовала ваша деятельность; готова внести вклад в задачи команды и развиваться вместе с организацией.

Прошу сообщить, есть ли на данный момент открытые вакансии, соответствующие моему профилю, или рассмотреть мою кандидатуру для включения в кадровый резерв. Резюме и дополнительные материалы готовы направить по запросу.

Буду признательна за обратную связь в удобный для вас срок.

С уважением,
Варвара Ширяева`;

async function ensureBrowser() {
  try {
    return await puppeteer.connect({
      browserURL: BROWSER_URL,
      defaultViewport: null,
    });
  } catch {
    console.error("Запуск Chrome с CDP…");
    spawn(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      [
        "--remote-debugging-port=9222",
        "--user-data-dir=/tmp/chrome-cdp-cursor",
        "--no-first-run",
        "--no-default-browser-check",
      ],
      { detached: true, stdio: "ignore" },
    ).unref();
    await new Promise((r) => setTimeout(r, 5000));
    return puppeteer.connect({
      browserURL: BROWSER_URL,
      defaultViewport: null,
    });
  }
}

async function main() {
  const browser = await ensureBrowser();
  const page = await browser.newPage();

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  const composeUrl = `https://mail.google.com/mail/?${params.toString()}`;

  console.log("Открываю окно создания письма в Gmail…");
  await page.goto(composeUrl, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });

  // Даём Gmail отрисовать композер
  await new Promise((r) => setTimeout(r, 4000));

  let clicked = false;
  try {
    clicked = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('div[role="button"], button[role="button"]'),
      );
      const send = buttons.find((el) => {
        const a = (el.getAttribute("aria-label") || "").toLowerCase();
        const t = (el.textContent || "").trim().toLowerCase();
        return (
          a.includes("send") ||
          a.includes("отправить") ||
          t === "send" ||
          t === "отправить"
        );
      });
      if (send) {
        send.click();
        return true;
      }
      return false;
    });
  } catch (e) {
    console.warn("Поиск кнопки отправки:", e.message);
  }

  if (clicked) {
    console.log("Нажата кнопка отправки (проверьте «Отправленные» в Gmail).");
  } else {
    console.log(
      "Кнопку «Отправить» автоматически не нашли — проверьте черновик на экране и нажмите «Отправить» вручную.",
    );
  }

  await browser.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
