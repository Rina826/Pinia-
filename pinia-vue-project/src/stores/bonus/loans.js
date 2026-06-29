import { defineStore } from 'pinia'
import { useBooksStore } from './books'

let nextLoanId = 1

/**
 * useLoansStore
 * Bonus — Library Management System
 * This store demonstrates one store calling actions on *another*
 * store (useBooksStore) from inside its own actions — a common
 * real-world Pinia pattern.
 */
export const useLoansStore = defineStore('loans', {
  state: () => ({
    loans: [], // { id, bookId, memberId, borrowedAt, returnedAt }
  }),

  getters: {
    activeLoans: (state) => state.loans.filter((l) => !l.returnedAt),
    returnedLoans: (state) => state.loans.filter((l) => l.returnedAt),
    totalLoans: (state) => state.loans.length,
  },

  actions: {
    borrowBook(bookId, memberId) {
      const books = useBooksStore()
      const book = books.books.find((b) => b.id === bookId)
      if (!book || book.available <= 0) return false

      books.decrementAvailable(bookId)
      this.loans.push({
        id: nextLoanId++,
        bookId,
        memberId,
        borrowedAt: new Date().toISOString(),
        returnedAt: null,
      })
      return true
    },

    returnBook(loanId) {
      const loan = this.loans.find((l) => l.id === loanId)
      if (!loan || loan.returnedAt) return

      const books = useBooksStore()
      books.incrementAvailable(loan.bookId)
      loan.returnedAt = new Date().toISOString()
    },
  },
})
