<script setup>
import { reactive } from 'vue'
import { useBooksStore } from '../../stores/bonus/books'

const books = useBooksStore()

const form = reactive({ title: '', author: '', copies: 1 })

function submit() {
  if (!form.title.trim() || !form.author.trim()) return
  books.addBook({ title: form.title, author: form.author, copies: form.copies })
  form.title = ''
  form.author = ''
  form.copies = 1
}
</script>

<template>
  <div class="card">
    <h3 class="card-title">Catalog ({{ books.totalBooks }} titles · {{ books.totalCopies }} copies)</h3>

    <table class="lib-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Available</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in books.books" :key="b.id">
          <td>{{ b.title }}</td>
          <td>{{ b.author }}</td>
          <td class="mono">{{ b.available }} / {{ b.copies }}</td>
          <td><button class="btn-danger" @click="books.removeBook(b.id)">Remove</button></td>
        </tr>
      </tbody>
    </table>

    <form class="add-form" @submit.prevent="submit">
      <input v-model="form.title" type="text" placeholder="Title" required />
      <input v-model="form.author" type="text" placeholder="Author" required />
      <input v-model.number="form.copies" type="number" min="1" style="width: 80px" />
      <button class="btn btn-primary btn-sm" type="submit">Add book</button>
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
