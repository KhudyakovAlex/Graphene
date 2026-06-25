<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'article' | 'aside' | 'div' | 'footer' | 'header' | 'main' | 'nav' | 'section'
}>(), {
  as: 'section',
})
</script>

<template>
  <component :is="as" class="g-panel">
    <slot />
  </component>
</template>

<style scoped>
.g-panel {
  padding: var(--g-panel-padding);
  border-radius: var(--g-panel-radius);
  background: var(--g-panel-surface);
}

@media (max-width: 760px) {
  .g-panel {
    padding: var(--g-panel-padding-mobile);
  }
}
</style>
