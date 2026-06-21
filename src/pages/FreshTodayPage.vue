<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-green-50 border-b border-green-200 py-24 px-6">
      <div class="max-w-350 mx-auto">
        <div class="flex items-center gap-2 mb-5">
          <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <p class="font-body text-base text-green-700 font-medium">Baked This Morning</p>
        </div>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">Fresh <em class="gradient-text">Today</em></h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg leading-relaxed">Items baked within the last 6 hours. Order before 4pm for same-day delivery.</p>
      </div>
    </div>
    <div class="max-w-350 mx-auto px-6 py-20">
      <!-- Timer -->
      <div class="bg-cream border border-amber-200 rounded-3xl p-8 mb-12 flex items-center justify-between flex-wrap gap-6">
        <div>
          <p class="font-body text-sm text-chocolate/50 mb-1">Same-day order cutoff</p>
          <p class="font-display text-4xl font-bold text-chocolate">{{ timeLeft }}</p>
        </div>
        <p class="font-body text-base text-chocolate/60 max-w-sm leading-relaxed">Order before 4:00 PM to receive your fresh items today. Next baking batch starts at 5am tomorrow.</p>
        <RouterLink to="/shop" class="bg-chocolate text-cream px-8 py-4 rounded-2xl font-body font-semibold text-base hover:bg-chocolate-light transition-all duration-300 hover:shadow-lg whitespace-nowrap">Order Now</RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard v-for="p in freshProducts" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { products } from '@/data/products'
import { computed } from 'vue'

const freshProducts = computed(() => products.filter(p => p.isFresh))

const timeLeft = ref('')
function updateTime() {
  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setHours(16, 0, 0, 0)
  if (now > cutoff) { cutoff.setDate(cutoff.getDate() + 1); cutoff.setHours(4) }
  const diff = cutoff - now
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  timeLeft.value = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
}

let timer
onMounted(() => { updateTime(); timer = setInterval(updateTime, 1000) })
onUnmounted(() => clearInterval(timer))
</script>
