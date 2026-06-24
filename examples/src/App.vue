<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import logoUrl from '../../src/assets/logos/graphene_logo.svg'
import { BaseButton } from '../../src/components'
import BaseComponentsView from './views/BaseComponentsView.vue'

const theme = ref(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
const route = ref(window.location.hash || '#home')

function applyTheme(nextTheme: 'light' | 'dark') {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme

  try {
    localStorage.setItem('graphene-theme', nextTheme)
  } catch {
    // Theme switching should still work when storage is unavailable.
  }
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

function syncRoute() {
  route.value = window.location.hash || '#home'
}

onMounted(() => {
  window.addEventListener('hashchange', syncRoute)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncRoute)
})
</script>

<template>
  <main>
    <header class="header">
      <a class="brand" href="#home" aria-label="На главную">
        <img class="brand__logo" :src="logoUrl" alt="">
        <span class="brand__name">Graphene</span>
      </a>

      <nav class="navigation" aria-label="Разделы витрины">
        <a class="navigation__link" href="#base-components">Базовые компоненты</a>
      </nav>

      <BaseButton class="theme-toggle" type="button" @click="toggleTheme">
        {{ theme === 'dark' ? 'Светлая тема' : 'Темная тема' }}
      </BaseButton>
    </header>

    <BaseComponentsView v-if="route === '#base-components'" />

    <template v-else>
      <section class="hero" aria-labelledby="heroTitle">
        <div class="panel">
          <p class="eyebrow">Offline-витрина</p>
          <h1 id="heroTitle">Начальный пример интерфейса на токенах Graphene</h1>
          <p class="hero__text">
            Эта страница использует локальный логотип, локальный шрифт IBM Plex Sans,
            CSS-токены и Vue-компоненты из src.
          </p>

          <a class="feature-link" href="#base-components">Открыть базовые компоненты</a>
        </div>

        <aside class="panel status-card" aria-label="Проверка основы Graphene">
          <div class="status-card__item">
            <span class="status-card__label">Цвета</span>
            <span class="status-card__value">base + semantic tokens</span>
          </div>
          <div class="status-card__item">
            <span class="status-card__label">Тема</span>
            <span class="status-card__value">{{ theme }}</span>
          </div>
          <div class="status-card__item">
            <span class="status-card__label">Среда</span>
            <span class="status-card__value">без внешнего интернета</span>
          </div>
        </aside>
      </section>
    </template>
  </main>
</template>

<style scoped>
main {
  width: min(1120px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: var(--g-space-8);
  display: grid;
  align-content: center;
  gap: var(--g-space-8);
}

.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--g-space-4);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--g-space-3);
  color: inherit;
  text-decoration: none;
}

.brand__logo {
  width: 44px;
  height: 44px;
}

.brand__name {
  color: var(--g-text-primary);
  font-size: var(--g-font-size-20);
  line-height: var(--g-line-height-28);
  font-weight: var(--g-font-weight-semibold);
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: var(--g-space-4);
}

.navigation__link,
.feature-link {
  color: var(--g-text-primary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-medium);
}

.theme-toggle {
  justify-self: start;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: var(--g-space-6);
  align-items: stretch;
}

.panel {
  padding: var(--g-space-8);
  border-radius: var(--g-radius-none);
  background: var(--g-bg-surface);
}

.eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

h1 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(var(--g-font-size-32), 6vw, var(--g-font-size-56));
  line-height: var(--g-line-height-64);
  font-weight: var(--g-font-weight-semibold);
}

p {
  margin: 0;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-18);
  line-height: var(--g-line-height-28);
}

.hero__text {
  margin-top: var(--g-space-5);
  max-width: 680px;
}

.feature-link {
  display: inline-flex;
  margin-top: var(--g-space-6);
}

.status-card {
  display: grid;
  gap: var(--g-space-4);
}

.status-card__item {
  padding: var(--g-space-4);
  border-radius: var(--g-radius-none);
  background: var(--g-bg-base);
}

.status-card__label {
  display: block;
  margin-bottom: var(--g-space-1);
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
}

.status-card__value {
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
  font-weight: var(--g-font-weight-medium);
}

@media (max-width: 760px) {
  main {
    padding: var(--g-space-4);
  }

  .header {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .panel {
    padding: var(--g-space-5);
  }

  h1 {
    line-height: var(--g-line-height-40);
  }
}
</style>
