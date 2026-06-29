<script setup>
import { reactive } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()

// Local form draft — kept separate from the store so edits are
// only committed to the store when "Save changes" is pressed.
const form = reactive({
  name: user.name,
  age: user.age,
  email: user.email,
})

function save() {
  user.updateName(form.name)
  user.updateAge(form.age)
  user.updateEmail(form.email)
}
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <span class="eyebrow">Exercise 02</span>
      <h2>User Store</h2>
      <p class="lede">
        Three fields of state, each with its own action, plus a getter that
        composes them into a summary string.
      </p>
    </header>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Current profile</h3>
        <dl class="profile-list">
          <div class="profile-row">
            <dt>Name</dt>
            <dd>{{ user.name }}</dd>
          </div>
          <div class="profile-row">
            <dt>Age</dt>
            <dd>{{ user.age }}</dd>
          </div>
          <div class="profile-row">
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
          </div>
        </dl>
        <p class="summary mono">{{ user.summary }}</p>
      </div>

      <form class="card" @submit.prevent="save">
        <h3 class="card-title">Update profile</h3>
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" type="text" />
        </div>
        <div class="field">
          <label for="age">Age</label>
          <input id="age" v-model="form.age" type="number" min="0" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" />
        </div>
        <button class="btn btn-primary" type="submit">Save changes</button>
      </form>
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
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 760px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.card-title {
  font-size: 16px;
  margin-bottom: 4px;
}
.profile-list {
  margin: 0;
}
.profile-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.profile-row dt {
  color: var(--text-soft);
  font-size: 13px;
}
.profile-row dd {
  margin: 0;
  font-weight: 600;
}
.summary {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 4px;
}
</style>
