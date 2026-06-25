<script setup lang="ts">
import { Panel } from '../../../../src/components'
</script>

<template>
  <section class="layout-page" aria-labelledby="layoutTitle">
    <Panel as="header" class="layout-page__header">
      <div>
        <p class="layout-page__eyebrow">Components</p>
        <h1 id="layoutTitle">Layout</h1>
        <p class="layout-page__description">
          Структурные контейнеры из <code>src/components/layout/</code>. Сейчас в разделе есть
          базовый <code>Panel</code> для поверхностей, секций и рабочих областей.
        </p>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="panelTitle">
      <div>
        <h2 class="component-preview__title" id="panelTitle">Panel</h2>
      </div>

      <p class="text-preview">
        Panel задает типовую поверхность Graphene: фон секции, прямоугольную форму и адаптивные
        внутренние отступы.
      </p>

      <div class="preview-grid">
        <Panel as="article" class="nested-panel">
          <span class="nested-panel__eyebrow">Section</span>
          <strong>Сводка по объекту</strong>
          <p>Подходит для карточек, боксов настроек, групп полей и обзорных секций.</p>
        </Panel>

        <Panel as="article" class="nested-panel">
          <span class="nested-panel__eyebrow">Workspace</span>
          <strong>Рабочая область</strong>
          <p>Компонент можно использовать с любым семантическим тегом через проп <code>as</code>.</p>
        </Panel>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="usageTitle">
      <div>
        <h2 class="component-preview__title" id="usageTitle">Usage Notes</h2>
      </div>

      <div class="usage-list" role="list">
        <div class="usage-item" role="listitem">
          Используй <code>Panel</code> вместо локального повторения одинакового surface-стиля в
          <code>examples</code> и приложениях.
        </div>
        <div class="usage-item" role="listitem">
          Для структуры документа выбирай подходящий тег через <code>as</code>: <code>section</code>,
          <code>header</code>, <code>aside</code>, <code>article</code>.
        </div>
        <div class="usage-item" role="listitem">
          Panel не добавляет бизнес-логики и не подменяет специализированные layout-компоненты вроде
          будущего <code>AppShell</code>.
        </div>
      </div>
    </Panel>
  </section>
</template>

<style scoped>
.layout-page {
  display: grid;
  gap: var(--g-space-6);
}

.layout-page__eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.layout-page__description,
.text-preview,
.nested-panel p {
  margin: 0;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}

.component-preview {
  display: grid;
  gap: var(--g-space-4);
}

.component-preview__title,
h1 {
  margin: 0;
  font-weight: var(--g-font-weight-semibold);
}

h1 {
  font-size: var(--g-font-size-32);
  line-height: var(--g-line-height-40);
}

.component-preview__title {
  font-size: var(--g-font-size-24);
  line-height: var(--g-line-height-32);
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--g-space-4);
}

.nested-panel {
  display: grid;
  gap: var(--g-space-2);
  background: var(--g-bg-base);
}

.nested-panel strong {
  color: var(--g-text-primary);
  font-size: var(--g-font-size-18);
  line-height: var(--g-line-height-28);
  font-weight: var(--g-font-weight-semibold);
}

.nested-panel__eyebrow {
  color: var(--g-text-accent);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-medium);
  text-transform: uppercase;
}

.usage-list {
  display: grid;
  gap: var(--g-space-3);
}

.usage-item {
  padding: var(--g-space-4);
  color: var(--g-text-secondary);
  background: var(--g-bg-base);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

@media (max-width: 760px) {
  .preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
