<script setup lang="ts">
import Surface from './Surface.vue'

defineOptions({
  name: 'Panel',
})

withDefaults(defineProps<{
  as?: 'article' | 'aside' | 'div' | 'footer' | 'header' | 'main' | 'nav' | 'section'
}>(), {
  as: 'section',
})
</script>

<template>
  <Surface :as="as">
    <slot />
  </Surface>
</template>
