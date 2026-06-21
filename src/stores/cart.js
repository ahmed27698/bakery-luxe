import { reactive, computed, watch } from 'vue'

const stored = localStorage.getItem('bakery_cart')
const initial = stored ? JSON.parse(stored) : []

const state = reactive({
  items: initial,
  isOpen: false,
  coupon: null,
})

const itemCount = computed(() => state.items.reduce((s, i) => s + i.qty, 0))
const subtotal = computed(() => state.items.reduce((s, i) => s + i.price * i.qty, 0))
const discount = computed(() => state.coupon ? subtotal.value * 0.15 : 0)
const total = computed(() => subtotal.value - discount.value + (subtotal.value > 50 ? 0 : 6.99))
const shipping = computed(() => subtotal.value > 50 ? 0 : 6.99)

watch(() => state.items, (v) => localStorage.setItem('bakery_cart', JSON.stringify(v)), { deep: true })

export function useCart() {
  function addItem(product, qty = 1) {
    const existing = state.items.find(i => i.id === product.id)
    if (existing) existing.qty += qty
    else state.items.push({ ...product, qty })
  }

  function removeItem(id) {
    const idx = state.items.findIndex(i => i.id === id)
    if (idx !== -1) state.items.splice(idx, 1)
  }

  function updateQty(id, qty) {
    const item = state.items.find(i => i.id === id)
    if (item) {
      if (qty <= 0) removeItem(id)
      else item.qty = qty
    }
  }

  function clearCart() { state.items.splice(0) }

  function toggleCart() { state.isOpen = !state.isOpen }
  function openCart() { state.isOpen = true }
  function closeCart() { state.isOpen = false }

  function applyCoupon(code) {
    if (code.toUpperCase() === 'LUXE15') {
      state.coupon = code
      return true
    }
    return false
  }

  function removeCoupon() { state.coupon = null }

  return { state, itemCount, subtotal, discount, total, shipping, addItem, removeItem, updateQty, clearCart, toggleCart, openCart, closeCart, applyCoupon, removeCoupon }
}
