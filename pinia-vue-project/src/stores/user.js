import { defineStore } from 'pinia'

/**
 * useUserStore
 * Exercise 2 — User Store
 * Demonstrates: state + actions that update individual fields
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Jane Doe',
    age: 24,
    email: 'jane.doe@example.com',
  }),

  getters: {
    summary: (state) => `${state.name} (${state.age}) — ${state.email}`,
  },

  actions: {
    updateName(newName) {
      this.name = newName
    },
    updateAge(newAge) {
      this.age = Number(newAge)
    },
    updateEmail(newEmail) {
      this.email = newEmail
    },
  },
})
