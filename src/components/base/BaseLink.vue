<script setup lang="ts">
import { computed } from 'vue'

type BaseLinkTarget = '_self' | '_blank' | '_parent' | '_top'

const props = withDefaults(
  defineProps<{
    href?: string
    target?: BaseLinkTarget
    rel?: string
    disabled?: boolean
  }>(),
  {
    href: '',
    target: '_self',
    rel: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tagName = computed(() => (props.disabled || !props.href ? 'span' : 'a'))

const resolvedRel = computed(() => {
  if (props.rel) {
    return props.rel
  }

  return props.target === '_blank' ? 'noopener noreferrer' : undefined
})

const linkAttrs = computed(() => {
  if (tagName.value !== 'a') {
    return {
      role: props.disabled ? 'link' : undefined,
      'aria-disabled': props.disabled || undefined,
    }
  }

  return {
    href: props.href,
    target: props.target,
    rel: resolvedRel.value,
  }
})

function handleClick(event: MouseEvent) {
  if (tagName.value !== 'a') {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <component
    :is="tagName"
    class="g-base-link"
    :class="{ 'g-base-link--disabled': disabled }"
    v-bind="linkAttrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style scoped>
.g-base-link {
  border-radius: var(--g-radius-none);
  color: var(--g-link-text);
  font: inherit;
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-decoration-thickness: var(--g-border-width-sm);
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.g-base-link:hover:not(.g-base-link--disabled) {
  color: var(--g-link-text-hover);
}

.g-base-link--disabled {
  cursor: not-allowed;
  opacity: var(--g-opacity-disabled);
  pointer-events: none;
}
</style>
