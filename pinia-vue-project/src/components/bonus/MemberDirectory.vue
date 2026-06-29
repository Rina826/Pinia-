<script setup>
import { reactive } from 'vue'
import { useMembersStore } from '../../stores/bonus/members'

const members = useMembersStore()
const form = reactive({ name: '', email: '' })

function submit() {
  if (!form.name.trim() || !form.email.trim()) return
  members.addMember({ name: form.name, email: form.email })
  form.name = ''
  form.email = ''
}
</script>

<template>
  <div class="card">
    <h3 class="card-title">Members ({{ members.memberCount }})</h3>

    <table class="lib-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in members.members" :key="m.id">
          <td>{{ m.name }}</td>
          <td class="mono">{{ m.email }}</td>
          <td><button class="btn-danger" @click="members.removeMember(m.id)">Remove</button></td>
        </tr>
      </tbody>
    </table>

    <form class="add-form" @submit.prevent="submit">
      <input v-model="form.name" type="text" placeholder="Full name" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <button class="btn btn-primary btn-sm" type="submit">Add member</button>
    </form>
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 22px;
}
.card-title {
  font-size: 15px;
  margin-bottom: 14px;
}
.lib-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}
.lib-table th {
  text-align: left;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-soft);
  border-bottom: 1px solid var(--border);
  padding: 6px 8px;
}
.lib-table td {
  padding: 8px 8px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.add-form {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.add-form input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 13px;
  flex: 1;
  min-width: 120px;
}
</style>
