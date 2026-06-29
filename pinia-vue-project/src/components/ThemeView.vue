<script setup>
import { useThemeStore } from '../stores/theme'

const theme = useThemeStore()
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <span class="eyebrow">Exercise 05</span>
      <h2>Theme Store</h2>
      <p class="lede">
        The smallest possible store — one boolean and one action — but it
        controls a class on the document root that every component shares.
      </p>
    </header>

    <div class="theme-card">
      <div class="theme-preview" :class="{ 'preview-dark': theme.darkMode }">
        <span class="preview-label">{{ theme.darkMode ? 'Dark mode' : 'Light mode' }}</span>
        <p class="preview-copy">This box previews the active theme.</p>
      </div>

      <button class="btn btn-primary toggle-btn" @click="theme.toggleTheme()">
        Switch to {{ theme.darkMode ? 'Light' : 'Dark' }} Mode
      </button>
    </div>
  </section>
</template>

<style scoped>
.panel-head {
  margin-bottom: 24px;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--accent);
  text-transform: uppercase;
}
.lede {
  color: var(--text-soft);
  max-width: 560px;
  margin-top: 6px;
}
.theme-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 460px;
}
.theme-preview {
  width: 100%;
  border-radius: 8px;
  padding: 28px;
  background: var(--paper-100);
  color: var(--ink-900);
  border: 1px solid var(--paper-200);
  transition: all 0.25s ease;
}
.theme-preview.preview-dark {
  background: #0e1418;
  color: #eef3f1;
  border-color: #2a3540;
}
.preview-label {
  font-weight: 700;
  display: block;
  margin-bottom: 6px;
}
.preview-copy {
  margin: 0;
  font-size: 13px;
  opacity: 0.75;
}
.toggle-btn {
  align-self: flex-start;
}
</style>
