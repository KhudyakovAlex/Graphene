# Graphene Package Readiness Plan

## Цель

Подготовить существующую Graphene к безопасному использованию из другого Vue-репозитория без добавления новых компонентов.

Итог первого релиза:

- библиотека устанавливается из GitHub по version tag;
- компоненты импортируются через единый публичный API;
- глобальные стили, токены и локальные ассеты поставляются вместе с пакетом;
- Vue остается `peerDependency`;
- типы, lint, тесты, сборка и CI проверяются одной командой;
- процесс установки и выпуска описан в документации.

## Границы Работы

В рамках плана:

- упаковка и сборка библиотеки;
- инженерные проверки и CI;
- тесты существующих компонентов;
- исправление дефектов, обнаруженных проверками;
- документация использования и релизов.

Вне рамок:

- новые компоненты;
- визуальный редизайн;
- ручное создание или перепривязка semantic tokens;
- бизнес-логика конкретного приложения;
- публикация в публичный npm.

## Зафиксированные Решения

- Первый канал доставки: GitHub dependency по immutable version tag.
- Имя пакета: `@graphene/core`.
- Поддерживаемая версия Vue: `^3.5.0`.
- Формат тегов: `vMAJOR.MINOR.PATCH`; первый планируемый тег — `v0.1.0`.
- На первом этапе `dist/` библиотеки хранится в Git, чтобы consumer не собирал Graphene при установке.
- Позже можно перейти на GitHub Packages без изменения публичного API.
- Формат модулей: ESM.
- Vue не включается в bundle.
- Стили подключаются отдельным публичным CSS entrypoint.
- IBM Plex Sans поставляется с пакетом по SIL Open Font License 1.1; текст лицензии хранится рядом со шрифтами.
- Временные файлы `.pixso-temp/` не являются частью проекта.

## Текущее Состояние

- Корневой npm workspace, scripts и ESM library build настроены.
- Зависимости и единый lockfile управляются из корня.
- Публичный JS/TS API начинается с `src/index.ts`.
- Публичный CSS entrypoint доступен как `@graphene/core/styles.css`.
- `src/styles/base.css` импортирует токены и `fonts.css`.
- `fonts.css` ссылается на два TTF-файла; оба файла существуют и отслеживаются Git.
- Все 902 SVG-иконки поставляются через публичный путь `@graphene/core/icons/*`.
- Настроены typecheck, ESLint, component tests и GitHub Actions CI.
- `examples/dist/` — bundle витрины, не bundle библиотеки.
- `.pixso-temp/` исключен через `.gitignore`.

## Правила Выполнения

1. Выполнять шаги по порядку, если у шага не указано иное.
2. Перед началом читать `AGENTS.md`, этот план и `docs/ai/development-guide.md`.
3. Не считать шаг завершенным без перечисленных проверок.
4. После завершения менять `[ ]` на `[x]` и добавлять запись в журнал передачи.
5. При блокере оставить шаг незавершенным и описать точное решение, которое требуется от владельца.
6. Не затрагивать новые компоненты и дизайн-токены.
7. Не включать `.pixso-temp/` в изменения.

## Шаг 1. Зафиксировать Контракт Пакета И Очистить Границы

Статус: [x]

Зависимости: нет.

Работы:

- зафиксировать решения из раздела выше;
- добавить `.pixso-temp/` в `.gitignore`;
- подтвердить лицензию и включение существующих файлов IBM Plex Sans в публичную поставку пакета;
- записать package name, Vue range и tag format в этом плане.

Артефакты:

- обновленный `.gitignore`;
- подтвержденная политика поставки шрифтов;
- `src/assets/fonts/LICENSE-OFL.txt`;
- окончательные package name, Vue range и tag format.

Проверка:

- `git status` не показывает `.pixso-temp/`;
- все URL из `src/styles/fonts.css` указывают на существующие tracked-файлы;
- лицензия разрешает поставку шрифтов вместе с программным обеспечением.

## Шаг 2. Создать Корневой npm Package

Статус: [x]

Зависимости: шаг 1.

Работы:

- создать root `package.json`;
- создать единый lockfile в корне;
- перенести управление инструментами разработки в корень;
- при необходимости оформить `examples` как npm workspace;
- указать `type`, `files`, `exports`, `main`, `module`, `types`, `sideEffects`;
- объявить Vue в `peerDependencies` и в dev dependencies для разработки;
- добавить scripts: `build`, `typecheck`, `lint`, `test`, `test:run`, `check`, `pack:check`;
- не добавлять runtime dependencies без необходимости.

Артефакты:

- `package.json`;
- корневой `package-lock.json`;
- согласованная workspace-структура.

Проверка:

- `npm ci` выполняется из корня;
- `npm ls vue` показывает одну совместимую версию;
- scripts видны через `npm run`.

