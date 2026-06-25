<script setup lang="ts">
interface DataListItem {
  key?: string
  title: string
  supportingText?: string
  meta?: string
  trailing?: string
}

const props = defineProps<{
  items: DataListItem[]
}>()

function getItemKey(item: DataListItem, index: number) {
  return item.key ?? `${item.title}-${index}`
}
</script>

<template>
  <ul class="g-data-list">
    <li
      v-for="(item, index) in props.items"
      :key="getItemKey(item, index)"
      class="g-data-list__row"
    >
      <div class="g-data-list__item">
        <div class="g-data-list__content">
          <p class="g-data-list__title">{{ item.title }}</p>
          <p v-if="item.supportingText" class="g-data-list__supporting">{{ item.supportingText }}</p>
        </div>

        <div v-if="item.meta || item.trailing" class="g-data-list__aside">
          <p v-if="item.meta" class="g-data-list__meta">{{ item.meta }}</p>
          <p v-if="item.trailing" class="g-data-list__meta">{{ item.trailing }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.g-data-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.g-data-list__row {
  position: relative;
}

.g-data-list__row::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--g-data-list-divider-width);
  background: var(--g-data-list-divider);
}

.g-data-list__row:last-child::after {
  content: none;
}

.g-data-list__item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--g-data-list-item-gap);
  align-items: start;
  padding: var(--g-data-list-item-padding-y) var(--g-data-list-item-padding-x);
  border-radius: var(--g-data-list-item-radius);
}

.g-data-list__item:hover {
  background: var(--g-data-list-item-hover-bg);
}

.g-data-list__content,
.g-data-list__aside {
  display: grid;
  min-width: 0;
}

.g-data-list__content {
  gap: var(--g-data-list-content-gap);
}

.g-data-list__aside {
  gap: var(--g-data-list-meta-gap);
  justify-items: end;
}

.g-data-list__title,
.g-data-list__supporting,
.g-data-list__meta {
  margin: 0;
  min-width: 0;
  word-break: break-word;
}

.g-data-list__title {
  color: var(--g-data-list-title);
  font-size: var(--g-data-list-title-size);
  line-height: var(--g-data-list-title-line-height);
  font-weight: var(--g-data-list-title-weight);
}

.g-data-list__supporting {
  color: var(--g-data-list-supporting);
  font-size: var(--g-data-list-supporting-size);
  line-height: var(--g-data-list-supporting-line-height);
  font-weight: var(--g-data-list-supporting-weight);
}

.g-data-list__meta {
  color: var(--g-data-list-meta);
  font-size: var(--g-data-list-meta-size);
  line-height: var(--g-data-list-meta-line-height);
  font-weight: var(--g-data-list-meta-weight);
}

@media (max-width: 760px) {
  .g-data-list__item {
    grid-template-columns: 1fr;
  }

  .g-data-list__aside {
    justify-items: start;
  }
}
</style>
