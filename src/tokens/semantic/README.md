# Semantic Tokens

Семантические токены описывают смысл использования значения в интерфейсе.

Например: основной текст, фон страницы, обычная граница, фон опасного действия.

Компоненты должны использовать семантические токены вместо базовых цветов и произвольных CSS-значений.

Светлая и темная темы задаются через значения семантических токенов.

`colors.css` содержит первые цветовые роли интерфейса:

- `--g-bg-base`
- `--g-bg-surface`
- `--g-text-primary`
- `--g-text-secondary`
- `--g-text-tertiary`
- `--g-link-text`
- `--g-link-text-hover`
- `--g-border-primary`
- `--g-border-secondary`
- `--g-action-primary-bg`
- `--g-action-primary-bg-hover`
- `--g-action-primary-text`
- `--g-action-primary-border`
- `--g-action-secondary-bg`
- `--g-action-secondary-bg-hover`
- `--g-action-secondary-text`
- `--g-action-secondary-border`
- `--g-checkbox-border`
- `--g-checkbox-border-hover`
- `--g-checkbox-mark`
- `--g-panel-surface`
- `--g-dialog-surface`
- `--g-dialog-title`
- `--g-dialog-section-title`
- `--g-dialog-text`
- `--g-dialog-close`
- `--g-dialog-close-hover-bg`
- `--g-dialog-divider`
- `--g-dialog-backdrop`
- `--g-switch-track`
- `--g-switch-track-hover`
- `--g-switch-track-border`
- `--g-switch-track-border-hover`
- `--g-switch-thumb`
- `--g-switch-icon`
- `--g-switch-track-checked`
- `--g-switch-track-checked-hover`
- `--g-switch-track-border-checked`
- `--g-switch-track-border-checked-hover`
- `--g-switch-thumb-checked`
- `--g-switch-icon-checked`
- `--g-field-bg`
- `--g-field-bg-hover`
- `--g-field-text`
- `--g-field-placeholder`
- `--g-field-helper`
- `--g-field-label`
- `--g-field-border`
- `--g-field-border-hover`
- `--g-field-border-focus`
- `--g-field-invalid`
- `--g-data-table-header-bg`
- `--g-data-table-row-bg`
- `--g-data-table-row-hover-bg`
- `--g-data-table-divider`
- `--g-data-table-header-text`
- `--g-data-table-cell-text`
- `--g-data-table-cell-text-muted`
- `--g-data-table-section-bg`
- `--g-data-table-section-text`
- `--g-data-table-section-divider`
- `--g-data-table-total-bg`
- `--g-data-table-total-text`
- `--g-data-table-total-text-muted`
- `--g-data-table-total-divider`

Текущий набор `--g-data-table-*` покрывает surface, divider, text и hover-состояние табличного семейства.
`DataGrid` поверх него может переиспользовать существующие `--g-field-*`, `--g-checkbox-*` и `--g-action-*` для toolbar и column controls, но отдельные semantic roles для active sort, resize handle и column visibility UI должны приходить из Pixso, а не придумываться в коде.
Для `DataTable` special rows `section` и `total` должны использовать собственные `--g-data-table-*` роли, а программная цветная подсветка строк должна считаться в runtime от `textColor`, а не через отдельный semantic token на каждый цвет.
- `--g-data-list-title`
- `--g-data-list-meta`
- `--g-data-list-supporting`
- `--g-data-list-divider`
- `--g-data-list-item-hover-bg`
- `--g-property-list-label`
- `--g-property-list-value`
- `--g-property-list-divider`

`size.css` содержит semantic size tokens:

- `--g-checkbox-size`
- `--g-radio-size`
- `--g-radio-mark-size`
- `--g-panel-padding`
- `--g-panel-padding-mobile`
- `--g-panel-radius`
- `--g-dialog-inset`
- `--g-dialog-inset-mobile`
- `--g-dialog-padding`
- `--g-dialog-gap`
- `--g-dialog-header-gap`
- `--g-dialog-footer-gap`
- `--g-form-dialog-gap`
- `--g-form-dialog-body-gap`
- `--g-form-dialog-section-gap`
- `--g-form-dialog-section-header-gap`
- `--g-form-grid-column-gap`
- `--g-form-grid-row-gap`
- `--g-switch-width`
- `--g-switch-height`
- `--g-switch-thumb-size`
- `--g-switch-icon-size`
- `--g-slider-track-height`
- `--g-slider-track-segment-width`
- `--g-slider-track-segment-height`
- `--g-slider-track-segment-gap`
- `--g-slider-thumb-width`
- `--g-slider-thumb-height`
- `--g-data-table-row-height`
- `--g-data-table-header-height`
- `--g-data-table-cell-padding-x`
- `--g-data-table-cell-padding-y`
- `--g-data-table-column-gap`
- `--g-data-table-divider-width`
- `--g-data-table-radius`
- `--g-data-table-row-tint-opacity`
- `--g-data-table-row-tint-hover-opacity`
- `--g-data-list-item-padding-x`
- `--g-data-list-item-padding-y`
- `--g-data-list-item-gap`
- `--g-data-list-content-gap`
- `--g-data-list-meta-gap`
- `--g-data-list-divider-width`
- `--g-data-list-item-radius`
- `--g-property-list-row-padding`
- `--g-property-list-column-gap`

`typography.css` содержит semantic typography tokens:

- `--g-data-table-header-size`
- `--g-data-table-header-line-height`
- `--g-data-table-header-weight`
- `--g-data-table-cell-size`
- `--g-data-table-cell-line-height`
- `--g-data-table-cell-weight`
- `--g-data-list-title-size`
- `--g-data-list-title-line-height`
- `--g-data-list-title-weight`
- `--g-data-list-meta-size`
- `--g-data-list-meta-line-height`
- `--g-data-list-meta-weight`
- `--g-data-list-supporting-size`
- `--g-data-list-supporting-line-height`
- `--g-data-list-supporting-weight`
- `--g-field-label-weight`
- `--g-property-list-label-size`
- `--g-property-list-label-line-height`
- `--g-property-list-label-weight`
- `--g-property-list-value-size`
- `--g-property-list-value-line-height`
- `--g-property-list-value-weight`
