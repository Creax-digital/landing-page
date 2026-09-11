import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      IMAGES: {
        input() {
          return {
            transform() {
              return {
                async output() {
                  return { response: () => new Response("Not found", { status: 404 }) };
                },
              };
            },
          };
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders a soft language gateway at the x-default URL", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Choose your language/);
  assert.match(html, /href="\/ru\/"/);
  assert.match(html, /href="\/en\/"/);
  assert.match(html, /href="\/zh-hans\/"/);
});

test("renders complete Russian, English and Chinese home pages", async () => {
  const expected = [
    ["/ru", "AI-контент, digital-продукты и автоматизация для бизнеса"],
    ["/en", "AI Content, Digital Products &amp; Intelligent Automation"],
    ["/zh-hans", "为企业提供AIGC内容、数字产品与AI自动化"],
  ];

  for (const [pathname, heading] of expected) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(heading));
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /hreflang="ru"/);
    assert.match(html, /hreflang="en"/);
    assert.match(html, /hreflang="zh-Hans"/);
    assert.doesNotMatch(html, /карточк.{0,20}специалист|team member|团队成员/i);
  }
});

test("renders all practice pages and the work index", async () => {
  const routes = [
    "/ru/creative",
    "/ru/products",
    "/ru/systems",
    "/en/creative",
    "/en/products",
    "/en/systems",
    "/zh-hans/creative",
    "/zh-hans/products",
    "/zh-hans/systems",
    "/ru/work",
    "/en/work",
    "/zh-hans/work",
  ];

  for (const pathname of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /<main[^>]+id="main-content"/);
    assert.match(html, /CREAX\.digital/);
  }
});

test("explains the full delivery cycle and shows three distinct home cases", async () => {
  const response = await render("/ru");
  const html = await response.text();
  assert.match(html, /Полный цикл запуска — в одном контуре/);
  assert.doesNotMatch(html, /Например:/);
  assert.match(html, /AI campaign content/);
  assert.match(html, /Telegram Mini App/);
  assert.match(html, /CRM &amp; AI automation/);
  assert.match(html, /Работы, которые говорят сами за себя/);
  assert.match(html, /AI-контент для запуска продукта/);
  assert.match(html, /AI-разработка с экспертным контролем/);
  assert.match(html, /Расскажите, что хотите создать/);
  assert.doesNotMatch(html, /04 → 01/);
});

test("renders a complete six-case work grid with unified animated art", async () => {
  const response = await render("/ru/work");
  const html = await response.text();
  assert.match(html, /Дашборд для управленческой аналитики/);
  assert.match(html, /miniapp-art/);
  assert.match(html, /crm-art/);
  assert.match(html, /video-art/);
  assert.match(html, /brand-art/);
  assert.match(html, /dashboard-art/);
  assert.doesNotMatch(html, /\/media\/cases\/(miniapp|crm-ai|dashboard)\.png/);
});

test("makes capabilities actionable and provides a reduced-motion fallback", async () => {
  const [response, css] = await Promise.all([
    render("/ru/creative"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const html = await response.text();
  assert.match(html, /class="capability-card" href="#contact"/);
  assert.match(html, /Узнаваемость/);
  assert.match(css, /@keyframes orbit-scan/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation: none !important/);
});

test("language switches retain the current service or portfolio in every locale", async () => {
  for (const locale of ["ru", "en", "zh-hans"]) {
    for (const section of ["creative", "products", "systems", "work"]) {
      const html = await (await render(`/${locale}/${section}`)).text();
      const header = html.match(/<header[\s\S]*?<\/header>/)?.[0];
      assert.ok(header, "The header is present in server-rendered HTML");
      for (const target of ["ru", "en", "zh-hans"]) {
        assert.match(header, new RegExp(`href="/${target}/${section}/"`));
      }
    }
  }
});

test("home titles do not duplicate the brand and skip links are localized", async () => {
  for (const [locale, skip] of [["ru", "Перейти к содержанию"], ["en", "Skip to content"], ["zh-hans", "跳转到主要内容"]]) {
    const html = await (await render(`/${locale}`)).text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    assert.equal((title.match(/CREAX/gi) ?? []).length, 1, title);
    assert.ok(html.includes(skip));
  }
});
