<template>
  <div
    class="group relative bg-white rounded-3xl overflow-hidden border border-amber-100/60 card-shine hover-lift transition-all duration-500"
    @mouseenter="onHover" @mouseleave="onLeave"
  >
    <!-- Badge -->
    <div v-if="product.badge" class="absolute top-4 left-4 z-10">
      <span class="font-body text-xs font-semibold px-3 py-1 rounded-full" :class="badgeClass">
        {{ product.badge }}
      </span>
    </div>

    <!-- Wishlist button -->
    <button
      @click.prevent="toggleWishlist"
      class="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      :class="isWishlisted ? 'bg-red-50 text-red-400' : 'bg-white/80 text-chocolate/40 hover:text-red-400 hover:bg-red-50'"
    >
      <svg class="w-4 h-4 transition-all duration-300" :fill="isWishlisted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="1.5"/>
      </svg>
    </button>

    <!-- Image -->
    <RouterLink :to="`/shop/${product.slug}`" class="block">
      <div class="relative overflow-hidden aspect-4/3">
        <img
          :src="product.images[0]" :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <!-- Overlay on hover -->
        <div class="absolute inset-0 bg-chocolate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span class="font-body text-sm text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Product
          </span>
        </div>
        <!-- Fresh today indicator -->
        <div v-if="product.isFresh" class="absolute bottom-3 left-3">
          <span class="font-body text-xs bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Fresh Today
          </span>
        </div>
      </div>
    </RouterLink>

    <!-- Content -->
    <div class="p-6">
      <!-- Category -->
      <p class="font-body text-xs text-amber font-semibold tracking-widest uppercase mb-2">{{ product.category }}</p>

      <!-- Name -->
      <RouterLink :to="`/shop/${product.slug}`">
        <h3 class="font-display text-xl font-bold text-chocolate leading-tight line-clamp-2 hover:text-amber transition-colors duration-300">
          {{ product.name }}
        </h3>
      </RouterLink>

      <!-- Description -->
      <p class="font-body text-sm text-chocolate/55 mt-2 line-clamp-2 leading-relaxed">
        {{ product.shortDescription }}
      </p>

      <!-- Rating -->
      <div class="flex items-center gap-2 mt-4">
        <div class="flex gap-0.5">
          <svg v-for="i in 5" :key="i" class="w-4 h-4 transition-colors" :class="i <= Math.floor(product.rating) ? 'star-fill' : 'star-empty'" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        </div>
        <span class="font-body text-sm text-chocolate/50">({{ product.reviews }})</span>
      </div>

      <!-- Price & CTA -->
      <div class="flex items-center justify-between mt-5 pt-4 border-t border-amber-100/60">
        <div>
          <span class="font-display text-2xl font-bold text-chocolate">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="font-body text-sm text-chocolate/40 line-through ml-2">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        <button @click="addToCart" class="btn-add relative overflow-hidden group/btn">
          <span class="relative z-10 flex items-center gap-1.5">
            <svg class="w-4 h-4 transition-transform group-hover/btn:rotate-12 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="text-sm font-semibold">Add</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import gsap from 'gsap'
import { useCart } from '@/stores/cart'
import { useWishlist } from '@/stores/wishlist'
import { useToast } from '@/stores/toast'

const props = defineProps({ product: { type: Object, required: true } })

const { addItem, openCart } = useCart()
const { has, toggle } = useWishlist()
const { success } = useToast()

const isWishlisted = computed(() => has(props.product.id))

const badgeClass = computed(() => {
  const m = {
    amber: 'bg-amber/15 text-amber-dark border border-amber/30',
    rose: 'bg-rose-100 text-rose-600 border border-rose-200',
    gold: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    chocolate: 'bg-chocolate/10 text-chocolate border border-chocolate/20',
    sage: 'bg-green-50 text-green-700 border border-green-200',
  }
  return m[props.product.badgeColor] || m.amber
})

function addToCart() {
  addItem(props.product)
  openCart()
  success(`${props.product.name} added to cart!`)
}

function toggleWishlist() {
  toggle(props.product)
  const msg = isWishlisted.value ? `${props.product.name} saved to wishlist!` : 'Removed from wishlist'
  success(msg)
}

function onHover(e) {
  gsap.to(e.currentTarget, { y: -8, duration: 0.4, ease: 'power2.out' })
}
function onLeave(e) {
  gsap.to(e.currentTarget, { y: 0, duration: 0.6, ease: 'elastic.out(1.1, 0.5)' })
}
</script>

<style scoped>
.btn-add {
  padding: 0.6rem 1.1rem;
  background: #3D1F0B;
  color: #F5ECD7;
  border-radius: 0.75rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(61,31,11,0.2);
}
.btn-add:hover { background: #D4A853; transform: scale(1.05); box-shadow: 0 8px 20px rgba(212,168,83,0.4); }
</style>
