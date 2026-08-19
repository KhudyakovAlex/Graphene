# Graphene

Offline-first дизайн-система Vue 3 для приложений организации.

## Требования

- Vue `^3.5.0`;
- Node.js `>=20.19.0` для установки и сборки;
- ESM-проект.

## Установка

Graphene устанавливается из GitHub только по immutable version tag:

```sh
npm install "github:KhudyakovAlex/Graphene#v0.1.0"
```

Не устанавливайте пакет из ветки `main`: содержимое ветки может измениться без изменения ссылки зависимости.

Для приватного репозитория среда установки должна иметь доступ к GitHub по HTTPS или SSH.

## Использование

Подключите глобальные стили один раз в точке входа приложения:

```ts
import '@graphene/core/styles.css'
```

Импортируйте компоненты и типы только из публичного API:

```ts
import {
  BaseButton,
  BaseDialog,
  BaseInput,
  DataTable,
  Panel,
  type DataTableColumn,
} from '@graphene/core'
```

Публичные entrypoints:

- `@graphene/core` — Vue-компоненты и TypeScript-типы;
- `@graphene/core/styles.css` — токены, глобальные стили и локальный IBM Plex Sans.

Не импортируйте файлы из `@graphene/core/src/` или `@graphene/core/dist/`: внутренние пути не являются публичным контрактом.

## Темы

Задайте тему на корневом HTML-элементе:

```html
<html data-theme="light">
```

Поддерживаются `data-theme="light"` и `data-theme="dark"`. Для переключения темы изменяйте `document.documentElement.dataset.theme`.

## Offline-режим

CSS и IBM Plex Sans поставляются внутри пакета. Graphene не требует CDN или загрузки runtime-ресурсов из публичного интернета.

## Разработка

```sh
npm ci
npm run check
npm run build
npm run pack:check
```

Корневой `dist/` — устанавливаемый bundle библиотеки. `examples/dist/` — отдельный bundle offline-витрины и не входит в npm package.

## Версионирование

Проект использует SemVer:

- PATCH — совместимые исправления;
- MINOR — новые обратно совместимые возможности;
- MAJOR — несовместимые изменения публичного API.

Теги имеют формат `vMAJOR.MINOR.PATCH`. Изменения до выпуска записываются в секцию `Unreleased` файла `CHANGELOG.md`.

## Release Checklist

1. Выбрать следующую SemVer-версию и перенести изменения из `Unreleased` в секцию этой версии.
2. Обновить `version` в `package.json` и lockfile.
3. Выполнить `npm ci`, `npm run check`, `npm run build` и `npm run pack:check`.
4. Если менялась витрина, выполнить `npm run examples:build`.
5. Проверить tarball: только package metadata, `README.md` и root `dist/`; без docs, исходников examples и `.pixso-temp/`.
6. Зафиксировать version, changelog и актуальный root `dist/` одним release commit.
7. Только по явному решению владельца создать и отправить тег `vMAJOR.MINOR.PATCH`.
8. Установить точный тег во внешнем Vue-приложении и проверить typecheck, production build, темы и offline-ресурсы.
