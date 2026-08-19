# Changelog

Все значимые изменения Graphene фиксируются в этом файле.

Проект следует Semantic Versioning. До первого стабильного релиза несовместимые изменения могут выпускаться в MINOR-версиях и должны быть явно описаны.

## Unreleased

## 0.2.0 - 2026-08-19

### Changed

- Layout-компонент `Panel` переименован в `Surface`; новый публичный API использует `Surface`, а `Panel` временно сохранен как deprecated-алиас для обратной совместимости.
- Семантические tokens layout-surface переименованы с `--g-panel-*` на `--g-surface-*`; класс компонента обновлен с `g-panel` на `g-surface`.

## 0.1.1 - 2026-08-19

### Fixed

- Прокидывание consumer attrs в нативные controls базовых полей и связанных form-controls, чтобы `name`, `form`, `required`, `aria-*` и `data-*` применялись к реальному `input` / `textarea` / `select`.

## 0.1.0 - 2026-08-19

### Added

- Публичный ESM API пакета `@graphene/core`.
- Отдельный CSS entrypoint с токенами, компонентными стилями и локальным IBM Plex Sans.
- TypeScript declarations для компонентов и публичных типов.
- Статические проверки, component tests и GitHub Actions CI.
- Проверка установки tarball и Git reference во внешнем Vue-приложении.
