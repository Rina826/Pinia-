<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useThemeStore } from './stores/theme'

import CounterView from './components/CounterView.vue'
import UserView from './components/UserView.vue'
import TodoView from './components/TodoView.vue'
import CartView from './components/CartView.vue'
import ThemeView from './components/ThemeView.vue'
import LibraryApp from './components/bonus/LibraryApp.vue'

const theme = useThemeStore()

watchEffect(() => {
  document.documentElement.classList.toggle('dark-mode', theme.darkMode)
})

const tabs = [
  { id: 'counter', label: 'Counter', exercise: '01' },
  { id: 'user', label: 'User Profile', exercise: '02' },
  { id: 'todo', label: 'Todo List', exercise: '03' },
  { id: 'cart', label: 'Shopping Cart', exercise: '04' },
  { id: 'theme', label: 'Theme Switcher', exercise: '05' },
  { id: 'library', label: 'Library System', exercise: 'Bonus' },
]

const active = ref('counter')

const ActiveComponent = computed(() => {
  return {
    counter: CounterView,
    user: UserView,
    todo: TodoView,
    cart: CartView,
    theme: ThemeView,
    library: LibraryApp,
  }[active.value]
})
</script>

<template>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">Pi</span>
        <div class="brand-text">
          <strong>Pinia + Vue</strong>
          <span>Assignment Workbench</span>
        </div>
      </div>

      <nav class="nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['nav-item', { active: active === tab.id }]"
          @click="active = tab.id"
        >
          <span class="nav-num mono">{{ tab.exercise }}</span>
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <div class="sidebar-foot">
        <span class="mono">useStore() × {{ tabs.length }}</span>
      </div>
    </aside>

    <main class="content">
      <component :is="ActiveComponent" />
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}
@media (max-width: 760px) {
  .shell {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 0 6px;
}
.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.brand-text strong {
  font-family: var(--font-display);
  font-size: 15px;
}
.brand-text span {
  font-size: 11px;
  color: var(--text-soft);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 11px 12px;
  color: var(--text-soft);
  font-size: 14px;
  font-weight: 500;
}
.nav-item:hover {
  background: var(--surface-alt);
  color: var(--text);
}
.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 700;
}
.nav-num {
  font-size: 11px;
  color: var(--text-soft);
  min-width: 28px;
}
.nav-item.active .nav-num {
  color: var(--accent);
}

.sidebar-foot {
  margin-top: auto;
  padding: 14px 6px 0;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-soft);
}

.content {
  padding: 40px 48px;
  max-width: 1040px;
}
@media (max-width: 760px) {
  .content {
    padding: 24px;
  }
}
</style>
