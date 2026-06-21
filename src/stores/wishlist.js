import { reactive, computed, watch } from 'vue'

const stored = localStorage.getItem('bakery_wishlist')
const state = reactive({ items: stored ? JSON.parse(stored) : [] })
watch(() => state.items, v => localStorage.setItem('bakery_wishlist', JSON.stringify(v)), { deep: true })

export function useWishlist() {
  const count = computed(() => state.items.length)
  const ids = computed(() => state.items.map(i => i.id))

  function toggle(product) {
    const idx = state.items.findIndex(i => i.id === product.id)
    if (idx !== -1) state.items.splice(idx, 1)
    else state.items.push(product)
  }

  function has(id) { return state.items.some(i => i.id === id) }
  function remove(id) { const idx = state.items.findIndex(i => i.id === id); if (idx !== -1) state.items.splice(idx, 1) }

  return { state, count, ids, toggle, has, remove }
}
