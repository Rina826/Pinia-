import { defineStore } from 'pinia'

let nextBookId = 4

/**
 * useBooksStore
 * Bonus — Library Management System
 * Tracks the catalog and how many copies of each title are
 * currently available to borrow.
 */
export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin', copies: 3, available: 2 },
      { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas', copies: 2, available: 2 },
      { id: 3, title: "Eloquent JavaScript", author: 'Marijn Haverbeke', copies: 4, available: 3 },
    ],
  }),

  getters: {
    totalBooks: (state) => state.books.length,
    totalCopies: (state) => state.books.reduce((sum, b) => sum + b.copies, 0),
    availableBooks: (state) => state.books.filter((b) => b.available > 0),
  },

  actions: {
    addBook({ title, author, copies }) {
      const total = Number(copies) || 1
      this.books.push({
        id: nextBookId++,
        title,
        author,
        copies: total,
        available: total,
      })
    },
    removeBook(bookId) {
      this.books = this.books.filter((b) => b.id !== bookId)
    },
    // Called by the loans store when a copy is borrowed / returned.
    decrementAvailable(bookId) {
      const book = this.books.find((b) => b.id === bookId)
      if (book && book.available > 0) book.available--
    },
    incrementAvailable(bookId) {
      const book = this.books.find((b) => b.id === bookId)
      if (book && book.available < book.copies) book.available++
    },
  },
})
