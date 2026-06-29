import { defineStore } from 'pinia'

/**
 * useThemeStore
 * Exercise 5 — Theme Store
 * Demonstrates: a single boolean piece of global state shared by
 * every component in the app via one action.
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),

  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
    },
  },
})
