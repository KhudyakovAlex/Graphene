<script setup lang="ts">
import { computed, ref } from 'vue'

import { BaseButton } from '../../../src/components'

type IconItem = {
  name: string
  svg: string
}

const iconModules = import.meta.glob('../../../src/assets/icons/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const otherIconModules = import.meta.glob('../../../src/assets/icons/others/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const showOtherIcons = ref(false)
const copiedIconName = ref('')

const icons = modulesToIcons(iconModules)
const otherIcons = modulesToIcons(otherIconModules)

const visibleOtherIcons = computed(() => (showOtherIcons.value ? otherIcons : []))

function modulesToIcons(modules: Record<string, string>): IconItem[] {
  return Object.entries(modules)
    .map(([path, svg]) => ({
      name: path.split('/').at(-1) ?? path,
      svg,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

async function copyIconName(name: string) {
  try {
    await navigator.clipboard.writeText(name)
  } catch {
    const field = document.createElement('textarea')
    field.value = name
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.append(field)
    field.select()
    document.execCommand('copy')
    field.remove()
  }

  copiedIconName.value = name
  window.setTimeout(() => {
    if (copiedIconName.value === name) {
      copiedIconName.value = ''
    }
  }, 1600)
}
</script>

<template>
  <section class="icons-page" aria-labelledby="iconsTitle">
    <div class="icons-page__header">
      <div>
        <p class="icons-page__eyebrow">Assets</p>
        <h1 id="iconsTitle">Иконки Graphene</h1>
        <p class="icons-page__description">
          Иконки загружаются из <code>src/assets/icons/</code>. Нажатие на карточку копирует имя файла.
        </p>
      </div>

      <BaseButton
        v-if="!showOtherIcons"
        type="button"
        @click="showOtherIcons = true"
      >
        Еще
      </BaseButton>
    </div>

    <section class="icons-section" aria-labelledby="mainIconsTitle">
      <div class="icons-section__header">
        <h2 id="mainIconsTitle">Основной набор</h2>
        <span>{{ icons.length }} SVG</span>
      </div>

      <div class="icon-grid">
        <button
          v-for="icon in icons"
          :key="icon.name"
          class="icon-card"
          :class="{ 'icon-card--copied': copiedIconName === icon.name }"
          type="button"
          :aria-label="`Скопировать ${icon.name}`"
          @click="copyIconName(icon.name)"
        >
          <span class="icon-card__preview" v-html="icon.svg" />
          <span v-if="copiedIconName === icon.name" class="icon-card__status">Имя файла скопировано</span>
        </button>
      </div>
    </section>

    <section
      v-if="showOtherIcons"
      class="icons-section"
      aria-labelledby="otherIconsTitle"
    >
      <div class="icons-section__header">
        <h2 id="otherIconsTitle">Большой набор</h2>
        <span>{{ visibleOtherIcons.length }} SVG</span>
      </div>

      <div class="icon-grid">
        <button
          v-for="icon in visibleOtherIcons"
          :key="icon.name"
          class="icon-card"
          :class="{ 'icon-card--copied': copiedIconName === icon.name }"
          type="button"
          :aria-label="`Скопировать ${icon.name}`"
          @click="copyIconName(icon.name)"
        >
          <span class="icon-card__preview" v-html="icon.svg" />
          <span v-if="copiedIconName === icon.name" class="icon-card__status">Имя файла скопировано</span>
        </button>
      </div>
    </section>
  </section>
</template>

<style scoped>
.icons-page {
  display: grid;
  gap: var(--g-space-6);
}

.icons-page__header,
.icons-section {
  padding: var(--g-space-8);
  border-radius: var(--g-radius-none);
  background: var(--g-bg-surface);
}

.icons-page__header {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-between;
  gap: var(--g-space-4);
}

.icons-page__eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

h1,
h2,
p {
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

.icons-page__description {
  max-width: 720px;
  margin-top: var(--g-space-3);
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}

.icons-section {
  display: grid;
  gap: var(--g-space-4);
}

.icons-section__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--g-space-3);
  color: var(--g-text-secondary);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: var(--g-space-2);
}

.icon-card {
  position: relative;
  min-height: var(--g-size-touch-min);
  padding: 0;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--g-radius-none);
  color: var(--g-text-primary);
  background: transparent;
  cursor: pointer;
}

.icon-card:hover {
  color: var(--g-text-accent);
}

.icon-card--copied {
  color: var(--g-text-accent);
}

.icon-card__preview {
  width: var(--g-size-control-lg);
  height: var(--g-size-control-lg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--g-text-primary);
}

.icon-card__preview :deep(svg) {
  width: 24px;
  height: 24px;
}

.icon-card__status {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: var(--g-z-index-tooltip);
  padding: var(--g-space-1) var(--g-space-2);
  color: var(--g-action-secondary-text);
  background: var(--g-action-secondary-bg);
  transform: translateX(-50%);
  white-space: nowrap;
  text-align: center;
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-medium);
}

@media (max-width: 760px) {
  .icons-page__header,
  .icons-section {
    padding: var(--g-space-5);
  }

  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
  }
}
</style>
