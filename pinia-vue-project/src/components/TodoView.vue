<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todo = useTodoStore()
const newTitle = ref('')

function submit() {
  todo.addTodo(newTitle.value)
  newTitle.value = ''
}
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <span class="eyebrow">Exercise 03</span>
      <h2>Todo List</h2>
      <p class="lede">
        Array state with add / delete / toggle actions, and three getters
        that derive statistics from the same list.
      </p>
    </header>

    <div class="stats-row">
      <div class="stat">
        <span class="stat-value mono">{{ todo.totalTodos }}</span>
        <span class="stat-label">total</span>
      </div>
      <div class="stat">
        <span class="stat-value mono">{{ todo.completedTodos.length }}</span>
        <span class="stat-label">completed</span>
      </div>
      <div class="stat">
        <span class="stat-value mono">{{ todo.pendingTodos.length }}</span>
        <span class="stat-label">pending</span>
      </div>
    </div>

    <form class="add-row" @submit.prevent="submit">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Add a new task and press Enter…"
      />
      <button class="btn btn-primary" type="submit">Add todo</button>
    </form>

    <ul class="todo-list">
      <li v-for="t in todo.todos" :key="t.id" class="todo-row">
        <label class="todo-check">
          <input
            type="checkbox"
            :checked="t.completed"
            @change="todo.toggleTodo(t.id)"
          />
          <span :class="['todo-title', { done: t.completed }]">{{ t.title }}</span>
        </label>
        <span :class="['tag', t.completed ? 'tag-success' : 'tag-pending']">
          {{ t.completed ? 'Done' : 'Pending' }}
        </span>
        <button class="btn-danger" @click="todo.deleteTodo(t.id)">Delete</button>
      </li>
      <li v-if="todo.todos.length === 0" class="empty">No todos yet — add one above.</li>
    </ul>
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
.stats-row {
  display: flex;
  gap: 28px;
  margin-bottom: 24px;
}
.stat {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 22px;
  min-width: 100px;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
}
.stat-label {
  font-size: 12px;
  color: var(--text-soft);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.add-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.add-row input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 14px;
}
.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.todo-row {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
}
.todo-check {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  cursor: pointer;
}
.todo-title.done {
  text-decoration: line-through;
  color: var(--text-soft);
}
.empty {
  text-align: center;
  color: var(--text-soft);
  padding: 24px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
</style>