## Шаг 3. Создать Публичный API И Library Build

Статус: [x]

Зависимости: шаг 2.

Работы:

- создать `src/index.ts`, экспортирующий только поддерживаемый API;
- сохранить существующие component barrel files;
- создать отдельный публичный CSS entrypoint;
- настроить Vite library mode для ESM;
- исключить Vue из bundle;
- генерировать `.d.ts` для TypeScript consumers;
- корректно копировать или встраивать разрешенные fonts/assets;
- настроить очищаемый root `dist/`;
- не смешивать root `dist/` с `examples/dist/`.

Ожидаемые package exports:

- `@graphene/core`;
- `@graphene/core/styles.css`;
- `@graphene/core/icons/*.svg`;
- `@graphene/core/icons/others/*.svg`.

Проверка:

- production build проходит из чистой установки;
- в JS bundle нет второй копии Vue;
- CSS содержит токены и компонентные стили;
- font URLs разрешаются внутри установленного пакета;
- `.d.ts` описывают props, emits и экспортируемые типы.

## Шаг 4. Проверить Реальную Установку Пакета

Статус: [x]

Зависимости: шаг 3.

Работы:

- выполнить `npm pack`;
- установить полученный tarball в минимальное внешнее Vue/Vite-приложение;
- импортировать CSS и несколько репрезентативных компонентов;
- проверить светлую и темную темы;
- проверить production build consumer-приложения;
- проверить, что package tarball не содержит docs, Pixso temp, examples sources и прочий мусор;
- после tarball-проверки проверить установку непосредственно по Git reference.

Минимальный smoke-набор:

- `BaseButton`;
- `BaseInput`;
- `DataTable`;
- `BaseDialog`;
- `Surface`.

Проверка:

- `npm run pack:check` завершается успешно;
- consumer dev/build работают;
- Vue не дублируется;
- стили, токены и локальные ассеты загружаются без 404;
- установка не требует ручных импортов из `src/`.

## Шаг 5. Добавить Статические Проверки

Статус: [x]

Зависимости: шаг 2; можно выполнять параллельно с шагом 4 после стабилизации package scripts.

Работы:

- настроить `vue-tsc` typecheck;
- настроить ESLint для Vue 3 и TypeScript;
- добавить форматирование только если оно не создает массовый несвязанный diff;
- исключить generated directories;
- исправить реальные ошибки без визуального рефакторинга компонентов.

Проверка:

- `npm run typecheck`;
- `npm run lint`;
- команды охватывают `src/`, build config, tests и `examples/src/`.

## Шаг 6. Добавить Component Tests

Статус: [x]

Зависимости: шаги 2 и 3.

Работы:

- настроить Vitest, Vue Test Utils и DOM environment;
- добавить smoke test на каждый экспортируемый компонент;
- для интерактивных компонентов проверить основные props, emits и disabled state;
- для диалогов проверить open/close, confirm/cancel/submit;
- для data-компонентов проверить рендер строк, slots и ключевые интеракции;
- проверять публичное поведение, а не внутреннюю разметку;
- не вводить обязательный высокий coverage threshold на первом релизе.

Проверка:

- `npm run test:run`;
- нет зависших timers, console errors и flaky tests;
- каждый публичный компонент покрыт хотя бы одним тестом.

## Шаг 7. Добавить CI

Статус: [x]

Зависимости: шаги 3, 5 и 6.

Работы:

- добавить GitHub Actions workflow для push и pull request;
- использовать поддерживаемую LTS-версию Node;
- выполнить `npm ci`;
- выполнить `npm run check`;
- выполнить library build и `npm run pack:check`;
- при необходимости отдельно проверить build витрины;
- включить npm cache без хранения собранных артефактов как источник истины.

Проверка:

- workflow проходит на чистом runner;
- ошибки typecheck, lint, tests или build блокируют job;
- CI не требует Pixso и внешних runtime-ресурсов.

## Шаг 8. Документировать Использование И Релиз

Статус: [x]

Зависимости: шаги 4 и 7.

Работы:

- добавить корневой `README.md`;
- описать установку по Git tag;
- описать imports компонентов и CSS без ссылок на внутренний `src/`;
- описать `data-theme="light|dark"`;
- обновить `docs/ai/usage-guide.md`;
- описать release checklist;
- ввести `CHANGELOG.md` и SemVer;
- заменить старые инструкции прямого импорта из `src/` там, где речь идет о consumer-приложении.

Проверка:

- новый разработчик может установить пакет только по README;
- AI usage guide использует публичные package exports;
- документация различает library build и offline-витрину.

## Шаг 9. Выпустить И Подключить Первый Tag

Статус: [x]

Зависимости: шаг 8.

Работы:

