<script setup>
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <span class="eyebrow">Exercise 01</span>
      <h2>Counter Store</h2>
      <p class="lede">
        A minimal store with one piece of state, a derived getter, and three actions.
      </p>
    </header>

    <div class="counter-card">
      <div class="counter-readout">
        <div class="readout-block">
          <span class="readout-label">count</span>
          <span class="readout-value mono">{{ counter.count }}</span>
        </div>
        <div class="readout-block">
          <span class="readout-label">doubleCount (getter)</span>
          <span class="readout-value mono">{{ counter.doubleCount }}</span>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-outline" @click="counter.decrement()">− Decrement</button>
        <button class="btn btn-primary" @click="counter.increment()">+ Increment</button>
        <button class="btn btn-ghost" @click="counter.reset()">Reset</button>
      </div>
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
.counter-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 32px;
}
.counter-readout {
  display: flex;
  gap: 40px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.readout-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.readout-label {
  font-size: 12px;
  color: var(--text-soft);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.readout-value {
  font-size: 42px;
  font-weight: 600;
  color: var(--text);
}
.btn-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
