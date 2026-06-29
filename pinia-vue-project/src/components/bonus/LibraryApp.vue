<script setup>
import { ref } from 'vue'
import BookCatalog from './BookCatalog.vue'
import MemberDirectory from './MemberDirectory.vue'
import LoanDesk from './LoanDesk.vue'

const subTab = ref('catalog')
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <span class="eyebrow">Bonus Challenge</span>
      <h2>Library Management System</h2>
      <p class="lede">
        A mini project built from three independent Pinia stores —
        <span class="mono">books</span>, <span class="mono">members</span>,
        and <span class="mono">loans</span> — shared across three
        components. The loans store calls actions on the books store
        directly, showing how stores can compose with one another.
      </p>
    </header>

    <div class="subnav">
      <button :class="['sub-btn', { active: subTab === 'catalog' }]" @click="subTab = 'catalog'">
        Catalog
      </button>
      <button :class="['sub-btn', { active: subTab === 'members' }]" @click="subTab = 'members'">
        Members
      </button>
      <button :class="['sub-btn', { active: subTab === 'loans' }]" @click="subTab = 'loans'">
        Loan Desk
      </button>
    </div>

    <BookCatalog v-if="subTab === 'catalog'" />
    <MemberDirectory v-else-if="subTab === 'members'" />
    <LoanDesk v-else-if="subTab === 'loans'" />
  </section>
</template>

<style scoped>
.panel-head {
  margin-bottom: 20px;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--gold-500);
  text-transform: uppercase;
}
.lede {
  color: var(--text-soft);
  max-width: 640px;
  margin-top: 6px;
}
.subnav {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
.sub-btn {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  color: var(--text-soft);
  border-radius: 999px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 600;
}
.sub-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
</style>
