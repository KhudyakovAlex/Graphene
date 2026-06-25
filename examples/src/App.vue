<script setup lang="ts">
import type { Component } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

import logoUrl from '../../src/assets/logos/graphene_logo.svg'
import { BaseButton } from '../../src/components'
import IconsView from './views/assets/IconsView.vue'
import BaseView from './views/components/BaseView.vue'
import FeedbackView from './views/components/FeedbackView.vue'
import ResourceCatalogView from './views/shared/ResourceCatalogView.vue'

const theme = ref(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
const route = ref(window.location.hash || '#home')

type RoutePage = {
  hash: string
  label: string
  description: string
  component: Component
  props?: Record<string, unknown>
}

type NavigationGroup = {
  id: string
  label: string
  items: RoutePage[]
}

const routeSections: NavigationGroup[] = [
  {
    id: 'components',
    label: 'src/components',
    items: [
      {
        hash: '#components/base',
        label: 'base',
        description: 'Базовые контролы и поля ввода',
        component: BaseView,
      },
      {
        hash: '#components/feedback',
        label: 'feedback',
        description: 'Диалоги и другие feedback-сценарии',
        component: FeedbackView,
      },
      {
        hash: '#components/layout',
        label: 'layout',
        description: 'Каркас экранов и контейнеры',
        component: ResourceCatalogView,
        props: {
          eyebrow: 'Components',
          title: 'Layout',
          sourcePath: 'src/components/layout/',
          description: 'Папка зарезервирована под структурные компоненты экранов и рабочих областей.',
          sections: [
            {
              title: 'Status',
              status: 'Empty',
              description: 'Раздел пока пустой, но уже виден в витрине на том же уровне, что и в библиотеке.',
            },
            {
              title: 'Planned direction',
              items: ['AppShell', 'Panel', 'ContentArea', 'SplitLayout'],
            },
          ],
        },
      },
      {
        hash: '#components/navigation',
        label: 'navigation',
        description: 'Навигационные паттерны и панели действий',
        component: ResourceCatalogView,
        props: {
          eyebrow: 'Components',
          title: 'Navigation',
          sourcePath: 'src/components/navigation/',
          description: 'Здесь будут собраны вкладки, меню, хлебные крошки и другие элементы навигации.',
          sections: [
            {
              title: 'Status',
              status: 'Empty',
              description: 'Папка пока пустая, но раздел уже отражен в examples для одинаковой структуры библиотеки и витрины.',
            },
            {
              title: 'Planned direction',
              items: ['Tabs', 'Menu', 'Breadcrumbs', 'ActionBar'],
            },
          ],
        },
      },
      {
        hash: '#components/data',
        label: 'data',
        description: 'Таблицы, списки и отображение данных',
        component: ResourceCatalogView,
        props: {
          eyebrow: 'Components',
          title: 'Data',
          sourcePath: 'src/components/data/',
          description: 'Раздел для таблиц, списков, деревьев и других data-heavy паттернов внутренних приложений.',
          sections: [
            {
              title: 'Status',
              status: 'Empty',
              description: 'Пока без компонентов, но раздел уже выделен под будущие data-компоненты.',
            },
            {
              title: 'Planned direction',
              items: ['DataTable', 'DataList', 'TreeView', 'PropertyList', 'Pagination'],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'tokens',
    label: 'src/tokens',
    items: [
      {
        hash: '#tokens/base',
        label: 'base',
        description: 'Сырые design tokens',
        component: ResourceCatalogView,
        props: {
          eyebrow: 'Tokens',
          title: 'Base Tokens',
          sourcePath: 'src/tokens/base/',
          description: 'Сырые значения Graphene без привязки к роли интерфейса.',
          sections: [
            {
              title: 'Files',
              items: [
                'colors.css',
                'radius.css',
                'typography.css',
                'spacing.css',
                'size.css',
                'border.css',
                'opacity.css',
                'z-index.css',
              ],
            },
            {
              title: 'Usage note',
              description: 'Base tokens используются внутри token files и только в редких случаях напрямую, когда semantic role еще не определена владельцем системы.',
            },
          ],
        },
      },
      {
        hash: '#tokens/semantic',
        label: 'semantic',
        description: 'Роли интерфейса поверх base tokens',
        component: ResourceCatalogView,
        props: {
          eyebrow: 'Tokens',
          title: 'Semantic Tokens',
          sourcePath: 'src/tokens/semantic/',
          description: 'Смысловые роли интерфейса, которые должны использовать компоненты и приложения.',
          sections: [
            {
              title: 'Files',
              items: ['colors.css', 'size.css', 'typography.css'],
            },
            {
              title: 'Current groups',
              items: [
                'background and text',
                'actions and links',
                'checkbox, switch, radio',
                'field',
                'dialog',
                'slider',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'styles',
    label: 'src/styles',
    items: [
      {
        hash: '#styles',
        label: 'root',
        description: 'Глобальные стили и точка подключения токенов',
        component: ResourceCatalogView,
        props: {
          eyebrow: 'Styles',
          title: 'Styles',
          sourcePath: 'src/styles/',
          description: 'Глобальные стили Graphene: подключение токенов, шрифта и базового HTML-вида.',
          sections: [
            {
              title: 'Files',
              items: ['base.css', 'fonts.css'],
            },
            {
              title: 'base.css imports',
              items: [
                '../tokens/base/*',
                '../tokens/semantic/*',
                'global element defaults',
                'theme and selection behavior',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'assets',
    label: 'src/assets',
    items: [
      {
        hash: '#assets/icons',
        label: 'icons',
        description: 'Основной и дополнительный набор SVG-иконок',
        component: IconsView,
      },
    ],
  },
]

const flatRoutes = routeSections.flatMap((section) => section.items)
const routeMap = new Map(flatRoutes.map((item) => [item.hash, item]))
const activeRoute = computed(() => routeMap.get(route.value) ?? null)

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
  const nextRoute = window.location.hash || '#home'
  route.value = nextRoute === '#home' || routeMap.has(nextRoute) ? nextRoute : '#home'
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

      <BaseButton class="theme-toggle" type="button" @click="toggleTheme">
        {{ theme === 'dark' ? 'Светлая тема' : 'Темная тема' }}
      </BaseButton>
    </header>

    <div class="workspace">
      <aside class="sidebar" aria-label="Структура src">
        <a
          class="sidebar__home"
          :class="{ 'sidebar__home--active': route === '#home' }"
          href="#home"
        >
          src overview
        </a>

        <section v-for="section in routeSections" :key="section.id" class="sidebar__group">
          <h2 class="sidebar__group-title">{{ section.label }}</h2>
          <nav class="sidebar__links" :aria-label="section.label">
            <a
              v-for="item in section.items"
              :key="item.hash"
              class="sidebar__link"
              :class="{ 'sidebar__link--active': route === item.hash }"
              :href="item.hash"
            >
              <span class="sidebar__link-label">{{ item.label }}</span>
              <span class="sidebar__link-description">{{ item.description }}</span>
            </a>
          </nav>
        </section>
      </aside>

      <section class="content">
        <template v-if="route === '#home'">
          <section class="hero" aria-labelledby="heroTitle">
            <div class="panel hero__panel">
              <div class="hero__copy">
                <p class="eyebrow">Offline-витрина</p>
                <h1 id="heroTitle">Graphene Demo</h1>
                <p class="hero__text">
                  Навигация и страницы витрины повторяют структуру папок в папке <b>src</b>
                  библиотеки дизайн-системы: компоненты, токены, стили и ассеты. Это помогает
                  человеку и AI видеть одинаковую карту системы.
                </p>
              </div>

              <div class="hero__art" aria-hidden="true">
                <img class="hero__logo hero__logo--ghost" :src="logoUrl" alt="">
                <img class="hero__logo hero__logo--main" :src="logoUrl" alt="">
              </div>
            </div>
          </section>

          <section
            v-for="section in routeSections"
            :key="section.id"
            class="panel overview-section"
            :aria-labelledby="`${section.id}-overview-title`"
          >
            <div class="overview-section__header">
              <h2 :id="`${section.id}-overview-title`">{{ section.label }}</h2>
              <span>{{ section.items.length }} section(s)</span>
            </div>

            <div class="overview-grid">
              <a
                v-for="item in section.items"
                :key="item.hash"
                class="overview-card"
                :href="item.hash"
              >
                <span class="overview-card__label">{{ item.label }}</span>
                <span class="overview-card__description">{{ item.description }}</span>
              </a>
            </div>
          </section>
        </template>

        <component
          :is="activeRoute?.component"
          v-else-if="activeRoute"
          v-bind="activeRoute.props ?? {}"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
main {
  width: min(1360px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: var(--g-space-8);
  gap: var(--g-space-8);
  display: grid;
  align-content: start;
}

.header {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
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

.workspace {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: var(--g-space-6);
  align-items: start;
}

.sidebar {
  position: sticky;
  top: var(--g-space-8);
  display: grid;
  gap: var(--g-space-5);
  padding: var(--g-space-5);
  border-radius: var(--g-radius-none);
  background: var(--g-bg-surface);
}

.sidebar__home,
.sidebar__link {
  color: inherit;
  text-decoration: none;
}

.sidebar__home {
  padding: var(--g-space-3);
  color: var(--g-text-primary);
  background: var(--g-bg-base);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.sidebar__home--active,
.sidebar__link--active {
  color: var(--g-text-primary);
  background: var(--g-bg-base);
}

.sidebar__group {
  display: grid;
  gap: var(--g-space-2);
}

.sidebar__group-title {
  margin: 0;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-medium);
  text-transform: uppercase;
}

.sidebar__links {
  display: grid;
  gap: var(--g-space-1);
}

.sidebar__link {
  display: grid;
  gap: 2px;
  padding: var(--g-space-3);
}

.sidebar__link-label {
  color: var(--g-text-primary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-medium);
}

.sidebar__link-description {
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
}

.content {
  display: grid;
  gap: var(--g-space-6);
}

.theme-toggle {
  justify-self: start;
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
  max-width: 860px;
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

.hero__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: var(--g-space-6);
  min-height: 320px;
  overflow: hidden;
}

.hero__copy {
  position: relative;
  z-index: 1;
  align-self: start;
}

.hero__art {
  position: relative;
  min-height: 240px;
}

.hero__logo {
  position: absolute;
  display: block;
  max-width: none;
  pointer-events: none;
  user-select: none;
}

.hero__logo--ghost {
  top: -180px;
  right: -150px;
  width: min(560px, 44vw);
  opacity: 0.14;
  transform: rotate(-14deg);
}

.hero__logo--main {
  right: -52px;
  bottom: -148px;
  width: min(360px, 29vw);
  opacity: 0.94;
  transform: rotate(8deg);
}

.overview-section {
  gap: var(--g-space-4);
}

.overview-section__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--g-space-3);
  color: var(--g-text-secondary);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--g-space-3);
}

.overview-card {
  display: grid;
  gap: var(--g-space-1);
  padding: var(--g-space-4);
  color: inherit;
  text-decoration: none;
  background: var(--g-bg-base);
}

.overview-card__label {
  color: var(--g-text-primary);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
  font-weight: var(--g-font-weight-medium);
}

.overview-card__description {
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

@media (max-width: 760px) {
  main {
    padding: var(--g-space-4);
  }

  .header {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .workspace {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .panel {
    padding: var(--g-space-5);
  }

  h1 {
    line-height: var(--g-line-height-40);
  }

  .hero__panel {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .hero__art {
    min-height: 160px;
  }

  .hero__logo--ghost {
    top: -120px;
    right: -120px;
    width: 360px;
  }

  .hero__logo--main {
    right: -64px;
    bottom: -118px;
    width: 220px;
  }
}
</style>
