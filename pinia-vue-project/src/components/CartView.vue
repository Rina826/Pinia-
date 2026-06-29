<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

function quantityInCart(productId) {
  const item = cart.cart.find((i) => i.id === productId)
  return item ? item.quantity : 0
}
</script>

<template>
  <section class="panel">
    <header class="panel-head">
      <span class="eyebrow">Exercise 04</span>
      <h2>Shopping Cart</h2>
      <p class="lede">
        Two related pieces of state — a product catalog and a cart — with
        actions that look products up by id, and getters for totals.
      </p>
    </header>

    <div class="grid-2">
      <div>
        <h3 class="section-title">Products</h3>
        <ul class="product-list">
          <li v-for="p in cart.products" :key="p.id" class="product-row">
            <div>
              <p class="product-name">{{ p.name }}</p>
              <p class="product-price mono">${{ p.price.toFixed(2) }}</p>
            </div>
            <div class="product-actions">
              <span v-if="quantityInCart(p.id)" class="qty-pill mono">
                × {{ quantityInCart(p.id) }}
              </span>
              <button class="btn btn-primary btn-sm" @click="cart.addToCart(p.id)">
                Add to cart
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="section-title">Cart</h3>
        <div class="cart-card">
          <ul class="cart-list">
            <li v-for="item in cart.cart" :key="item.id" class="cart-row">
              <span class="cart-name">{{ item.name }}</span>
              <div class="cart-qty">
                <button class="btn btn-outline btn-sm" @click="cart.removeFromCart(item.id)">−</button>
                <span class="mono">{{ item.quantity }}</span>
                <button class="btn btn-outline btn-sm" @click="cart.addToCart(item.id)">+</button>
              </div>
              <span class="cart-line-price mono">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </li>
            <li v-if="cart.cart.length === 0" class="empty">Your cart is empty.</li>
          </ul>

          <div class="cart-totals">
            <div class="total-row">
              <span>Total items</span>
              <span class="mono">{{ cart.totalItems }}</span>
            </div>
            <div class="total-row total-row-strong">
              <span>Total price</span>
              <span class="mono">${{ cart.totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="btn btn-ghost"
            :disabled="cart.cart.length === 0"
            @click="cart.clearCart()"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
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
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
@media (max-width: 760px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
.section-title {
  font-size: 15px;
  color: var(--text-soft);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}
.product-list,
.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
}
.product-name {
  margin: 0;
  font-weight: 600;
}
.product-price {
  margin: 2px 0 0;
  color: var(--text-soft);
  font-size: 13px;
}
.product-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.qty-pill {
  font-size: 12px;
  color: var(--accent);
}
.cart-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cart-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.cart-qty {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cart-totals {
  border-top: 1px solid var(--border);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.total-row {
  display: flex;
  justify-content: space-between;
  color: var(--text-soft);
  font-size: 14px;
}
.total-row-strong {
  color: var(--text);
  font-weight: 700;
  font-size: 16px;
}
.empty {
  text-align: center;
  color: var(--text-soft);
  padding: 16px;
}
</style>