- выполнить полный `npm run check`;
- пересобрать root `dist/` и при необходимости `examples/dist/`;
- проверить содержимое `npm pack`;
- обновить версию и changelog;
- создать commit и tag только по явному запросу владельца;
- установить tag в целевом приложении;
- выполнить dev/build и ручной smoke test целевого приложения.

Проверка:

- consumer использует immutable tag, а не branch;
- приложение не импортирует файлы из внутреннего `src/`;
- приложение работает без внешних CDN и runtime-загрузок;
- зафиксирована точная проверенная версия Graphene.

## Шаг 10. Опубликовать Библиотеку SVG-Иконок

Статус: [x]

Зависимости: шаг 9.

Работы:

- копировать основной и резервный наборы SVG в library `dist/`;
- открыть публичный asset export `@graphene/core/icons/*`;
- сохранить стабильные имена и вложенный путь `others/*`;
- документировать URL-импорты без копирования SVG в consumer-репозиторий;
- проверить, что production build включает только импортированные иконки.

Проверка:

- `npm run check`;
- `npm run build`;
- `npm run icons:check`;
- `npm run pack:check`;
- package содержит все 902 SVG, dev-импорты разрешаются, а тестовый production build с двумя импортами выпускает два SVG.

## Definition Of Done

- [x] Graphene устанавливается из другого репозитория по version tag.
- [x] Есть единый публичный JS/TS API.
- [x] Есть документированный CSS entrypoint.
- [x] Типы доступны consumer-проекту.
- [x] Vue не дублируется в bundle.
- [x] Fonts/assets доступны offline.
- [x] Основной и резервный наборы SVG доступны через публичный package export.
- [x] `npm ci && npm run check && npm run build` проходят из корня.
- [x] Все публичные компоненты имеют smoke tests.
- [x] CI выполняет те же проверки.
- [x] README и AI usage guide соответствуют package API.
- [x] Первый tag проверен в реальном приложении.

## Журнал Передачи

Добавлять запись после каждого рабочего сеанса:

### 2026-08-19 — шаг 1

- Выполнено: зафиксированы `@graphene/core`, Vue `^3.5.0`, теги `vMAJOR.MINOR.PATCH`, GitHub tags как первый канал доставки и политика поставки IBM Plex Sans.
- Измененные файлы: `.gitignore`, `src/assets/fonts/LICENSE-OFL.txt`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: TTF-файлы существуют и отслеживаются Git; `.pixso-temp/` исключен; лицензия сверена с официальным репозиторием IBM Plex.
- Осталось: шаг 2 — корневой npm package.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 2

- Выполнено: создан `@graphene/core` root package, `examples` подключен как workspace, зависимости и scripts перенесены под управление корня.
- Измененные файлы: `package.json`, `package-lock.json`, `examples/package-lock.json` (удален), `tsconfig.json`, `env.d.ts`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: `npm ci`; `npm ls vue` показывает одну Vue 3.5.41; доступен полный набор root scripts; в репозитории один lockfile.
- Осталось: шаг 3 — публичный API и library build.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 3

- Выполнено: добавлены публичный JS/TS API, отдельный CSS entrypoint, ESM library build с external Vue, декларациями и встроенными локальными шрифтами.
- Измененные файлы: `src/index.ts`, `src/styles/index.ts`, `vite.config.ts`, `dist/`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: `npm ci`; `npm run build`; Vue остается внешним импортом; CSS содержит токены и компонентные стили; оба шрифта встроены; декларации содержат props, emits, slots и публичные типы.
- Осталось: шаг 4 — проверить реальную установку пакета. `npm run typecheck` пока выявляет настройки будущего шага 5: ES2020 для `Array.at` и отсутствие Node types.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 4

- Выполнено: tarball и пакет из Git commit установлены в отдельное Vue/Vite-приложение; через публичные exports подключены CSS, `BaseButton`, `BaseInput`, `DataTable`, `BaseDialog` и `Surface`; добавлено переключение светлой/темной темы.
- Измененные файлы: `PACKAGE_READINESS_PLAN.md`; временное consumer-приложение создано вне репозитория.
- Проверки: `npm run pack:check`; tarball содержит только package metadata и `dist/`; установка из commit `c9fbfc7f9471c6b6fa4179bf8ff166d512980310`; consumer typecheck, production build и dev server; публичные ресурсы отвечают HTTP 200; `npm ls` показывает одну Vue 3.5.41; шрифты встроены в CSS.
- Осталось: шаг 5 — статические проверки.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 5

- Выполнено: настроены ESLint для Vue 3 и TypeScript и полный `vue-tsc` typecheck; исключены generated directories; исправлены найденные ошибки ключей `v-for`, неиспользуемого props-binding и общего состояния диалогов.
- Измененные файлы: `eslint.config.js`, `package.json`, `package-lock.json`, `tsconfig.json`, `src/components/data/DataGrid.vue`, `src/components/feedback/BaseDialog.vue`, `src/components/feedback/ConfirmDialog.vue`, `src/components/feedback/FormDialog.vue`, `dist/`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: чистый `npm ci`; `npm run typecheck`; `npm run lint`; `npm run build`.
- Осталось: шаг 6 — component tests.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 6

