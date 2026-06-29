import { defineStore } from 'pinia'

let nextId = 4

/**
 * useTodoStore
 * Exercise 3 — Todo List
 * Demonstrates: array state, CRUD-style actions, multiple getters
 */
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, title: 'Read the Pinia documentation', completed: true },
      { id: 2, title: 'Build the counter store', completed: true },
      { id: 3, title: 'Build the todo store', completed: false },
    ],
  }),

  getters: {
    completedTodos: (state) => state.todos.filter((t) => t.completed),
    pendingTodos: (state) => state.todos.filter((t) => !t.completed),
    totalTodos: (state) => state.todos.length,
  },

  actions: {
    addTodo(title) {
      const trimmed = title.trim()
      if (!trimmed) return
      this.todos.push({ id: nextId++, title: trimmed, completed: false })
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
    toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) todo.completed = !todo.completed
    },
  },
})
