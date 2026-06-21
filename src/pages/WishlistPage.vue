<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream border-b border-amber-100 py-24 px-6">
      <div class="max-w-350 mx-auto flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Saved Items —</p>
          <h1 class="font-display text-6xl font-bold text-chocolate leading-tight">My Wishlist <span class="text-amber">({{ count }})</span></h1>
        </div>
        <div v-if="count > 0" class="flex gap-3">
          <button @click="addAll" class="px-8 py-4 bg-chocolate text-cream rounded-2xl font-body text-base font-semibold hover:bg-chocolate-light transition-all duration-300 hover:shadow-lg">Add All to Cart</button>
        </div>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-20">
      <div v-if="count === 0" class="flex flex-col items-center justify-center py-24 text-center">
        <div class="mb-7 text-chocolate/20">
          <AppIcon name="heart" :size="80" :stroke-width="1" />
        </div>
        <h3 class="font-display text-3xl font-bold text-chocolate mb-3">Your wishlist is empty</h3>
        <p class="font-body text-base text-chocolate/50 mb-10">Save your favourites as you browse</p>
        <RouterLink to="/shop" class="bg-chocolate text-cream px-10 py-4 rounded-2xl font-body font-semibold text-base hover:bg-chocolate-light transition-all duration-300 hover:shadow-xl">Browse Shop</RouterLink>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <TransitionGroup name="product-grid">
          <ProductCard v-for="p in state.items" :key="p.id" :product="p" />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '@/components/ui/ProductCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useWishlist } from '@/stores/wishlist'
import { useCart } from '@/stores/cart'
import { useToast } from '@/stores/toast'

const { state, count } = useWishlist()
const { addItem } = useCart()
const { success } = useToast()

function addAll() {
  state.items.forEach(p => addItem(p))
  success(`All ${count.value} items added to cart!`)
}
</script>

<style scoped>
.product-grid-enter-active, .product-grid-leave-active { transition: all 0.4s ease; }
.product-grid-enter-from { opacity: 0; transform: scale(0.9); }
.product-grid-leave-to { opacity: 0; transform: scale(0.9); }
</style>
