<script setup lang="ts">
interface PropertyListItem {
  key?: string
  label: string
  value: string
}

const props = defineProps<{
  items: PropertyListItem[]
}>()

function getItemKey(item: PropertyListItem, index: number) {
  return item.key ?? `${item.label}-${index}`
}
</script>

<template>
  <dl class="g-property-list">
    <div
      v-for="(item, index) in props.items"
      :key="getItemKey(item, index)"
      class="g-property-list__row"
    >
      <dt class="g-property-list__label">{{ item.label }}</dt>
      <dd class="g-property-list__value">{{ item.value }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.g-property-list {
  margin: 0;
}

.g-property-list__row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  column-gap: var(--g-property-list-column-gap);
  align-items: baseline;
  padding-block: var(--g-property-list-row-padding);
}

.g-property-list__row::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--g-border-width-sm);
  background: var(--g-property-list-divider);
}

.g-property-list__row:first-child {
  padding-top: 0;
}

.g-property-list__row:last-child::after {
  content: none;
}

.g-property-list__row:last-child {
  padding-bottom: 0;
}

.g-property-list__label,
.g-property-list__value {
  margin: 0;
  min-width: 0;
  word-break: break-word;
}

.g-property-list__label {
  color: var(--g-property-list-label);
  font-size: var(--g-property-list-label-size);
  line-height: var(--g-property-list-label-line-height);
  font-weight: var(--g-property-list-label-weight);
}

.g-property-list__value {
  color: var(--g-property-list-value);
  font-size: var(--g-property-list-value-size);
  line-height: var(--g-property-list-value-line-height);
  font-weight: var(--g-property-list-value-weight);
}

@media (max-width: 760px) {
  .g-property-list__row {
    grid-template-columns: 1fr;
    row-gap: var(--g-space-1);
    align-items: start;
  }
}
</style>
