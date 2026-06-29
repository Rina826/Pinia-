import { defineStore } from 'pinia'

/**
 * useCartStore
 * Exercise 4 — Shopping Cart
 * Demonstrates: two related pieces of state (catalog + cart),
 * actions that cross-reference them, and computed getters.
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [
      { id: 1, name: 'Wireless Mouse', price: 19.99 },
      { id: 2, name: 'Mechanical Keyboard', price: 59.0 },
      { id: 3, name: '27" Monitor', price: 189.5 },
      { id: 4, name: 'USB-C Hub', price: 24.0 },
      { id: 5, name: 'Webcam 1080p', price: 34.75 },
    ],
    cart: [], // { id, name, price, quantity }
  }),

  getters: {
    totalItems: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(productId) {
      const product = this.products.find((p) => p.id === productId)
      if (!product) return
      const existing = this.cart.find((item) => item.id === productId)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      const existing = this.cart.find((item) => item.id === productId)
      if (!existing) return
      if (existing.quantity > 1) {
        existing.quantity--
      } else {
        this.cart = this.cart.filter((item) => item.id !== productId)
      }
    },
    clearCart() {
      this.cart = []
    },
  },
})
