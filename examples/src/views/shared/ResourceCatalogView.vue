<script setup lang="ts">
import { Panel } from '../../../../src/components'

type ResourceSection = {
  title: string
  description?: string
  items?: string[]
  status?: string
}

defineProps<{
  eyebrow: string
  title: string
  sourcePath: string
  description: string
  sections: ResourceSection[]
}>()
</script>

<template>
  <section class="catalog-view" :aria-labelledby="`${title}-title`">
    <Panel as="header" class="catalog-view__header">
      <div>
        <p class="catalog-view__eyebrow">{{ eyebrow }}</p>
        <h1 :id="`${title}-title`">{{ title }}</h1>
        <p class="catalog-view__description">{{ description }}</p>
      </div>

      <div class="catalog-view__path-block">
        <span class="catalog-view__path-label">Library path</span>
        <code class="catalog-view__path">{{ sourcePath }}</code>
      </div>
    </Panel>

    <Panel
      v-for="section in sections"
      :key="section.title"
      as="section"
      class="catalog-view__section"
      :aria-labelledby="`${title}-${section.title}`"
    >
      <div class="catalog-view__section-header">
        <h2 :id="`${title}-${section.title}`">{{ section.title }}</h2>
        <span v-if="section.status" class="catalog-view__status">{{ section.status }}</span>
      </div>

      <p v-if="section.description" class="catalog-view__section-description">
        {{ section.description }}
      </p>

      <ul v-if="section.items?.length" class="catalog-view__list">
        <li v-for="item in section.items" :key="item">
          <code>{{ item }}</code>
        </li>
      </ul>
    </Panel>
  </section>
</template>

<style scoped>
.catalog-view {
  display: grid;
  gap: var(--g-space-6);
}

.catalog-view__header {
  display: grid;
  gap: var(--g-space-4);
}

.catalog-view__eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.catalog-view__description,
.catalog-view__section-description {
  margin: 0;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}

.catalog-view__path-block {
  display: grid;
  gap: var(--g-space-1);
  padding: var(--g-space-4);
  background: var(--g-bg-base);
}

.catalog-view__path-label {
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-medium);
  text-transform: uppercase;
}

.catalog-view__path {
  color: var(--g-text-primary);
  font-family: var(--g-font-family-base);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.catalog-view__section {
  display: grid;
  gap: var(--g-space-4);
}

.catalog-view__section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--g-space-3);
}

.catalog-view__status {
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-medium);
  text-transform: uppercase;
}

.catalog-view__list {
  display: grid;
  gap: var(--g-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.catalog-view__list li {
  padding: var(--g-space-3);
  background: var(--g-bg-base);
}

h1,
h2 {
  margin: 0;
}

h1 {
  font-size: var(--g-font-size-32);
  line-height: var(--g-line-height-40);
  font-weight: var(--g-font-weight-semibold);
}

h2 {
  font-size: var(--g-font-size-24);
  line-height: var(--g-line-height-32);
  font-weight: var(--g-font-weight-semibold);
}
</style>