- Выполнено: настроены Vitest с jsdom и Vue Test Utils; добавлены smoke- и behavioral-тесты всех 17 публичных компонентов, включая props, emits, disabled states, диалоги, slots и ключевые интеракции data-компонентов.
- Измененные файлы: `vitest.config.ts`, `tests/setup.ts`, `tests/base.spec.ts`, `tests/data.spec.ts`, `tests/feedback.spec.ts`, `tests/layout.spec.ts`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: `npm run test:run` — 17 тестов в 4 файлах; `npm run check`; нет зависших timers, console errors/warnings и flaky failures.
- Осталось: шаг 7 — GitHub Actions CI.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 7

- Выполнено: добавлен GitHub Actions workflow для push и pull request на Node.js 24 LTS с npm cache, чистой установкой, полными проверками, сборкой библиотеки, проверкой tarball и сборкой offline-витрины.
- Измененные файлы: `.github/workflows/ci.yml`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: `npm ci`; `npm run check` — 17 тестов в 4 файлах; `npm run build`; `npm run pack:check`; `npm run examples:build`.
- Осталось: шаг 8 — документация использования и релиза.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 8

- Выполнено: добавлены consumer README, SemVer changelog и release checklist; AI usage guide переведен на публичные package exports; документация разделяет library package и offline-витрину.
- Измененные файлы: `README.md`, `CHANGELOG.md`, `docs/ai/usage-guide.md`, `docs/human/graphene-for-beginners.md`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: README содержит установку по immutable tag, публичные imports, CSS и темы; consumer-инструкции не требуют импортов из `src/`; `npm run pack:check` включает README и root `dist/`.
- Осталось: шаг 9 — выпуск и проверка первого тега.
- Блокеры/решения владельца: для шага 9 нужны явные команды на release commit и tag.

### 2026-08-19 — шаг 9, подготовка релиза

- Выполнено: версия пакета и lockfile обновлены до `0.1.0`; изменения перенесены из `Unreleased` в секцию `0.1.0`; пересобраны library bundle и offline-витрина.
- Измененные файлы: `package.json`, `package-lock.json`, `CHANGELOG.md`, `examples/dist/`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: чистый `npm ci`; `npm run check` — 17 тестов в 4 файлах; `npm run build`; `npm run pack:check` — 31 файл без docs, examples sources и `.pixso-temp/`; `npm run examples:build`.
- Осталось: создать release commit и tag `v0.1.0`, установить tag во внешнем Vue-приложении и выполнить consumer smoke test.
- Блокеры/решения владельца: требуется явное разрешение владельца на создание release commit и tag `v0.1.0`.

### 2026-08-19 — шаг 9, выпуск

- Выполнено: создан и отправлен release commit `9b93d70`; создан и отправлен immutable tag `v0.1.0`; tag установлен во внешнем Vue/Vite-приложении.
- Измененные файлы: `PACKAGE_READINESS_PLAN.md`; во внешнем consumer-приложении обновлены package metadata.
- Проверки: consumer разрешает `v0.1.0` в commit `9b93d708a1ad27d4f5b9f79fde3192b256d7b895`; typecheck и production build успешны; используется одна Vue 3.5.41; dev server и публичные модули отвечают HTTP 200.
- Осталось: нет, план подготовки первого package release завершен.
- Блокеры/решения владельца: нет.

### 2026-08-19 — шаг 10

- Выполнено: версия подготовлена как `0.3.0`; все 902 SVG из основного и резервного наборов добавлены в package с публичным export `@graphene/core/icons/*`; добавлена автоматическая проверка consumer production build.
- Измененные файлы: `package.json`, `package-lock.json`, `vite.config.ts`, `dist/assets/icons/`, `tests/assets.spec.ts`, `scripts/check-package-icons.mjs`, `README.md`, `CHANGELOG.md`, `docs/ai/development-guide.md`, `docs/ai/usage-guide.md`, `PACKAGE_READINESS_PLAN.md`.
- Проверки: `npm run check` — 26 тестов в 5 файлах; `npm run build`; `npm run icons:check` — 902 package SVG, успешный dev resolve и только 2 импортированных SVG в production output; `npm run pack:check` — 934 файла, 1.2 MB.
- Осталось: создать release commit и tag `v0.3.0` только по явному запросу владельца, затем установить tag в Dominion.
- Блокеры/решения владельца: для выпуска требуется явное разрешение на commit и tag `v0.3.0`.

### YYYY-MM-DD — шаг N

- Выполнено:
- Измененные файлы:
- Проверки:
- Осталось:
- Блокеры/решения владельца:
