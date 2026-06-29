<script setup>
import { ref } from 'vue'
import { useBooksStore } from '../../stores/bonus/books'
import { useMembersStore } from '../../stores/bonus/members'
import { useLoansStore } from '../../stores/bonus/loans'

const books = useBooksStore()
const members = useMembersStore()
const loans = useLoansStore()

const selectedBook = ref('')
const selectedMember = ref('')
const error = ref('')

function bookTitle(id) {
  return books.books.find((b) => b.id === id)?.title ?? 'Unknown title'
}
function memberName(id) {
  return members.members.find((m) => m.id === id)?.name ?? 'Unknown member'
}

function borrow() {
  error.value = ''
  if (!selectedBook.value || !selectedMember.value) {
    error.value = 'Choose both a book and a member.'
    return
  }
  const ok = loans.borrowBook(Number(selectedBook.value), Number(selectedMember.value))
  if (!ok) error.value = 'That book has no available copies right now.'
}
</script>

<template>
  <div class="card">
    <h3 class="card-title">
      Loan Desk — {{ loans.activeLoans.length }} active / {{ loans.totalLoans }} total
    </h3>
    <p class="card-note">
      This component reads from <span class="mono">useBooksStore</span>,
      <span class="mono">useMembersStore</span>, and
      <span class="mono">useLoansStore</span> at the same time — three
      independent stores shared through one screen.
    </p>

    <form class="borrow-row" @submit.prevent="borrow">
      <select v-model="selectedBook">
        <option value="" disabled>Choose a book…</option>
        <option v-for="b in books.availableBooks" :key="b.id" :value="b.id">
          {{ b.title }} ({{ b.available }} available)
        </option>
      </select>
      <select v-model="selectedMember">
        <option value="" disabled>Choose a member…</option>
        <option v-for="m in members.members" :key="m.id" :value="m.id">{{ m.name }}</option>
      </select>
      <button class="btn btn-primary btn-sm" type="submit">Borrow</button>
    </form>
    <p v-if="error" class="error-text">{{ error }}</p>

    <table class="lib-table">
      <thead>
        <tr>
          <th>Book</th>
          <th>Member</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in loans.loans" :key="l.id">
          <td>{{ bookTitle(l.bookId) }}</td>
          <td>{{ memberName(l.memberId) }}</td>
          <td>
            <span :class="['tag', l.returnedAt ? 'tag-success' : 'tag-pending']">
              {{ l.returnedAt ? 'Returned' : 'Borrowed' }}
            </span>
          </td>
          <td>
            <button
              v-if="!l.returnedAt"
              class="btn btn-outline btn-sm"
              @click="loans.returnBook(l.id)"
            >
              Mark returned
            </button>
          </td>
        </tr>
        <tr v-if="loans.loans.length === 0">
          <td colspan="4" class="empty-row">No loans yet.</td>
        </tr>
      </tbody>
    </table>
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
  margin-bottom: 8px;
}
.card-note {
  font-size: 13px;
  color: var(--text-soft);
  margin-bottom: 16px;
  max-width: 640px;
}
.borrow-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.borrow-row select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 13px;
  flex: 1;
  min-width: 160px;
}
.error-text {
  color: var(--danger);
  font-size: 13px;
  margin: 4px 0 12px;
}
.lib-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
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
.empty-row {
  text-align: center;
  color: var(--text-soft);
  padding: 16px;
}
</style>
