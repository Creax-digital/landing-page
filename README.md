# CREAX.digital

Многоязычный сайт агентства: AI-контент, digital-продукты и автоматизация бизнеса.

Основной сценарий публикации — **GitHub Pages на https://creax.digital/**. На хостинг отправляются только готовые файлы; Node.js, база данных и сервер приложений не нужны.

Подробная инструкция: [GITHUB-PAGES.md](GITHUB-PAGES.md). Технический отчёт: [STATIC-QA.md](STATIC-QA.md).

## Статическая сборка

Node.js 24 и pnpm 11.19.0; точные зависимости закреплены в `pnpm-lock.yaml`.

```bash
pnpm install --frozen-lockfile
pnpm run check:static
pnpm run preview:static
```

Готовая папка для публикации: `dist/github-pages/`. Просмотр: http://127.0.0.1:4173/ru/.
Не открывайте `index.html` двойным щелчком: адреса рассчитаны на HTTP-хостинг.

`check:static` выполняет линтер, проверку типов, сборку и тесты готового сайта. `build:static` — только сборку; `test:static` — проверку последней статической сборки. Все команды запускаются из корня проекта.

`.github/workflows/pages.yml` проверяет pull request, а после изменений в `main` собирает и публикует только `dist/github-pages/`. Сначала настройте Pages по инструкции. Для GitHub-сборки не нужны секреты Sites или `.openai/hosting.json`.

## Структура

- `/` — выбор языка; предпочтение браузера предлагается, а не навязывается по IP.
- `/ru/`, `/en/`, `/zh-hans/` — главные страницы.
- `/:locale/creative/` — AI-контент.
- `/:locale/products/` — сайты, web apps, Telegram Mini Apps.
- `/:locale/systems/` — дашборды, CRM и AI-автоматизация.
- `/:locale/work/` — работы.
- `/404.html`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/manifest.webmanifest` — служебные файлы.

Тексты — `lib/site-content.ts`; основные реквизиты — `lib/site-config.ts`; SEO — `lib/metadata.ts` и `components/json-ld.tsx`; внешний вид — `app/globals.css`.

Изображения разных размеров создаются автоматически из оригиналов. `public/optimized/` и `dist/` — генерируемые каталоги, их не нужно коммитить или редактировать вручную. Новые публичные ресурсы добавляйте в список `publicAssets` в `scripts/prepare-static.mjs`; тесты не пропустят отсутствующее изображение или ссылку.

## Дополнительный серверный вариант

Сохранён для существующего проекта Sites, где уже есть `.openai/hosting.json`:

```bash
pnpm run dev
pnpm run test
```

`build`/`test` и `build:static` используют общий временный каталог `dist/`. После проверки серверного варианта заново выполните `check:static` перед публикацией на GitHub. Серверная сборка не является артефактом Pages.
