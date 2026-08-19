<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'article' | 'aside' | 'div' | 'footer' | 'header' | 'main' | 'nav' | 'section'
}>(), {
  as: 'section',
})
</script>

<template>
  <component :is="as" class="g-surface">
    <slot />
  </component>
</template>

<style scoped>
.g-surface {
  padding: var(--g-surface-padding);
  border-radius: var(--g-surface-radius);
  background: var(--g-surface-surface);
}

@media (max-width: 760px) {
  .g-surface {
    padding: var(--g-surface-padding-mobile);
  }
}
</style>
